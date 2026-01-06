import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spiner from "./spinner";
import Paginnation from "./paginnation";
import ParticipationModal from "./ParticipationModal"; 
import DeleteConfirmed from "./DeleteConfirmed";
import { fetchEmployes } from "../features/employee/employeeSlice";
import { fetchFormations } from "../features/formation/formationSlice";
import { fetchParticipations, addParticipation, deleteParticipation, updateParticipation } from "../features/participation/participationSlice";
import { toast } from "react-toastify";

export default function ParticipationList() {
    const dispatch = useDispatch();
    const { participations = [], loading: partLoading } = useSelector((state) => state.participations);
    const { employes = [], loading: empLoading } = useSelector((state) => state.employes);
    const { formations = [], loading: formLoading } = useSelector((state) => state.formations);

    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedFormation, setSelectedFormation] = useState('');

    // search
    const [searchEmp, setSearchEmp] = useState('');
    const [searchForm, setSearchForm] = useState('');

    // pagination
    const savePage = localStorage.getItem('participationCurrentPage') ? Number(localStorage.getItem('participationCurrentPage')) : 1;
    const [currentPage, setCurrentPage] = useState(savePage);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstitem = indexOfLastItem - itemsPerPage;
    const filteredParticipations = participations.filter(p => {
    const emp = employes.find(e => String(e.id) === String(p.idemp));
    const form = formations.find(f => String(f.id) === String(p.idform));
    
    const matchEmp = emp?.nom.toLowerCase().includes(searchEmp.toLowerCase());
    const matchForm = form?.Sujet.toLowerCase().includes(searchForm.toLowerCase());
    
    return matchEmp && matchForm;
});

    const currentParticipations = filteredParticipations.slice(indexOfFirstitem, indexOfLastItem);

    // Modal delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [participationToDelete, setParticipationToDelete] = useState(null);

    // Modale  
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleOpenAdd = () => {
        setIsEdit(false);
        setSelectedEmployee('');
        setSelectedFormation('');
        setShowModal(true);
    };

    const handleOpenEdit = (p) => {
        setIsEdit(true);
        setEditId(p.id);
        setSelectedEmployee(p.idemp);
        setSelectedFormation(p.idform);
        setShowModal(true);
    };

    useEffect(() => {
        dispatch(fetchFormations());
        dispatch(fetchEmployes());
        dispatch(fetchParticipations());
    }, [dispatch]);


    useEffect(() => {
        localStorage.setItem('participationCurrentPage', currentPage);
    }, [currentPage]);

    useEffect(() => {
        const totalPages = Math.ceil(participations.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }   
    }, [currentPage, participations.length, itemsPerPage]);
    
    const handleSave = () => {
    if (!selectedEmployee || !selectedFormation) return alert("Remplir les champs!");
    if (!isEdit) {
        const alreadyExists = participations.find(
            p => String(p.idemp) === String(selectedEmployee) && 
                 String(p.idform) === String(selectedFormation)
        );

        if (alreadyExists) {
            toast.error("Cette inscription existe déjà !");
            return; 
        }
    }
    const data = { idemp: selectedEmployee, idform: selectedFormation };
    if (isEdit) {
        dispatch(updateParticipation({ id: editId, ...data }));
        toast.success("Inscription modifiée avec succès !");
    } else {
        dispatch(addParticipation(data));
        toast.success("Inscription ajoutée avec succès !");
    }
    setShowModal(false);
};

    // delete logic
    const handleOpenDelete = (p) => {
        setParticipationToDelete(p); 
        setShowDeleteModal(true);    
    };

    const confirmDelete = () => {
        if (participationToDelete) {
            dispatch(deleteParticipation(participationToDelete.id));
            toast.success("Inscription supprimée avec succès !");
            setShowDeleteModal(false);
            setParticipationToDelete(null);
        }
    };
    

    
    if (partLoading || empLoading || formLoading) {
        return <Spiner />;
    }

    return (
        <div className="container mt-5">
          <div className="card border-0 shadow-sm">  
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h4 className="mb-0 fw-bold"><span className="text-primary">Liste des Inscriptions: </span> <span style={{fontWeight:"normal"}}>({participations.length} inscriptions)</span></h4>
                <button className="btn btn-primary shadow" onClick={handleOpenAdd}>
                    <i className="bi bi-plus-lg me-2"></i>Ajouter
                </button>
            </div>

           
            <ParticipationModal 
                show={showModal} onClose={() => setShowModal(false)}
                employes={employes} formations={formations}
                selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee}
                selectedFormation={selectedFormation} setSelectedFormation={setSelectedFormation}
                onConfirm={handleSave} isEdit={isEdit}
            />

            <DeleteConfirmed 
                show={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                item="la participation"
                itemName={
                    participationToDelete ? 
                    `${employes.find(e => String(e.id) === String(participationToDelete.idemp))?.nom} 
                     dans 
                     ${formations.find(f => String(f.id) === String(participationToDelete.idform))?.Sujet}` 
                    : ""
                }
            />

            {/* Search Inputs */}
            <div className="row mb-3 g-2">
                <div className="col-md-5">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Filtrer par nom employé..." 
                        value={searchEmp}
                        onChange={(e) => setSearchEmp(e.target.value)}
                    />
                </div>
                <div className="col-md-5">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Filtrer par sujet formation..." 
                        value={searchForm}
                        onChange={(e) => setSearchForm(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    {/*Réinitialiser */}
                <button className="btn btn-outline-secondary" onClick={() => {
                        setSearchEmp(""); 
                        setSearchForm("");
                    }} title="Réinitialiser">
                                <i className="bi bi-arrow-clockwise"></i>
                </button>
                </div>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-dark">
                            <tr className="text-center">
                                <th>Employé</th>
                                <th>Formation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentParticipations.map((p, index) => {
                                const emp = employes.find(e => String(e.id) === String(p.idemp));
                                const form = formations.find(f => String(f.id) === String(p.idform));
                                const key = p.id ? p.id : `part-${index}`;

                                return (
                                    <tr key={key} className="text-center">
                                        <td >{emp?.nom}</td>
                                        <td>{form?.Sujet}</td>
                                        <td>
                                            <button className="btn btn-outline-primary btn-sm mx-2"
                                             onClick={() => handleOpenEdit(p)}
                                             title="Modifier Inscription">
                                                <i className="bi bi-pencil-fill"></i> 
                                            </button>
                                            <button 
                                                className="btn btn-outline-danger btn-sm" 
                                                onClick={() => handleOpenDelete(p)}
                                            >
                                                <i className="bi bi-trash3"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                </div>
                {/*Paginnation */}
                <div className="mt-5">
                    <Paginnation 
                        totalItems={participations.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                    />
                </div>
            </div>
        </div>
    );
}