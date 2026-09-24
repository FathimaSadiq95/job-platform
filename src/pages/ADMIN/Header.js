import { useState } from "react"
import axios from "axios";
 const Header=()=>

{
   
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
              <li><a href="/AdminHome" className="nav-link active">Home</a></li>
              <li className="has-children">
                <a href="/Viewprovider#home">Provider</a>
                <ul className="dropdown">
                  <li><a href="Viewprovider#home">All providers</a></li>
                  <li><a href="Viewapprovedprovider#home">Approved Providers</a></li>
                </ul>
              </li>
              <li className="has-children">
                <a href="/Viewseeker#home">Seeker</a>
                <ul className="dropdown">
                  <li><a href="/Viewseeker#home">All Seekers</a></li>
                  <li><a href="/Viewapprovedseeker#home">Approved Seekers</a></li>
                </ul>
              </li>
              <li className="has-children">
                <a href="/Viewjob#home">Job</a>
                <ul className="dropdown">
                  <li><a href="/Viewjob#home">All Jobs</a></li>
                  <li><a href="/ViewApprovedJob#home">Approved Jobs</a></li>
                  <li><a href="/Viewapplication#home">Job Application</a></li>
                </ul>
              </li>
              <li className="has-children">
                <a href="/Viewjob.js">Feedback</a>
                <ul className="dropdown">
                  <li><a href="/Viewfeedbackprovider#home">Provider Feedback</a></li>
                  <li><a href="/Viewfeedbackseeker#home">Seeker Feedback</a></li>
                </ul>
              </li>
            </ul>
          </nav>
          
          <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
            <div className="ml-auto">
              <a href="/" className="btn btn-primary border-width-2 d-none d-lg-inline-block"><span className="mr-2 icon-lock_outline"></span>Log Out</a>
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

    

   </div>
    </>);
}

export default Header;