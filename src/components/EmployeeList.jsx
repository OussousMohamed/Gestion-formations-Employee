import { useDispatch, useSelector } from "react-redux";
import Spiner from "./spinner";
import Paginnation from "./paginnation";
import { useEffect, useState } from "react";
import { fetchEmployes, addEmployee, updateEmployee, deleteEmployee } from "../features/employee/employeeSlice";
import EmployeeModal from "./EmployeeModal";
import DeleteConfirmed from "./DeleteConfirmed";
import { toast } from "react-toastify";


export default function EmployeeList(){
    const dispatch = useDispatch();
    const employes = useSelector((state) => state.employes.employes);
    const loading = useSelector((state) => state.employes.loading);


    // State Filtering
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSexe, setFilterSexe] = useState("all");
    const [filterGrade, setFilterGrade] = useState("all");
    const [minSalaire, setMinSalaire] = useState("");
    const [maxSalaire, setMaxSalaire] = useState("");
    // filtrage 


    // State Paginnation
    const savePage = localStorage.getItem('employeeCurrentPage') ? Number(localStorage.getItem('employeeCurrentPage')) : 1;
    const [currentPage, setCurrentPage] = useState(savePage);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstitem = indexOfLastItem - itemsPerPage;
    // Appliquer les filtres
    const filteredEmployes = employes.filter((emp) => {
    const matchesName = emp.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSexe = filterSexe === "all" || emp.sexe === filterSexe;
    const matchesGrade = filterGrade === "all" || emp.grade === filterGrade;
    const matchesMinSal = minSalaire === "" || Number(emp.salaire) >= Number(minSalaire);
    const matchesMaxSal = maxSalaire === "" || Number(emp.salaire) <= Number(maxSalaire);

    return matchesName && matchesSexe && matchesGrade && matchesMinSal && matchesMaxSal;
});
    const currentEmployes = filteredEmployes.slice(indexOfFirstitem, indexOfLastItem);

    // Modal
    const [showFormModal, setShowFormModal] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    
    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployeeName, setSelectedEmployeeName] = useState(null);
    const [selectedId, setSelectedId] = useState(null);


    const handleAddClick = () => {
        setEditingEmployee(null);
        setShowFormModal(true);
    }

    const handleUpdateClick = (employee) => {
        setEditingEmployee(employee);
        setShowFormModal(true);
    }

    const handleDeleteClick = (id, employeeName) => {
        setSelectedId(id);
        setSelectedEmployeeName(employeeName);
        setShowDeleteModal(true);
    }

    const handleConfirmeddelete = () => {
        dispatch(deleteEmployee(selectedId));
        toast.success("Employé supprimé avec succès !");
        setShowDeleteModal(false);
    }

    const handleSaveEmployee = (formData) => {
        if(editingEmployee){
            dispatch(updateEmployee({...formData, id: editingEmployee.id}));
            toast.success("Employé modifié avec succès !");
        }else{
            const maxId = employes.length > 0 ? Math.max(...employes.map(e => Number(e.id))) : 0;
            const newId = maxId + 1;
            const newid = newId.toString();
            dispatch(addEmployee({...formData, id: newid}));
            toast.success("Employé ajouté avec succès !");
        }   
        setShowFormModal(false);
    }

    useEffect(() => {
        dispatch(fetchEmployes());
    }, [dispatch]);


    useEffect(() => {
        localStorage.setItem('employeeCurrentPage', currentPage);
    }, [currentPage]);

    useEffect(() => {
        const totalPages = Math.ceil(employes.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }   
    }, [currentPage, employes.length, itemsPerPage]);


    if(loading){
        return <Spiner />
    }

    return (
        <div className="container-fluid mt-5">
            <div className="card border-0 shadow-sm">

            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h4 className="mb-0 fw-bold"><span className="text-primary">Liste des Employes: </span> <span style={{fontWeight:"normal"}}>({employes.length} employes)</span> </h4>
                <button className="btn btn-primary btn-sm px-3" onClick={handleAddClick}>
                    <i className="bi bi-plus-lg me-1"></i> Ajouter
                </button>
           </div>

            <DeleteConfirmed 
                show={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmeddelete}
                itemName={selectedEmployeeName}
            />

            <EmployeeModal 
                show={showFormModal}
                handleClose={() => setShowFormModal(false)}
                handleSave={handleSaveEmployee}
                initialData={editingEmployee}   
            />

            {/*Box Filtrage */}
            <div className="card-body bg-light border-bottom">
                <div className="row g-3">
                    {/* filter par nom */}
                    <div className="col-md-3">
                        <div className="input-group">
                            <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control" placeholder="Rechercher par nom..." 
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                    </div>

                    {/* filter par sexe */}
                    <div className="col-md-2">
                        <select className="form-select" value={filterSexe} onChange={(e) => setFilterSexe(e.target.value)}>
                            <option value="all">Tous les Sexes</option>
                            <option value="m">Masculin</option>
                            <option value="f">Féminin</option>
                        </select>
                    </div>

                    {/* filter par Grade */}
                    <div className="col-md-2">
                        <select className="form-select" value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)}>
                            <option value="all">Tous les Grades</option>
                            <option value="Ingénieur">Ingénieur</option>
                            <option value="Technicien">Technicien</option>
                            <option value="Administrateur">Administrateur</option>
                        </select>
                    </div>

                    {/* filter par Salaire */}
                    <div className="col-md-5">
                        <div className="input-group">
                            <span className="input-group-text">Salaire (Min/Max)</span>
                            <input type="number" className="form-control" placeholder="Min" 
                                value={minSalaire} onChange={(e) => setMinSalaire(e.target.value)} />
                            <input type="number" className="form-control" placeholder="Max" 
                                value={maxSalaire} onChange={(e) => setMaxSalaire(e.target.value)} />
                            {/*Réinitialiser */}
                            <button className="btn btn-outline-secondary" onClick={() => {
                                setSearchTerm(""); setFilterSexe("all"); setFilterGrade("all");
                                setMinSalaire(""); setMaxSalaire("");
                            }} title="Réinitialiser">
                                <i className="bi bi-arrow-clockwise"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*-------------------------- */}

          <div className="card-body">  
            <table className="table table-hover align-middle shadow-sm rounded">
                <thead className="table-dark">
                    <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Sexe</th>
                        <th scope="col">Salaire</th>
                        <th colSpan={2} scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployes.map((employee) => (
                        <tr key={employee.id} className="text-center">
                            <td>{employee.id}</td>
                            <td>{employee.nom}</td>
                            <td>{employee.grade}</td>
                            <td>{employee.sexe == 'm' ? 'Masculin' : 'Féminin'}</td>
                            <td>{employee.salaire}</td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm mx-2" 
                                  onClick={() => handleUpdateClick(employee)}
                                  title="Modifier Employee">
                                    <i className="bi bi-pencil-fill"></i> 
                                </button>
                                <button className="btn btn-outline-danger btn-sm"
                                 onClick={() => handleDeleteClick(employee.id,employee.nom)}
                                 title="Supprimer Employee">
                                    <i className="bi bi-trash3"></i> 
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
                        totalItems={filteredEmployes.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                    />
                </div>
          </div>      
        </div>
    )


}