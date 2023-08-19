import { useState } from 'react';
import './LoginPage.css'
import { LoginApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { Link, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/Auth';
import NavBar from '../components/NavBar';

export default function LoginPage(){

  const initialStateErrors = {
    email:{required:false},
    password:{required:false},
    custom_error:null
  };

  const [errors,setErrors] = useState(initialStateErrors);

  const [loading,setLoading] = useState(false);

  

  const handleSubmit = (event) =>{
    event.preventDefault();

    let errors = initialStateErrors;
    let hasError=false;
    if(inputs.email == ''){
      errors.email.required=true;
      hasError=true;
    }
    if(inputs.password == ''){
      errors.password.required=true;
      hasError=true;
    }
    setErrors({...errors});
    if(!hasError){
      setLoading(true);
      //sending API request for login
      
      LoginApi(inputs).then((response) =>{
        // console.log(response);
        storeUserData(response.data.idToken);
      }).catch((err) =>{
        // console.log(err);
        if(String(err.response.data.error.message).includes('TOO_MANY_ATTEMPTS_TRY_LATER')){
          setErrors({...errors,custom_error:'TOO_MANY_ATTEMPTS_TRY_LATER'})
        }else if(err.code == "ERR_BAD_REQUEST"){
          setErrors({...errors,custom_error:'invalid Creditial'})
        }
      }).finally(()=>{
        setLoading(false)
      })

    }

  }
  
  const [inputs,setInputs] = useState({
    email:'',
    password:''
  })

  const handleInputs = (event) =>{
    setInputs({...inputs,[event.target.name]:event.target.value})
  }

  if(isAuthenticated()){
    return (
      // redirecting to dashboard page
      <Navigate to='/dashboard' />
    )
}
  
  return (
    <div>
      <NavBar />
      <section className="login-block">
        <div className="container">
            <div className="row ">
                <div className="col login-sec">
                    <h2 className="text-center">Login Now</h2>
                    <form onSubmit={handleSubmit} className="login-form" action="">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                        <input type="email"  className="form-control" name="email"  id="" placeholder="email" onChange={handleInputs}  />
                        {errors.email.required?
                          <span className="text-danger" >
                            Email is required.
                          </span>: null

                        }
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                        <input  className="form-control" type="password"  name="password" placeholder="password" id="" onChange={handleInputs} />
                        {errors.password.required?
                        <span className="text-danger" >
                            Password is required.
                        </span>:null
                        }
                    </div>
                    <div className="form-group">
                    {loading?
                        (<div  className="text-center">
                            <div className="spinner-border text-primary " role="status">                          
                              <span className="sr-only">Loading...</span>                   
                            </div>
                        </div>):null
                    }
                        {errors.custom_error?
                          <span className="text-danger" >
                          <p>{errors.custom_error}</p>
                          </span>:null
                        }
                        <input  type="submit" className="btn btn-login float-right" disabled={loading}  value="Login" />
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                    Create new account ? Please <Link to='/register'>Register</Link>  
                    </div>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}