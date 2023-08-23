import { isAuthenticated } from "../services/Auth";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,NavDropdown,Container} from 'react-bootstrap';


export default function NavBar(props){
  
  return(
    <div>
        {/* <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="#">React DOM</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto"  >
                
                    {!isAuthenticated() ?  <li className="nav-item"> <Link to='/register' className="nav-link" >Register </Link> </li> :null }
                    {!isAuthenticated() ? <li><Link className="nav-link" to='/login' >Login</Link></li> :null }
                    {isAuthenticated() ? <li className="nav-item"><Link to='/dashboard' className="nav-link" >Dashboard</Link></li> :null }
                    {isAuthenticated() ?  <li><a href="" className="nav-link" onClick={props.logoutUser}  >Logout</a></li>:null   }               
                </ul>
            </div>
        </nav> */}

        {/*  -------------------- using ract bootstrap navbar ----------------------- */}
        <Navbar expand="md"  bg='dark' variant={'dark'}>                       
          <Navbar.Brand href="#" style={{ marginLeft: '1.5rem' }}>React DOM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: '1.5rem' }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!isAuthenticated() ? <Nav.Link as={Link} to={'/register'} style={{ marginLeft: '1.5rem' }} >Register</Nav.Link> : null}
              {!isAuthenticated() ? <Nav.Link as={Link} to={'/login'} style={{ marginLeft: '1.5rem' }}>Login</Nav.Link> : null}
              {isAuthenticated() ? <Nav.Link as={Link} to={'/dashboard'} style={{ marginLeft: '1.5rem' }} >Dashboard</Nav.Link> :null }
              {isAuthenticated() ?  <li><a href="" className="nav-link" onClick={props.logoutUser} style={{marginLeft:'1.5rem'}} >Logout</a></li>:null   }

            
            </Nav>
          </Navbar.Collapse>        
        </Navbar>
    </div>
    
        
  );
}