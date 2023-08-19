import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/Dashboard";
import { BrowserRouter,Route,Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/' element={<h1>fisrt page</h1>}/>  
        </Routes>

      </BrowserRouter>
      
      
    </div>
    
  );
}

export default App;
