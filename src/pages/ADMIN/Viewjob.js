
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { normalizeImageUrl } from "../../utils/imageUtils";

const Viewjob = () => {
  const [jobData, setJobData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await axios.get("http://localhost:4000/ViewjobAdmin");
        setJobData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getService();
  }, []);

  const handleApprove = async (id) => {
    setSelectedJob(null);
    try {
      await axios.get(`http://localhost:4000/approveJob/${id}`);
      setSelectedJob(null);
      window.location.href = "/Viewjob";
    } catch (error) {
      console.error("Error approving job:", error);
    }
  };

  const handleReject = async (id) => {
    setSelectedJob(null);
    try {
      await axios.get(`http://localhost:4000/rejectJob/${id}`);
      setSelectedJob(null);
      window.location.href = "/Viewjob";
    } catch (error) {
      console.error("Error rejecting job:", error);
    }
  };

  const getProviderImage = (provider) =>
    normalizeImageUrl(provider?.images || provider?.profile_photo);

  return (
    <>
      <Header />
      <section className="site-section">
        <div className="container" id="home">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">Job List</h2>
            </div>
          </div>

          <ul className="job-listings mb-5" style={{ overflow: "scroll" }}>
            {jobData.map((job, index) => (
              <li
                key={index}
                className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                onClick={() => setSelectedJob(job)}
                style={{ cursor: "pointer" }}
              >
                <div className="job-listing-logo">
                  <img
                    src={getProviderImage(job.pdata)}
                    alt={job.pdata?.name}
                    className="img-fluid"
                  />
                </div>

                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{job.post}</h2>
                    <strong>{job.pdata?.organisation}</strong>
                  </div>
                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                    <span className="icon-room"></span> {job.pdata?.location}
                  </div>
                  <div className="job-listing-meta">
                    <button
                      onClick={(event) => { event.stopPropagation(); handleApprove(job._id); }}
                      className="btn btn-success"
                    >
                      Approve
                    </button>
                  </div>
                  <div className="job-listing-meta">
                    <button
                      onClick={(event) => { event.stopPropagation(); handleReject(job._id); }}
                      className="btn btn-danger"
                    >
                      Reject
                    </button>
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
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">{selectedJob.post}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedJob(null)}
                ></button>
              </div>
              <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <p><strong>About Job:</strong> {selectedJob.about}</p>
                <p><strong>No. of Positions:</strong> {selectedJob.no_of_vacancies ?? selectedJob.no_of_positions}</p>
                <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
                <p><strong>From Date:</strong> {selectedJob.from_date}</p>
                <p><strong>Due Date:</strong> {selectedJob.due_date}</p>
                <hr />
                <h6>Provider Details</h6>
                <img
                  src={getProviderImage(selectedJob.pdata)}
                  alt={selectedJob.pdata?.name}
                  className="img-fluid mb-3"
                />
                <p><strong>Name:</strong> {selectedJob.pdata?.name}</p>
                <p><strong>Post:</strong> {selectedJob.pdata?.position}</p>
                <p><strong>Organisation:</strong> {selectedJob.pdata?.organisation}</p>
                <p><strong>About Org:</strong> {selectedJob.pdata?.aboutorganisation}</p>
                <p><strong>Website:</strong> <a href={selectedJob.pdata?.website} target="_blank" rel="noreferrer">{selectedJob.pdata?.website}</a></p>
                <p><strong>Location:</strong> {selectedJob.pdata?.location}</p>
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

export default Viewjob;
