import { useState } from "react"
import axios from "axios";
const Landing=()=>

{
    const[serviceData,setserviceData]=useState({
        Email:'',
        Password:''
    });
    const handleChange = (e) => {
        const {name , value} = e.target;
        setserviceData({
            ...serviceData,
            [name] : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/login',serviceData);
        console.log(response.data,'sssssssssssssssss');
        if(response.data.status == 'ok')
        {
        var id = response.data.id;
          console.log(id,'jjhjh')
           localStorage.setItem('id', id);
           localStorage.setItem('type', response.data.type);
           console.log(localStorage.getItem('id'),'sdsdsdsdsd',localStorage.getItem('type'));

          if(response.data.type == 'admin'){
           alert('Login Successfully!!')
            resetForm();
            window.location.href='/AdminHome';
          }
          if(response.data.type == 'provider'){
           alert('Login Successfully!!')
            resetForm();
            window.location.href='/ProviderHome';
          }
          if(response.data.type == 'seeker'){
           alert('Login Successfully!!')
            resetForm();
            window.location.href='/SeekerHome';
          }
        }
        else{
            alert('Invalid User name or Password')
            resetForm();
            window.location.href='/';
        }  
    };
    const resetForm = () => {
        setserviceData({
           Email:'',
           Password:''
        });
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
          <div className="site-logo col-6"><a href="/Landing">JobBoard</a></div>

          <nav className="mx-auto site-navigation">
            <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
              <li><a href="/Landing" className="nav-link active">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li className="has-children">
                <a href="/Landing">Job Listings</a>
                <ul className="dropdown">
                  <li><a href="job-single.html">Job Single</a></li>
                  <li><a href="post-job.html">Post a Job</a></li>
                </ul>
              </li>
              <li className="has-children">
                <a href="services.html">Pages</a>
                <ul className="dropdown">
                  <li><a href="services.html">Services</a></li>
                  <li><a href="service-single.html">Service Single</a></li>
                  <li><a href="blog-single.html">Blog Single</a></li>
                  <li><a href="portfolio.html">Portfolio</a></li>
                  <li><a href="portfolio-single.html">Portfolio Single</a></li>
                  <li><a href="testimonials.html">Testimonials</a></li>
                  <li><a href="faq.html">Frequently Ask Questions</a></li>
                  <li><a href="gallery.html">Gallery</a></li>
                </ul>
              </li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li className="d-lg-none"><a href="post-job.html"><span className="mr-2">+</span> Post a Job</a></li>
              <li className="d-lg-none"><a href="/Login">Log In</a></li>
            </ul>
          </nav>
          
          <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
            <div className="ml-auto">
              <a href="post-job.html" className="btn btn-outline-white border-width-2 d-none d-lg-inline-block"><span className="mr-2 icon-add"></span>Post a Job</a>
              <a href="/Login" className="btn btn-primary border-width-2 d-none d-lg-inline-block"><span className="mr-2 icon-lock_outline"></span>Log In</a>
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
              <h1 className="text-white font-weight-bold">The Easiest Way To Get Your Dream Job</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate est, consequuntur perferendis.</p>
            </div>
            <form method="post" className="search-jobs-form">
              <div className="row mb-5">
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                  <input type="text" className="form-control form-control-lg" placeholder="Job title, Company..."/>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                  <select className="selectpicker" data-style="btn-white btn-lg" data-width="100%" data-live-search="true" title="Select Region">
                    <option>Anywhere</option>
                    <option>San Francisco</option>
                    <option>Palo Alto</option>
                    <option>New York</option>
                    <option>Manhattan</option>
                    <option>Ontario</option>
                    <option>Toronto</option>
                    <option>Kansas</option>
                    <option>Mountain View</option>
                  </select>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                  <select className="selectpicker" data-style="btn-white btn-lg" data-width="100%" data-live-search="true" title="Select Job Type">
                    <option>Part Time</option>
                    <option>Full Time</option>
                  </select>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                  <button type="submit" className="btn btn-primary btn-lg btn-block text-white btn-search"><span className="icon-search icon mr-2"></span>Search Job</button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 popular-keywords">
                  <h3>Trending Keywords:</h3>
                  <ul className="keywords list-unstyled m-0 p-0">
                    <li><a href="#" className="">UI Designer</a></li>
                    <li><a href="#" className="">Python</a></li>
                    <li><a href="#" className="">Developer</a></li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <a href="#next" className="scroll-button smoothscroll">
        <span className=" icon-keyboard_arrow_down"></span>
      </a>

    </section>
    
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

    

    <section className="site-section">
      <div className="container">

        <div className="row mb-5 justify-content-center">
          <div className="col-md-7 text-center">
            <h2 className="section-title mb-2">43,167 Job Listed</h2>
          </div>
        </div>
        
        <ul className="job-listings mb-5">
          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <a href="job-single.html"></a>
            <div className="job-listing-logo">
              <img src={`${process.env.PUBLIC_URL}/images/job_logo_1.jpg`} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
            </div>

            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Product Designer</h2>
                <strong>Adidas</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room"></span> New York, New York
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-danger">Part Time</span>
              </div>
            </div>
            
          </li>
          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <a href="job-single.html"></a>
            <div className="job-listing-logo">
              <img src={`${process.env.PUBLIC_URL}/images/job_logo_2.jpg`} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
            </div>

            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Digital Marketing Director</h2>
                <strong>Sprint</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room"></span> Overland Park, Kansas 
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-success">Full Time</span>
              </div>
            </div>
          </li>

          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <a href="job-single.html"></a>
            <div className="job-listing-logo">
              <img src={`${process.env.PUBLIC_URL}/images/job_logo_3.jpg`} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
            </div>

            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Back-end Engineer (Python)</h2>
                <strong>Amazon</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room"></span> Overland Park, Kansas 
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-success">Full Time</span>
              </div>
            </div>
          </li>

          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <a href="job-single.html"></a>
            <div className="job-listing-logo">
              <img src={`${process.env.PUBLIC_URL}/images/job_logo_4.jpg`} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
            </div>

            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Senior Art Director</h2>
                <strong>Microsoft</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room"></span> Anywhere 
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-success">Full Time</span>
              </div>
            </div>
          </li>

          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <a href="job-single.html"></a>
            <div className="job-listing-logo">
              <img src={`${process.env.PUBLIC_URL}/images/job_logo_5.jpg`} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
            </div>

            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Product Designer</h2>
                <strong>Puma</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room"></span> San Mateo, CA 
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-success">Full Time</span>
              </div>
            </div>
          </li>
          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <a href="job-single.html"></a>
            <div className="job-listing-logo">
              <img src={`${process.env.PUBLIC_URL}/images/job_logo_1.jpg`} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
            </div>

            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Product Designer</h2>
                <strong>Adidas</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room"></span> New York, New York
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-danger">Part Time</span>
              </div>
            </div>
            
          </li>
          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <a href="job-single.html"></a>
            <div className="job-listing-logo">
              <img src={`${process.env.PUBLIC_URL}/images/job_logo_2.jpg`} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
            </div>

            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Digital Marketing Director</h2>
                <strong>Sprint</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room"></span> Overland Park, Kansas 
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-success">Full Time</span>
              </div>
            </div>
          </li>

          

          
        </ul>

        <div className="row pagination-wrap">
          <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
            <span>Showing 1-7 Of 43,167 Jobs</span>
          </div>
          <div className="col-md-6 text-center text-md-right">
            <div className="custom-pagination ml-auto">
              <a href="#" className="prev">Prev</a>
              <div className="d-inline-block">
              <a href="#" className="active">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              </div>
              <a href="#" className="next">Next</a>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section className="py-5 bg-image overlay-primary fixed overlay" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero_1.jpg`}}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h2 className="text-white">Looking For A Job?</h2>
            <p className="mb-0 text-white lead">Lorem ipsum dolor sit amet consectetur adipisicing elit tempora adipisci impedit.</p>
          </div>
          <div className="col-md-3 ml-auto">
            <a href="#" className="btn btn-warning btn-block btn-lg">Sign Up</a>
          </div>
        </div>
      </div>
    </section>

    
    <section className="site-section py-4">
      <div className="container">
  
        <div className="row align-items-center">
          <div className="col-12 text-center mt-4 mb-5">
            <div className="row justify-content-center">
              <div className="col-md-7">
                <h2 className="section-title mb-2">Company We've Helped</h2>
                <p className="lead">Porro error reiciendis commodi beatae omnis similique voluptate rerum ipsam fugit mollitia ipsum facilis expedita tempora suscipit iste</p>
              </div>
            </div>
            
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src={`${process.env.PUBLIC_URL}/images/logo_mailchimp.svg`} alt="Image" className="img-fluid logo-1"/>
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src={`${process.env.PUBLIC_URL}/images/logo_paypal.svg`} alt="Image" className="img-fluid logo-2"/>
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src={`${process.env.PUBLIC_URL}/images/logo_stripe.svg`} alt="Image" className="img-fluid logo-3"/>
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src={`${process.env.PUBLIC_URL}/images/logo_visa.svg`} alt="Image" className="img-fluid logo-4"/>
          </div>

          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src={`${process.env.PUBLIC_URL}/images/logo_apple.svg`} alt="Image" className="img-fluid logo-5"/>
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src={`${process.env.PUBLIC_URL}/images/logo_tinder.svg`} alt="Image" className="img-fluid logo-6"/>
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src={`${process.env.PUBLIC_URL}/images/logo_sony.svg`} alt="Image" className="img-fluid logo-7"/>
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src={`${process.env.PUBLIC_URL}/images/logo_airbnb.svg`} alt="Image" className="img-fluid logo-8"/>
          </div>
        </div>
      </div>
    </section>


    <section className="bg-light pt-5 testimony-full">
        <div className="owl-carousel single-carousel">

          <div className="container">
            <div className="row">
              <div className="col-lg-6 align-self-center text-center text-lg-left">
                <blockquote>
                  <p>&ldquo;Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae.&rdquo;</p>
                  <p><cite> &mdash; Corey Woods, @Dribbble</cite></p>
                </blockquote>
              </div>
              <div className="col-lg-6 align-self-end text-center text-lg-right">
                <img src={`${process.env.PUBLIC_URL}/images/person_transparent_2.png`} alt="Image" className="img-fluid mb-0"/>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-lg-6 align-self-center text-center text-lg-left">
                <blockquote>
                  <p>&ldquo;Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae.&rdquo;</p>
                  <p><cite> &mdash; Chris Peters, @Google</cite></p>
                </blockquote>
              </div>
              <div className="col-lg-6 align-self-end text-center text-lg-right">
                <img src={`${process.env.PUBLIC_URL}/images/person_transparent.png`} alt="Image" className="img-fluid mb-0"/>
              </div>
            </div>
          </div>

      </div>

    </section>

    <section className="pt-5 bg-image overlay-primary fixed overlay" style={{backgroundImage: `(url(${process.env.PUBLIC_URL}/images/hero_1.jpg')`}}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 align-self-center text-center text-md-left mb-5 mb-md-0">
            <h2 className="text-white">Get The Mobile Apps</h2>
            <p className="mb-5 lead text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit tempora adipisci impedit.</p>
            <p className="mb-0">
              <a href="#" className="btn btn-dark btn-md px-4 border-width-2"><span className="icon-apple mr-3"></span>App Store</a>
              <a href="#" className="btn btn-dark btn-md px-4 border-width-2"><span className="icon-android mr-3"></span>Play Store</a>
            </p>
          </div>
          <div className="col-md-6 ml-auto align-self-end">
            <img src={`${process.env.PUBLIC_URL}/images/apps.png`} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </div>
        </div>
      </div>
    </section>
    
    <footer className="site-footer">

      <a href="#top" className="smoothscroll scroll-top">
        <span className="icon-keyboard_arrow_up"></span>
      </a>

      <div className="container">
        <div className="row mb-5">
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Search Trending</h3>
            <ul className="list-unstyled">
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Graphic Design</a></li>
              <li><a href="#">Web Developers</a></li>
              <li><a href="#">Python</a></li>
              <li><a href="#">HTML5</a></li>
              <li><a href="#">CSS3</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Company</h3>
            <ul className="list-unstyled">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Career</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Resources</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Support</h3>
            <ul className="list-unstyled">
              <li><a href="#">Support</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Contact Us</h3>
            <div className="footer-social">
              <a href="#"><span className="icon-facebook"></span></a>
              <a href="#"><span className="icon-twitter"></span></a>
              <a href="#"><span className="icon-instagram"></span></a>
              <a href="#"><span className="icon-linkedin"></span></a>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-12">
            <p className="copyright"><small>
            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart text-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
            {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
            </small></p>
          </div>
        </div>
      </div>
    </footer>
  
  </div>


    </>);
}

export default Landing;