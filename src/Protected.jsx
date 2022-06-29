import React from 'react'
import ProtectedNav from './ProtectedNav'


const Protected = () => {

    return(
        <div>        
            <ProtectedNav />
            <div className="container space">
                <div className="content">
                    <h1>Welcome To your Dashboard</h1>
                    <p>Your Dashboard is now accessible after  authorization</p>
                </div>
            </div>
        </div>
    )
}

export default Protected;