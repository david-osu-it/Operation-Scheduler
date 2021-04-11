import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getAppointmentTypes, postAppt, getApptDates } from '../services/apptService';
import { getTechnicians } from '../services/techService';
import { makeApptConfirmationNum } from '../utils/helpers';
import { postCustomer } from '../services/customerService';
import moment from "moment";


class ScheduleAppointment extends Form {
    state = {
        data: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            comments: "",
            dateTime: new Date(),
            services: [],
            technician: "",
            confirmed: false,
            appointmentNumber: makeApptConfirmationNum(6)
        },
        types: [],
        technicians: [],
        errors: {},
        datesTaken: []
    };

    schema = {
        appointmentNumber: Joi.string(),
        confirmed: Joi.boolean(),
        isDateTaken: Joi.boolean(),
        firstName: Joi.string().min(1).max(20).required().label("FirstName"),
        lastName: Joi.string().min(1).max(20).required().label("lastName"),
        phone: Joi.string().required().min(7).label("Phone"),
        email: Joi.string().email().required().label("Email"),
        dateTime: Joi.string().required().label("Date"),
        services: Joi.array().min(1).required().label("Services"),
        technician: Joi.string().required().label("Technician"),
        comments: Joi.string().allow(null, '').max(100).label("Comments"),
    };

    async populateAppointmentTypes() {
        const { data: types } = await getAppointmentTypes();
        let newServices = [];

        types.forEach(element => {
            newServices.push({ "label": element.type, "value": element.appointmentTypeId })
        });

        this.setState({ types: newServices });
    }

    async populateTechnicians() {
        const { data: technicians } = await getTechnicians();
        let techs = [];

        technicians.forEach(element => {
            techs.push({ "label": element.firstName + ' ' + element.lastName, "value": element.technicianId })
        });

        this.setState({ technicians: techs });
    }

    async populateApptDates() {
        const { data: dates } = await getApptDates();

        let datesTaken = [];

        dates.forEach((date) => {
            datesTaken.push(moment(date).format('MMMM Do YYYY, h:mm'))
        })
        this.setState({ datesTaken })
    }

    async componentDidMount() {
        await this.populateAppointmentTypes();
        await this.populateTechnicians();
        await this.populateApptDates();
    }

    async doSubmit() {
        const data = { ...this.state.data };
        const services = this.state.data.services;
        let newServices = [];
        let appointment = {};
        const errors = { ...this.state.errors };

        if (!services) {
            errors.services = 'Please select a service'
            this.setState({ errors });
            return;
        }

        let customer = { "firstName": data.firstName, "lastName": data.lastName, "phone": data.phone, "email": data.email };
        let customerReq = await postCustomer(customer);
        customerReq = customerReq.request.response;
        let customerId = JSON.parse(customerReq).customerId;

        services.forEach(service => {
            if (!newServices.includes(service.value))
                newServices.push(service.value);
        });

        data['services'] = newServices;

        newServices.forEach(appt => {
            appointment = {
                "customerId": customerId,
                "technicianId": data.technician,
                "AppointmenttypeId": appt,
                "date": data.dateTime,
                "confirmed": data.confirmed,
                "appointmentNumber": data.appointmentNumber,
                "comments": data.comments
            };
            postAppt(appointment);
        })

        this.props.history.push("/requested?apptNum=" + appointment.appointmentNumber);

    }

    render() {
        return (
            <div className="container" id="contain">
                <div className="row">
                    <div className="col container">
                        <h3>Business Hours</h3>
                        <p>Mon - Sat: 8:30am - 6:30pm</p>
                        <p>Sunday: 11:00am - 4pm</p>
                    </div>
                    <div className="col">
                        <h1>Schedule Appointment</h1><br />
                        <div className="container">
                            <h3>Enter contact information</h3>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row row-cols-2">
                                    <div className="col">{this.renderInput('firstName', 'First Name')}</div>
                                    <div className="col">{this.renderInput('lastName', 'Last Name')}</div>
                                    <div className="col">{this.renderPhoneInput('phone', 'Phone')}</div>
                                    <div className="col">{this.renderInput('email', 'Email')}</div>
                                </div>
                                <h3>Enter service information</h3>
                                <div className="row row-cols-2">
                                    <div className="col">{this.renderMultiSelect('services', 'Services', this.state.types, this.state.data.services)}</div>
                                    <div className="col">{this.renderDatePicker('dateTime', 'Date', this.state.datesTaken)}</div>
                                    <div className="col">{this.renderSelect('technician', 'Technician', this.state.technicians)}</div>
                                    <div className="col">{this.renderInput('comments', 'Comments', 'textarea')}</div>
                                </div>
                                {this.renderButton('Submit')}
                            </form>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        )
    };
}

export default ScheduleAppointment;