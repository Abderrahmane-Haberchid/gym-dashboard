
import { React } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useState } from 'react'

function AddSale(props) {

    const [listItem, setListItem] = useState("")
    const [itemType, setItemType] = useState("")

    const supplementsList = ["Proteines", "Gainer", "Vitamines", "Créatine", "Pré-Workout"]
    const proteinType = ["Whey", "Whey ISO", "Whey Hydro", "Caséine"]
    const gainerType = ["Mass Gainer", "Vitargo", "Max Gainer", "CARBS"]
    const vitamineType = ["MuultiVitamine", "Omega 3", "Vitamine A", "Zinc", "Vitamine E"]
    const creatineType = ["Monohydrate", "Monohydrate Micronized", "Normal"]
    const preworkoutType = ["C4", "MAX POWER", "5000MG", "HULK"]
    const marque = ["BIOTECH USA", "MUSCLE TECH", "ISO 100", "GOLD STANDARD", "MUSCLETECH Platinum"]

    const {
        register,
        handleSubmit,
        reset,
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

     const onSubmit = async (dataset) =>{
           const data = JSON.stringify(dataset) 
           console.log(data)
           await axios.post('http://localhost:8081/api/v1/supplements/addSale', data, {headers: {'Content-Type': 'application/json'}})
                       .then(response => {
                        response.status === 200 && toast.success("Vente Validée") 
                        response.status !== 200 && toast.error("Une erreur s'est produite")                        
                        reset()
                       })             

        }

  return (
   
     <Offcanvas show={props.display} onHide={closeForm} placement='top' scroll="true" backdrop="true" className="offCanvas"> 
     <div className='compte-container'>
         <Offcanvas.Header closeButton>
           <Offcanvas.Title>Valider une vente</Offcanvas.Title>
         </Offcanvas.Header>
        <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>

            {/*Selecting supplements to sale*/}
    <div className='row'>
        <div className='col mb-3'>            
            <label htmlFor="listProduit" className='mb-2'> Nom du Produit:  </label>
             <select {...register('nom', {required: "Veuillez sélectionner un nom de produit"})} defaultValue={"séléctionner un Produit"} onChange={handleSelectedItem} className='form-control' id="listProduit">
                        <option key={"key"} selected>séléctionner un Produit</option>
                {
                    supplementsList.map((supp, index) => ( 
                        <option key={index} value={supp}>{supp}</option>
                    ))
                }                
             </select>
             {errors.nom && <p className='text text-danger mt-2'>{errors.nom.message}</p>}
        </div>     

             {/*Selecting supplements type to sale*/}
        <div className='col mb-3'>            
            <label htmlFor="listTypeProduit" className='mb-2'> Type de Produit:  </label>
             <select {...register('type', {required: "Veuillez séléctionner un type de produit"})} onChange={handleSelectedType} className='form-control' id="listTypeProduit">
                   
                {
                    listItem === "Proteines" &&
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
                    listItem === "Creatine" &&
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
             {errors.type && <p className='text text-danger mt-2'>{errors.type.message}</p>}
        </div> 
    </div>            
    <div className='row'>            
                {/*Selecting supplements brand to sale*/}

        <div className="col mb-3">
            <label htmlFor="marqueList" className='mb-2'> Marque: </label>
             <select {...register('marque', {required: "Veuillez séléctionner la marque du produit"})} className='form-control' id="marqueList">
             
                {
                      itemType !== "" &&
                      marque.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))  
                }
             </select>
             {errors.marque && <p className='text text-danger mt-2'>{errors.marque.message}</p>}
        </div>     
        <div className="col mb-3">
            <label htmlFor="quantite" className='mb-2'> Quantité: </label>
             <input {...register("quantity", {required: "Veuillez saisir la quantité"})}
                    type='number' 
                    className='form-control'
                    id="quantite"
                    placeholder='1' />
            {errors.quantity && <p className='text text-danger mt-2'>{errors.quantity.message}</p>}      
        </div>
    </div>
    <div className='row'>
        <div className="col mb-3">
            <label htmlFor="price" className='col-form-label mb-2'> Prix de vente unitaire: </label>
             <input {...register("prixVente")}
                    type='text' 
                    className='form-control'
                    id="price"
                    placeholder="770 Dh" />
        </div>
    </div>
        <div className='col mb-3'>
                 <button className='btn btn-outline-success'>Valider la vente</button>
        </div>
    
        </form> 
        </div>       
           
     </div>        
     </Offcanvas>
  )
}

export default AddSale