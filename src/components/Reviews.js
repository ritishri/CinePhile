import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef ,db } from '../Firebase/Firebase';
import { addDoc , doc ,updateDoc , query , getDocs, where } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import {Appstate} from '../App';
import { useNavigate } from 'react-router-dom';


function Reviews({id,prevRating,userRated}) {
    const useAppstate=useContext(Appstate)
    const [rating,setRating]=useState(0);
    const [loading,setLoading]=useState(false)
    const [form,setForm]=useState("");
    const [data,setData]=useState([]);
    const [reviewsLoading,setreviewsLoading]=useState(false)
    const navigate=useNavigate();
    const [newAdd , setnewAdd]=useState(0);

    const sendReviews=async()=>{
        setLoading(true);
        try {
            if(useAppstate.login){
            await addDoc(reviewsRef,{
                movieid:id,
                name:useAppstate.userName,
                thought:form,
                rating:rating,
                timestamp:new Date().getTime()
            })

            const ref=doc(db,"movies",id);
            await updateDoc(ref,{
                rating:prevRating + rating,
                rated:userRated + 1
            })
            setRating(0);
            setForm("");
            setnewAdd(newAdd + 1);
           swal({
            title:"Review Added",
            icon:"success",
            buttons:false,
            timer:3000
           })
        }else{
            navigate('/login')
        }  
         
        } catch (error) {
            swal({
                title:error.message,
                icon:"error",
                buttons:false,
                timer:3000
               })
        }
        setLoading(false)
    }

    useEffect(()=>{
        async function getData(){
         setreviewsLoading(true)
         setData([]);
         let quer= query(reviewsRef,where('movieid', '==',id))
         const querySnapshots = await getDocs(quer)

         querySnapshots.forEach((doc)=>{
            setData((prev)=>[...prev,doc.data()])
         })


         setreviewsLoading(false)     
        }
        getData()
    },[newAdd])


  return (
    <div className='w-full mt-3 border-t-2 border-gray-700'>
        <ReactStars
            size={30}
            half={true}
            value={rating}
           onChange={(rate)=>setRating(rate)}
        />
       <input
        value={form}
        onChange={(e)=>setForm(e.target.value)}
        className='w-full header outline-none p-3'
        placeholder='Share your thoughts'
       />

       <button onClick={sendReviews} className='flex mx-auto mt-4 text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg'>
        {loading ? <TailSpin height={20} color='white'/> :'Share'}</button>

        {
            reviewsLoading ?
            <div className='mt-6 flex justify-center'><ThreeDots height={10} color='white'/></div>
            :
            <div className=' border-r-5 '>
               {
                data.map((e,i)=>{
                    return(
                        <div className='bg-gray-900 mt-2 p-4' key={i}>
                            <div className='flex'>
                            <p>{e.name}</p>
                            <p className='ml-4'>{new Date(e.timestamp).toLocaleString()}</p>
                            </div>
                            <ReactStars
                              size={20}
                              half={true}
                              value={e.rating}
                              edit={false}
                            />
                            
                            <p>{e.thought}</p>
                        </div>
                    )
                })
               }
            </div>
        }
    </div>
  )
}

export default Reviews