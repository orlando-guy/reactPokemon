import React from 'react'
import { useSelector } from 'react-redux'
import { heartFull } from '../assets'

const NavBar = React.memo(() => {
  const poke = useSelector((state) => state.pokemon.favorites)
  return (
    <nav className='py-3 px-4 navbar navbar-expand-lg navbar-dark w-100 bg-dark d-flex justify-content-between align-items-center position-fixed top-0' style={{ zIndex: 5 }}>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      <div className="favorite col-3 col-md-2 relative pr-0">
        <div className='d-flex justify-content-end'>
          <img src={heartFull} className="rounded-circle bg-light p-2" width="25%" height="auto" alt="" />
          <div className='position-absolute bottom-0 end-0 translate-middle bg-danger rounded-circle text-center' style={{ width: "22px" }}><small className='text-white'>{poke.length}</small></div>
        </div>
      </div>
    </nav>
  )
})

export default NavBar