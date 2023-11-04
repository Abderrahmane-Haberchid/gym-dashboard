import '../css/membres.css'

import { useState, useEffect, React } from 'react'
import DataTable from 'react-data-table-component'        
import axios from 'axios'
import TableLoader from '../components/TableLoader'
import avatar from '../img/avatar.jpg'
import CompteDetails from '../components/CompteDetails'
import AddMembreForm from '../components/AddMembreForm'

function Membres() {    

    const [rows, setRows] = useState([])
    const [pending, setPending] = useState(true)
    const [search, setSearch] = useState(rows)

    // Display Compte Details
    const [idmembre, setIdMembre] = useState()
    const [showCompte, setShowCompte] = useState(false)

    const handleShow = filteredData => {
        setIdMembre(filteredData.id_membre)
        setShowCompte(true)
    }     

    

    {/*--------Affichage des Membres dans table-------------*/}

    const fetchdata = async () =>{
        
        await axios.get(`http://localhost:8081/api/v1/membres/all`)
        .then(res =>{
          setRows(res.data.sort((a, b) => b.id_membre - a.id_membre))   
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

    
    {/*----------displaying add Form ------------*/}  

      const [addForm, setAddForm] = useState(false)
      const handleAddForm = () => setAddForm(true)
    

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
            <button className='btn btn-success' onClick={handleAddForm}>
                <i class="fa-solid fa-plus md-3 fa-sm"></i>  Ajouter Membre
            </button>
       </div>

    {/*******Liste de filtrage Payé/Impayé**********/}       
       <div className='sorting-option'>
            <span>Trier par</span>
            <select className='sorting-list'>   
                <option name='tous' selected>Tous</option>
                <option name='payés'>Payés</option>
                <option name='impayés'>Impayés</option>
                <option name='inactif'>Désactivés</option>
                <option name='blacklist'>Blacklisté</option>
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

    <AddMembreForm display={addForm} setDisplay={setAddForm} />

    <CompteDetails idmembre={idmembre} display={showCompte} setDisplay={setShowCompte} />
    </>
  )
}

export default Membres