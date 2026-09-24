import { useState , useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const Viewloginprovider =()=>{
   const[providerData, setproviderData ] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
            useEffect(() => {
                const getService = async() => {
                    try{
                        const response = await axios.get('http://localhost:4000/Viewapprovedprovider');
                        console.log('approved provider',response.data.data)
                        setproviderData(response.data.data);
                    }
                    catch(error){
                        console.error(error);
                    }
                };
                getService();
            }, []); 
  return(
  <>
  <Header/>
        <section className="site-section">
        <div className="container" id="home">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">43,167 Job Listed</h2>
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
                  <img
                    src={provider.images}
                    alt={provider.name}
                    className="img-fluid"
                  />
                </div>

                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{provider.name}</h2>
                    <strong>{provider.position}</strong>
                  </div>
                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                    <span className="icon-room"></span> {provider.location}
                  </div>
                </div>
              </li>
            ))}

        </ul>
        </div>
      </section>
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
                <img
                  src={selectedProvider.images}
                  alt={selectedProvider.name}
                  className="img-fluid mb-3"
                />
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
<Footer/>
</>
);
}

export default Viewloginprovider;