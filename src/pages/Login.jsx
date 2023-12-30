import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useSignIn } from 'react-auth-kit'
import "../css/login.css";
import { Navigate } from 'react-router-dom';

export default function Login() {

    const addActiveClass = () => {
        document.querySelector("#container").classList.toggle('active');
    }
    const removeActiveClass = () => {
        document.querySelector("#container").classList.remove('active');
    }

  const {
    register,
    reset,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmitRegister = (dataRegister) => {

        const resgiterData = JSON.stringify(dataRegister)
        const signIn = useSignIn()

        axios.post("http://localhost:8081/api/v1/auth/register", 
                  resgiterData,
                  {headers: {'content-Type': 'application/json'}}
                  )
              .then(response => {
                if(response.status === 200){ 
                    if(signIn(
                        {
                            token:    response.data.token,
                            expiresIn:response.data.expiresIn,
                            tokenType: "Bearer",
                            authState: response.data.authUserState
                        }
                    )){
                        toast.success("blaaan")
                        Navigate("/")
                    }
                    else {
                        toast.success("mabaaanch")
                    }
                }
                               
              })
              
  }

  /*const onSubmitLogin = (dataLogin) => {
    const loginData = JSON.stringify(dataLogin)
    axios.post("http://localhost:8081/api/v1/auth/login", 
              loginData,
              {headers: {'content-Type': 'application/json'}}
              )
          .then(response => {
                      response?.status === 200 && toast.success("Connectée !")
                      console.log(response.data)
                    
          })
          .catch(errors => {
             toast.error(errors.error)
          })
}*/

  return (
    
    <div className="container" id="container">

    <div className="form-container sign-up">
        <form onSubmit={handleSubmit(onSubmitRegister)}>
            <h1>Create Account</h1>
            <div className="social-icons">
                <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registeration</span>
            <input type="text"
                   {...register('name')} 
                   placeholder="Name" 
                />

            <input type="mail"
                   {...register('email')}  
                   placeholder="Email" 
                />

            <input type="password" 
                   {...register('password')} 
                   placeholder="Password" 
                />
            <button>Sign Up</button>
        </form>
    </div>
    <div className="form-container sign-in">
        <form>
            <h1>Sign In</h1>
            <div className="social-icons">
                <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forget Your Password?</a>
            <button>Sign In</button>
        </form>
    </div>
    <div className="toggle-container">
        <div className="toggle">
            <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button className="hidden" id="login" onClick={removeActiveClass}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>Register with your personal details to use all of site features</p>
                <button className="hidden" id="registerr" onClick={addActiveClass}>Sign Up</button>
            </div>
        </div>
    </div>
</div>

  )
}