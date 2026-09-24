import { useState,useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { normalizeImageUrl } from "../../utils/imageUtils";

const Viewapplicationseeker=()=>
{
   const[applicationData, setapplicationData ] = useState([]);

  const getStatusClass = (status) => {
    const normalizedStatus = String(status || '').toLowerCase();
    if (normalizedStatus.includes('reject') || normalizedStatus.includes('sorry')) return 'badge-danger';
    if (normalizedStatus.includes('congrat') || normalizedStatus.includes('approve') || normalizedStatus.includes('select')) return 'badge-success';
    return 'badge-info';
  };

            useEffect(() => {
                const getService = async() => {
                    try{
                  const seekerId = localStorage.getItem('uid') || localStorage.getItem('id');
                  if (!seekerId) {
                    setapplicationData([]);
                    return;
                  }

                  const response = await axios.get(`http://localhost:4000/Viewapplicationseeker/${seekerId}`);
                        console.log('application',response.data.data)
                        setapplicationData(response.data.data);
                    }
                    catch(error){
                        console.error(error);
                    }
                };
                getService();
            }, []); 
  return(<>
    <Header/>
    <section className="site-section bg-light" id="next">
      <div className="container">
        <div className="row mb-5 justify-content-center"><div className="col-md-8 text-center"><h2 className="section-title mb-2">Applied Jobs</h2><p className="text-muted mb-0">Track the jobs you have applied for.</p></div></div>
        <div className="row">
          {applicationData.map((application) => (
            <div className="col-lg-6 mb-4" key={application._id}>
              <article className="bg-white shadow-sm h-100 overflow-hidden">
                <div className="d-flex align-items-center p-4 border-bottom">
                  {normalizeImageUrl(application.pdata?.images) ? <img src={normalizeImageUrl(application.pdata.images)} alt={application.pdata.organisation} className="rounded mr-3" style={{ width: 96, height: 96, objectFit: "cover" }} /> : <div className="bg-light rounded mr-3" style={{ width: 96, height: 96 }} />}
                  <div><h3 className="h4 mb-1">{application.jobdata?.post}</h3><p className="text-muted mb-1">{application.pdata?.organisation}</p><span className="badge badge-primary">{application.jobdata?.no_of_vacancies} {application.jobdata?.no_of_vacancies === 1 ? "vacancy" : "vacancies"}</span></div>
                </div>
                <div className="p-4">
                  <p className="mb-3">{application.jobdata?.about}</p>
                  <div className="row small text-muted mb-3"><div className="col-6 mb-2"><strong>Eligibility:</strong><br />{application.jobdata?.requirements}</div><div className="col-6 mb-2"><strong>Experience:</strong><br />{application.jobdata?.exp_required} years</div><div className="col-6"><strong>Open:</strong><br />{application.jobdata?.from_date}</div><div className="col-6"><strong>Due:</strong><br />{application.jobdata?.due_date}</div></div>
                  <p className="small mb-3"><span className="icon-room"></span> {application.pdata?.location}</p>
                  <div className="d-flex justify-content-between align-items-center"><a href={application.pdata?.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm">Company Website</a><span className={`badge ${getStatusClass(application.status)}`}>{application.status}</span></div>
                </div>
              </article>
            </div>
          ))}
        </div>
        {applicationData.length === 0 && <div className="bg-white p-5 text-center shadow-sm"><p className="text-muted mb-0">You have not applied for any jobs yet.</p></div>}
      </div>
    </section>
    <Footer/>
  </>);
}

export default Viewapplicationseeker;






