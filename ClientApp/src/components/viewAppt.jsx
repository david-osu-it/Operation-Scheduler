import React from "react";
import Form from './common/form';
import Joi from 'joi-browser';
import { deleteAppt, getAppointmentsByApptNum, getAppointmentTypes, getApptDates, updateAppt } from '../services/apptService';
import { getTechnicians } from '../services/techService';
import moment from "moment";
import queryString from 'query-string';
import { updateCustomer } from "../services/customerService";

class ViewAppt extends Form {
    state = {
        data: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            comments: "",
            dateTime: "",
            services: [],
            technician: '',
            confirmed: "",
            showed: "",
            appointmentNumber: "",
            appointmentId: [],
            customerId: "",
            load: false,
            isDateTaken: false
        },
        types: [],
        technicians: [],
        errors: {},
        appt: [],
        datesTaken: []
    };

    schema = {
        customerId: Joi.number(),
        appointmentId: Joi.array(),
        appointmentNumber: Joi.string(),
        confirmed: Joi.boolean(),
        showed: Joi.boolean(),
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

    async populateAppointment() {
        const apptNum = queryString.parse(this.props.location.search).apptNum
        const { data: appt } = await getAppointmentsByApptNum(apptNum);
        this.setState({ data: this.mapToViewModel(appt) })
    }

    async populateApptDates() {
        const { data: dates } = await getApptDates();

        let datesTaken = [];

        dates.forEach((date) => {
            datesTaken.push(moment(date).format('MMMM Do YYYY, h:mm'))
        })
        this.setState({ datesTaken })
    }

    mapToViewModel(appt) {
        let appointmentId = []
        let services = [];
        appt.forEach((a) => {
            services.push({ "label": a.type.type, "value": a.type.appointmentTypeId })
            appointmentId.push(a.appointmentId);
        })

        return {
            customerId: appt[0].customer.customerId,
            firstName: appt[0].customer.firstName.substr(0, appt[0].customer.firstName.indexOf(' ')),
            lastName: appt[0].customer.lastName,
            phone: appt[0].customer.phone,
            email: appt[0].customer.email,
            comments: appt[0].comments ? appt[0].comments : "",
            dateTime: appt[0].date,
            confirmed: appt[0].confirmed,
            showed: appt[0].showed,
            appointmentNumber: appt[0].appointmentNumber,
            technician: appt[0].technician.technicianId.toString(),
            services,
            appointmentId
        };
    }

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

    async componentDidMount() {
        await this.populateAppointment();
        await this.populateApptDates();
        await this.populateTechnicians();
        await this.populateAppointmentTypes();
    }

    deleteAppointments() {
        const data = { ...this.state.data };
        data.load = true
        this.setState({ data })
        this.state.data.appointmentId.forEach((a) => {
            deleteAppt(a)
        })

        setTimeout((() => {
            data.load = false
            this.props.history.push("/view-appts");
        }), 3000);

    }

    async doSubmit() {
        const data = { ...this.state.data };
        data.load = true
        this.setState({ data })

        const customer = { firstName: data.firstName, lastName: data.lastName, phone: data.phone, email: data.email };
        updateCustomer(data.customerId, customer);

        let appointment = {}
        data.appointmentId.forEach((id, i) => {
            appointment = {
                appointmentId: data.appointmentId[i],
                customerId: data.customerId,
                technicianId: parseInt(data.technician),
                appointmentTypeId: data.services[i].value,
                date: data.dateTime,
                confirmed: data.confirmed,
                showed: data.showed,
                appointmentNumber: data.appointmentNumber,
                comments: data.comments
            }
            updateAppt(id, appointment);
        })

        setTimeout((() => {
            data.load = false
            this.setState({ data });
        }), 3000)
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className={this.state.data.load ? "blur" : ""}>
                        <h3>Contact information</h3>
                        <div className="row row-cols-2">
                            <div className="col">{this.renderInput('firstName', 'First Name')}</div>
                            <div className="col">{this.renderInput('lastName', 'Last Name')}</div>
                            <div className="col">{this.renderInput('phone', 'Phone')}</div>
                            <div className="col">{this.renderInput('email', 'Email')}</div>
                        </div>
                    </div>
                    <div className={this.state.data.load ? "col loader" : "col hidden"}>{this.renderLoader()}</div>
                    <div className={this.state.data.load ? "blur" : ""}>

                        <h3>Service information</h3>
                        <div className="row row-cols-2">
                            <div className="col">{this.renderMultiSelect('services', 'Services', this.state.types, this.state.data.services)}</div>
                            <div className="col">{this.renderDatePicker('dateTime', 'Date', this.state.datesTaken)}</div>
                            <div className="col">{this.renderSelect('technician', 'Technician', this.state.technicians)}</div>
                            <div className="col">{this.renderInput('comments', 'Comments', 'textarea')}</div>
                            <div className="col">{this.renderCheckbox('confirmed', 'Confirmed', this.state.data.confirmed)}</div>
                            <div className="col">{this.renderCheckbox('showed', 'No Show', this.state.data.showed)}</div>
                        </div>
                        <br />
                        {this.renderButton('Update')}
                        <button type='button' className='btn btn-danger delete' onClick={() => this.deleteAppointments()}>Delete</ button >
                    </div>
                </form>
            </div>
        )
    };
}

export default ViewAppt;