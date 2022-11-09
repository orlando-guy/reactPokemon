import React from 'react'

const SearchBar = ({pokemons}) => {
  return (
    <form>
        <label for="searchPokemons" class="form-label">Datalist example</label>
        <input class="form-control" list="datalistOptions" id="searchPokemons" placeholder="Type pokemon name to search..." />
        <datalist id="datalistOptions">
            <option value="San Francisco" />
        </datalist>
    </form>
  )
}

export default SearchBar