import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import moment from "moment";
import { getAppointmentsByApptNum } from '../services/apptService';
import _ from 'lodash';

class ApptConfirm extends Form {
    state = {
        data: {
            appointmentNumber: ""
        },
        errors: {},
        appointment: {}
    };

    schema = {
        appointmentNumber: Joi.string().required().min(5).max(10).label("Please enter your appointment number")
    };


    async doSubmit() {
        const data = { ...this.state.data };
        const errors = { ...this.state };
        let { data: appointment } = await getAppointmentsByApptNum(data.appointmentNumber);
        let services = []

        if (_.isEmpty(appointment)) {
            errors['notFound'] = 'Appointment not found';
            this.setState({ errors, appointment: {} })
            return
        }

        appointment.forEach((appt) => {
            let confirmed = appt.confirmed.toString();
            services.push(appt.type.type);
            appointment = {
                name: appt.customer.firstName,
                date: moment(appt.date).format('MM/DD/YY h:mm a'),
                technician: appt.technician.firstName + ' ' + appt.technician.lastName,
                services: services.join(', '),
                appointmentNumber: data.appointmentNumber,
                confirmed: confirmed.charAt(0).toUpperCase() + confirmed.slice(1)
            }
        })

        this.setState({ appointment, errors: {} })
    }

    render() {
        const { appointment, errors } = this.state;
        return (
            <div className="container ">
                {_.isEmpty(appointment) &&
                    <form onSubmit={this.handleSubmit}>
                        <h1>View Appointment Confirmation</h1><br />
                        <div className="row">
                            <div className="col">
                                {this.renderInput('appointmentNumber', 'Please enter your appointment number')}
                                {!_.isEmpty(errors) && <div className="alert alert-danger">Appointment not found</div>}
                            </div>
                            <div className="col">
                            </div>
                        </div>
                        {this.renderButton("Submit", "btn btn-primary")}
                    </form>
                }
                {!_.isEmpty(appointment) &&

                    <div className="row">
                        <div className="col">
                            <div className="card" >
                                <div className="card-body">
                                    <h5 className="card-title">Appointment #{appointment.appointmentNumber}</h5>
                                    <p className="card-text">Confirmed: {appointment.confirmed}</p>
                                    <p className="card-text">Name: {appointment.name}</p>
                                    <p className="card-text">Date: {appointment.date}</p>
                                    <p className="card-text">Services: {appointment.services}</p>
                                    <p className="card-text">Technician: {appointment.technician}</p>
                                </div>
                            </div >
                        </div>
                        <div className="col">
                        </div>
                    </div>
                }
            </div>
        )
    };
}

export default ApptConfirm;