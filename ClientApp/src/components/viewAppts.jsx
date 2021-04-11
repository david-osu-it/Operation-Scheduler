import React from "react";
import Form from './common/form';
import { getAppointments } from '../services/apptService';
import { makeApptConfirmationNum } from '../utils/helpers';
import DataTable from 'react-data-table-component';
import moment from 'moment';


class ViewAppointments extends Form {
    state = {
        data: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            comments: "",
            dateTime: "",
            services: [],
            technician: "",
            confirmed: false,
            showed: false,
            appointmentNumber: makeApptConfirmationNum(6),
            movies: [],
            genres: [],
            currentPage: 1,
            pageSize: 4,
            searchQuery: "",
            selectedGenre: null,
            sortColumn: { path: "title", order: "asc" },
        },
        appointments: [],
        types: [],
        technicians: [],
        errors: {}
    };

    columns = [
        {
            name: 'Name',
            selector: 'customer.firstName',
            sortable: true,
            grow: 1.5,
        },
        {
            name: 'Phone #',
            selector: 'customer.phone',
            sortable: false,
            right: true,
            grow: 1.5,
        },
        {
            name: 'Technician',
            selector: 'technician.lastName',
            sortable: true,
            right: true,
        },
        {
            name: 'Type',
            selector: 'type.type',
            sortable: true,
            right: true,
        },
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
            right: true,
            grow: 1.5,
            format: row => <div>{moment(row.date).format('MM/DD/YY h:mm a')}</div>
        },
        {
            name: 'Confirmed',
            selector: 'confirmed',
            sortable: true,
            right: true,
            format: row => row.confirmed === true ? <div>Yes</div> : <div>No</div>

        },
        {
            name: 'No Show',
            selector: 'showed',
            sortable: true,
            right: true,
            format: row => row.showed === true ? <div>Yes</div> : <div>No</div>

        },
        {
            name: 'Appointment#',
            selector: 'appointmentNumber',
            sortable: true,
            right: true,
            grow: 1.5,
        },
        {
            name: '',
            cell: (row) => <button className="btn btn-secondary" onClick={() => { this.props.history.push("/view-appt?apptNum=" + row.appointmentNumber) }} > View</button >,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    paginationComponentOptions = {
        paginationPerPage: 10
    }

    async populateAppointments() {
        const { data: appointments } = await getAppointments();

        this.setState({ appointments });
    }

    async componentDidMount() {
        await this.populateAppointments();
    }

    render() {
        const { appointments } = this.state
        return (
            <div className="container">
                <h1>View Appointments</h1><br />
                <div className="">
                    <DataTable
                        title=""
                        columns={this.columns}
                        data={appointments}
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[5, 10, 25, 50]}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Appointments per page:',
                            rangeSeparatorText: 'out of',
                        }}
                    />
                </div>
            </div >
        )
    }
};

export default ViewAppointments;