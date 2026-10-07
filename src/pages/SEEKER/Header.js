import { useState } from "react"
import axios from "axios";
import { normalizeImageUrl } from "../../utils/imageUtils";
import API_URL from "../../api";
import Search from "../../components/Search/Search";
 const Header=()=>

{
    const [seekerProfile, setSeekerProfile] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);

    const handleProfileClick = async () => {
      setIsProfileOpen(true);
      setIsProfileLoading(true);

      const seekerIds = [
        localStorage.getItem('id'),
        localStorage.getItem('uid')
      ].filter((id, index, ids) => id && ids.indexOf(id) === index);

      try {
        for (const seekerId of seekerIds) {
          try {
            const response = await axios.get(`${API_URL}/getseekerdata/${seekerId}`);
            if (response.data) {
              setSeekerProfile(response.data);
              break;
            }
          } catch (error) {
            if (seekerId === seekerIds[seekerIds.length - 1]) throw error;
          }
        }
      } catch (error) {
        console.error('Error fetching seeker profile:', error);
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
          <div className="site-logo col-6"><a href="/SeekerHome">JobBoard</a></div>

          <nav className="mx-auto site-navigation">
            <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
              <li><a href="/SeekerHome" className="nav-link active">Home</a></li>
              <li>
                <a href="/Updateregisterseeker#next">Update Profile</a></li>

              <li className="has-children">Jobs
                <ul className="dropdown">
                  <li><a href="/Viewjobseeker#next">All Jobs</a></li>
                  <li><a href="/Viewapplicationseeker#next">Applied Jobs</a></li>
                </ul>
              </li>

              <li><a href="/Sendfeedbackseeker#next">Send Feedback</a></li>

            </ul>
            
             
          </nav>
          
          
          <div className="right-cta-menu text-right d-flex align-items-center col-6">
            <div className="ml-auto">
                 <button
                  type="button"
                  className="btn btn-primary text-dark border-width-2 mr-2"
                  onClick={handleProfileClick}
                  aria-label="View seeker profile"
                  title="View seeker profile"
                  >
                  <span className="icon-account_circle text-white"></span>
                  </button>
              
              <a href="/#home" className="btn btn-primary border-width-2 d-none d-lg-inline-block"><span className="mr-2 icon-lock_outline"></span>Log Out</a>
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
           <Search mode="job" />
          </div>
        </div>
      </div>

      <a href="#next" className="scroll-button smoothscroll">
        <span className=" icon-keyboard_arrow_down"></span>
      </a>

    </section>

    {isProfileOpen && (
      <div
        role="presentation"
        onClick={() => setIsProfileOpen(false)}
        style={{ position: 'fixed', inset: 0, zIndex: 1050, backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="seeker-profile-title"
          className="bg-white shadow-lg p-4"
          onClick={(event) => event.stopPropagation()}
          style={{ width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 id="seeker-profile-title" className="mb-0">Seeker Profile</h4>
            <button type="button" className="btn btn-light" onClick={() => setIsProfileOpen(false)} aria-label="Close seeker profile">
              <span className="icon-close2"></span>
            </button>
          </div>
          {isProfileLoading && <p className="text-muted mb-0">Loading profile...</p>}
          {!isProfileLoading && seekerProfile && (
            <>
              {normalizeImageUrl(seekerProfile.profilephoto) && (
                <img src={normalizeImageUrl(seekerProfile.profilephoto)} alt={seekerProfile.name || 'Seeker profile'} className="img-fluid mb-3" style={{ width: 110, height: 110, objectFit: 'cover', borderRadius: '50%' }} />
              )}
              <h5>{seekerProfile.name}</h5>
              <p className="mb-2"><strong>Date of Birth:</strong> {seekerProfile.dateofbirth}</p>
              <p className="mb-2"><strong>About:</strong> {seekerProfile.about}</p>
              <p className="mb-2"><strong>Email:</strong> {seekerProfile.email}</p>
              <p className="mb-2"><strong>Phone:</strong> {seekerProfile.phone}</p>
              <p className="mb-2"><strong>Portfolio:</strong> <a href={seekerProfile.link} target="_blank" rel="noreferrer">{seekerProfile.link}</a></p>
              <p className="mb-0"><strong>CV:</strong> {normalizeImageUrl(seekerProfile.cv) ? <a href={normalizeImageUrl(seekerProfile.cv)} target="_blank" rel="noreferrer">View CV</a> : 'Not available'}</p>
            </>
          )}
          {!isProfileLoading && !seekerProfile && <p className="text-muted mb-0">Profile details are not available.</p>}
        </div>
      </div>
    )}
    
    <section className="py-5 bg-image overlay-primary fixed overlay" id="next" style={{backgroundImage: 'url(${process.env.PUBLIC_URL}images/hero_1.jpg'}}>
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-md-7 text-center">
            <h2 className="section-title mb-2 text-white">JobBoard Site Stats</h2>
            <p className="lead text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita unde officiis recusandae sequi excepturi corrupti.</p>
          </div>
        </div>
        <div className="row pb-0 block__19738 section-counter">

          <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <strong className="number" data-number="1930">0</strong>
            </div>
            <span className="caption">Candidates</span>
          </div>

          <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <strong className="number" data-number="54">0</strong>
            </div>
            <span className="caption">Jobs Posted</span>
          </div>

          <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <strong className="number" data-number="120">0</strong>
            </div>
            <span className="caption">Jobs Filled</span>
          </div>

          <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <strong className="number" data-number="550">0</strong>
            </div>
            <span className="caption">Companies</span>
          </div>

            
        </div>
      </div>
    </section>

    

   </div>
    </>);
}

export default Header;