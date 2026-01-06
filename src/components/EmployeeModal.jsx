import { useEffect, useState } from "react";

export default function EmployeeModal({ show, handleClose, handleSave, initialData }){
    const [formData, setFormData] = useState({
        nom: "",
        grade: "",
        sexe: "m",
        salaire: ""
    });
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                nom: "",
                grade: "",
                sexe: "m",
                salaire: ""
            });
        }   
    }, [initialData, show]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData);
    };

    if (!show) return null; 

    return (

        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header">
                        <h5 className="modal-title font-monospace">{initialData ? "Modifier Employé" : "Ajouter Employé"}</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body p-4">
                            <div className="mb-3">
                                <label className="form-label">Nom</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="nom" 
                                    value={formData.nom} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">État</label>
                                <select 
                                    className="form-select mb-3 shadow-sm" 
                                    name="grade" 
                                    value={formData.grade} 
                                    onChange={handleChange}
                                >
                                    <option value="programmée">Technicien</option>
                                    <option value="encours">Ingenieur</option>
                                    <option value="terminée">Doctor</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">État</label>
                                <select 
                                    className="form-select mb-3 shadow-sm" 
                                    name="sexe" 
                                    value={formData.sexe} 
                                    onChange={handleChange}
                                >
                                    <option value="m">Masculain</option>
                                    <option value="f">Feminin</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Salaire</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="salaire" 
                                    value={formData.salaire} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Annuler</button>
                            <button type="submit" className="btn btn-success">{initialData ? "Modifier" : "Ajouter"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}