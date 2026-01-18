import {useState,useEffect} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function AssignmentsList() {
  const [assignments,setAssignments]=useState([])
  const [progress,setProgress]=useState({})

  const navigate=useNavigate()

  const deployedAPI="https://ciphersqlstudiocomplete.onrender.com"
  const localAPI="http://localhost:8000"

  useEffect(()=>{
    const fetchAssignments=async()=>{
      try{
        const res=await axios.get(`${deployedAPI}/api/assignments`)
        setAssignments(res.data.data)
      }
      catch(err){
        alert("error while fetching assignments")
      }
    }

    const userProgress=async()=>{
      try{
        const res=await axios.get(`${deployedAPI}/api/progress/my`,{
          headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
        })
        
        let map={}
        res.data.data.forEach(p=>{
          map[p.assignmentId.toString()]=p
        })
        setProgress(map)
      }
      catch(err){
        const message=err.response?.data?.message || "unable to fetch user progress"
        alert(message)
      }
    }
    fetchAssignments();
    userProgress();
  },[])

  return (
    <div className='container mt-3 w-80 bg-light p-2'>
        {
          assignments.map((a)=>{
            const p=progress[a._id]
            return (
              <div className="mb-1 border-bottom p-2" key={a._id} >
              <h3 className='text-primary'>{a.title}</h3>
              <p>{a.description}</p>
              <span>{a.difficulty}</span>
              <div>
                <button className='btn btn-secondary btn-sm mt-1' onClick={()=>navigate(`/assignment/${a._id}`)}>Attempt</button>
                <span className="ms-3">
                {p
                  ? p.status === "Completed"
                  ? "🟢 Completed"
                  : "🟡 In Progress"
                  : "⚪ Not Started"}
                </span>
              </div>
            </div>
            )
          })
        }
    </div>
  )
}

export default AssignmentsList