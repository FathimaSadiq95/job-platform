
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { normalizeImageUrl } from "../../utils/imageUtils";

const ViewApprovedJob = () => {
  const [jobData, setJobData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await axios.get("http://localhost:4000/ViewApprovedJob");
        console.log("approved jobs", response.data.data);
        setJobData(response.data.data);
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
              <h2 className="section-title mb-2">Approved Jobs</h2>
            </div>
          </div>

          <ul className="job-listings mb-5" style={{ overflow: "scroll" }}>
            {jobData.map((job, index) => (
              <li
                key={index}
                className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                onClick={() => setSelectedJob(job)} // open modal
                style={{ cursor: "pointer"}}
              >
                <div className="job-listing-logo">
                  <img
                    src={normalizeImageUrl(job.jobdata.images)}
                    alt={job.jobdata.organisation}
                    className="img-fluid"
                  />
                </div>

                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{job.post}</h2>
                    <strong>{job.jobdata.organisation}</strong>
                  </div>
                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                    <span className="icon-room"></span> {job.jobdata.location}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Modal */}
      {selectedJob && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <div className="modal-dialog modal-lg" style={{ maxHeight: "90vh" }}>
            <div className="modal-content p-3" style={{ maxHeight: "90vh" }}>
              <div className="modal-header">
                <h5 className="modal-title">{selectedJob.post}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedJob(null)}
                ></button>
              </div>
              <div className="modal-body" style={{ overflowY: "auto" }}>
                <p><strong>About Job:</strong> {selectedJob.about}</p>
                <p><strong>Number of Positions:</strong> {selectedJob.no_of_vacancies ?? selectedJob.no_of_positions}</p>
                <p><strong>Eligibility:</strong> {selectedJob.requirements}</p>
                <p><strong>Experience Required:</strong> {selectedJob.exp_required}</p>
                <p><strong>From Date:</strong> {selectedJob.from_date}</p>
                <p><strong>Due Date:</strong> {selectedJob.due_date}</p>
                <hr />
                <h6>Provider Info</h6>
                <p><strong>Name:</strong> {selectedJob.jobdata.name}</p>
                <p><strong>Position:</strong> {selectedJob.jobdata.position}</p>
                <p><strong>Organisation:</strong> {selectedJob.jobdata.organisation}</p>
                <p><strong>About Organisation:</strong> {selectedJob.jobdata.aboutorganisation}</p>
                <p><strong>Location:</strong> {selectedJob.jobdata.location}</p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={selectedJob.jobdata.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {selectedJob.jobdata.website}
                  </a>
                </p>
                <img
                  src={normalizeImageUrl(selectedJob.jobdata.images)}
                  alt={selectedJob.jobdata.organisation}
                  className="img-fluid mt-3"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedJob(null)}
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

export default ViewApprovedJob;
