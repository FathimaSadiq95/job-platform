
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { normalizeImageUrl } from "../../utils/imageUtils";

const Viewapplicationprovider = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Viewapplicationprovider/${localStorage.getItem("uid")}`);
        setApplicationData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getService();
  }, []);

  const handleSelect = async (id) => {
    setSelectedApplication(null);
    try {
      await axios.get(`http://localhost:4000/selectApplication/${id}`);
      setApplicationData((applications) => applications.filter((application) => application._id !== id));
      setSelectedApplication(null);
    } catch (error) {
      console.error("Error selecting application:", error);
    }
  };

  const handleReject = async (id) => {
    setSelectedApplication(null);
    try {
      await axios.get(`http://localhost:4000/rejectApplication/${id}`);
      setApplicationData((applications) => applications.filter((application) => application._id !== id));
      setSelectedApplication(null);
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="site-section bg-light" id="next">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-8 text-center">
              <h2 className="section-title mb-2">Pending Applications</h2>
              <p className="text-muted mb-0">Review candidates who applied for your jobs.</p>
            </div>
          </div>

          <div className="row">
            {applicationData.map((application) => {
              const imageUrl = normalizeImageUrl(application.sdata.profilephoto || application.sdata.photo);
              return (
                <div className="col-lg-6 mb-4" key={application._id}>
                  <article className="bg-white shadow-sm p-4 h-100">
                    <div className="d-flex align-items-center mb-3">
                      {imageUrl ? <img src={imageUrl} alt={application.sdata.name} className="rounded-circle mr-3" style={{ width: 76, height: 76, objectFit: "cover" }} /> : <div className="bg-light rounded-circle mr-3" style={{ width: 76, height: 76 }} />}
                      <div><h3 className="h5 mb-1">{application.sdata.name}</h3><p className="text-muted mb-0">{application.jobdata.post}</p></div>
                    </div>
                    <p className="mb-2"><strong>Email:</strong> {application.sdata.email}</p>
                    <p className="mb-3"><strong>Phone:</strong> {application.sdata.phone}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setSelectedApplication(application)}>View Profile</button>
                      <button type="button" className="btn btn-success btn-sm" onClick={() => handleSelect(application._id)}>Select</button>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => handleReject(application._id)}>Reject</button>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
          {applicationData.length === 0 && <div className="bg-white p-5 text-center shadow-sm"><p className="text-muted mb-0">No pending applications.</p></div>}
        </div>
      </section>

      {/* Modal */}
      {selectedApplication && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">{selectedApplication.sdata.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedApplication(null)}
                ></button>
              </div>
              <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                {normalizeImageUrl(selectedApplication.sdata.profilephoto || selectedApplication.sdata.photo) ? <img src={normalizeImageUrl(selectedApplication.sdata.profilephoto || selectedApplication.sdata.photo)} alt={selectedApplication.sdata.name} className="img-fluid mb-3" style={{ width: 180, height: 180, objectFit: "cover", borderRadius: "50%" }} /> : <p className="text-muted">Profile image is not available for this application.</p>}
                <p><strong>Date of Birth:</strong> {selectedApplication.sdata.dateofbirth}</p>
                <p><strong>About:</strong> {selectedApplication.sdata.about ?? selectedApplication.sdata.aboutyou}</p>
                <p><strong>Email:</strong> {selectedApplication.sdata.email}</p>
                <p><strong>Phone:</strong> {selectedApplication.sdata.phone}</p>
                <p><strong>CV:</strong> {normalizeImageUrl(selectedApplication.sdata.cv) ? <a href={normalizeImageUrl(selectedApplication.sdata.cv)} target="_blank" rel="noreferrer">View CV</a> : "Not available"}</p>
                <p><strong>Portfolio:</strong> <a href={selectedApplication.sdata.link} target="_blank" rel="noreferrer">{selectedApplication.sdata.link}</a></p>
                <p><strong>Date Registered:</strong> {selectedApplication.sdata.date}</p>
                <hr />
                <h6>Job Applied For</h6>
                <p><strong>Post:</strong> {selectedApplication.jobdata.post}</p>
                <p><strong>About Job:</strong> {selectedApplication.jobdata.about}</p>
                <p><strong>No. Vacancies:</strong> {selectedApplication.jobdata.no_of_vacancies}</p>
                <p><strong>Requirements:</strong> {selectedApplication.jobdata.requirements}</p>
                <p><strong>Experience Required:</strong> {selectedApplication.jobdata.exp_required}</p>
                <p><strong>Applied Date:</strong> {selectedApplication.date}</p>
                <p><strong>Status:</strong> {selectedApplication.status}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedApplication(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Viewapplicationprovider;

