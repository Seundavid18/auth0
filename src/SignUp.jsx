import React, {Component} from "react";
import axios from "axios";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'


class SignUp extends Component {
    constructor(){
        super()
        this.state = {
            fullName: '',
            username: '',
            email: '',
            password: '',
            showPassword: false,
            errorMsg: ''
        }
        this.changeFullName = this.changeFullName.bind(this)
        this.changeUserName = this.changeUserName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.SubmitForm = this.SubmitForm.bind(this)
    }

    changeFullName(e){
        this.setState({
            fullName:e.target.value
        })
    }

    changeUserName(e){
        this.setState({
            username:e.target.value
        })
    }

    changeEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    changePassword(e){
        this.setState({
            password:e.target.value
        })
    }
  

    SubmitForm(e){
        e.preventDefault()

        const registered = {
            fullName: this.state.fullName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:8000/api/signup', registered)
        .then(response => {
          if (response.data.message) {
           this.setState({errorMsg: response.data.message})
          } 
        })
    }

    render() {
        return(
            <div className="container pt-5 pb-5">
            <h1 className="fs-3 text-center">Auth0</h1>
            <h6 className="fs-6 text-center">Create Your Account</h6>
            <h4 className="text-center text-danger d-flex justify-content-center align-items-center fs-6">{this.state.errorMsg}</h4>
            <div className="row mx-auto justify-content-center align-items-center flex-column">
              <div className="col-lg-6">
                <div className="card mt-2 mb-5 form-div">
                  <div className="card-body">
                    <form onSubmit={this.SubmitForm}>
                      <div className="form-group">
                        <label className="mb-2 fs-6">Full Name</label>
                        <input 
                        className="form-control mb-3" 
                        type="text" 
                        name="full-name"  
                        placeholder="Full Name"
                        onChange={this.changeFullName}
                        value={this.state.fullName} 
                        required
                        />
                      </div>

                      <div className="form-group">
                        <label className="mb-2 fs-6">Username</label>
                        <input 
                        className="form-control mb-3" 
                        type="text" 
                        name="username"  
                        placeholder="Username"
                        onChange={this.changeUserName}
                        value={this.state.username}
                        required 
                        />
                      </div>

                      <div className="form-group">
                        <label className="mb-2 fs-6">Email</label>
                        <input 
                        className="form-control mb-3" 
                        type="email" 
                        name="email"  
                        placeholder="Your Email Address"
                        onChange={this.changeEmail}
                        value={this.state.email} 
                        required
                        />
                      </div>
                      
  
                      <div className="form-group">
                        <label className="mb-2 fs-6">Password</label>
                        <input className="form-control mb-4" 
                        type={this.state.showPassword ? "text" : "password"}
                        name="password" 
                        placeholder="Your Password" 
                        onChange={this.changePassword}
                        value={this.state.password} 
                        required
                        />
                        <span className="password-toggle-icon2" onClick={() => this.setState({showPassword: !this.state.showPassword})}>
                        {
                          this.state.showPassword ? <AiOutlineEyeInvisible /> : 
                          <AiOutlineEye />
                        }
                      </span>
                      </div>
  
                      <div className="form-group mb-3">
                        <input className="btn btn-primary btn-block" type="submit" value='Sign up' />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}


export default SignUp;
