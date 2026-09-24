import { useState } from "react"
import axios from "axios";
 const Footer=()=>

{
   
    return( <>
    

    <section className="py-5 bg-image overlay-primary fixed overlay" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero_1.jpg`}}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h2 className="text-white">Looking For A Co-worker?</h2>
            <p className="mb-0 text-white lead">Lorem ipsum dolor sit amet consectetur adipisicing elit tempora adipisci impedit.</p>
          </div>
          <div className="col-md-3 ml-auto">
            <a href="/Sendregisterprovider" className="btn btn-warning btn-block btn-lg">Sign Up</a>
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
            <a href="/Sendregisterseeker" className="btn btn-warning btn-block btn-lg">Sign Up</a>
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
  
    </>);
}
export default Footer;