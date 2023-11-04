import React from 'react'
import '../css/actionsContent.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

function AddPayment(props) {
    const id = props.membreId
    const {
        register,
        handleSubmit
    } = useForm()

    const onSubmit = async (data) => {
        const jsonData = JSON.stringify(data)
        console.log(jsonData)
        await axios.post(`http://localhost:8081/api/v1/membres/add_payment/${id}`, jsonData, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    if(response.status === 200) toast.success("Paiement validé!")
                })
                .catch(errors => {
                    console.log(errors.response)
                    if(errors.response.status === 400) toast.error("Une erreur s'est produite!")
                    else toast.error("errors.response")
                })
    }

  return (
    <div className='actions-content'>        
            
    <form className='classForm' onSubmit={handleSubmit(onSubmit)}>                  
                                
                <div className='abtInput'>
                    <select
                     {...register("type_abonnement")}   
                     className='abtInput-text'>
                        <option selected>Basic + Tapis Roulant</option>
                        <option>Basic + Coach</option>
                        <option>Basic</option>
                    </select>
                </div>
                
                <div className='abtInput'>
                    <select 
                        {...register("type_paiement")} 
                        className='abtInput-text'>
                        <option selected>Mensuel</option>
                        <option>Par jour</option>
                        <option>Par 3mois</option>
                        <option>Par 6mois</option>
                        <option>Annuel</option>
                    </select>
                </div>
                <div className='abtInput'>
                    <input 
                        {...register("prix")}
                        type='number' 
                        placeholder='Prix à payer' 
                        className='abtInput-text' />
                </div>
                   
                <div className='abtInput'>             
                <input type='submit' 
                       className='btn btn-success' 
                       style={{width:"350px", marginTop:"20px"}} 
                       value="Valider paiments" />
                </div>
    </form>
                  
    </div>
  )
}

export default AddPayment