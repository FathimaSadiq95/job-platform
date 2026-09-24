
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { normalizeImageUrl } from "../../utils/imageUtils";

const getProviderImageUrl = (imagePath) => normalizeImageUrl(imagePath);

const Viewloginfeedbackprovider = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Viewfeedbackprovider");
        console.log("feedback data", response.data.data);
        setFeedbackData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFeedback();
  }, []);

  return (
    <>
      <Header />
      <section className="site-section">
        <div className="container" id="home">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">User Feedback</h2>
            </div>
          </div>

          <ul className="job-listings mb-5" style={{ overflow: "scroll" }}>
            {feedbackData.map((feedback, index) => (
              <li
                key={index}
                className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                onClick={() => setSelectedFeedback(feedback)}
                style={{ cursor: "pointer" }}
              >
                <div className="job-listing-logo">
                  <img
                    src={getProviderImageUrl(feedback.pdata?.profile_photo)}
                    alt={feedback.pdata?.name || "Provider"}
                    className="img-fluid"
                  />
                </div>

                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{feedback.pdata?.name || "Provider"}</h2>
                    <strong>{feedback.feed_back}</strong>
                  </div>
                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                  {feedback.date}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Modal */}
      {selectedFeedback && (
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
                <h5 className="modal-title">{selectedFeedback.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedFeedback(null)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={getProviderImageUrl(selectedFeedback.pdata?.profile_photo)}
                  alt={selectedFeedback.pdata?.name || "Provider"}
                  className="img-fluid mb-3"
                />
                <p><strong>Feedback:</strong> {selectedFeedback.feed_back}</p>
                <p><strong>Name:</strong> {selectedFeedback.pdata?.name}</p>
                <p><strong>Email:</strong> {selectedFeedback.pdata?.email}</p>
                <p><strong>Phone:</strong> {selectedFeedback.pdata?.phone}</p>
                <p><strong>Date:</strong> {selectedFeedback.date}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedFeedback(null)}
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

export default Viewloginfeedbackprovider;
