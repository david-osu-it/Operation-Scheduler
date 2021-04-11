import http from './httpService';
import { getJwt } from './authService';
const apiEndpoint = "api/customer";

let config = {
    headers: {
        'Authorization': 'Bearer ' + getJwt()
    }
}

export function postCustomer(customer) {
    return http.post(apiEndpoint, customer);
}

export function updateCustomer(id, customer) {
    return http.put(apiEndpoint + "/" + id, customer, config);
}