import React, { useState, useEffect } from "react";

export default function FormationModal({ show, handleClose, handleSave, initialData }) {
    const [formData, setFormData] = useState({
        Sujet: "",
        datedebut: "",
        datefin: "",
        etat: "programmée"
    });

    useEffect(() => {
    if (initialData) {
        setFormData({
            ...initialData,
            datedebut: initialData.datedebut,
            datefin: initialData.datefin
        });
    } else {
        setFormData({
            Sujet: "",
            datedebut: "",
            datefin: "",
            etat: "programmée"
        });
    }
}, [initialData, show]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSave = {
        ...formData,
        datedebut: formData.datedebut,
        datefin: formData.datefin
    };

    handleSave(dataToSave);
};

    if (!show) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">{initialData ? "Modifier Formation" : "Ajouter Formation"}</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body p-4">
                            <div className="mb-3">
                                <label className="form-label">Sujet</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="Sujet" 
                                    value={formData.Sujet} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date Début</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    name="datedebut" 
                                    value={formData.datedebut} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date Fin</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    name="datefin" 
                                    value={formData.datefin} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">État</label>
                                <select 
                                    className="form-select" 
                                    name="etat" 
                                    value={formData.etat} 
                                    onChange={handleChange}
                                >
                                    <option value="programmée">Programmée</option>
                                    <option value="encours">En cours</option>
                                    <option value="terminée">Terminée</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Annuler</button>
                            <button type="submit" className="btn btn-primary">{initialData ? "Modifier" : "Ajouter"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
