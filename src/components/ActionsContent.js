import React, { useEffect, useState } from 'react'
import '../css/actionsContent.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';

function ActionsContent(props) {

    const [membre, setMembre] = useState([])
    const [pending, setPending] = useState(true)

    const id = props.membreId

    const loadMembre = async () => {
        await axios.get(`http://localhost:8081/api/v1/membres/id/${id}`)
                    .then(res => {
                        setMembre(res.data)  
                        setPending(false)     
                    })
    }

    useEffect(() => {
        loadMembre()
    }, [])
    
        
    const {
        register,
        handleSubmit,
        setValue,
        formState: {isLoading}
      } = useForm()

      const onSubmit = async (data) => {
            const jsonData = JSON.stringify(data)
            await axios.put(`http://localhost:8081/api/v1/membres/edit/${id}`, jsonData, {headers: {'Content-Type': 'application/json'}})       
                    .then(response => {
                        if(response.status === 202){
                            toast.success('Membre modifié!')
                        }                            
                    })
                    .catch(errors => {
                        toast.error("Une erreur s'est produite.")
                    })
      }

  return (
    <div className='actions-content'>     
    
    <center>{ pending === true && <Spinner animation="grow" className='spiner' /> }</center>   

     { pending === false &&        
    <form className='classForm' onSubmit={handleSubmit(onSubmit)}>                  
                <div className='nomInput'>
                    <input type='text' 
                           {...register('nom')} 
                           className='nomInput-text' 
                           {...setValue('nom', membre.nom)}
                           />
                </div>
                <div className='prenomInput'>
                    <input type='text'
                           {...register('prenom')}
                           className='prenomInput-text' 
                           {...setValue('prenom', membre.prenom)}
                           />
                </div>
                
                <div className='abtInput'>
                    <input type="mail" 
                            className='abtInput-text'
                            {...register('email')}
                            {...setValue('email', membre.email)}
                            />
                </div>
                <div className='adrInput'>
                    <input type='text'
                           {...register('adresse')} 
                           className='adrInput-text' 
                           {...setValue('adresse', membre.adresse)}
                           />
                </div>
                
                <div className='ageInput'>
                    <input type='number'
                           {...register('age')}
                           className='ageInput-text'
                           {...setValue('age', membre.age)}
                           />
                </div>
                <div className='telephoneInput'>
                    <input type='number' 
                           {...register('telephone')} 
                           className='ageInput-text'
                           {...setValue('telephone', membre.telephone)}
                            />   
                </div>
                <br />                
                <button className='btn btn-success'>Modifier</button>
    </form>
      }             
    </div>
  )
}

export default ActionsContent