import { useState } from 'react'
import './RegisterPage.css'
import { RegisterApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
import { Link,Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';


export default function RegisterPage(){
  const initialStateErrors = {
    name:{required:false},
    email:{required:false},
    password:{required:false},
    custom_error:null
  };

  const [errors,setErrors]=useState(initialStateErrors);

  // initialize state for loading spinner
  const [loading,setLoading] = useState(false);
  // console.log(loading)

  const handleSubmit = (event) =>{
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError= false;
    if (inputs.name == ""){
      errors.name.required=true;
      hasError=true
    }
    if (inputs.email == ""){
      errors.email.required=true;
      hasError=true;
    }
    if (inputs.password == ""){
      errors.password.required=true;
      hasError=true;
    }
    setErrors({...errors});
    if(!hasError){
      setLoading(true);
      // sending api register request 
      RegisterApi(inputs).then((response) =>{
        // console.log(response);
        storeUserData(response.data.idToken);
      }).catch((err) =>{
        console.log(err);
        if(err.response.data.error.message == 'EMAIL_EXISTS'){
          setErrors({...errors,custom_error:'This email is exist please try another email'})
        }else if(String(err.response.data.error.message).includes('WEAK_PASSWORD')){
          setErrors({...errors,custom_error:'Password should be at least 6 characters'})
        }else if(err.response.data.error.message == 'INVALID_EMAIL'){
          setErrors({...errors,custom_error:'please give valid email'})
        }
      }).finally(() =>{
        setLoading(false);
      })
    }  
  }
  
  const [inputs,setInputs] = useState({
    name:'',
    email: '',
    password:'',      
  });

  const handleInputs = (event) =>{
    setInputs({...inputs,[event.target.name]:event.target.value});
  }

  if(isAuthenticated()){ // true/false value
    // Redirecting user to dashboard
    return <Navigate to='/dashboard' />

  }

  return(  
    <div>
      <NavBar />
      <section className="register-block">
          <div className="container">
              <div className="row ">
                <div className="col register-sec">
                    <h2 className="text-center">Register Now</h2>
                    <form onSubmit={handleSubmit} className="register-form" action="" >
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
        
                      <input type="text" className="form-control" name="name" id="" onChange={handleInputs}/>
                      { errors.name.required?
                        (<span className="text-danger" >
                            Name is required.
                        </span>):
                        null
                      }
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
        
                      <input type="text"  className="form-control" name="email" id="" onChange={handleInputs} />
                      {errors.email.required?
                        (<span className="text-danger" >
                          Email is required.
                        </span>): null
                        
                      }
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                      <input  className="form-control" type="password"  name="password" id="" onChange={handleInputs} />
                      {errors.password.required?
                        (<span className="text-danger" >
                          Password is required.
                      </span>):null
                      }
                    </div>
                    <div className="form-group">
                    {errors.custom_error?
                      (<span className="text-danger" >
                          <p>{errors.custom_error}</p>
                      </span>):null
                    } 
                    {loading?
                      (<div  className="text-center">
                        <div className="spinner-border text-primary " role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>):null
                    }
                      
        
                      <input type="submit" className="btn btn-login float-right" disabled={loading} value="Register"/>
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                      Already have account ? Please  <Link to='/login'>login</Link>
                    </div>     
                    </form>
                </div>
              </div>
          </div>
      </section>
    </div>
  )
}

