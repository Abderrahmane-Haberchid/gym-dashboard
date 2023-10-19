import React, { useEffect, useState } from 'react'
import '../css/compte.css';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function ProfileContent(props) {
    const [user, setUser] = useState([])
    const [spiner, setSpiner] = useState(true)

    const fetchUser = async () => {
        await axios.get('https://fakerapi.it/api/v1/users?_quantity=1')
        .then(res => {
            const data = res.data
            setUser(data.data)
            setSpiner(false)
        })
    }

    useEffect(() => {         
        fetchUser()
    }, [])
    
  return (
    <div className='profile-content'>
                    
                    <center>{ spiner === true && <Spinner animation="grow" className='spiner' /> }</center>
                      { spiner === false &&  user.map((item, index) => {
                        return(                       
                        <table>
                            <tr>
                              <td><b>Etat du compte</b></td>
                              <td><p id="td-payment">Impayé</p></td>
                          </tr><tr>
                                  <td><b>Date {props.idUser} d'inscripton</b></td>
                                  <td>{item.ip}</td>
                              </tr><tr>
                                  <td><b>Adresse</b></td>
                                  <td>{item.ip}</td>
                              </tr><tr>
                                  <td><b>Abonnement</b></td>
                                  <td>{item.ip}</td>
                              </tr><tr>
                                  <td><b>Age</b></td>
                                  <td>30ans</td>
                              </tr><tr>
                                  <td><b>Type payment</b></td>
                                  <td>Mensuel</td>
                              </tr>
                        </table>
                        )})  
                       }
                    
                    <br />
                        <div className='btn-profile'>
                        <button className='btn btn-secondary'>Désaciver</button>    
                        <button className='btn btn-danger'>Backister</button>    
                        </div>
                    
    </div>
  )
}

export default ProfileContent