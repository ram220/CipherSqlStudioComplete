import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useRef} from 'react'
import axios from 'axios'
import Editor from '@monaco-editor/react'

function AttemptAssignment() {
    const [assignment,setAssignment]=useState(null)

    const [sql,setSql]=useState("");
    const [result,setResult]=useState(null)
    const [error,setError]=useState("")
    const [expectedResult,setExpectedResult]=useState(null);
    const editorRef=useRef()

    const deployedAPI="https://ciphersqlstudiocomplete.onrender.com"
    const localAPI="http://localhost:8000"

    const {id} =useParams()
    useEffect(()=>{
        const fetchAssignment=async()=>{

            const res=await axios.get(`${deployedAPI}/api/assignments/${id}`,{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            setAssignment(res.data.data)
            setExpectedResult(res.data.realResult)
        }
        fetchAssignment()
    },[id])


    const executeQuery=async()=>{
        try{
            setError("")
            const res=await axios.post(`${deployedAPI}/api/query/execute`,{sql,id},);
            setResult(res.data)

            saveProgress(sql,res.data.correct)
        }
        catch(err){
            setResult(null)
            setError(err.response?.data?.message || "Query Failed")
        }
    }

    const fetchPreviousAttempt=async()=>{
        try{
            const res=await axios.get(`${deployedAPI}/api/progress/${id}`,{
                headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
            })

            const progress=res.data.data
            if(!progress){
                alert("No previous attempt found")
                return
            }

      setSql(progress.sqlText || "");
      if (editorRef.current) editorRef.current.setValue(progress.sqlText || "");

        }
        catch(err){
            const message=err.response?.data?.message || "sorry we are unable to fetch your previous attempt now"
            alert(message)
        }
    }

    const saveProgress=async(sqlText,isCorrect)=>{
        try{
            await axios.post(`${deployedAPI}/api/progress/save`,
                {
                    assignmentId:id,
                    sqlText,
                    isCorrect
                },
                {
                    headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
                }
            )
        }
        catch(err){

        }
    }

    if(!assignment){
        return <h4>Loading...</h4>
    }
  return (
    <div className='container p-3 bg-light'>
        <h3 className='text-primary'>{assignment.title}</h3>
        <p><strong>Difficulty: </strong>{assignment.difficulty}</p>
        <h4>Question</h4>
        <p>{assignment.question}</p>
        <h4>Sample Table</h4>
        {assignment.sampleTables.map((table)=>(
            <div key={table.tableName}>
                <h4>{table.tableName}</h4>
                <ul>
                    {
                        table.columns.map((c)=>(
                            <li key={c.columnName}>{c.columnName} ({c.dataType})</li>
                        ))
                    }
                </ul>
            </div>

        ))}

        <h5>Expected Output</h5>
        {expectedResult && 
        (<table className="table table-bordered table-striped table-sm8" style={{width:'auto'}}>
            <thead>
                <tr>
                    {expectedResult.columns.map((col)=>(
                        <th key={col}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {expectedResult.rows.map((row,i)=>(
                    <tr key={i}>
                        {expectedResult.columns.map((col)=>(
                            <td key={col}>{row[col]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>)}

        <h4>SQL Editor</h4>
        <Editor 
            height="200px"
            theme="vs-dark"
            language='sql'
            value={sql}
            onMount={(editor) => (editorRef.current = editor)}
            onChange={(value) => setSql(value || "")}
        />
        <button className='btn btn-secondary btn-sm ' onClick={executeQuery}>Execute</button>
        <button className='btn btn-secondary btn-sm ms-2' onClick={fetchPreviousAttempt}>Preious Attempt</button>
        
        <section>
            <h4>Result</h4>
            {error && <p style={{color:"red"}}>{error}</p>}
            {result && (<p style={{color:result.correct?"green":"red"}}>{result.message}</p>)}
            {result && 
                (<table className="table table-bordered table-striped w-auto">
                <thead className="table-dark">
                    <tr>
                        {result.columns.map((col)=>(
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {result.rows.map((row,i)=>(
                        <tr key={i}>
                            {result.columns.map((col)=>(
                                <td key={col}>{row[col]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            
            </table>)
            }
        </section>
    
    </div>
  )
}

export default AttemptAssignment