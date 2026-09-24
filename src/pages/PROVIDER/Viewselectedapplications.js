
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { normalizeImageUrl } from "../../utils/imageUtils";

const Viewselectedapplications = () => {
  const [applicationData, setApplicationData] = useState([]);

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Viewselectedapplications/${localStorage.getItem("uid")}`);
        setApplicationData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getService();
  }, []);

  return (
    <>
      <Header />
      <section className="site-section bg-light" id="next">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-8 text-center">
              <h2 className="section-title mb-2">Selected Applications</h2>
              <p className="text-muted mb-0">Candidates selected for your posted jobs.</p>
            </div>
          </div>
          <div className="row">
            {applicationData.map((application) => (
              <div className="col-lg-6 mb-4" key={application._id}>
                <article className="bg-white p-4 shadow-sm h-100">
                  <div className="d-flex align-items-center mb-3">
                    {normalizeImageUrl(application.sdata.profilephoto) ? <img src={normalizeImageUrl(application.sdata.profilephoto)} alt={application.sdata.name} className="rounded-circle mr-3" style={{ width: 72, height: 72, objectFit: "cover" }} /> : <div className="bg-light rounded-circle mr-3" style={{ width: 72, height: 72 }} />}
                    <div><h3 className="h5 mb-1">{application.sdata.name}</h3><p className="text-muted mb-0">{application.jobdata.post}</p></div>
                  </div>
                  <p className="mb-2"><strong>Email:</strong> {application.sdata.email}</p>
                  <p className="mb-2"><strong>Phone:</strong> {application.sdata.phone}</p>
                  <p className="mb-3"><strong>Applied:</strong> {application.date}</p>
                  <div className="d-flex align-items-center">
                    {normalizeImageUrl(application.sdata.profilephoto) ? <a href={normalizeImageUrl(application.sdata.profilephoto)} target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm mr-2">View Photo</a> : <span className="text-muted small mr-2">Photo unavailable</span>}
                    {normalizeImageUrl(application.sdata.cv) ? <a href={normalizeImageUrl(application.sdata.cv)} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm mr-2">View CV</a> : <span className="text-muted small mr-2">CV unavailable</span>}
                    <a href={application.sdata.link} target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm">Portfolio</a>
                  </div>
                </article>
              </div>
            ))}
          </div>
          {applicationData.length === 0 && <div className="text-center bg-white p-5 shadow-sm"><p className="text-muted mb-0">No selected applications yet.</p></div>}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Viewselectedapplications;

