import React from 'react'
import { useState,useEffect } from 'react'
import AlbumCategory from '../components/AlbumCategory'
const Home = () => {
    const [albums,setAlbums] = useState([])
    const [trending,setTrending] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const fetchData = async() =>{
           try{
            const res = await fetch("https://saavn.me/modules?language=hindi");
            const {data} = await res.json();
            setAlbums(data.albums)
            setTrending(data.trending.albums)
            setLoading(false)
           }catch(error){
            console.error(error)
            setLoading(false)
           }    
        }
        fetchData()
    },[])

    if(loading){
        return <p>Loading...</p>
    }
  return (
    <section>
       <AlbumCategory title="Trending Now" albums={albums}/>
       <AlbumCategory title="New Releases" albums={trending}/>
    </section>
  )
}

export default Home