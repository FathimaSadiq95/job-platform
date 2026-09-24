import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
const Sendfeedbackseeker=()=>
{

    const[serviceData,setserviceData]=useState({
        feedback:'',
    
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
        await axios.post('http://localhost:4000/Sendfeedbackseeker/'+localStorage.getItem("uid"), serviceData);
        alert('Feedback sent successfully!');
        resetForm();
        window.location.href='/Sendfeedbackseeker#next';
      } catch (error) {
        console.error('Error sending feedback:', error);
        alert('Unable to send feedback. Please try again.');
      }
    };

    const resetForm = () => {
        setserviceData({
          feedback : ''

        });
    };
  return(<>
  <Header/>
  <section className="site-section bg-light py-5" id="next"><div className="container"><div className="row justify-content-center"><div className="col-md-7 col-lg-6"><div className="bg-white p-4 p-md-5 shadow-sm">
    <div className="text-center mb-4"><h2 className="section-title mb-2">Send Feedback</h2><p className="text-muted mb-0">Tell us about your experience.</p></div>
    <form onSubmit={handleSubmit}><div className="form-group mb-3"><label htmlFor="feedback">Feedback</label><textarea name="feedback" id="feedback" className="form-control" rows="6" onChange={handleChange} required minLength="5" /></div><button type="submit" className="btn btn-primary btn-block">Submit Feedback</button></form>
  </div></div></div></div></section>
  <Footer/>
  </>);
}

export default Sendfeedbackseeker;







