import { configureStore } from '@reduxjs/toolkit';
import formationReducer from '../features/formation/formationSlice';
import employeeReducer from '../features/employee/employeeSlice';
import participationReducer from '../features/participation/participationSlice';
const store = configureStore({
    reducer: {
        formations: formationReducer,
        employes: employeeReducer,
        participations: participationReducer,
    },
});

export default store;