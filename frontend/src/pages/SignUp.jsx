import {Link} from 'react-router-dom'
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function SignUp() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

     const deployedAPI="https://ciphersqlstudiocomplete.onrender.com"
  //const localAPI="http://localhost:8000"

    const navigate=useNavigate();

    const handleRegister=async()=>{
        if(!name || !email || !password){
            alert('fill all the fields')
            return
        }
        try{
            console.log({name,email})
            const res=await axios.post(`${deployedAPI}/api/users/register`,{name,email,password})
            console.log(res.data)
            alert('user registered successfully')
            navigate("/")
        }
        catch(err){
            const message=err.response?.data?.message || "error while Registering"
            alert(message)
            console.log(err)

        }
        
    }
  return (
    <div className='container w-25 mt-5 bg-light p-3'>
        <h4 className='text-center'>Register</h4>
        <label className='mt-2'>UserName</label>
        <input className="form-control" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <label className='mt-2'>Email</label>
        <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label className='mt-2'>Password</label>
        <input className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className='btn btn-secondary mt-2 w-100' onClick={handleRegister}>Register</button>
        <p className='mt-3 text-center'>Have account <Link to="/">Login</Link></p>

    </div>
  )
}

export default SignUp