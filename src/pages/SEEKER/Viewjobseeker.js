import { useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { normalizeImageUrl } from "../../utils/imageUtils";

const Viewjobseeker = ()=>{

 const[jobData, setjobData ] = useState([]);
  
 useEffect(() => {
          const getService = async() => {
              try{
                  const response = await axios.get('http://localhost:4000/ViewApprovedJob');
                  console.log('jobviewseeker',response.data.data)
                  setjobData((response.data.data || []).map((job) => ({
                    ...job,
                    pdata: job.jobdata
                  })));
              }
              catch(error){
                  console.error(error);
              }
          };
          getService();
 }, []);

 const applyForJob = async (id) => {
  try {
   const response = await axios.get(`http://localhost:4000/applyForJob/${id}/${localStorage.getItem("uid")}`); 
      console.log('Apply response:', response.data);
      setjobData((currentJobs) => currentJobs.map((job) => (
        job._id === id ? { ...job, isApplied: true } : job
      )));
    alert("Applied for job successfully!");
  } catch (error) {
    console.error("Error applying for job:", error);
    alert(error.response?.data?.message || "Unable to apply for this job");
  }};
 
 return(<>
   <Header/>
   <section className="site-section bg-light" id="next">
     <div className="container">
       <div className="row mb-5 justify-content-center"><div className="col-md-8 text-center"><h2 className="section-title mb-2">Available Jobs</h2><p className="text-muted mb-0">Explore opportunities and apply for the right role.</p></div></div>
       <div className="row">
         {jobData.map((jobs) => (
           <div className="col-lg-6 mb-4" key={jobs._id}>
             <article className="bg-white shadow-sm h-100 overflow-hidden">
               <div className="d-flex align-items-center p-4 border-bottom">
                 {normalizeImageUrl(jobs.pdata?.images) ? <img src={normalizeImageUrl(jobs.pdata.images)} alt={jobs.pdata.organisation} className="rounded mr-3" style={{ width: 96, height: 96, objectFit: "cover" }} /> : <div className="bg-light rounded mr-3" style={{ width: 96, height: 96 }} />}
                 <div><h3 className="h4 mb-1">{jobs.post}</h3><p className="text-muted mb-1">{jobs.pdata?.organisation}</p><span className="badge badge-primary">{jobs.no_of_vacancies} {jobs.no_of_vacancies === 1 ? "vacancy" : "vacancies"}</span></div>
               </div>
               <div className="p-4">
                 <p className="mb-3">{jobs.about}</p>
                 <div className="row small text-muted mb-3"><div className="col-6 mb-2"><strong>Eligibility:</strong><br />{jobs.requirements}</div><div className="col-6 mb-2"><strong>Experience:</strong><br />{jobs.exp_required} years</div><div className="col-6"><strong>Open:</strong><br />{jobs.from_date}</div><div className="col-6"><strong>Due:</strong><br />{jobs.due_date}</div></div>
                 <p className="small mb-3"><span className="icon-room"></span> {jobs.pdata?.location}</p>
                 <div className="d-flex justify-content-between align-items-center"><a href={jobs.pdata?.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm">Company Website</a>{jobs.isApplied ? <span className="text-success">Already applied</span> : <button type="button" className="btn btn-primary btn-sm" onClick={() => applyForJob(jobs._id)}>Apply Now</button>}</div>
               </div>
             </article>
           </div>
         ))}
       </div>
       {jobData.length === 0 && <div className="bg-white p-5 text-center shadow-sm"><p className="text-muted mb-0">No jobs are available right now.</p></div>}
     </div>
   </section>
   <Footer/>
 </>);
}

export default Viewjobseeker;



