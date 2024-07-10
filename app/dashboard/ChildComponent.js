'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ChildComponent = () => {

    const [Data, setData] = useState([])

    useEffect(() => {
        if(Data.length === 0){
            axios.get('http://localhost:8050/api/all-users').then(res=>{
                setData(res.data)
            })
        }
        
    }, [Data])
    

  return (
    <>
                <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">

            <thead>
                <tr>
                    <td class="px-6 py-3 text-start text-xs font-medium text-white uppercase">Name</td>
                    <td class="px-6 py-3 text-start text-xs font-medium text-white uppercase">Email</td>
                </tr>
            </thead>
            <tbody>
                {
                    Data.length > 0 && Data.map((item, i)=>{
                        return (
<tr key={i}>
                    <td class="px-6 py-3 text-start text-xs font-medium text-white uppercase"> {item.name}</td>
                    <td class="px-6 py-3 text-start text-xs font-medium text-white uppercase"> {item.email}</td>
                </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    </>
  )
}

export default ChildComponent