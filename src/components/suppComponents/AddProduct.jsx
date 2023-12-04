
import { React } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useState } from 'react'

function AddProducts(props) {

    const [listItem, setListItem] = useState("")
    const [itemType, setItemType] = useState("")
    const [quantity, setQuantity] = useState(1)

    const supplementsList = ["Protéines", "Gainer", "Vitamines", "Créatine", "Pré-Workout"]
    const proteinType = ["Whey", "Whey ISO", "Whey Hydro", "Caséine"]
    const gainerType = ["Mass Gainer", "Vitargo", "Max Gainer", "CARBS"]
    const vitamineType = ["MuultiVitamine", "Omega 3", "Vitamine A", "Zinc", "Vitamine E"]
    const creatineType = ["Monohydrate", "Monohydrate Micronized", "Normal"]
    const preworkoutType = ["C4", "MAX POWER", "5000MG", "HULK"]
    const marque = ["BIOTECH USA", "MUSCLE TECH", "ISO 100", "GOLD STANDARD", "MUSCLETECH Platinum"]

    const {
        register,
        handleSubmit,
        formState: {errors}
      } = useForm()


     const closeForm = () =>{
        props.setDisplay(false)
     }

     const handleSelectedItem = (e) => {
        setListItem(e.target.value)
     }
     const handleSelectedType = (e) => {
        setItemType(e.target.value)
     }
     const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
     }
     
  return (
   
     <Offcanvas show={props.display} onHide={closeForm} placement='top' scroll="true" backdrop="true" className="offCanvas"> 
     <div className='compte-container'>
         <Offcanvas.Header closeButton>
           <Offcanvas.Title>Ajouter des produits</Offcanvas.Title>
         </Offcanvas.Header>
        <div className="form-container">
        <form onSubmit={handleSubmit()}>

            {/*Selecting supplements to sale*/}
    <div className='row'>
        <div className='col'>            
            <label for="listProduit" className='col-form-label' > Nom du produit:  </label>
             <select {...register('product')} onChange={handleSelectedItem} className='form-control' id="listProduit">
                    <option key="key" selected>Séléctionner un Produit</option>
                {
                    supplementsList.map((supp, index) => ( 
                        <option key={index} value={supp}>{supp}</option>
                    ))
                }                
             </select>
        </div>     

             {/*Selecting supplements type to sale*/}
        <div className='col'>            
            <label for="listTypeProduit" className='col-form-label'> Type du Produit:  </label>
             <select {...register('product_type')} onChange={handleSelectedType} className='form-control' id="listTypeProduit">
                    <option key="key1" selected>Type de Produit</option>
                {
                    
                    listItem === "Protéines" &&
                    proteinType.map((supp, index) => ( 
                        <option key={index} value={supp}>{supp}</option>
                    ))
                }    
                {
                    listItem === "Gainer" &&
                    gainerType.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))
                }
                {
                    listItem === "Vitamines" &&
                    vitamineType.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))
                } 
                {
                    listItem === "Créatine" &&
                    creatineType.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))
                } 
                {
                    listItem === "Pré-Workout" &&
                    preworkoutType.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))
                }               
             </select>
        </div>         
    </div>            
                {/*Selecting supplements brand to sale*/}
    <div className='row'>            
        <div className="col">
            <label for="marqueList" className='col-form-label'> Marque: </label>
                    
             <select {...register('product_type')} defaultValue={"Marque du Produit"} className='form-control' id="marqueList">
             <option key="key2" selected>Marque du Produit</option>
                {
                      itemType !== "" &&
                      marque.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))  
                }
             </select>
        </div>   
    
        <div className="col">
            <label for="quantite" className='col-form-label'> Quantité: </label>
             <input {...register("quantite")}
                    onChange={handleQuantityChange}
                    type='number' 
                    className='form-control'
                    id="quantite"
                    placeholder="1" />
        </div>
    </div>      
    <div className='row'>            
        <div className="col">
            <label for="price" className='col-form-label'> Prix d'achat: </label>
             <input {...register("prixAchat")}
                    type='text' 
                    className='form-control'
                    id="price"
                    placeholder="770 Dh" />
        </div>
        <div className='col'>
            <label for="price" className='col-form-label'> Prix de vente: </label>
             <input {...register("prixVente")}
                    type='text' 
                    className='form-control'
                    id="price"
                    placeholder="850 Dh" />
        </div>
    </div>
        <div className='submit-btn mt-4 mb-4'>
                 <button className='btn btn-outline-primary'>
                    {quantity == 1 && "Ajouter Ce Produit"}
                     {quantity > 1 && "Ajouter Ces Produits"}
                 </button>
        </div>
        </form> 
        </div>       
           
     </div>        
     </Offcanvas>
  )
}

export default AddProducts