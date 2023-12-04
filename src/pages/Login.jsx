import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const {
    register,
    reset,
    handleSubmit,
    formState: {errors}
  } = useForm();

  /*const onSubmit = (dataRegister) => {
        const resgiterData = JSON.stringify(dataRegister)
        axios.post("http://localhost:8081/api/v1/auth/register", 
                  resgiterData,
                  {headers: {'content-Type': 'application/json'}}
                  )
              .then(response => {
                response?.status === 201 && toast.success("Compe créé !")
                        reset()
                        
              })
              .catch(errors => {
                 toast.error(errors.error)
              })
  }*/

  const onSubmitLogin = (dataLogin) => {
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
}

  return (
    <div className='wrapper'>
        <div className='left'>
            <div className='header'>

            </div>
            <div className='body'>
               <h1>Register</h1>     
               <div className='left'>
            <div className='form'>


                <form onSubmit={handleSubmit()}>
                  <div className='form-control'>

                    <label htmlFor='email' className='form-label'>
                      Email Adresse:
                    </label>

                    <input 
                        {...register("mail")}
                        type='text' 
                        />
                  </div>
                  <div className='form-control'>

                    <label htmlFor='email' className='form-label'>
                      Username:
                    </label>

                    <input 
                        {...register("username")}
                        type='text' 
                        />
                  </div>
                  <div className='form-control'>

                    <label htmlFor='password' className='form-label'>
                      Mot de passe:
                    </label>

                    <input 
                        {...register("assword")}
                        type='password' 
                        />
                  </div>
                  <button>Register</button>
                </form>  
            </div>
        </div>
            </div>
        </div>
        <div className='right'>
            <div className='form'>
              <h1>Login</h1>


                <form onSubmit={handleSubmit(onSubmitLogin)}>
                  <div className='form-control'>
                    <label htmlFor='email' className='form-label'>
                      Email Adresse:
                    </label>
                    <input {...register("email")}
                          type='text'
                      />
                  </div>
                  <div className='form-control'>
                    <label htmlFor='password' className='form-label'>
                      Mot de passe:
                    </label>
                    <input  {...register("password")}
                            type='password' 
                         />
                  </div>
                  <button>Login</button>
                </form>  
            </div>
        </div>
    </div>
  )

}

export default Login