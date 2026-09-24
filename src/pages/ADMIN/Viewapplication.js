
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { normalizeImageUrl } from "../../utils/imageUtils";

const Viewapplication = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const getSeekerPhoto = (seeker) =>
    normalizeImageUrl(seeker?.profilephoto || seeker?.photo);

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Viewapplication");
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
      <section className="site-section">
        <div className="container" id="home">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">Applications</h2>
            </div>
          </div>

          <ul className="job-listings mb-5" style={{ maxHeight: "400px", overflowY: "auto" }}>
            {applicationData.map((application, index) => (
              <li
                key={index}
                className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                onClick={() => setSelectedApplication(application)}
                style={{ cursor: "pointer" }}
              >
                <div className="job-listing-logo">
                  {getSeekerPhoto(application.sdata) ? (
                    <img
                      src={getSeekerPhoto(application.sdata)}
                      alt={application.sdata.name}
                      className="img-fluid"
                      style={{ width: 96, height: 96, objectFit: "cover" }}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="bg-light" style={{ width: 96, height: 96 }} />
                  )}
                </div>

                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{application.sdata.name}</h2>
                    <strong>{application.jobdata.post}</strong>
                  </div>
                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                    <span className="icon-room"></span> {application.sdata.email}
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
                {getSeekerPhoto(selectedApplication.sdata) ? (
                  <img
                    src={getSeekerPhoto(selectedApplication.sdata)}
                    alt={selectedApplication.sdata.name}
                    className="img-fluid mb-3"
                    style={{ width: 180, height: 180, objectFit: "cover", borderRadius: "50%" }}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <p className="text-muted">Profile image is not available.</p>
                )}
                <p><strong>Date of Birth:</strong> {selectedApplication.sdata.dateofbirth}</p>
                <p><strong>About Seeker:</strong> {selectedApplication.sdata.about ?? selectedApplication.sdata.aboutyou}</p>
                <p><strong>Email:</strong> {selectedApplication.sdata.email}</p>
                <p><strong>Phone:</strong> {selectedApplication.sdata.phone}</p>
                <p><strong>CV:</strong> <a href={selectedApplication.sdata.cv} target="_blank" rel="noreferrer">View CV</a></p>
                <p><strong>Portfolio:</strong> <a href={selectedApplication.sdata.link} target="_blank" rel="noreferrer">{selectedApplication.sdata.link}</a></p>
                <hr />
                <h6>Job Applied For</h6>
                <p><strong>Post:</strong> {selectedApplication.jobdata.post}</p>
                <p><strong>About Job:</strong> {selectedApplication.jobdata.about}</p>
                <p><strong>Number of Vacancies:</strong> {selectedApplication.jobdata.no_of_vacancies ?? selectedApplication.jobdata.no_of_positions}</p>
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

export default Viewapplication;
