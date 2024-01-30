import React from 'react'
import Album from './Album'

const AlbumCategory = ({title,albums}) => {
  return (
    <div className='container py-5 my-5'>
      <h2 className='mb-3'>{title}</h2>
      <div className="row">
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