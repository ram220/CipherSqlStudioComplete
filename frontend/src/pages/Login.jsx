import {Link} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate()

    const deployedAPI="https://ciphersqlstudiocomplete.onrender.com"
    const localAPI="http://localhost:8000"

    const handleLogin=async()=>{
        if(!email || ! password){
            alert("fill all the fields")
            return
        }
        try{
            const res=await axios.post(`${deployedAPI}/api/users/login`,{email,password})
            localStorage.setItem("token",res.data.token)
            alert("login successfully")
            navigate('/assignments')
        }
        catch(err){
            const message =err.response?.data?.message || "Something went wrong";
            alert(message);
            console.log(err)
        }
    }
  return (
    <div className='container w-25 m-auto bg-light mt-5 p-3'>
        <h4 className='text-center'>Login</h4>
        <label className='mt-3'>Email</label>
        <input className='form-control' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <label className='mt-3'>Password</label>
        <input className='form-control' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <button className='btn btn-secondary mt-2 w-100' onClick={handleLogin}>Login</button>
        <p className='mt-3 text-center'>Don't have account <Link to="/signup">SignUp</Link></p>
    </div>

  )
}

export default Login;