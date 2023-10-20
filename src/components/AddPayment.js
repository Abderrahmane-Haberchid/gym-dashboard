import React from 'react'
import '../css/actionsContent.css'

function AddPayment() {
  return (
    <div className='actions-content'>        
            
    <form className='classForm'>                  
                                
                <div className='abtInput'>
                    <select className='abtInput-text'>
                        <option selected>Basic + Tapis Roulant</option>
                        <option>Basic + Coach</option>
                        <option>Basic</option>
                    </select>
                </div>
                
                <div className='abtInput'>
                    <select className='abtInput-text'>
                        <option selected>Mensuel</option>
                        <option>Par 3mois</option>
                        <option>Par 6mois</option>
                        <option>Annuel</option>
                    </select>
                </div>
                <div className='abtInput'>
                    <input type='number' placeholder='Prix à payer' className='abtInput-text' />
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