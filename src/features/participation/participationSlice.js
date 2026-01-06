import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import apiParticipation from '../../api/participation';

// CRUD Operation
// GET
export const fetchParticipations = createAsyncThunk(
    'participations/fetchParticipation',
    async () => {
        const response = await apiParticipation.get(`/`);
        return response.data;
    }
);

// ADD
export const addParticipation = createAsyncThunk(
    'participations/addParticipation',
    async (newParticipation) => {
        const response = await apiParticipation.post('/', newParticipation);   
        return response.data;
    }
);

// Update
export const updateParticipation = createAsyncThunk(
    'participations/updateParticipation',
    async (participation) => {
        const response = await apiParticipation.put(`/${participation.id}`, participation);
        return response.data;
    }
);

// DELETE
export const deleteParticipation = createAsyncThunk(
    'participations/deleteParticipation',
    async (id) => {
        await apiParticipation.delete(`/${id}`);
        return id
    }
);

const participationSlice = createSlice({
    name:'participations',
    initialState:{
        participations:[],
        loading:false,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            // get
            .addCase(fetchParticipations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchParticipations.fulfilled, (state, action) => {
                state.loading = false;
                state.participations = action.payload;
            })
            .addCase(fetchParticipations.rejected, (state) => {
                state.loading = false;
            })
            // add
            .addCase(addParticipation.fulfilled, (state, action) => {
                state.participations.push(action.payload);
            })
            // update
            .addCase(updateParticipation.fulfilled, (state, action) => {
                const index = state.participations.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.participations[index] = action.payload;
                }
            })
            // delete
            .addCase(deleteParticipation.fulfilled, (state, action) => {
                state.participations = state.participations.filter(
                    (p) => p.id !== action.payload
                );
            })
    }
})

export default participationSlice.reducer;