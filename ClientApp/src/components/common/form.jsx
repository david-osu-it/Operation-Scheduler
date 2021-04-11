import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import PhoneInput from './phoneInput';
import Select from './select';
import DateTP from './datepicker';
import MSelect from './multiSelect';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import { formatPhoneNumber } from 'react-phone-number-input'
class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate() {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;

        return errors;
    }

    validateProperty({ name, value }) {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        const data = { ...this.state.data };

        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        if (input.name === 'confirmed') data['confirmed'] = !data.confirmed;
        else if (input.name === 'showed') data['showed'] = !data.showed;
        else data[input.name] = input.value

        this.setState({ data, errors });
    };

    handleMultiSelectChange = (e) => {
        const data = { ...this.state.data };
        let options = []
        for (var i = 0, l = e.length; i < l; i++) {
            if (e[i].value)
                options.push(e[i]);
        }
        options = options.filter((v, i, a) => a.findIndex(t => (t.value === v.value)) === i)
        data['services'] = options

        this.setState({ data });
    }

    handleDateTimePicker(e) {
        const data = { ...this.state.data };
        const errors = { ...this.state.errors };

        if (this.state.datesTaken.includes(moment(e).format('MMMM Do YYYY, h:mm'))) {
            errors['dateTime'] = 'This date and time is not available'
            this.setState({ errors })
            return;
        }
        data.dateTime = moment(e).format();
        data.isDateTaken = this.checkValidDate(this.state.datesTaken, moment(e).format())
        this.setState({ data, errors: [] });
    }

    handlePhoneInput(e) {
        const data = { ...this.state.data };
        data.phone = formatPhoneNumber(e)
        this.setState({ data, errors: [] });
    }

    checkValidDate(datesTaken, date) {
        return datesTaken.includes(date);
    }

    renderButton(label, classes = 'btn btn-primary') {
        return (
            <button disabled={this.validate()} className={classes} > { label}</ button >
        );
    }

    renderInput(name, label, type = 'text') {
        const { data, errors } = this.state;
        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

    renderSelect(name, label, options) {
        const { data, errors } = this.state;
        return (
            <Select
                label={label}
                name={name}
                options={options}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}
                multiple={false}
            />
        );
    }

    renderDatePicker(name, label, datesTaken) {
        const { data, errors } = this.state;
        return (
            <DateTP
                label={label}
                name={name}
                value={data[name]}
                onChange={(e) => this.handleDateTimePicker(e)}
                error={errors[name]}
                datesTaken={datesTaken}
            />
        );
    }

    renderMultiSelect(name, label, options, selected) {
        const { data, errors } = this.state;
        return (
            <MSelect
                label={label}
                name={name}
                options={options}
                value={data[name]}
                onChange={this.handleMultiSelectChange}
                error={errors[name]}
                selected={selected}
            />
        );
    }

    renderCheckbox(name, label, checked) {
        const { data } = this.state;

        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value={data[name]} id="flexCheckDefault" onChange={this.handleChange} name={name} checked={checked} />
                <label className="form-check-label" htmlFor={name}>{label}</label>
            </div>
        )
    }

    renderLoader() {
        return (
            <Spinner animation="border" />
        )
    }

    renderPhoneInput(name, label) {
        const { data, errors } = this.state;
        return (
            <PhoneInput
                name={name}
                value={data[name]}
                label={label}
                onChange={(e) => this.handlePhoneInput(e)}
                error={errors[name]}
            />
        );
    }
}

export default Form;