import http from './httpService';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));
const apiEndpoint = "api/admins/authenticate";

export async function login(username, password) {
    const { data: currentUser } = await http.post(apiEndpoint, { username, password });
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    currentUserSubject.next(currentUser);
}

export function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export function getCurrentAdmin() {
    return currentUserSubject.value
}

export function getJwt() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.token : '';
}

export default {
    login,
    logout,
    getCurrentAdmin,
    getJwt
}