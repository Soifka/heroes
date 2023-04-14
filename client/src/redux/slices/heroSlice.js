import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api';
import CONSTANTS from '../../constants';

const SLICE_NAME = 'heroes';

const getHeroes = createAsyncThunk(
    `${SLICE_NAME}/getHeroes`,
    async(pageNumber = 0, thunkAPI) => {
        try {
            const limit = CONSTANTS.itemsPerPage;
            const offset = pageNumber * limit;
            const {data: {data: superheroes, totalHeroesCount}} = await API.getHeroes(limit, offset);
            return {superheroes, totalHeroesCount};
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const deleteHero = createAsyncThunk(`${SLICE_NAME}/deleteHero`, 
    async(superheroId, thunkAPI) => {
        try {
            await API.deleteHero(superheroId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const deletePower = createAsyncThunk(`${SLICE_NAME}/deletePower`,
    async({superheroId, powerId}, thunkAPI) => {
        try {
            await API.deletePower(superheroId, powerId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const addPower = createAsyncThunk(`${SLICE_NAME}/addPower`,
    async({superheroId, powerName}, thunkAPI) => {
        try {
            await API.addPower(superheroId, powerName);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const editHero = createAsyncThunk(`${SLICE_NAME}/editHero`,
    async({superheroId, values}, thunkAPI) => {
        try {
            await API.editHero(superheroId, values);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const deleteImage = createAsyncThunk(`${SLICE_NAME}/deleteImage`,
    async({superheroId, imageId}, thunkAPI) => {
        try {
            await API.deleteImage(superheroId, imageId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const addImage = createAsyncThunk(`${SLICE_NAME}/addImage`,
    async({superheroId, formData}, thunkAPI) => {
        console.log([...formData.entries()]);
        try {
            await fetch(`http://localhost:5000/api/superheroes/${superheroId}/images`, {
                method:'POST',
                body: formData
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const addHero = createAsyncThunk(`${SLICE_NAME}/addHero`,
    async(superhero, thunkAPI) => {
        try {
            await API.addHero(superhero);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    heroes: [],
    isLoading: false,
    error: null,
    totalHeroesCount: 0
};

const heroSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getHeroes.pending, (state, action) => {
            state.error = null;
            state.isLoading = true;
        });
        builder.addCase(getHeroes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.heroes = action.payload.superheroes;
            state.totalHeroesCount = action.payload.totalHeroesCount;
        });
        builder.addCase(getHeroes.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(deleteHero.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteHero.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteHero.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(deletePower.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deletePower.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deletePower.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(addPower.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addPower.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(addPower.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(editHero.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(editHero.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(editHero.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(deleteImage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteImage.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteImage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(addImage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addImage.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(addImage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(addHero.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addHero.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(addHero.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})

const { reducer } = heroSlice;

export { getHeroes, deleteHero, deletePower, addPower, editHero, deleteImage, addImage, addHero };

export default reducer;