import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiFormation from '../../api/formation';
import { deleteParticipation } from '../participation/participationSlice';

// CRUD Operations

// GET 
export const fetchFormations = createAsyncThunk(
    'formations/fetchFormations',
    async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await apiFormation.get('/');
        return response.data;
    }
);
// CREATE
export const addFormation = createAsyncThunk(
    'formations/addFormation',          
    async (formation) => {
        const response = await apiFormation.post('/', formation);
        return response.data;
    }  
);
// UPDATE
export const updateFormation = createAsyncThunk(
    'formations/updateFormation',   
    async (formation) => {
        const response = await apiFormation.put(`/${formation.id}`, formation);
        return response.data;
    }   
);
// DELETE
export const deleteFormation = createAsyncThunk(
    'formations/deleteFormation',
    async (id, { dispatch, getState }) => {
        await apiFormation.delete(`/${id}`);

        const allParticipations = getState().participations.participations;

        const toDelete = allParticipations.filter(p => String(p.idform) === String(id));
        toDelete.forEach(p => dispatch(deleteParticipation(p.id)));

        return id;
    }
);





const formationSlice = createSlice({
    name: 'formations',
    initialState: { 
        formations: [], 
        loading: false, 
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            // FETCH        
            .addCase(fetchFormations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFormations.fulfilled, (state, action) => {
                state.loading = false;
                state.formations = action.payload;
            })
            .addCase(fetchFormations.rejected, (state) => {
                state.loading = false;
            })
            // ADD
            .addCase(addFormation.fulfilled, (state, action) => {
                state.formations.push(action.payload);
            })  
            // UPDATE
            .addCase(updateFormation.fulfilled, (state, action) => {
                const index = state.formations.findIndex(   
                    (formation) => formation.id === action.payload.id
                );
                if (index !== -1) {
                    state.formations[index] = action.payload;
                }
            })
            // DELETE
            .addCase(deleteFormation.fulfilled, (state, action) => {
                state.formations = state.formations.filter( 
                    (formation) => formation.id !== action.payload
                );
            });
    },
});


export default formationSlice.reducer;