import { createSlice } from '@reduxjs/toolkit'

export const songSlice = createSlice({
  name: 'song',
  initialState: {
    value: null,
    isPlaying:false,
  },
  reducers: {
    setCurrentSong: (state,action) => {
        
       if(state.value==null){
        state.value=action.payload
       
       }else{
        if(state.value.id!==action.payload){
          state.value=action.payload
       }
       }
             
      },
      togglePlayPause: (state,action) => {
        state.isPlaying = action.payload
      },
      
  },
})


export const { setCurrentSong, togglePlayPause } = songSlice.actions

export default songSlice.reducer