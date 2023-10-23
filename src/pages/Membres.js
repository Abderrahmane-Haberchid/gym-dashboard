import '../css/membres.css'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas'
import ProfileContent from '../components/ProfileContent'
import ActionsContent from '../components/ActionsContent'
import PaymentsContent from '../components/PaymentsContent'
import AddPayment from '../components/AddPayment'
import DataTable from 'react-data-table-component'        
import axios from 'axios'
import TableLoader from '../components/TableLoader'
import React from 'react'
import avatar from '../img/avatar.jpg'
import { useForm } from 'react-hook-form'

function Membres() {

    {/*--------Handle Add Member submit-------*/}  

   {/* const membreSchema = z.object({
        lname: z.string().min(3, {message: 'Doit avoir au moins 3 caractéres'}).toLowerCase(),
        fname: z.string().min(3, {message: 'Doit avoir au moins 3 caractéres'}).toLowerCase(),
        email: z.string().email({message: 'Adresse mail invalide'}).toLowerCase(),
        telephone: z.number().min(10, {message: 'Doit contenir au moins 10 chiffres'}),
        adresse: z.string().min(15, {message: 'Adresse trop courte'}).toLowerCase()
      }) */}
      
      const {
        register,
        handleSubmit,
        formState: {isLoading}
      } = useForm()

      const onSubmit = async (data) => {            
            try{
                const jsonData = JSON.stringify(data)
            const response = await axios.post(`http://localhost:8081/api/v1/membres/save`, jsonData, {headers: {'Content-Type': 'application/json'}})       
            console.log(response)  
            
            }
            catch(errors){
               alert(errors)
            }
            

      }

    const [rows, setRows] = useState([])
    const [pending, setPending] = useState(true)
    const [search, setSearch] = useState(rows)
    const [showAccount, setShowAccount] = useState(false)

    {/*--------Affichage des données-------------*/}

    const fetchdata = async () =>{
        
        await axios.get(`http://localhost:8081/api/v1/membres/all`)
        .then(res =>{
          const data = res.data
          const response = data
          setRows(response)   
          setPending(false)
        })
      }     
      {/*--------Handling filtering search-------------*/}
      const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase())         
       }
      const filteredData = search === '' ? rows : rows.filter((users) => {
            return users.nom.toLowerCase().includes(search)
        })

    useEffect(() => {           
       fetchdata()              
    }, [])

    {/*-----------Account section----------*/}

    const [showProfile, setShowProfile] = useState(true);
    const [showActions, setShowActions] = useState(false);
    const [showPayments, setShowPayments] = useState(false);
    const [addPayment, setAddPayment] = useState(false);
    const [show, setShow] = useState(false)

    const [idUser, setIduser] = useState('')

    const handleClose = () => setShow(false);

    const handleShow = filteredData => {
        setIduser(filteredData.username)
        setShow(true)
    }

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
    {/*----------displaying add Form ------------*/}  
      const [addUserForm, setAddUserForm] = useState(false)

      const handleCloseAddUserForm = () => setAddUserForm(false)
      const handleAddForm = () => setAddUserForm(true)
    

    {/*----------Datatable Property-------------*/}
    const columns = [
        
        {
            name: "",
            selector: row => <img src={avatar} alt="" width="70" height="70" className="img-fluid rounded-circle img-thumbnail shadow-sm" />,    
            sortable: true,
            width: "80px"
        },
        {            
            name: "Nom",
            selector: row => row.nom,
            sortable: true,
            width: "120px"
        },
        {
            name: "Prénom",
            selector: row => row.prenom,
            sortable: true,
            width: "120px"
        },
        {            
            name: "Créé le",
            selector: row => row.date_inscription,
            sortable: true,
            width: "120px"
        },
        {            
            name: "Dérnier Paiment",
            selector: row => row.date_update,
            sortable: true,
            width: "170px"
        },
        {            
            name: "Prix",
            selector: row => row.age,
            sortable: true,
            width: "100px"
        },
        {            
            name: "Statut",
            selector: row => row.statut,
            sortable: true,
            width: "100px"
        },
        {            
            name: "Etat",
            selector: row => row.state,
            sortable: true,
            width: "100px"
        }
        
    ]

    const paginationComponentOptions = {
        rowsPerPageText: 'Ligne par page',
        rangeSeparatorText: 'sur',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Tous',
    }
    const customStyles = {
        table: {
            style:{
                backgroundColor: 'var(--sidebar-color)',
                overflow: 'hidden',
                marginTop: '50px',
                minWidth: '900px',
                fontSize: '16px', 
                position: 'relative'
            }            
        },
        tableWrapper: {
            style: {
                marginLeft: '150px',
                overflow: 'hidden',
                width: '900px',
            },
        },    
        responsiveWrapper: {
            style: {},
        },
        headRow: {
            style: {
                height: '40px',
                backgroundColor: 'var(--sidebar-color)',
                color: 'var(--text-color)',
                fontSize: '15px',
                transition: 'var(--tran-03)'
            }
        },
        rows: {
            style: {
                height: '60px',
                backgroundColor: 'var(--sidebar-color)',
                color: 'var(--text-color)',
                transition: 'var(--tran-03)',
            },
            stripedStyle: {
                backgroundColor: 'var(--body-color)',
                color: 'var(--text-color)',
            },
        },
        pagination:{
            style: {
                backgroundColor: 'var(--sidebar-color)',
                color: 'var(--text-color)',
                transition: 'var(--tran-03)',
                width: '910px',
                overflow: 'hidden',
                marginLeft: '150px'
            }    
        }
        
    }
    
  return (
    <>

    {/*******Texte search input for fitrer**********/}
    <div className='search-container'>
          <div>
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type='text' className='search-input' placeholder='Chercher par Nom' onChange={handleSearch} />
          </div>  
    </div>

    {/*-----------Table des Membres--------*/}
    <div className='container'>

    {/*******Bouton d'ajout d'un nouveau Membre**********/}
      <div className='table-header'> 
       <div className='add-btn'>
            <button className='btn btn-success' onClick={handleAddForm}><i class="fa-solid fa-plus md-3 fa-sm"></i>  Ajouter Membre</button>
       </div>

    {/*******Liste de filtrage Payé/Impayé**********/}       
       <div className='sorting-option'>
            <span>Trier par</span>
            <select className='sorting-list'>   
                <option name='tous' selected>Tous</option>
                <option name='payés'>Payés</option>
                <option name='impayés'>Impayés</option>
            </select>
       </div>
       </div>   
        <DataTable                   
                columns={columns} 
                data={filteredData}
                progressPending={pending}
                progressComponent={<TableLoader />}
                customStyles={customStyles}                
                paginationComponentOptions={paginationComponentOptions}
                pagination
                responsive
                highlightOnHover
                onRowClicked={handleShow}
                Clicked
                />

    </div>

    {/*-------------Add User Form------------------*/}
   
    <Offcanvas show={addUserForm} onHide={handleCloseAddUserForm} placement='top' scroll="true" backdrop="true" className="offCanvas"> 
    <div className='compte-container'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Créer un Membre</Offcanvas.Title>
        </Offcanvas.Header>
       <div className="form-container">
       <form onSubmit={handleSubmit(onSubmit)}>
            <div className='photo-div mb-3'>
            <label className='form-label' for="profile-photo">
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

    {/*--------------Display User Account-------------------*/}

    <Offcanvas show={show} onHide={handleClose} placement='end' scroll="true" backdrop="true" className="offCanvas"> 
    <div className='compte-container'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Détail Compte</Offcanvas.Title>
        </Offcanvas.Header>
        
          
            <center>
            <div className='compte-container-header'>
             <img src={avatar} alt="" width="80" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
             <p>Yousra RAHAL</p>
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
               { showProfile === true && <ProfileContent idUser = {idUser} /> }
               { showActions === true && <ActionsContent /> }
               { showPayments === true && <PaymentsContent /> }
               { addPayment === true && <AddPayment /> }
            </div>

          </div>
      </Offcanvas>
       
    </>
  )
}

export default Membres