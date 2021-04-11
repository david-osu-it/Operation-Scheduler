import http from './httpService';
const apiEndpoint = "api/technician";

export function getTechnicians() {
    return http.get(apiEndpoint);
}