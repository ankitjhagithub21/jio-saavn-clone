import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { setCurrentSong } from '../slices/songSlice'
import { useDispatch } from 'react-redux'

const SongItem = ({ song }) => {
    const dispatch = useDispatch()
    const handleClick = async(id) =>{
       try{

        const res = await fetch(`https://saavn.me/songs?id=${id}`)
        const {data} = await res.json()
        const songInfo = data[0]
        const currSong = {
            id: songInfo.id,
            name: songInfo.name.split('(')[0],
            artists: songInfo.primaryArtists,
            audioUrl: songInfo.downloadUrl[4].link,
            image: songInfo.image[2].link,
            duration: songInfo.duration,
        }
        
        dispatch(setCurrentSong(currSong))
       }catch(error){
        console.error(error)
       }
    }
    return (
        <div className='my-3 p-3 rounded bg-light song-item  border'>
       <span onClick={()=>handleClick(song.id)}><FaPlay/></span>     {song.name} 
        </div>
    )
}

export default SongItem