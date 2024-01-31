import React from 'react'
import Album from './Album'

const AlbumCategory = ({title,albums}) => {
  return (
    <div className='container my-5'>
      <h2 className='mb-3'>{title}</h2>
      <div className="album-container">
       
       {
          albums.map((album)=>{
            return <Album key={album.id} id={album.id} name={album.name} image={album.image[2].link} type='album' />
          })
        }
       
      </div>
    </div>
  )
}

export default AlbumCategory