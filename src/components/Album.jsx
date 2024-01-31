import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setCurrentSong } from '../slices/songSlice'
import { useDispatch } from 'react-redux'
const Album = ({ id,name,image,type }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = async() =>{
        if(type=='album'){
            navigate(`/albums/${id}`)
        }else{
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
        
    }
    return (
        <div className="p-2 album" onClick={handleClick}>
            <img src={image} alt={name} className='img-fluid rounded' />
            <h5 className='text-center'>{name.split('(')[0]}</h5>
        </div>
    )
}

export default Album