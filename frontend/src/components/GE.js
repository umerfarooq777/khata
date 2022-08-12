import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {processEntry} from './processEntries'
import {ledgerEntry} from './ledgerEntry'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useFirestore } from '../hooks/useFirestore'
import './GE.css'
import SnackbarC from './SnackbarC';


export default function GE() {

  const [fullname, setFullName] = useState({
    fname: "",
    lname: ""
  });


  // setRecord(currentArray => [...record, newElement])

  const { addDocument:addDocument1, response:response1 } = useFirestore('Transactions')
  const { addDocument:addDocument2, response:response2 } = useFirestore('generalEntries')
  const { addDocument:addDocument3, response:response3 } = useFirestore('ledgerEntries')
  const { addDocument:addDocument4, response:response4 } = useFirestore('ledgerEntries')

  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };



  const [record, setRecord] = useState([]);

  const [formError, setFormError] = useState(null)
  const [creating, setCreating] = useState(false)
  const [title, setTitle] = useState()
  const [accType, setAccType] = useState()
  const [transType, setTransType] = useState()
  const [payment, setPayment] = useState(null)
  const [amount, setAmount] = React.useState()
  const [date, setDate] = React.useState()
  const [snack,setsnack]=React.useState(false)

  

  

  const handleSubmit = async (e) => {
   
    e.preventDefault()
    handleToggle()
    setFormError(null)
    setCreating(true)

    const entry = {
      title: title,
      accType1: accType,
      payment:payment,
      amount: amount,
      createdAt: date,
    }
    const passData=processEntry(entry);
    const {obj1,obj2}=ledgerEntry(entry)
  
  
    await addDocument1(entry)
    await addDocument2(passData)
    await addDocument3(obj1)
    await addDocument4(obj2)


    console.log(response1);
    if (!response1.error && !response2.error && !response3.error && !response4.error) {
      setCreating(false)
      handleToggle()
      setsnack(true)
      setTimeout(() => {
        setsnack(false)
      }, 1000);
     
    }
    if(response1.error||response2.error||response3.error||response4.error){
      handleToggle(null)
     
    }

  }



////==================================================

const show = (event) => {
  // prevents the submit button from refreshing the page
  event.preventDefault();
  console.log(fullname);
};


const inputEvent = (event) => {

console.log(event.target.value);
console.log(event.target.name);

const value = event.target.value;
const name = event.target.name;

setFullName((preValue) => {
  // console.log(preValue);
  if(name === 'fname'){
    return{
      fname: value,
      lname: preValue.lname,
    };
  }else if(name === 'lname'){
    return{
      fname: preValue.fname,
      lname: value,
    };
  }
  });


};


