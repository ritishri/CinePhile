import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';
import { ThreeDots } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore';
import { moviesRef } from '../Firebase/Firebase';
import { Link } from 'react-router-dom';

function Cards() {

  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    async function getData(){
      setLoading(true)
      const _data=await getDocs(moviesRef);
      _data.forEach((doc)=>{
        setData((prv)=>[...prv,{...(doc.data()),id:doc.id}])
      })

      setLoading(false)
    }
    getData()
  },[])
  return (
    <div className='flex flex-wrap justify-between px-3 mt-3 '>
      {loading ? <div className='w-full flex justify-center items-center    h-400'> <ThreeDots height={600} color='white'/></div>:
        data.map((e,i)=>{
          return(
            <Link to={`/detail/${e.id}`}><div key={i} className='card font-medium  mt-7 shadow-lg hover:-translate-y-3 cursor-pointer transition-all duration-500'>
            <img className='h-60 md:h-80 w-200 ' src={e.image}/>
            <h1>{e.title}</h1>
            <h1 className='flex items-center mr-1'>Rating: <ReactStars
              size={20}
              half={true}
              value={e.rating/e.rated}
              edit={false}
            />
            </h1>
            <h1>Year: {e.year}</h1>
          </div></Link>
          )
        })
      }
    </div>
  )
}

export default Cards