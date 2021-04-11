import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getAppointmentTypes, postAppt, getApptDates } from '../services/apptService';
import { getTechnicians } from '../services/techService';
import { makeApptConfirmationNum } from '../utils/helpers';
import { postCustomer } from '../services/customerService';
import moment from "moment";
import queryString from 'query-string';

class Requested extends Form {
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
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    };

    // apptNum = this.props.match.params.id;
    apptNum = queryString.parse(this.props.location.search).apptNum


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

    }

    render() {
        return (
            <div className="container">
                <h1>Requested Appointment</h1><br />
                <p>Your appointment request has been submitted. Your appointment number is <b>{this.apptNum}</b></p>
                <p>Please save your appointment number to view the status of the appointment request.</p>
                <p>Please go <a href="/appt-confirm">here</a> a day before your appointment to check if it has been confirmed.</p>
            </div >
        )
    };
}

export default Requested;