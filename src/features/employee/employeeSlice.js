import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import apiEmployee from '../../api/employee';
import { deleteParticipation } from '../participation/participationSlice';

// CRUD Operations
// READ
export const fetchEmployes = createAsyncThunk(
    'employes/fetchEmployes',
    async()=>{
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await apiEmployee.get('/');
        return response.data;
    }
);
// CREATE
export const addEmployee = createAsyncThunk(
    'employes/addEmployee',
    async (employee) => {
        const response = await apiEmployee.post('/',employee);
        return response.data
    }
);
// UPDATE
export const updateEmployee = createAsyncThunk(
    'employes/updateEmployee',
    async (employee) => {
        const response = await apiEmployee.put(`/${employee.id}`, employee);
        return response.data;

    }
);
//DELETE
export const deleteEmployee = createAsyncThunk(
    'employes/deleteEmployee',
    async (id, { dispatch, getState }) => {
        await apiEmployee.delete(`/${id}`);

        const allParticipations = getState().participations.participations;

        const toDelete = allParticipations.filter(p => String(p.idemp) === String(id));

        toDelete.forEach(p => dispatch(deleteParticipation(p.id)));

        return id;
    }
);




// Slice
const employeeSlice = createSlice({
    name:'employes',
    initialState:{
        employes:[],
        loading:false,
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
            // FETCH
            .addCase(fetchEmployes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployes.fulfilled, (state, action) => {
                state.loading = false;
                state.employes = action.payload;
            })
            .addCase(fetchEmployes.rejected, (state) => {
                state.loading = false;
            })
            // ADD
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employes.push(action.payload);
            })
            // UPDATE
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.employes.findIndex(
                    (employee) => employee.id === action.payload.id
                );
                if(index !== -1){
                    state.employes[index] = action.payload;
                }
            })
            // DELETE
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employes = state.employes.filter(
                    (employee) => employee.id !== action.payload
                );  
            });
    },
});

export default employeeSlice.reducer;