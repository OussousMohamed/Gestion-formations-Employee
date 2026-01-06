import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, CategoryScale, LinearScale, 
    BarElement, Title, Tooltip, Legend 
} from 'chart.js';
import Spiner from "./spinner";
import { fetchEmployes } from "../features/employee/employeeSlice";
import { fetchFormations } from "../features/formation/formationSlice";
import { fetchParticipations } from "../features/participation/participationSlice";
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Statistics() {
    const dispatch = useDispatch();
    const { employes, loading: empLoading } = useSelector((state) => state.employes);
    const { formations, loading: formLoading } = useSelector((state) => state.formations);
    const { participations, loading: partLoading } = useSelector((state) => state.participations);

    useEffect(() => {
        dispatch(fetchEmployes());
        dispatch(fetchFormations());
        dispatch(fetchParticipations());
    }, [dispatch]);

    const labels = employes.map(emp => emp.nom);
    const counts = employes.map(emp => 
        participations.filter(p => String(p.idemp) === String(emp.id)).length
    );

    // XLSX export function
   

    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        
        animations: {
            y: {
                easing: 'easeInOutQuart',
                duration: 1500,
                from: 0 
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 }
            }
        }
    };

    //---------------------------------------------
   
    const chartData = {
    labels: labels,
    datasets: [{
        label: 'Formations Suivies',
        data: counts,
        backgroundColor: 'rgba(13, 110, 253, 0.7)',
        borderColor: 'rgba(13, 110, 253, 1)',
        borderWidth: 2,
        borderRadius: 8,
        parsing: {
            yAxisKey: 'y'
        }
    }],
};


    
    
    
    <div style={{ position: 'relative', height: '350px' }}>
        <Bar 
            data={chartData} 
            options={options} 
        />
    </div>

    if (empLoading || formLoading || partLoading) return <Spiner />;

    return (
        <div className="container py-5">
            
            {/* 1. Header & Summary Cards */}
            <div className="row mb-4">
                <div className="col-12 mb-3">
                    <h2 className="fw-bold text-dark"><i className="bi bi-graph-up-arrow me-2 text-primary"></i>Statistics</h2>
                </div>
                
                {/* card Employee */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-primary text-white p-3 mb-3">
                        <div className="d-flex align-items-center">
                            <div className="fs-1 me-3"><i className="bi bi-people"></i></div>
                            <div>
                                <h6 className="mb-0">Employés</h6>
                                <h3 className="fw-bold mb-0">{employes.length}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* card Formation */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-success text-white p-3 mb-3">
                        <div className="d-flex align-items-center">
                            <div className="fs-1 me-3"><i className="bi bi-book"></i></div>
                            <div>
                                <h6 className="mb-0">Formations</h6>
                                <h3 className="fw-bold mb-0">{formations.length}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* card Participation */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-secondary text-white p-3 mb-3">
                        <div className="d-flex align-items-center">
                            <div className="fs-1 me-3"><i className="bi bi-check-circle"></i></div>
                            <div>
                                <h6 className="mb-0">Inscriptions</h6>
                                <h3 className="fw-bold mb-0">{participations.length}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* 2. Chart Section */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm h-100 p-4">
                        <h5 className="fw-bold mb-4 text-secondary">Répartition par Employé</h5>
                        <div style={{ position: 'relative', height: '350px' }}>
                            <Bar key={empLoading ? 'loading' : 'ready'} data={chartData} options={options} /> 
                                    
                        </div>
                    </div>
                </div>

                {/* 3. Details Feed Section */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm h-100 p-4">
                        <h5 className="fw-bold mb-4 text-secondary">Activités Récentes</h5>
                        <div className="overflow-auto" style={{ maxHeight: '350px' }}>
                            {employes.map(emp => {
                                const myParts = participations.filter(p => String(p.idemp) === String(emp.id));
                                return (
                                    <div key={emp.id} className="mb-3 p-3 rounded-3 border-start border-4 border-primary bg-light shadow-sm">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <span className="fw-bold text-dark">{emp.nom}</span>
                                            <span className="badge bg-white text-primary border border-primary">{myParts.length}</span>
                                        </div>
                                        <div className="small text-muted">
                                            {myParts.length > 0 
                                                ? myParts.map((p, idx) => (
                                                    <span key={p.id}>
                                                        {formations.find(f => String(f.id) === String(p.idform))?.Sujet}
                                                        {idx < myParts.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))
                                                : "Aucune formation"}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}