import { useState } from "react"
import axios from "axios";
import Header from "../LOGIN/Header";
import Footer from "../LOGIN/Footer";
 const Login=()=>

  {
      const[serviceData,setserviceData]=useState({
        Email:'',
        Password:''
    });
    const handleChange = (e) => {
        const {name , value} = e.target;
        setserviceData({
            ...serviceData,
            [name] : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:4000/login',serviceData);
          console.log(response.data,'sssssssssssssssss');
          if(response.data.status == 'ok')
          {
          var id = response.data.id;
          var uid = response.data.uid;
           localStorage.setItem('id', id);
           localStorage.setItem('type', response.data.type);
           localStorage.setItem('uid', uid);

           console.log(localStorage.getItem('id'),'sdsdsdsdsd',localStorage.getItem('type'));

          if(response.data.type == 'admin'){
           alert('Login Successfully!!')
            resetForm();
            window.location.href='/AdminHome';
          }
          if(response.data.type == 'provider'){
           alert('Login Successfully!!')
            resetForm();
            window.location.href='/ProviderHome';
          }
          if(response.data.type == 'seeker'){
           alert('Login Successfully!!')
            resetForm();
            window.location.href='/SeekerHome';
          }
          }
          else{
            alert('Invalid User name or Password');
            resetForm();
            window.location.href='/';
          }
        } catch (error) {
          if (error.response?.data?.status === 'not_approved') {
            alert('Your account is not verified yet. Please wait for admin approval.');
          } else {
            alert('Invalid User name or Password');
          }
          resetForm();
          window.location.href='/';
        }
    };
    const resetForm = () => {
        setserviceData({
           Email:'',
           Password:''
        });
    };
    return(<>
      <Header/>
      <section className="site-section bg-light py-5" id="home">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="bg-white p-4 p-md-5 shadow-sm">
                <div className="text-center mb-4">
                  <h2 className="section-title mb-2">Welcome Back</h2>
                  <p className="text-muted mb-0">Sign in to continue to JobBoard.</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="Email" id="email" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="Password" id="password" className="form-control" onChange={handleChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
                <div className="d-flex justify-content-between mt-4">
                  <a href="/Sendregisterprovider#next">Provider Registration</a>
                  <a href="/Sendregisterseeker#next">Seeker Registration</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>);
  }

export default Login;









