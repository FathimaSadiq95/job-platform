import { useState } from "react"
import axios from "axios";
import API_URL from "../../api";
import Search from "../../components/Search/Search";

 const Header=()=>

{
   const [providerProfile, setProviderProfile] = useState(null);
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [isProfileLoading, setIsProfileLoading] = useState(false);

   const normalizeDisplayUrl = (path) => {
     if (!path) return '';
     if (path.startsWith('http')) return path;
     return `${API_URL}/${path.replace(/^\//, '')}`;
   };

   const handleProfileClick = async () => {
     setIsProfileOpen(true);
     const providerIds = [
       localStorage.getItem('id'),
       localStorage.getItem('uid')
     ].filter((id, index, ids) => id && ids.indexOf(id) === index);
     if (providerIds.length === 0) return;

     setIsProfileLoading(true);
     try {
       for (const providerId of providerIds) {
         try {
           const response = await axios.get(`${API_URL}/getproviderdata/${providerId}`);
           if (response.data) {
             setProviderProfile(response.data);
             break;
           }
         } catch (error) {
           if (providerId === providerIds[providerIds.length - 1]) {
             throw error;
           }
         }
       }
     } catch (error) {
       console.error('Error fetching provider profile:', error);
     } finally {
       setIsProfileLoading(false);
     }
   };
   
return( <>
<div id="overlayer"></div>
  <div className="loader">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
    

<div className="site-wrap">

    <div className="site-mobile-menu site-navbar-target">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close mt-3">
          <span className="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div className="site-mobile-menu-body"></div>
    </div>
     {/* <!-- .site-mobile-menu --> */}
    

    {/* <!-- NAVBAR --> */}
    <header className="site-navbar mt-3">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="site-logo col-6"><a href="index.html">JobBoard</a></div>

          <nav className="mx-auto site-navigation">
            <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
           
                  <li><a href="/Sendupdateprovider#next" className="nav-link active">Update Profile</a></li>
                  <li><a href="/Sendregisterjob#next" className="nav-link active">Add Job</a></li>
                   <li><a href="/Viewjobprovider#next" className="nav-link active">Job Listings</a></li>
                    <li className="has-children">
                      <a>Applications</a>
                      <ul className="dropdown">
                      <li><a href="/Viewapplicationprovider#next">All Applications</a></li>
                      <li><a href="/Viewselectedapplications#next">Selected Applications</a></li>
                    </ul>
                    </li>
              <li className="has-children">
                <a>More</a>
                <ul className="dropdown">
                   <li><a href="/Sendfeedback#next">SendFeedback</a></li>
                </ul>
              </li>
            </ul>
          </nav>
          
          <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
            <div className="ml-auto">
              <button
                type="button"
                className="btn btn-primary text-dark border-width-2 mr-2"
                onClick={handleProfileClick}
                aria-label="View provider profile"
                title="View provider profile"
              >
                <span className="icon-account_circle text-white"></span>
              </button>
              <a href="/#Home" className="btn btn-primary border-width-2 d-none d-lg-inline-block"><span className="mr-2 icon-lock_outline"></span>Log Out</a>
            </div>
            <a href="#" className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"><span className="icon-menu h3 m-0 p-0 mt-2"></span></a>
          </div>

        </div>
      </div>
    </header>

    {/* <!-- HOME --> */}
    <section className="home-section section-hero overlay bg-image"  style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero_1.jpg)`, }}  id="home-section">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-12">
            <div className="mb-5 text-center">
              <h1 className="text-white font-weight-bold">Where Talent Meets Opportunity</h1>
              <p>Explore the right jobs, showcase your skills, connect with employers, and discover talented professionals—all in one place.</p>
            </div>
            <Search mode="candidate" />
          </div>
        </div>
      </div>

      <a href="#next" className="scroll-button smoothscroll">
        <span className=" icon-keyboard_arrow_down"></span>
      </a>

    </section>
    
    <section className="py-5 bg-image overlay-primary fixed overlay" id="next" style={{backgroundImage: 'url(${process.env.PUBLIC_URL}images/hero_1.jpg'}} id="next">
    
    </section>

    {isProfileOpen && (
      <div
        role="presentation"
        onClick={() => setIsProfileOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1050,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="provider-profile-title"
          className="bg-white shadow-lg p-4"
          onClick={(event) => event.stopPropagation()}
          style={{ width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 id="provider-profile-title" className="mb-0">Provider Profile</h4>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setIsProfileOpen(false)}
              aria-label="Close provider profile"
            >
              <span className="icon-close2"></span>
            </button>
          </div>
          {isProfileLoading && <p className="text-muted mb-0">Loading profile...</p>}
          {!isProfileLoading && providerProfile && (
            <>
              {(providerProfile.profile_photo || providerProfile.images) && (
                <img
                  src={normalizeDisplayUrl(providerProfile.profile_photo || providerProfile.images)}
                  alt={providerProfile.name || 'Provider profile'}
                  className="img-fluid mb-3"
                  style={{ width: 110, height: 110, objectFit: 'cover', borderRadius: '50%' }}
                />
              )}
              <h5>{providerProfile.name}</h5>
              <p className="mb-2"><strong>Post:</strong> {providerProfile.position}</p>
              <p className="mb-2"><strong>Organisation:</strong> {providerProfile.organisation}</p>
              <p className="mb-2"><strong>About:</strong> {providerProfile.aboutyou}</p>
              <p className="mb-2"><strong>About Organisation:</strong> {providerProfile.aboutorganisation}</p>
              <p className="mb-2"><strong>Location:</strong> {providerProfile.location}</p>
              <p className="mb-2"><strong>Address:</strong> {providerProfile.address}</p>
              <p className="mb-2"><strong>Website:</strong> <a href={providerProfile.website} target="_blank" rel="noreferrer">{providerProfile.website}</a></p>
              <p className="mb-2"><strong>Email:</strong> {providerProfile.email}</p>
              <p className="mb-0"><strong>Phone:</strong> {providerProfile.phone}</p>
            </>
          )}
          {!isProfileLoading && !providerProfile && (
            <p className="text-muted mb-0">Profile details are not available.</p>
          )}
        </div>
      </div>
    )}

   </div>
    </>);
}

export default Header;