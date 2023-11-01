import React, { useEffect, useState } from 'react'
import '../css/payment.css'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import LoaderTablePayments from './LoaderTablePayments'
import { faBold } from '@fortawesome/free-solid-svg-icons'



function PaymentsContent(props) {

    const [rows, setRows] = useState([])
    const [pending, setPending] = useState(true);
    const id = props.membreId

    const fetchdata = async () =>{
        
        await axios.get(`http://localhost:8081/api/v1/payments/all/${id}`)
        .then(res =>{
          const data = res.data
          setRows(data.data)   
          setPending(false)
        })
      }

    useEffect(() => {            
       fetchdata()        
    }, [])
    

    const columns = [
        {
            name: "Prix",
            selector: row => row.prix,
            sortable: true,
            width: "70px"
        },
        {            
            name: "Date",
            selector: row => row.username,
            sortable: true,
        },
        {
            name: "Abonnement",
            selector: row => row.ip,
            sortable: true,
            width: "100px"
        },
        {
            name: "Type",
            selector: row => row.ip,
            sortable: true,
            width: "100px"
        }
        
    ]

    const customStyles = {
      table: {
          style:{
              backgroundColor: 'var(--sidebar-color)'
          }            
      },
      responsiveWrapper: {
          style: {},
      },
      headRow: {
          style: {
              backgroundColor: 'var(--sidebar-color)',
              color: 'var(--text-color)',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'var(--tran-03)'
          }
      },
      rows: {
          style: {
              backgroundColor: 'var(--sidebar-color)',
              color: 'var(--text-color)',
              transition: 'var(--tran-03)'
          }
      }
      
  }

  return (
    <div className='payments-table'>
        <center>    
       
        <DataTable
         fixedHeader    
         columns={columns} 
         data={rows}
         progressPending={pending}
         progressComponent={<LoaderTablePayments />}
         fixedHeaderScrollHeight="350px"   
         className='datatable'
         customStyles={customStyles} 
        />
        
       </center>  
    </div>
  )
}

export default PaymentsContent