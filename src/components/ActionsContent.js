import React from 'react'
import '../css/actionsContent.css';

function ActionsContent() {
  return (
    <div className='actions-content'>        
            
    <form className='classForm'>                  
                <div className='nomInput'>
                    <input type='text' className='nomInput-text' placeholder="Nom"/>
                </div>
                <div className='prenomInput'>
                    <input type='text'  className='prenomInput-text' placeholder="Prénom"/>
                </div>
                
                <div className='abtInput'>
                    <select className='abtInput-text'>
                        <option selected>Basic + Tapis Roulant</option>
                        <option>Basic + Coach</option>
                        <option>Basic</option>
                    </select>
                </div>
                <div className='adrInput'>
                    <input type='text' className='adrInput-text' placeholder="1 rue voltaire, Paris"/>
                </div>
                
                <div className='ageInput'>
                    <input type='number' className='ageInput-text' placeholder="30" />
                </div>
                <div className='typeInput'>
                    <select className='typeInput-text'>
                        <option selected>Mensuel</option>
                        <option>Par 3mois</option>
                        <option>Par 6mois</option>
                        <option>Annuel</option>
                    </select>
                </div>
                <br />                
                <button className='btn btn-success'>Modifier</button>
    </form>
                  
    </div>
  )
}

export default ActionsContent