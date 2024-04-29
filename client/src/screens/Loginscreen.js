import React,{useState, useEffect} from 'react'
import axios from "axios";

function Loginscreen() {
 
  const[email,setemail] = useState('')
  const[password,setpassword] = useState('')


  async function Login(){
   
    {const user={
     
      email,
      password,
     
    }
    try {
      const result = await axios.post('/api/users/login' ,user).data
    } catch (error) {
      console.log(error)
    }
    console.log(user)
  }

  }

  

  return (
    <div>
        <div className="row justify-content-center mt-5">
        <div className="col-md-5">

          <div className='bs'>
            <h2>Login</h2>
            
            <input type="text" className='form-control' placeholder='Email'
            value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <input type="text" className='form-control' placeholder='Password'
            value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
            
          <button className = 'btn btn-primary' onClick={Login}>Login</button>

          </div>


        </div>
          </div>
        </div>
  )
}

export default Loginscreen