import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const savedState = localStorage.getItem('sidebarCollapsed');
        return savedState === 'true';
    });

    const toggleSidebar = () => {
        setIsCollapsed(prev => {
            const newState = !prev;
            localStorage.setItem('sidebarCollapsed', newState); 
            return newState;
        });
    };

    const navItems = [
        { path: "/formations", icon: "bi-book-half", label: "Formations" },
        { path: "/employees", icon: "bi-people-fill", label: "Employees" },
        { path: "/participations", icon: "bi-person-check-fill", label: "Participation" },
        { path: "/statistics", icon: "bi-graph-up-arrow", label: "Statistics" }
    ];

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark shadow" 
             style={{ 
                 width: isCollapsed ? '80px' : '250px',
                 minHeight: '100vh',
                 transition: 'all 0.3s ease',
                 whiteSpace: 'nowrap' 
             }}>
            
            
            <div className={`d-flex align-items-center ${isCollapsed ? 'justify-content-center' : 'ps-2'} mb-4`}>
                <div className="d-flex align-items-center">
                    <i className="bi bi-speedometer2 text-white fs-2"></i> 
                    
                    <div style={{
                        opacity: isCollapsed ? 0 : 1,
                        width: isCollapsed ? 0 : 'auto',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                    }}>
                        <span className="fs-5 fw-bold ms-2">Gestion Formation</span>
                    </div>
                </div>
            </div>
            
            <hr className="text-secondary my-2" />
            
            
            <ul className="nav nav-pills flex-column mb-auto mt-3 text-start">
                {navItems.map((item, index) => (
                    <li className="nav-item mb-2" key={index}>
                        <NavLink 
                            to={item.path} 
                            title={isCollapsed ? item.label : ""}
                            className={({ isActive }) => `nav-link text-white d-flex align-items-center ${isCollapsed ? 'justify-content-center px-1' : 'px-3'} ${isActive ? 'active bg-primary shadow' : ''}`}
                            style={{ overflow: 'hidden', transition: 'all 0.2s' }}
                        >
                            <i className={`bi ${item.icon} fs-5`}></i>
                            
                            <span 
                                className="ms-3"
                                style={{
                                    opacity: isCollapsed ? 0 : 1,
                                    display: isCollapsed ? 'none' : 'block', 
                                    transition: 'opacity 0.3s ease'
                                }}
                            >
                                {item.label}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
            
            <hr className="text-secondary mt-auto" />
            <div className="d-flex justify-content-center w-100 pb-2">
                <button 
                    onClick={toggleSidebar} 
                    className="btn bg-white d-flex align-items-center justify-content-center shadow-sm"
                    style={{
                        width: '32px',
                        height: '32px',
                        padding: 0,
                        borderRadius: '50%',
                        border: 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <i className={`bi ${isCollapsed ? 'bi-arrow-right-short' : 'bi-arrow-left-short'} text-dark fs-4`}></i>
                </button>
            </div>
        </div>
    );
}


