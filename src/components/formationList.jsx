import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormations, deleteFormation, addFormation, updateFormation } from "../features/formation/formationSlice";
import Spiner from "./spinner";
import DeleteConfirmed from "./DeleteConfirmed";
import FormationModal from "./FormationModal";
import Paginnation from "./paginnation";
import { toast } from "react-toastify";

export default function FormationList(){
    const dispatch = useDispatch();
    const formations = useSelector((state) => state.formations.formations);
    const loading = useSelector((state) => state.formations.loading);


    // filtarge
    const [searchTerm, setSearchTerm] = useState("");
    const [filterEtat, setFilterEtat] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    // satate Paginnation
    const savePage = localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 1;
    const [currentPage, setCurrentPage] = useState(savePage);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstitem = indexOfLastItem - itemsPerPage;

    // Apliquer les filtres 
    const filteredFormations = formations.filter((f) => {
    const matchesName = f.Sujet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEtat = filterEtat === "all" || f.etat === filterEtat;

    
    const formationDate = new Date(f.datedebut);
    formationDate.setHours(0, 0, 0, 0);

    
    let matchesDates = true;

    if (startDate && endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        
        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);

        
        matchesDates = formationDate >= start && formationDate <= end;
    } 
    else if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        matchesDates = formationDate >= start;
    } 
    else if (endDate) {
        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);
        matchesDates = formationDate <= end;
    }

    return matchesName && matchesEtat && matchesDates;
});
    const currentFormations = filteredFormations.slice(indexOfFirstitem, indexOfLastItem);

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedFormationName, setSelectedFormationName] = useState(null); // Renamed for clarity
    const [selectedId, setSelectedId] = useState(null); 
    
    // Modal
    const [showFormModal, setShowFormModal] = useState(false);
    const [editingFormation, setEditingFormation] = useState(null);

    const handleDeleteClick = (id, formationName) => {
        setSelectedId(id);
        setSelectedFormationName(formationName);
        setShowDeleteModal(true);
    };

    const handleConfirmeddelete = () => {
        dispatch(deleteFormation(selectedId));
        toast.success("Formation supprimée avec succès !");
        setShowDeleteModal(false);
    }   

    const handleAddClick = () => {
        setEditingFormation(null);
        setShowFormModal(true);
    };

    const handleUpdateClick = (formation) => {
        setEditingFormation(formation);
        setShowFormModal(true);
    };

    const handleSaveFormation = (formData) => {
        if(editingFormation){
            dispatch(updateFormation({...formData, id: editingFormation.id}));
            toast.success("Formation modifiée avec succès !");
        }else{
            const maxId = formations.length > 0 ? Math.max(...formations.map(f => Number(f.id))) : 0;
            const newId = maxId + 1;
            const newid = newId.toString();
            dispatch(addFormation({...formData, id: newid}));
            toast.success("Formation ajoutée avec succès !");
        } 
        setShowFormModal(false);       
        
    };

    useEffect(() => {
        dispatch(fetchFormations());
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
        localStorage.setItem('currentPage', 1);
    }, [searchTerm, filterEtat, startDate, endDate]
    );

    useEffect(() => {
        const totalPages = Math.ceil(formations.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, formations.length, itemsPerPage]);

    if(loading){
        return <Spiner />;
    }

    return (
        <div className="container-fluid mt-5">
          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h4 className="mb-0 fw-bold"><span className="text-primary">Liste des Formations: </span> <span style={{fontWeight:"normal"}}>({formations.length} formations)</span> </h4>
            <button className="btn btn-primary btn-sm px-3" onClick={handleAddClick}>
                <i className="bi bi-plus-lg me-1"></i> Ajouter
            </button>
        </div>





            <DeleteConfirmed
                show={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmeddelete}
                itemName={selectedFormationName}
                item="formation"
            />

            <FormationModal 
                show={showFormModal}
                handleClose={() => setShowFormModal(false)}
                handleSave={handleSaveFormation}
                initialData={editingFormation}
            />

            {/*Box Filtrage */}
            <div className="card-body bg-light border-bottom">
                <div className="row g-3">
                    {/* Recherche par Sujet */}
                    <div className="col-md-3">
                        <div className="input-group">
                            <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control" placeholder="Sujet de la formation..." 
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                    </div>

                    {/* État de la formation */}
                    <div className="col-md-2">
                        <select className="form-select" value={filterEtat} onChange={(e) => setFilterEtat(e.target.value)}>
                            <option value="all">Tous les états</option>
                            <option value="programmée">Programmée</option>
                            <option value="encours">En cours</option>
                            <option value="terminée">Terminée</option>
                        </select>
                    </div>

                    {/* Dates  */}
                    <div className="col-md-5">
                        <div className="input-group">
                            <span className="input-group-text">Date Debut</span>
                            <input type="date" className="form-control" 
                                value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            <span className="input-group-text">Date Fin</span>
                            <input type="date" className="form-control" 
                                value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    {/* Reset */}
                    <div className="col-md-2 text-end">
                        <button className="btn btn-outline-secondary w-100" onClick={() => {
                            setSearchTerm(""); 
                            setFilterEtat("all"); 
                            setStartDate(""); 
                            setEndDate("");
                            setCurrentPage(1);
                            localStorage.setItem('currentPage', 1);
                        }}>
                            <i className="bi bi-arrow-clockwise me-1"></i> Reset
                        </button>
                    </div>
                </div>
            </div>
            {/*-------------------------- */}


          <div className="card-body">
            <table className="table table-hover align-middle shadow-sm rounded">
                <thead className="table-dark">
                    <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Sujet</th>
                        <th scope="col">Date Debut </th>
                        <th scope="col">Date Fin</th>
                        <th scope="col">Etat</th>
                        <th colSpan={2} scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentFormations.map((formation) => (
                        <tr key={formation.id} style={{textAlign:"center"}}>
                            <td>{formation.id}</td>
                            <td>{formation.Sujet}</td>
                            <td>{new Date(formation.datedebut).toLocaleDateString('fr-FR')}</td>
                            <td>{new Date(formation.datefin).toLocaleDateString('fr-FR')}</td>        
                            <td>{formation.etat}</td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm mx-2"
                                 onClick={() => handleUpdateClick(formation)}
                                 title="Modifier Formation">
                                    <i className="bi bi-pencil-fill"></i> 
                                </button>
                             
                                <button className="btn btn-outline-danger btn-sm"
                                 onClick={() => handleDeleteClick(formation.id, formation.Sujet)}
                                 title = "Supprimer Formation">
                                    <i className="bi bi-trash3-fill"></i>       
                                </button>
                            </td>
                        </tr>
                    ))}

                    
                </tbody>
            </table>
          </div>

            {/*Paginnation */}
            <div className="mt-5">
                <Paginnation 
                    totalItems={filteredFormations.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                />
            </div>
          </div>
        </div>
    );
}