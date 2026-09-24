import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { normalizeImageUrl } from "../../utils/imageUtils";

const Viewprovider = () => {
  const [providerData, setProviderData] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Viewprovider");
        setProviderData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getService();
  }, []);

  const handleApprove = async (id) => {
    setSelectedProvider(null)
  try {
    await axios.get(`http://localhost:4000/approveProvider/${id}`);
        setSelectedProvider(null)
        window.location.href='/Viewprovider';

  } catch (error) {
    console.error("Error approving provider:", error);
  }
}
   const handleReject = async (id) => {
    alert('Hiiiiiiiiiiiiiiiiiiii')
    setSelectedProvider(null)
  try {
    await axios.get(`http://localhost:4000/rejectProvider/${id}`);
        setSelectedProvider(null)
        window.location.href = '/Viewprovider'

  } catch (error) {
    console.error("Error approving provider:", error);
  }
  
};
  return (
    <>
      <Header />
      <section className="site-section">
        <div className="container" id="home">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2"> Provider List</h2>
            </div>
          </div>

          <ul className="job-listings mb-5" style={{ overflow: "scroll" }}>
            {providerData.map((provider, index) => (
              <li
                key={index}
                className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                onClick={() => setSelectedProvider(provider)} // open modal
                style={{ cursor: "pointer" }}
              >
                <div className="job-listing-logo">
                  {normalizeImageUrl(provider.images) ? <img src={normalizeImageUrl(provider.images)} alt={provider.name} className="img-fluid" /> : <div className="bg-light" style={{ width: 96, height: 96 }} />}
                </div>

                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{provider.name}</h2>
                    <strong>{provider.position}</strong>
                  </div>
                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                    <span className="icon-room"></span> {provider.location}
                  </div>
                  <div className="job-listing-meta">
                   <button onClick={(event) => { event.stopPropagation(); handleApprove(provider.logindata._id); }}
                    className="btn btn-success" >
                   Approve
                </button>
               </div>
               <div className="job-listing-meta">
                   <button onClick={(event) => { event.stopPropagation(); handleReject(provider.logindata._id); }}
                    className="btn btn-danger">
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
      {selectedProvider && (
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
                <h5 className="modal-title">{selectedProvider.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProvider(null)}
                ></button>
              </div>
              <div className="modal-body">
                {normalizeImageUrl(selectedProvider.images) ? <img src={normalizeImageUrl(selectedProvider.images)} alt={selectedProvider.name} className="img-fluid mb-3" /> : <p className="text-muted">Provider image is not available.</p>}
                <p><strong>Post:</strong> {selectedProvider.position}</p>
                <p><strong>About:</strong> {selectedProvider.aboutyou}</p>
                <p><strong>Organisation:</strong> {selectedProvider.organisation}</p>
                <p><strong>About Org:</strong> {selectedProvider.aboutorganisation}</p>
                <p><strong>Website:</strong> <a href={selectedProvider.website} target="_blank" rel="noreferrer">{selectedProvider.website}</a></p>
                <p><strong>Email:</strong> {selectedProvider.email}</p>
                <p><strong>Phone:</strong> {selectedProvider.phone}</p>
                <p><strong>Date:</strong> {selectedProvider.date}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedProvider(null)}
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

export default Viewprovider;
