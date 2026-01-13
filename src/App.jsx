import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeList from "./components/EmployeeList"
import FormationList from "./components/formationList"
import Sidebar from './components/Sidebar';
import ParticipationList from './components/ParticipationList';
import Statistics from './components/Statistics';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  return (
    <>
    <ToastContainer position="top-center" autoClose={3000} />
        <BrowserRouter>
            <div className="d-flex">
                <Sidebar />
                
                <div className="flex-grow-1 bg-light p-4" style={{ maxHeight: '100vh', overflowY: 'auto', overflowX:'hidden' }}>

                    <Routes>
                        <Route path="/" element={<Navigate to="/formations" />} />
                        <Route path="/employees" element={<EmployeeList />} />
                        <Route path="/formations" element={<FormationList />} />
                        <Route path="/participations" element={<ParticipationList />} />
                        <Route path="/statistics" element={<Statistics />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    </>
  )
}

export default App



