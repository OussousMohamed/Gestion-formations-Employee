export default function ParticipationModal({ 
    show, onClose, employes, formations, 
    selectedEmployee, setSelectedEmployee, 
    selectedFormation, setSelectedFormation, 
    onConfirm, isEdit 
}) {
    if (!show) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow">
                    <div className={`modal-header`}>
                        <h5 className="modal-title">
                            {isEdit ? "Modifier l'inscription" : "Ajouter Inscription"}
                        </h5>
                        <button className="btn-close btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-4">
                        <label className="form-label fw-bold">Employé</label>
                        <select className="form-select mb-3" value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
                            <option value="">-- Choisir --</option>
                            {employes.map(e => <option key={e.id} value={e.id}>{e.nom}</option>)}
                        </select>

                        <label className="form-label fw-bold">Formation</label>
                        <select className="form-select" value={selectedFormation} onChange={(e) => setSelectedFormation(e.target.value)}>
                            <option value="">-- Choisir --</option>
                            {formations.map(f => <option key={f.id} value={f.id}>{f.Sujet}</option>)}
                        </select>
                    </div>
                    <div className="modal-footer bg-light">
                        <button className="btn btn-secondary" onClick={onClose}>Annuler</button>
                        <button className={`btn btn-success`} onClick={onConfirm}>
                            {isEdit ? "Mettre à jour" : "Confirmer"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
//----------------------------------------------------------------------------------------------
// export default function ParticipationModal({ 
//         show, 
//         onClose, 
//         employes, 
//         formations, 
//         selectedEmployee, 
//         setSelectedEmployee, 
//         selectedFormation, 
//         setSelectedFormation, 
//         onConfirm 
// }) {
//     if (!show) return null;

//     return (
//         <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//             <div className="modal-dialog modal-dialog-centered">
//                 <div className="modal-content border-0 shadow">
//                     <div className="modal-header ">
//                         <h5 className="modal-title font-monospace">S'inscrire à une formation</h5>
//                         <button className="btn-close btn-close" onClick={onClose}></button>
//                     </div>
//                     <div className="modal-body p-4">
//                         <label className="form-label">Employé</label>
//                         <select 
//                             className="form-select mb-3 shadow-sm" 
//                             value={selectedEmployee} 
//                             onChange={(e) => setSelectedEmployee(e.target.value)}
//                         >
//                             <option value="">-- Choisir un employé --</option>
//                             {employes.map(e => <option key={e.id} value={e.id}>{e.nom}</option>)}
//                         </select>

//                         <label className="form-label">Formation</label>
//                         <select 
//                             className="form-select mb-3 shadow-sm" 
//                             value={selectedFormation} 
//                             onChange={(e) => setSelectedFormation(e.target.value)}
//                         >
//                             <option value="">-- Choisir une formation --</option>
//                             {formations.map(f => <option key={f.id} value={f.id}>{f.Sujet}</option>)}
//                         </select>
//                     </div>
//                     <div className="modal-footer">
//                         <button className="btn btn-secondary px-4" onClick={onClose}>Annuler</button>
//                         <button className="btn btn-success px-4 shadow-sm" onClick={onConfirm}>Confirmer</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }