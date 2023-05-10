import React from 'react'
import AddTaskSharpIcon from '@mui/icons-material/AddTaskSharp';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';
import { useContext } from 'react';

function Header() {
  const useAppstate= useContext(Appstate)
  return (
    <div  className=' sticky z-10 top-0 header  text-3xl flex justify-between items-center font-bold text-red-500 p-4 border-b-2 border-gray-500' >
      <Link to={'/'}><span>Cine<span className='text-white'>phile</span></span></Link >
      { 
      useAppstate.login ? 
      
          <Link to={'/addmovies'}><h3 className='text-white cursor-pointer text-xl flex items-center'>
          <Button><AddTaskSharpIcon className='mr-1 text-white'/>
         <span className='text-white'>Add New</span> </Button></h3></Link>
        
        :
        <Link to={'/login'}><h3 className='text-white cursor-pointer text-xl flex items-center'>
        <Button><LoginIcon className='mr-1 text-white'/>
        <span className='text-white text-2xl '>Login</span> </Button></h3></Link>

      }        
    </div>
  )
}

export default Header