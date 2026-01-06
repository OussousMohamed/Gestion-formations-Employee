import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark shadow" 
             style={{ width: '220px', minHeight: '100vh' }}>
            
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <i className="bi bi-speedometer2 me-2 fs-5"></i> 
                <span className="fs-10">Gestion Formations</span>  
            </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <NavLink to="/formations" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        <i className="bi bi-book-half me-2"></i>
                        Formations
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/employees" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        <i className="bi bi-people-fill me-2"></i>
                        Employees
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/participations" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        <i className="bi bi-person-check-fill me-2"></i>
                        Participation
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/statistics" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        <i className="bi bi-graph-up-arrow me-2"></i>
                        Statistics
                    </NavLink>
                </li>
            </ul>
            <hr />
            <div className="text-muted small text-center">© 2026 Admin</div>
        </div>
    );
}