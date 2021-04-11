import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ admin }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Flora Nails & Spa</Link>
            {!admin &&
                <React.Fragment>
                    <Link className="nav-link" to="/schedule-appointment">Schedule Appointment</Link>
                    <Link className="nav-link" to="/appt-confirm">View Appointment Status</Link>
                </React.Fragment>
            }
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {admin &&
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/view-appts">View Appts</NavLink>
                            </li>
                            {admin.role === 'Admin' &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/view-admins">Admins</NavLink>
                                </li>
                            }
                            <li className="nav-item">
                                <a className="nav-link" href="/view-admins">{admin.name}</a>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                            </li>
                        </React.Fragment>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;