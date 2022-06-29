import React, { useState } from "react"
import Navbar from "./Navbar";
import {Link} from 'react-router-dom'
import {Navigate} from 'react-router-dom'
import axios from "axios";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loggedIn, setLoggedin] = useState(false)

    const handleEmail = (e) => {
        setEmail(e.target.value)
        
    };

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const toggleEye = () => {
      setShowPassword(prevState => !prevState)
    }

    const SubmitForm = (e) => {
        e.preventDefault()

        const signin = {
            email:`${email}`,
            password: `${password}`
        }

        axios.post('http://localhost:8000/api/login', signin)
            .then(response => {
              if (response.data.success === true ){
                setLoggedin(true)
              } else {
                setErrorMsg(response.data.message)
              }
            })
    }

    return(
      loggedIn ? <Navigate to="/protected" /> :
      <div>
        <Navbar />
        <div className="container pt-5 pb-5">
          <div className="row mx-auto justify-content-center align-items-center flex-column">
            <div className="col-lg-6">
              <h1 className="fs-3 text-center">Login</h1>
              <h4 className="text-center text-danger d-flex justify-content-center align-items-center fs-6">{errorMsg}</h4>
              <div className="card mt-2 mb-5 form-div">
                <div className="card-body">
                  <form onSubmit={SubmitForm}>
                    <div className="form-group">
                      <label className="mb-2 fs-6">Email Address</label>
                      <input 
                      className="form-control mb-3" 
                      type="email" 
                      name="email" 
                      placeholder="Email Address" 
                      value={email}
                      onChange={handleEmail}
                      />
                    </div>
                    

                    <div className="form-group">
                      <label className="mb-2 fs-6">Password</label>
                      <input className="form-control mb-4" 
                      type={
                        showPassword ? "text" : "password"
                      } 
                      name="password"  
                      placeholder="Your Password" 
                      onChange={handlePassword}
                      value={password}
                      />
                      <span className="password-toggle-icon" onClick={toggleEye}>
                        {
                          showPassword ? <AiOutlineEyeInvisible /> : 
                          <AiOutlineEye />
                        }
                      </span>
                    </div>

                    <div className="form-group mb-3">
                      <input className="btn btn-primary" type="submit" value="Log in" />
                    </div>
                  </form>
                </div>
                <h6 className="text-center">Don't have an account?<Link to="/signup" style={{textDecoration: 'none'}}> Sign Up</Link></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};


export default Login;