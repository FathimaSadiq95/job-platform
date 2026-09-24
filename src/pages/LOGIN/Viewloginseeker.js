
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const Viewaloginseeker = () => {
  const [seekerData, setSeekerData] = useState([]);
  const [selectedSeeker, setSelectedSeeker] = useState(null);

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Viewapprovedseeker");
        console.log("approved seeker", response.data.data);
        setSeekerData(response.data.data);
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
              <h2 className="section-title mb-2">Approved Job Seekers</h2>
            </div>
          </div>

          <ul className="job-listings mb-5" style={{ overflow: "scroll" }}>
            {seekerData.map((seeker, index) => (
              <li
                key={index}
                className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                onClick={() => setSelectedSeeker(seeker)} // open modal
                style={{ cursor: "pointer" }}
              >
                <div className="job-listing-logo">
                  <img
                    src={seeker.profilephoto}
                    alt={seeker.name}
                    className="img-fluid"
                  />
                </div>

                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{seeker.name}</h2>
                    <strong>{seeker.link}</strong>
                  </div>
                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                    <span className="icon-room"></span> {seeker.email}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Modal */}
      {selectedSeeker && (
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
                <h5 className="modal-title">{selectedSeeker.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedSeeker(null)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedSeeker.profilephoto}
                  alt={selectedSeeker.name}
                  className="img-fluid mb-3"
                />
                <p><strong>Date of Birth:</strong> {selectedSeeker.dateofbirth}</p>
                <p><strong>About:</strong> {selectedSeeker.aboutyou}</p>
                <p><strong>CV:</strong> <a href={selectedSeeker.cv} target="_blank" rel="noreferrer">View CV</a></p>
                <p><strong>Portfolio Link:</strong> <a href={selectedSeeker.link} target="_blank" rel="noreferrer">{selectedSeeker.link}</a></p>
                <p><strong>Email:</strong> {selectedSeeker.email}</p>
                <p><strong>Phone:</strong> {selectedSeeker.phone}</p>
                <p><strong>Date Joined:</strong> {selectedSeeker.date}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedSeeker(null)}
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

export default Viewaloginseeker;


