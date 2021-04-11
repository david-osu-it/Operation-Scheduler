import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {
    state = {
        data: { username: "", password: "" },
        errors: {}
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    async doSubmit() {
        try {
            const { data } = this.state;
            await auth.login(data.username, data.password);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/view-appts';
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.error = error.response.data.message;
                this.setState({ errors });
            }
        }
    }

    render() {
        const error = this.state.errors.error
        if (auth.getCurrentAdmin()) return <Redirect to="/" />
        return (
            <div className="container">
                <h1>Login</h1>
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div >
        )
    };
}

export default LoginForm;