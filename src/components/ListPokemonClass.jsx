import axios from 'axios'
import React from 'react'
import { SERVER } from '../constant'
import { heartEmpty, heartFull } from '../assets'
import { toogleAppreciation, getFavorites } from "../redux";
import { useDispatch, useSelector } from 'react-redux';

function inJectComponent (Component, name, url) {
    const InjectedPokemon = (props) => {
        const dispatch = useDispatch();
        const currentFavorites = useSelector(getFavorites);
        props = {...props, dispatch: dispatch, favoriteStored: currentFavorites}
        return <Component {...props} name={name} url={url}  />
    }
    return <InjectedPokemon />;
}

class Pokemon extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            pokemon: {
                name: this.props.name,
                url: this.props.url,
                avatar: '',
                loved: false
            },
            loading: true,
        };
        this.toogleAppraciateButton = this.toogleAppraciateButton.bind(this)
        this.handleClick = this.handleClick.bind(this)
        // console.log(props.favoriteStored)
        this.favPoke = this.props.favoriteStored.find((f) => f.name === this.state.pokemon.name )
        this.favPoke && (this.state.pokemon.loved = true)
        // if (this.favPoke) {
        //     console.log(this.favPoke)
        //     // this.state.pokemon.loved = true
        // }
        
    }
    handleClick() {
        this.setState({
            ...this.state,
            pokemon: {...this.state.pokemon, loved: !this.state.pokemon.loved}
        })
        // this.setState((data) => {data.pokemon['loved'] = !data.pokemon.loved})
        this.props.dispatch(toogleAppreciation(this.state.pokemon))
    }

    toogleAppraciateButton () {
        const {loved} = this.state.pokemon
        return loved ? heartFull : heartEmpty;
    }

    componentDidMount() {
        axios.get(this.props.url)
            .then((response) => {
                this.setState({ pokemon: { ...this.state.pokemon, avatar: response.data.sprites.other.dream_world.front_default} , loading: false})
            })
            .catch((e) => {
                console.error('Error: ' + e.message)
            })
    }

    render() {
        const {name, avatar} = this.state.pokemon
        const button = this.toogleAppraciateButton()
        return <div className="card col-12 col-md-3 col-lg-5 me-3 mt-3 bg-gradient-black text-white border-none animation-top" style={{ width: "20rem" }}>
            <div className='px-3 pt-2 position-relative'>
                {!this.state.loading && <img src={avatar} className="card-img-top w-100 h-100" alt="pokemon avatar" />}
                {this.state.loading && 'loading...'}
            </div>

            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Some quick example text to describe on the pokemon and make up the bulk of the card's content.</p>
                <div className='d-flex justify-content-between flex-row align-items-center'>
                    <a href={'/pokemon/' + name} className="btn btn-primary col-7">Voir plus</a>
                    <div className='p-3 col-3 rounded-circle bg-white'><img src={button} className="w-100 cursor-pointer" alt="appreciation button" onClick={this.handleClick} /></div>
                </div>
            </div>
        </div>
    }
}

class ListPokemonClass extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listPokemon: {},
            fullfields: false
        }
        this.server = SERVER + '?limit=12'
    }

    componentDidMount() {
        axios.get(this.server)
            .then((response) => {
                this.setState({ listPokemon: response.data.results, fullfields: true })
            })
            .catch((e) => { console.log('Error: ' + e.message) })
    }

    render() {

        if (this.state.fullfields) {
            return <div className='container overflow-hidden mt-5 pt-3'>
                {/* <div className="search-bar my-4 mx-4">

                </div> */}
                <div className='row px-5 py-3'>
                    {this.state.listPokemon.map((v, k) => {
                        return inJectComponent(Pokemon, v.name, v.url);
                        // return <Pokemon {...v} key={k} />
                    })}
                </div>
            </div>
        } else {
            return "Hello world !"
        }

    }
}

export default ListPokemonClass