import React from 'react';
import DateFnsUtils from "@date-io/date-fns"; // import
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const DateTP = ({ name, label, error, datesTaken, ...rest }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} className="form-group">

            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <DateTimePicker
                    {...rest}
                    name={name}
                    id={name}
                    className="form-control"
                    disablePast
                    minutesStep={30}
                />
                {<p className="italic">30 minute appointments only</p>}
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </MuiPickersUtilsProvider>
    );
}

export default DateTP;