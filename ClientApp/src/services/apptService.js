import { getJwt } from './authService';
import http from './httpService';
const apiEndpoint = "api/appointment";

let config = {
    headers: {
        'Authorization': 'Bearer ' + getJwt()
    }
}

export function getAppointmentTypes() {
    return http.get(apiEndpoint + "/types");
}

export function getAppointments() {
    return http.get(apiEndpoint, config);
}

export function getApptDates() {
    return http.get(apiEndpoint + "/date");
}

export function getAppointmentsByApptNum(apptNum) {
    return http.get(apiEndpoint + "?apptNum=" + apptNum);
}

export function postAppt(appt) {
    return http.post(apiEndpoint, appt);
}

export function updateAppt(id, appt) {
    return http.put(apiEndpoint + "/" + id, appt, config);
}

export function deleteAppt(id) {
    return http.delete(apiEndpoint + "/" + id, config);
}