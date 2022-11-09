import './App.css';
import {
  // createBrowserRouter,
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
// import ListPokemon from './components/ListPokemon';
import ListPokemonClass from './components/ListPokemonClass';
import PokemonDescription from './components/PokemonDescription';
import { Provider } from 'react-redux';
import { store } from './redux'
import NavBar from './components/NavBar';
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <ListPokemonClass />
//   },
//   {
//     path: '/pokemon/:pokemonId',
//     element: <PokemonDescription />
//   }
// ])

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className='background-primary'>
          <NavBar />
          <Routes>
            <Route path='/' exact element={<ListPokemonClass />} />
            <Route path='/pokemon/:id' element={<PokemonDescription />} />
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
