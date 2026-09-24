import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { normalizeImageUrl } from "../../utils/imageUtils";
const Updateregisterseeker=()=>
{
      const[serviceData,setserviceData]=useState({
                name:'',
                dateofbirth:'',
                cv:'',
                profilephoto:'',
                link:'',
                about:'',
                email:'',
                phone:'',
                date:'',
        });


   useEffect(() => {
      console.log("useEffect called");

      const id = localStorage.getItem("id");

      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/getseekerdata/${id}`);
          setserviceData(response.data);

          console.log("Response:", response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData(); // Call the function
      console.log("ID:", id);
}, []);

    const handleChange = (e) => {
        const {name , value} = e.target;
        setserviceData({
            ...serviceData,
            [name] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:4000/Updateregisterseeker', serviceData);
          alert('Profile updated successfully');
        } catch (error) {
          console.error('Error updating seeker profile:', error);
          alert('Unable to update profile');
        }
    };
  return(<>
    <Header/>
    <section className="site-section bg-light py-5" id="next">
      <div className="container"><div className="row justify-content-center"><div className="col-lg-8">
        <div className="bg-white p-4 p-md-5 shadow-sm">
          <div className="text-center mb-4"><h2 className="section-title mb-2">Update Profile</h2><p className="text-muted mb-0">Keep your professional details current.</p></div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3"><label htmlFor="name">Name</label><input type="text" name="name" id="name" className="form-control" value={serviceData.name} onChange={handleChange} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed." /></div>
            <div className="form-group mb-3"><label htmlFor="dateofbirth">Date of Birth</label><input type="date" name="dateofbirth" id="dateofbirth" className="form-control" value={serviceData.dateofbirth} onChange={handleChange} required /></div>
            <div className="form-group mb-3"><label htmlFor="link">Portfolio Link</label><input type="url" name="link" id="link" className="form-control" value={serviceData.link} onChange={handleChange} required placeholder="https://example.com" /></div>
            <div className="form-group mb-3"><label htmlFor="about">About You</label><textarea name="about" id="about" className="form-control" rows="4" value={serviceData.about} onChange={handleChange} required /></div>
            <div className="row"><div className="col-md-6 form-group mb-3"><label htmlFor="email">Email</label><input type="email" name="email" id="email" className="form-control" value={serviceData.email} onChange={handleChange} required /></div><div className="col-md-6 form-group mb-3"><label htmlFor="phone">Phone</label><input type="tel" name="phone" id="phone" className="form-control" value={serviceData.phone} onChange={handleChange} required pattern="[0-9]{10}" maxLength="10" inputMode="numeric" title="Phone number must contain exactly 10 digits." /></div></div>
            <div className="row"><div className="col-md-6 form-group mb-3"><label htmlFor="cv">CV file</label><input type="file" name="cv" id="cv" className="form-control" onChange={handleChange} />{normalizeImageUrl(serviceData.cv) && <a href={normalizeImageUrl(serviceData.cv)} target="_blank" rel="noopener noreferrer">View current CV</a>}</div><div className="col-md-6 form-group mb-3"><label htmlFor="profilephoto">Profile photo</label><input type="file" name="profilephoto" id="profilephoto" className="form-control" accept="image/*" onChange={handleChange} />{normalizeImageUrl(serviceData.profilephoto) && <a href={normalizeImageUrl(serviceData.profilephoto)} target="_blank" rel="noopener noreferrer">View current photo</a>}</div></div>
            <button type="submit" className="btn btn-primary btn-block mt-3">Update Profile</button>
          </form>
        </div>
      </div></div></div>
    </section>
    <Footer/>
  </>);
}

export default Updateregisterseeker;