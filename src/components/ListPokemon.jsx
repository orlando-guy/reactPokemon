import React, { useEffect } from 'react'
import axios from 'axios'
import { SERVER } from '../constant'

const ListPokemon = () => {
    useEffect(() => {
        axios.get(SERVER)
            .then((response) => {console.log(response)})
            .catch((e) => {console.log('Error: ' + e.message)})
    })

    
    return (
        <div>ListPokemon</div>
    )
}

export default ListPokemon