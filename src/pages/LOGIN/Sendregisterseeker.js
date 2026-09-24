import { useState } from "react";
import axios from "axios";
import Header from "../LOGIN/Header";
import Footer from "../LOGIN/Footer";

const Sendregisterseeker=()=>
{
const[serviceData,setserviceData]=useState({
         name:'',
            DOB:'',
            cv:'',
            photo:'',
            link:'',
            about:'',
            email:'',
            phone:'',
            password:'',
            confirm_password:''
    });

    const today = new Date();
    const eighteenthBirthday = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    const maximumDateOfBirth = [
      eighteenthBirthday.getFullYear(),
      String(eighteenthBirthday.getMonth() + 1).padStart(2, '0'),
      String(eighteenthBirthday.getDate()).padStart(2, '0')
    ].join('-');

    const handleChange = (e) => {
        const {name , value} = e.target;
        setserviceData({
            ...serviceData,
            [name] : value,
        });
    };

    const handleFileChange = (e) => {
      const { name, files } = e.target;
      setserviceData({
        ...serviceData,
        [name]: files[0],
      });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      if (serviceData.DOB > maximumDateOfBirth) {
        alert('You must be at least 18 years old to register.');
        return;
      }
        if(serviceData.password !== serviceData.confirm_password){
            alert('Passwords do not match!');
            return;
        }
      const formData = new FormData();
      Object.entries(serviceData).forEach(([name, value]) => {
        formData.append(name, value);
      });
      await axios.post('http://localhost:4000/Sendregisterseeker', formData)
        console.log(serviceData);
        alert('Registered Successfully!!')
        resetForm();
        window.location.href='/';
    };

    const resetForm = () => {
        setserviceData({
            name:'',
            DOB:'',
            cv:'',
            photo:'',
            link:'',
            about:'',
            email:'',
            phone:'',
            password:'',
            confirm_password:''
        });
    };
  return(<>
    <Header/>
    <section className="site-section bg-light py-5" id="next">
      <div className="container"><div className="row justify-content-center"><div className="col-lg-8">
        <div className="bg-white p-4 p-md-5 shadow-sm">
          <div className="text-center mb-4"><h2 className="section-title mb-2">Seeker Registration</h2><p className="text-muted mb-0">Create your professional profile.</p></div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3"><label htmlFor="name">Name</label><input type="text" name="name" id="name" className="form-control" onChange={handleChange} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed." /></div>
            <div className="form-group mb-3"><label htmlFor="dob">Date of Birth</label><input type="date" name="DOB" id="dob" className="form-control" max={maximumDateOfBirth} onChange={handleChange} required /></div>
            <div className="row"><div className="col-md-6 form-group mb-3"><label htmlFor="cv">CV</label><input type="file" name="cv" id="cv" className="form-control" onChange={handleFileChange} required /></div><div className="col-md-6 form-group mb-3"><label htmlFor="photo">Photo</label><input type="file" name="photo" id="photo" className="form-control" accept="image/*" onChange={handleFileChange} required /></div></div>
            <div className="form-group mb-3"><label htmlFor="link">Portfolio Link</label><input type="url" name="link" id="link" className="form-control" onChange={handleChange} required placeholder="https://example.com" /></div>
            <div className="form-group mb-3"><label htmlFor="about">About You</label><textarea name="about" id="about" className="form-control" rows="4" onChange={handleChange} required /></div>
            <div className="row"><div className="col-md-6 form-group mb-3"><label htmlFor="email">Email</label><input type="email" name="email" id="email" className="form-control" onChange={handleChange} required /></div><div className="col-md-6 form-group mb-3"><label htmlFor="phone">Phone</label><input type="tel" name="phone" id="phone" className="form-control" onChange={handleChange} required pattern="[0-9]{10}" maxLength="10" inputMode="numeric" title="Phone number must contain exactly 10 digits." /></div></div>
            <div className="row"><div className="col-md-6 form-group mb-3"><label htmlFor="password">Password</label><input type="password" name="password" id="password" className="form-control" onChange={handleChange} required minLength="8" /></div><div className="col-md-6 form-group mb-3"><label htmlFor="confirm_password">Confirm Password</label><input type="password" name="confirm_password" id="confirm_password" className="form-control" onChange={handleChange} required minLength="8" /></div></div>
            <button type="submit" className="btn btn-primary btn-block mt-3">Create Account</button>
          </form>
        </div>
      </div></div></div>
    </section>
    <Footer/>
  </>);
}

export default Sendregisterseeker;





