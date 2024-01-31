import React, { useState } from 'react'
import Album from './Album'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const [query, setQuery] = useState('')

  const [results, setResults] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(`https://saavn.me/search/all?query=${query}`)
    const { data } = await res.json()
    console.log(data.songs.results)
    setResults(data.songs.results)
    setQuery('')

  }
  return (
    <header className='border-bottom bg-light fixed-top'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to={"/"} className='text-decoration-none fs-5'>
            <img src="/logo.png" alt="logo" width={40} className='imf-fluid' />
            <span>Jio Saavn</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <form onSubmit={handleSubmit}>
              <input type="search" className='form-control' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search' required />
            </form>
          </div>
        </div>
      </nav>


      {results && <div className='result text-white'>
        {
          results.map((result) => {
            return <Album key={result.id} id={result.id} name={result.title} image={result.image[2].link} type='song' />
          })
        }
        <button className='btn btn-info close-btn' onClick={() => setResults(null)}>X</button>
      </div>}
    </header>
  )
}

export default Navbar