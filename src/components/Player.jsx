import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useEffect, useState } from 'react';
import { FaDownload, FaPlay } from 'react-icons/fa';
import { GiPauseButton } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5';
import { togglePlayPause } from '../slices/songSlice';

const Player = () => {
    const dispatch = useDispatch()
    const song = useSelector((state) => state.song.value)
    const isPlaying = useSelector((state) => state.song.isPlaying)
    const audioRef = useRef(new Audio());
    const [count, setCount] = useState(0);
    useEffect(() => {
        const handlePlay = async () => {
            try {
                if (song) {
                    audioRef.current.src = song.audioUrl;
                    await audioRef.current.load(); // Load the new audio source
                    await audioRef.current.play(); // Play after loading
                    setCount(0);
                    dispatch(togglePlayPause(true))

                }
            } catch (error) {
                console.error('Error playing audio:', error);

            }
        };


        handlePlay();

    }, [song]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
            dispatch(togglePlayPause(false));
        } else {
            audioRef.current.play();
            dispatch(togglePlayPause(true));
        }

    };
    useEffect(() => {
        let timer;

        if (isPlaying) {
            timer = setInterval(() => {
                if (count < song.duration) {
                    setCount(count => count + 1);
                } else {
                    setCount(0)
                    dispatch(togglePlayPause(false));
                }
            }, 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);

            }
        };
    }, [count, song.duration, isPlaying]);

    const handleDownload = async () => {
        try {
            const response = await fetch(song.audioUrl);
            const blob = await response.blob();

            // Create a temporary link element
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${song.name}.mp3`;

            // Append the link to the document
            document.body.appendChild(link);

            // Trigger a click event on the link
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };



    return (
        <div className='fixed-bottom bg-light'>

            <div className='w-100 '>
                <progress value={count} max={song.duration} className='w-100'></progress>
            </div>

            <div className='player '>

                <div className='d-flex justify-content-start align-items-center gap-2 col-lg-4'>
                    <img src={song.image} alt={song.name} className='img-fluid rounded' width={50} />
                    <div className='d-flex flex-column justify-content-center align-items-start'>
                        <span className='fw-medium'>{song.name}</span>
                        <span>{song.artists.split(',')[0]}</span>
                    </div>
                </div>
                <div className='col-lg-4 d-flex align-items-center justify-content-center gap-3'>
                    <IoPlaySkipBack size={30} className='hide' />
                    <button onClick={handlePlayPause} className='btn fs-5'>{isPlaying ? <GiPauseButton /> : <FaPlay />}</button>
                    <IoPlaySkipForward size={30} className='hide' />
                </div>
                <div className='col-lg-4 d-flex align-items-center justify-content-end'>
                    <span className='text-md hide'>{formatTime(count)}/{formatTime(song.duration)}</span>
                    <button className='btn' onClick={handleDownload}>
                        <FaDownload size={25} />
                    </button>

                </div>
            </div>

        </div>
    )
}

export default Player