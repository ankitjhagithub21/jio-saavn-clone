import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SongItem from '../components/SongItem'
import {setCurrentSong } from '../slices/songSlice'
import { useDispatch } from 'react-redux'
const AlbumDetails = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [album, setAlbum] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await fetch(`https://saavn.me/albums?id=${id}`)
                const { data } = await res.json()
                setAlbum(data)
                const currSong = data.songs[0]
                const songInfo = {
                    id: currSong.id,
                    name: currSong.name.split('(')[0],
                    artists: currSong.primaryArtists,
                    audioUrl: currSong.downloadUrl[4].link,
                    image: currSong.image[2].link,
                    duration: currSong.duration,

                }
                dispatch(setCurrentSong(songInfo))
                
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
               
            }
        }
        fetchAlbum()
    }, [id])

    if (loading) {
        return <p>Loading....</p>
    }

    return (
        <section>
            <div className="container py-5">
                <div className='row py-5'>
                    <div className="col-md-4">
                        <img src={album.image[2].link} alt={album.name} className='img-fluid rounded' />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-center">
                        <h2 className='mt-3'>{album.name}</h2>
                        <p className='fs-5'>By {album.primaryArtists}</p>
                        <p className='fs-5'>{album.songCount} songs</p>

                    </div>
                </div>
                <h2 className='fs-4'>Song List</h2>
                <div className="row px-2 py-5">

                    {
                        album.songs.map((song) => {
                            return <SongItem key={song.id} song={song} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default AlbumDetails