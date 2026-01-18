import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AssignmentsList from './pages/AssignmentsList';
import AttemptAssignment from './pages/AttemptAssignment';
import SessionWatcher from './utils/sessionWatcher';

function App() {

  return (
    <div>
      <BrowserRouter>
        <SessionWatcher/>
        <Routes>
          <Route path="/assignments" element={<AssignmentsList/>}/>
          <Route path="/assignment/:id" element={<AttemptAssignment/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App;
