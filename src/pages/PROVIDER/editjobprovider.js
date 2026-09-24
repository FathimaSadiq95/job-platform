import {useState,useEffect} from  'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { useParams } from "react-router-dom";

const Editjobprovider=()=>
{
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];

    const { id } = useParams();
    console.log('ID:', id);

  const[serviceData,setserviceData]=useState({
         post:'',
            about:'',
            requirements:'',
            exp_required :'',
            from_date:'',
            due_date:'',
            salary:'',
            no_of_vacancies:''
    });
    
           useEffect(() => {
              console.log("useEffect called");
              const fetchData = async () => {
                try {
                  const response = await axios.get(`http://localhost:4000/getupdatejob/${id}`);
                  setserviceData(response.data);
        
                  console.log("Response:", response.data);
                } catch (error) {
                  console.error("Error fetching data:", error);
                }
              };
              fetchData(); // Call the function
              console.log("ID:", id);
        }, []);
    


    const handleChange = (e) => {
        const {name , value} = e.target;
        setserviceData({
            ...serviceData,
            [name] : value,
        });
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/Updatejob/' + id,serviceData)
        console.log(serviceData);
        alert('Service Updated Successfully!!')
        window.location.href='/Viewjobprovider';
    };

  return(<>
    <Header/>
    <section className="site-section bg-light py-5"><div className="container"><div className="row justify-content-center"><div className="col-lg-8"><div className="bg-white p-4 p-md-5 shadow-sm">
      <div className="text-center mb-4"><h2 className="section-title mb-2">Edit Job</h2><p className="text-muted mb-0">Update the opportunity details.</p></div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3"><label htmlFor="post">Job Post</label><input type="text" name="post" id="post" className="form-control" onChange={handleChange} value={serviceData.post} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed." /></div>
        <div className="form-group mb-3"><label htmlFor="about">About the Job</label><textarea name="about" id="about" className="form-control" rows="4" onChange={handleChange} value={serviceData.about} required /></div>
        <div className="row"><div className="col-md-6 form-group mb-3"><label htmlFor="no_of_vacancies">Number of Vacancies</label><input type="number" name="no_of_vacancies" id="no_of_vacancies" className="form-control" min="1" step="1" onChange={handleChange} value={serviceData.no_of_vacancies} required /></div><div className="col-md-6 form-group mb-3"><label htmlFor="exp_required">Experience Required</label><input type="number" name="exp_required" id="exp_required" className="form-control" min="0" step="1" onChange={handleChange} value={serviceData.exp_required} required /></div></div>
        <div className="form-group mb-3"><label htmlFor="requirements">Eligibility</label><input type="text" name="requirements" id="requirements" className="form-control" onChange={handleChange} value={serviceData.requirements} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed." /></div>
        <div className="row"><div className="col-md-6 form-group mb-3"><label htmlFor="from_date">Open Date</label><input type="date" name="from_date" id="from_date" className="form-control" onChange={handleChange} value={serviceData.from_date} min={todayString} required /></div><div className="col-md-6 form-group mb-3"><label htmlFor="due_date">Due Date</label><input type="date" name="due_date" id="due_date" className="form-control" onChange={handleChange} value={serviceData.due_date} min={tomorrowString} required /></div></div>
        <button type="submit" className="btn btn-primary btn-block mt-3">Update Job</button>
      </form>
    </div></div></div></div></section>
    <Footer/>
  </>);
}
export default Editjobprovider;


