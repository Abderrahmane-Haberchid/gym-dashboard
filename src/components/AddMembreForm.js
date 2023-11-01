
import { useState, useEffect, React } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

function AddMembreForm(props) {

    const {
        register,
        handleSubmit,
        formState: {isLoading}
      } = useForm()

     // Submit add Membre Form
     const onSubmit = async (data) => {            

        const jsonData = JSON.stringify(data)
        await axios.post(`http://localhost:8081/api/v1/membres/save`, jsonData, {headers: {'Content-Type': 'application/json'}})       
        .then(response =>{
            if(response.status === 201 ) toast.success('Membre ajouté')
        })
        .catch(errors => {
            if(errors.response.status === 302) toast.error("Adresse mail déjà existante !")
            if(errors.response.status != 302) toast.error("Un problème au serveur s'est produit !")
        })
     }

     const closeForm = () =>{
        props.setDisplay(false)
     }

  return (
   
     <Offcanvas show={props.display} onHide={closeForm} placement='top' scroll="true" backdrop="true" className="offCanvas"> 
     <div className='compte-container'>
         <Offcanvas.Header closeButton>
           <Offcanvas.Title>Créer un Membre</Offcanvas.Title>
         </Offcanvas.Header>
        <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
             <div className='photo-div mb-3'>
             <label className='form-label' htmlFor="profile-photo">
                 Photo de profile
             </label>
             <input type='file' name="profile-photo" className='' />
             </div>
             <div className='names-div mb-3'>
 
             <label for="lname" className='form-label'>
                 Nom:
             </label>
             <input type='text'
                    {...register('nom')}
                    className='form-control' 
                    placeholder="Veuillez écrire le nom..." />
             
             <label for="fname" className='form-label'>
                 Prénom: 
             </label>
             
             <input type='text' 
                    {...register('prenom')} 
                    className='form-control' 
                    placeholder="Veuillez écrire le prénom..." />
             </div>
             <div className='email-div mb-3'>
             <label for="email" className='form-label'>
                 E-mail: 
             </label>
             <input type='mail' 
                    {...register('email')}
                    className='form-control' 
                    placeholder="Adresse email..." />
             </div>
             <div className='telephone-div mb-3'>
             <label for="telephone" className='form-label'>
                 Téléphone
             </label>
             <input type='number' 
                    {...register('telephone')}
                    className='form-control' 
                    placeholder="Téléphone..." />
             </div>
             <div className='age-div mb-3'>
             <label for="age" className='form-label'>
                 Téléphone
             </label>
             <input type='number' 
                    {...register('age')}
                    className='form-control' 
                    placeholder="age..." />
             </div>
             <div className='adresse-div mb-3'>
             <label for="adresse" className='form-label'>
                 Adresse: 
             </label>
             <input type='text' 
                    {...register('adresse')}
                    className='form-control' 
                    placeholder="Adresse postale..." />
             </div>
 
             <div className='submit-btn mb-4'>
                 <button 
                     className='btn btn-success'
                     disabled={isLoading}>
                     Valider</button>
             </div>
        </form> 
        </div>       
           
     </div>        
     </Offcanvas>
  )
}

export default AddMembreForm