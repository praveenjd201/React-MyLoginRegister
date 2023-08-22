import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/Dashboard";
import { HashRouter as Router,Route,Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<RegisterPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/login' element={<LoginPage/>} />
         
        </Routes>

      </Router>
      
      
    </div>
    
  );
}

export default App;
