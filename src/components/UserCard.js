import '../css/usercard.css';
import '../css/compte.css';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import avatar from '../img/avatar.jpg'
import Offcanvas from 'react-bootstrap/Offcanvas';
import ProfileContent from './ProfileContent';
import ActionsContent from './ActionsContent';
import PaymentsContent from './PaymentsContent';
import AddPayment from './AddPayment';
import Loader from './Loader';
import axios from 'axios';

function UserCard() {
    let payment = true

    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false)
    const [ pending, setPending ] = useState(true)

    const [showProfile, setShowProfile] = useState(true);
    const [showActions, setShowActions] = useState(false);
    const [showPayments, setShowPayments] = useState(false);
    const [addPayment, setAddPayment] = useState(false);

    const [search, setSearch] = useState('')


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeProfile = () => {
      setShowProfile(true)
      setShowActions(false)
      setShowPayments(false)  
      setAddPayment(false)  
    }
    const changeActions = () => {
        setShowProfile(false)
        setShowActions(true)
        setShowPayments(false)  
        setAddPayment(false)  
    }
    const changePayments = () => {
        setShowProfile(false)
        setShowActions(false)
        setShowPayments(true)  
        setAddPayment(false)  
      }
      const changeAddPayments = () => {
        setAddPayment(true)  
        setShowProfile(false)
        setShowActions(false)
        setShowPayments(false)  
      }
      const dataLoader = async () => {
              await axios.get(`http://localhost:8081/api/v1/membres/all`)
                      .then(res => {
                        const data = res.data
                        setUsers(data)
                        setPending(false)
                      }) 
      }
      useEffect(() => {
          dataLoader()
        
      }, [])
      console.log(users)
      const handleSearch = (e) => {
        setSearch(e.target.value)         
       }
    
  return (
    <> 
    <div className='search-container'>
          <div>
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type='text' className='search-input' placeholder='Chercher par Nom' onChange={handleSearch} />
          </div>  
    </div>
    <div className='usercard-list'>
    
    { pending === false &&
    users.filter((user) =>{
        return search.toLowerCase() === '' ? user : user.nom.toLowerCase().includes(search)
    })
    .map((user) =>
  
    <Link to="/gym-dashboard" key={user.id_membre} className='usercard shadow' onClick={handleShow}>
                <ul className="list-iems-card">   
                <li>
                    <img src={avatar} alt="" width="70" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                    {payment === true && <i className='bx bx-checkbox-checked bx-md payment-state-ok' ></i>}
                    {payment === false && <i class="fa-solid fa-triangle-exclamation bx-sm payment-state-nok"></i>}
                </li>
                <li>
                    <p className="card-title">{user.nom}</p>
                </li>
                <li>
                    <span className="card-subtitle">{user.age}</span>
                </li>                                
                </ul>
           
    </Link>  
    )}
</div> 
  <Offcanvas show={show} onHide={handleClose} placement='end' scroll="true" backdrop="true" className="offCanvas"> 
    <div className='compte-container'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Détail Compte</Offcanvas.Title>
        </Offcanvas.Header>
        
          
            <center>
            <div className='compte-container-header'>
             <img src={avatar} alt="" width="80" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
             <p>Abderrahmane haberchid</p>
            </div>  
            </center>  
            <div className='compte-container-body-btn'>
                <Link to=""
                    className="profile-btn"
                    onClick={changeProfile}
                    >Profile
                </Link>
                <Link to="" 
                    className="actions-btn"
                    onClick={changeActions}
                    >Update
                </Link>
                <Link to=""
                    className="payments-btn"
                    onClick={changeAddPayments}
                    >Paiments
                </Link>
                <Link to=""
                    className="payments-btn"
                    onClick={changePayments}
                    >Historique
                </Link>
                
               
            </div>
            <hr />
            <div className='compte-container-body'>
               { showProfile === true && <ProfileContent /> }
               { showActions === true && <ActionsContent /> }
               { showPayments === true && <PaymentsContent /> }
               { addPayment === true && <AddPayment /> }
            </div>

          </div>
      </Offcanvas>
      { pending === true && (<Loader />) }
       
    </>
  )
}

export default UserCard