const handleSubmit1 = (event) => {
  // prevents the submit button from refreshing the page
  event.preventDefault();
  alert("form submitted");
};












  return (
  <>
  <div>
    
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={creating}

    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <SnackbarC snack={snack} />
  </div>

  <div className='add-records-cont'>


  <Box className="box" sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1 , width: 'auto', height: '100%', } }} >
      
      <Paper elevation={3} >
        <h4 style={{ textAlign:'center' }}>ADD RECORD</h4>


        <form>
        <div>
          <h3>{fullname.fname}</h3>
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="First Name"
            onChange={inputEvent}
            value={fullname.fname}
          />
          <input
          type="text"
          name="name"
          placeholder="Last Name"
          onChange={inputEvent}
          value={fullname.lname}
        />
        </div>
        <div>
          <button type="submit">Submit Contact</button>
        </div>
      </form>
      </Paper>
    </Box>

  <Box className="box" sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1 , width: 'auto', height: '100%', } }} >
      
      <Paper elevation={3} >
        <h4 style={{ textAlign:'center' }}>ADD RECORD</h4>
        <form  className='GEform'>

        <div>
        <input className='date' type="date" required onChange={(e) => setDate(e.target.value)} value={date} />
        </div>
        <div>
        <TextField id="standard-basic" required onChange={(e) => setTitle(e.target.value)}d  value={title} label="Transaction Title" variant="standard" />
        
        </div>
        <div>
        <TextField id="standard-basic" type="number" min="0" required onChange={(e) => setAmount(e.target.value)} value={amount} label="Amount" variant="standard" />
        </div>
        <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel  id="demo-simple-select-standard-label">Acc. Type *</InputLabel>
            <Select labelId="demo-simple-select-standard-label" className="select" id="demo-simple-select-standard" value={accType} required onChange={(e) => setAccType(e.target.value)} label="Acc Type">
              <MenuItem value={"Capital"}>Capital </MenuItem>
              <MenuItem value={"Drawing"}>Drawing </MenuItem>
              <MenuItem value={"Purchase Goods"}>Purchase Goods </MenuItem>
              <MenuItem value={"Account Payable"}>Account Payable </MenuItem>
              <MenuItem value={"Sale"}>Sale</MenuItem>
              <MenuItem value={"Account Recieveable"}>Account Recieveable</MenuItem>
              <MenuItem value={"Purchase Assets"}>Purchase Assets</MenuItem>
              <MenuItem value={"Income"}>Income</MenuItem>
              <MenuItem value={"Expense"}>Expense</MenuItem>

            </Select>
          </FormControl>
        </div>

        <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} required>
            <InputLabel  id="demo-simple-select-standard-label">Transaction. Type</InputLabel>
            <Select labelId="demo-simple-select-standard-label" className="select" id="demo-simple-select-standard" value={transType} required onChange={(e) => setTransType(e.target.value)} label="Trans Type" >
              <MenuItem value={"Debit"}>Debit </MenuItem>
              <MenuItem value={"Credit"}>Credit </MenuItem>

            </Select>
          </FormControl>
        </div>
        <div>
        
         
        {(accType==='Purchase Goods' || accType==='Sale' || accType==='Purchase Assets') && <FormControl variant="standard"  sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">On cash/cr.</InputLabel>
            <Select labelId="demo-simple-select-standard-label" className="select" id="demo-simple-select-standard" value={payment} required onChange={(e) => setPayment(e.target.value)} label="Acc Type">
              <MenuItem value={"Cash"}>Cash</MenuItem>
              <MenuItem value={"Credit"}>Credit</MenuItem>
            </Select>
          </FormControl>}

         {(accType==='Account Payable' || accType==='Account Recieveable') &&  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Settle / More</InputLabel>
            <Select labelId="demo-simple-select-standard-label" className="select" id="demo-simple-select-standard" value={payment} required onChange={(e) => setPayment(e.target.value)} label="Acc Type">
              <MenuItem value={"Settle"}>Settle</MenuItem>
              <MenuItem value={"More"}>More</MenuItem>
            </Select>
          </FormControl>}
        </div>
          
          
          

         
          
          

          
         
          <div >  <input type="button" 
          // onClick={addRecordOnClick} 
          value="Add" />
          {!creating && <Button variant="contained" className='submitbutton' onClick={handleSubmit} endIcon={<AddIcon />}> Add Record </Button>}
          {creating && <Button variant="contained" className='submitbutton' disabled > Adding Entry ... </Button>}
          {formError && <p className="error">{formError}</p>}
          </div>
        </form>
      </Paper>
    </Box>

    

  
    

    <Box className="box" sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1 , width: 'auto', height: '100%', } }} >
      
      <Paper elevation={3} >
        <h4 style={{ textAlign:'center' }}>SUBMIT RECORDS</h4>
        <form  className='GEform'>

        {/* <div>
          <div className='record Debit'>
            <InputLabel  id="demo-simple-select-standard-label"><h4 className='record-h4'>Title jfeiifkrfkerfojrjfekfekjfefjef jfeiifkrfkerfojrjfekfekjfefjef wwiiwi3ji3ilkwlkefewk </h4> </InputLabel>
            <div className='record-metadata'>
            <InputLabel  id="demo-simple-select-standard-label"><h2 className='record-h2'>$ 00.00</h2> </InputLabel>
            <InputLabel  id="demo-simple-select-standard-label"><p className='record-p1'>[ type ]</p> </InputLabel>
            <InputLabel  id="demo-simple-select-standard-label"><p className='record-p2'> 22/12/2022</p> </InputLabel>
            <DeleteForeverOutlinedIcon className='record-dlt-icon'/>
            </div>
        
          </div>
        </div> */}
        <div>
          <div  >
                <div>
                    {/* <InputLabel  id="demo-simple-select-standard-label"><h4 className='record-h4'>i3ilkwlkefewk </h4> </InputLabel> */}
                    
                  {record.map(
                    entry =>
                    <div>
                    <h4 className='record-h4'>{entry}</h4><br/>
                    </div>
                    )
                  }
              </div>           
        
          </div>
        </div>
        

       
        




        <div>
        
         
        {(accType==='Purchase Goods' || accType==='Sale' || accType==='Purchase Assets') && <FormControl variant="standard"  sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">On cash/cr.</InputLabel>
            <Select labelId="demo-simple-select-standard-label" className="select" id="demo-simple-select-standard" value={payment} required onChange={(e) => setPayment(e.target.value)} label="Acc Type">
              <MenuItem value={"Cash"}>Cash</MenuItem>
              <MenuItem value={"Credit"}>Credit</MenuItem>
            </Select>
          </FormControl>}

         {(accType==='Account Payable' || accType==='Account Recieveable') &&  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Settle / More</InputLabel>
            <Select labelId="demo-simple-select-standard-label" className="select" id="demo-simple-select-standard" value={payment} required onChange={(e) => setPayment(e.target.value)} label="Acc Type">
              <MenuItem value={"Settle"}>Settle</MenuItem>
              <MenuItem value={"More"}>More</MenuItem>
            </Select>
          </FormControl>}
        </div>
          
          
          

         
          
          

          
         
          <div >

          {!creating && <Button variant="contained" className='submitbutton' onClick={handleSubmit} 
          // endIcon={<AddIcon />}
          // disabled
          > Submit Records</Button>}
          {creating && <Button variant="contained" className='submitbutton' disabled > Adding Entry ... </Button>}
          {formError && <p className="error">{formError}</p>}
          </div>
        </form>
      </Paper>
    </Box>

    </div>
    </>
  );
}
