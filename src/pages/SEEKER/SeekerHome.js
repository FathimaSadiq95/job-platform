import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { normalizeImageUrl } from "../../utils/imageUtils";
const SeekerHome=()=>
{
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/ViewApprovedJob");
        setJobData(response.data.data || []);
      } catch (error) {
        console.error("Error loading approved jobs:", error);
      }
    };

    getJobs();
  }, []);

  const applyForJob = async (id) => {
    try {
      await axios.get(`http://localhost:4000/applyForJob/${id}/${localStorage.getItem("uid")}`);
      setJobData((currentJobs) => currentJobs.map((job) => (
        job._id === id ? { ...job, isApplied: true } : job
      )));
      alert("Applied for job successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to apply for this job");
    }
  };

  return(<>
  <Header/>
  <section className="site-section bg-light py-5" id="next">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-2">Available Jobs</h2>
          <p className="text-muted mb-0">Explore approved opportunities and apply for the right role.</p>
        </div>
      </div>
      <div className="row">
        {jobData.map((job) => (
          <div className="col-lg-6 mb-4" key={job._id}>
            <article className="bg-white shadow-sm h-100 overflow-hidden">
              <div className="d-flex align-items-center p-4 border-bottom">
                {normalizeImageUrl(job.jobdata?.images) ? (
                  <img src={normalizeImageUrl(job.jobdata.images)} alt={job.jobdata.organisation} className="rounded mr-3" style={{ width: 96, height: 96, objectFit: "cover" }} />
                ) : <div className="bg-light rounded mr-3" style={{ width: 96, height: 96 }} />}
                <div>
                  <h3 className="h4 mb-1">{job.post}</h3>
                  <p className="text-muted mb-1">{job.jobdata?.organisation}</p>
                  <span className="badge badge-primary">{job.no_of_vacancies} {job.no_of_vacancies === 1 ? "vacancy" : "vacancies"}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="mb-3">{job.about}</p>
                <div className="row small text-muted mb-3">
                  <div className="col-6 mb-2"><strong>Eligibility:</strong><br />{job.requirements}</div>
                  <div className="col-6 mb-2"><strong>Experience:</strong><br />{job.exp_required} years</div>
                  <div className="col-6"><strong>Open:</strong><br />{job.from_date}</div>
                  <div className="col-6"><strong>Due:</strong><br />{job.due_date}</div>
                </div>
                <p className="small mb-3"><span className="icon-room"></span> {job.jobdata?.location}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <a href={job.jobdata?.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm">Company Website</a>
                  {job.isApplied ? <span className="text-success">Already applied</span> : <button type="button" className="btn btn-primary btn-sm" onClick={() => applyForJob(job._id)}>Apply Now</button>}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
      {jobData.length === 0 && <div className="bg-white p-5 text-center shadow-sm"><p className="text-muted mb-0">No approved jobs are available right now.</p></div>}
    </div>
  </section>
  <Footer/>
  </>);
}

export default SeekerHome;





