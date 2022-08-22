import React from 'react'
import ProtectedNav from './ProtectedNav'
import axios from 'axios'
import { useEffect, useState } from 'react'



const Protected = () => {
    
    const [user, setUser] = useState ('') 

    useEffect(()=>{

        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }

        axios.get('http://localhost:8000/api/protected', config)
            .then(response => {
                setUser(response.data.greeting)
            }, err => {
                console.log(err)
            })
    })
    
    return(
        <div>        
            <ProtectedNav />
            <div className="container space">
                <div className="content">
                    <h1>Welcome To your Dashboard</h1>
                    <p>{user}</p>
                    <p>Your Dashboard is now accessible after  authorization</p>
                </div>
            </div>
        </div>
    )
}

export default Protected;