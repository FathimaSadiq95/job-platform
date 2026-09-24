import { useState ,useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
const Viewjobprovider=()=>
{
  const[jobData, setjobData ] = useState([]);
  
 useEffect(() => {
          const getService = async() => {
              try{
                  const response = await axios.get(`http://localhost:4000/Viewjob/${localStorage.getItem("uid")}`);
                  console.log('jobview',response.data.data)
                  setjobData(response.data.data);
              }
              catch(error){
                  console.error(error);
              }
          };
          getService();
 }, []); 

 const deleteJob = async (id) => {
  try {
    await axios.get(`http://localhost:4000/Deletejob/${id}`);
    window.location.href = "/Viewjobprovider";
  } catch (error) {
    console.error("Error deleting job:", error);
  } };
 

 return(<>
   <Header/>
   <section className="site-section bg-light" id="next">
     <div className="container">
      <div className="row mb-5 justify-content-center"><div className="col-md-8 text-center"><h2 className="section-title mb-2">My Jobs</h2><p className="text-muted mb-0">Manage the jobs you have posted.</p></div></div>
       <div className="row">
         {jobData.map((jobs) => (
           <div className="col-lg-6 mb-4" key={jobs._id}>
             <article className="bg-white p-4 shadow-sm h-100">
               <div className="d-flex justify-content-between align-items-start mb-3"><div><h3 className="h4 mb-1">{jobs.post}</h3><span className="badge badge-primary">{jobs.status}</span></div><span className="text-muted">{jobs.no_of_vacancies} {jobs.no_of_vacancies === 1 ? "vacancy" : "vacancies"}</span></div>
               <p className="mb-3">{jobs.about}</p>
               <div className="row small text-muted mb-3"><div className="col-6 mb-2"><strong>Eligibility:</strong><br />{jobs.requirements}</div><div className="col-6 mb-2"><strong>Experience:</strong><br />{jobs.exp_required} years</div><div className="col-6"><strong>Open:</strong><br />{jobs.from_date}</div><div className="col-6"><strong>Due:</strong><br />{jobs.due_date}</div></div>
               <div className="d-flex justify-content-end"><a href={`/Editjobprovider/${jobs._id}`} className="btn btn-outline-primary btn-sm mr-2">Edit</a><button type="button" className="btn btn-outline-danger btn-sm" onClick={() => deleteJob(jobs._id)}>Delete</button></div>
             </article>
           </div>
         ))}
       </div>
       {jobData.length === 0 && <div className="bg-white p-5 text-center shadow-sm"><p className="text-muted mb-0">No jobs are available.</p></div>}
     </div>
   </section>
   <Footer/>
 </>);
}

export default Viewjobprovider;



