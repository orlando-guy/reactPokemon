import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { SERVER } from '../constant'

const PokemonDescription = () => {
    const [pokemonDescription, setDescription] = React.useState({
        description: '',
        fullfield: false
    })

    const { id } = useParams()
    const server = SERVER + '/' + id

    const getData = React.useCallback(async () => {
        const { data } = await axios.get(server);
        setDescription({ description: data, fullfield: true });
    }, [server])

    React.useEffect(() => {
        getData()
    }, [])


    if (pokemonDescription.fullfield) {
        console.log(pokemonDescription.description)
        const { sprites, name, abilities } = pokemonDescription.description
        return <div className="container py-3">
            <div className="card mb-3 shadow" style={{maxWidth: "540px", backgroundColor: '#1a1a26'}}>
                <div className="row align-items-center">
                    <div className="col-md-4 ps-3">
                        <img src={sprites.other.dream_world.front_default} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <div className='row justify-content-center align-items-center'><span className='badge rounded-pill text-bg-success'>Poké-Body</span>
                            {abilities.map((v, k) => {
                                return <div className="d-flex flex-column flex-sm-row" key={k}>
                                    <h4 className="">{v.ability.name}</h4>
                                </div>
                            })}</div>
                            <p className="card-text"></p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    return (
        <div>Pokemon descriptions</div>
    )

}

export default PokemonDescription