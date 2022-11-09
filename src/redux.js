import { configureStore, createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        favorites: [],
    },

    reducers: {
        toogleAppreciation: (state, action) => {

            const poke = state.favorites.find((v) => v.name === action.payload.name)
            if (poke !== undefined) {
                state.favorites = state.favorites.filter((p) => p.name !== poke.name)
                console.log('retirer')
            } else {
                state.favorites.push(action.payload)
                console.log('augmenté')
            }
        }
    }
})

export const { toogleAppreciation } = pokemonSlice.actions
export const getFavorites = (state) => state.pokemon.favorites

export const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer
    }
})