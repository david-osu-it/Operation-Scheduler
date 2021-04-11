import { getJwt } from './authService';
import http from './httpService';
const apiEndpoint = "api/admins";

let config = {
    headers: {
        'Authorization': 'Bearer ' + getJwt()
    }
}

export function postAdmin(admin) {
    return http.post(apiEndpoint, admin, config);
}

export function getAdmins() {
    return http.get(apiEndpoint, config);
}

export function getAdmin(id) {
    return http.get(apiEndpoint + "/" + id, config);
}

export function deleteAdmin(id) {
    return http.delete(apiEndpoint + "/" + id, config);
}