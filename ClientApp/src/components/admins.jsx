import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import DataTable from 'react-data-table-component';
import { deleteAdmin, getAdmin, getAdmins, postAdmin } from '../services/adminService';
import { toast } from 'react-toastify';

class Admins extends Form {
    state = {
        data: {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            role: ""
        },
        errors: {},
        admin: auth.getCurrentAdmin(),
        admins: []
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        role: Joi.string().required().label('Role')
    };


    async populateAdmins() {
        const { data: admins } = await getAdmins();
        this.setState({ admins })
    }

    async populateAdmin(adminId) {
        const { data: admin } = await getAdmin(adminId);
        this.setState({ data: this.mapToViewModel(admin) })
    }

    mapToViewModel(admin) {
        return {
            adminId: admin.adminId,
            firstName: admin.firstName,
            lastName: admin.lastName,
            username: admin.username,
            role: admin.role,
            password: ''
        };
    }

    async componentDidMount() {
        await this.populateAdmins();
    }

    columns = [
        {
            name: 'First Name',
            selector: 'firstName',
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: 'lastName',
            sortable: true,
            right: true,
        },
        {
            name: 'Username',
            selector: 'username',
            sortable: true,
            right: true,
        },
        {
            name: 'Role',
            selector: 'role',
            sortable: true,
            right: true,
        },
        {
            name: '',
            cell: (row) => <button className="btn btn-secondary" onClick={async () => { await this.populateAdmin(row.adminId) }} > View</button >,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: '',
            cell: (row) => <button className="btn btn-danger" onClick={() => {
                deleteAdmin(row.adminId);

                setTimeout((() => {
                    this.populateAdmins();
                    toast.success('User has been deleted.');
                }), 3000)


            }
            }>Delete</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    paginationComponentOptions = {
        paginationPerPage: 10
    }

    doSubmit = async () => {
        const data = { ...this.state.data };

        try {
            let admin = { "FirstName": data.firstName, "LastName": data.lastName, "Username": data.username, "Role": data.role, "Password": data.password };
            await postAdmin(admin);
            this.populateAdmins();
            toast.success('New user has been added to the system.');
            this.setState({ data: { username: "", firstName: "", lastName: "", role: "", password: "" } })
        } catch (error) {
            this.setState({ data: { username: "", firstName: "", lastName: "", role: "", password: "" } })
            console.log(error);
        }
    }

    render() {
        let role = JSON.parse(this.state.admin).role;

        return (
            <div className="container">
                {role === 'Admin' &&
                    <div>
                        <h1>Admins</h1>
                        <div className="">
                            <DataTable
                                title=""
                                columns={this.columns}
                                data={this.state.admins}
                                pagination
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[5, 10]}
                                paginationComponentOptions={{
                                    rowsPerPageText: 'Admins per page:',
                                    rangeSeparatorText: 'out of',
                                }}
                            />
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            {this.renderInput('firstName', 'First Name')}
                            {this.renderInput('lastName', 'Last Name')}
                            {this.renderInput('username', 'Username')}
                            {this.renderInput('role', 'Role')}
                            {this.renderInput('password', 'Password', 'password')}
                            {this.renderButton('Submit')}
                        </form>
                    </div>
                }
            </div >
        )
    };
}

export default Admins;