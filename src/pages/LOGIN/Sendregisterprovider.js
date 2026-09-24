import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const Sendregisterprovider = () => {
  const [serviceData, setserviceData] = useState({
    name: '',
    profile_photo: null,
    post: '',
    organization: '',
    about_you: '',
    about_org: '',
    images: null,
    address: '',
    website: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    location: ''
  });

  const [profilePreview, setProfilePreview] = useState('');
  const [companyPreview, setCompanyPreview] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const nextValue = files ? files[0] : value;

    setserviceData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (files && files[0]) {
      const previewUrl = URL.createObjectURL(files[0]);
      if (name === 'profile_photo') {
        setProfilePreview(previewUrl);
      }
      if (name === 'images') {
        setCompanyPreview(previewUrl);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(serviceData).forEach(([name, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(name, value);
      }
    });

    await axios.post('http://localhost:4000/Sendregisterprovider', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    alert('Registered Successfully!!');
    resetForm();
    window.location.href = '/';
  };

  const resetForm = () => {
    setserviceData({
      name: '',
      profile_photo: null,
      post: '',
      organization: '',
      about_you: '',
      about_org: '',
      images: null,
      address: '',
      website: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      location: ''
    });
    setProfilePreview('');
    setCompanyPreview('');
  };

  return (
    <>
      <Header />
      <section className="site-section bg-light py-5" id="next">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="bg-white p-4 p-md-5 shadow-sm">
                <div className="text-center mb-4"><h2 className="section-title mb-2">Provider Registration</h2><p className="text-muted mb-0">Create your company profile.</p></div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
              <table className="table table-borderless mb-0" width="588" height="526">
                <tbody>
                  <tr>
                    <th scope="row">NAME</th>
                    <td>
                      <input type="text" name="name" id="textfield" onChange={handleChange} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed between words." />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">PROFILE PHOTO</th>
                    <td>
                      <input type="file" name="profile_photo" id="fileField" accept="image/*" onChange={handleChange} required />
                      {profilePreview && (
                        <img src={profilePreview} alt="Profile preview" style={{ width: 80, height: 80, objectFit: 'cover', marginTop: 10, borderRadius: 8 }} />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">POST</th>
                    <td>
                      <input type="text" name="post" id="textfield2" onChange={handleChange} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed between words." />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">ORGANIZATION</th>
                    <td>
                      <input type="text" name="organization" id="textfield3" onChange={handleChange} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed between words." />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">ABOUT-YOU</th>
                    <td>
                      <textarea name="about_you" id="textarea" cols="45" rows="5" onChange={handleChange} required></textarea>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">ABOUT ORG</th>
                    <td>
                      <textarea name="about_org" id="textarea2" cols="45" rows="5" onChange={handleChange} required></textarea>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">IMAGES</th>
                    <td>
                      <input type="file" name="images" id="fileField2" accept="image/*" onChange={handleChange} required />
                      {companyPreview && (
                        <img src={companyPreview} alt="Company preview" style={{ width: 120, height: 80, objectFit: 'cover', marginTop: 10, borderRadius: 8 }} />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">ADDRESS</th>
                    <td>
                      <input type="text" name="address" id="textfield5" onChange={handleChange} required minLength="3" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">LOCATION</th>
                    <td>
                      <input type="text" name="location" id="locationField" onChange={handleChange} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed between words." />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">WEBSITE</th>
                    <td>
                      <input type="url" name="website" id="websiteField" onChange={handleChange} required placeholder="https://example.com" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">EMAIL</th>
                    <td>
                      <input type="email" name="email" id="textfield6" onChange={handleChange} required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}" title="Enter a valid email address, for example email@gmail.com." />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">PHONE</th>
                    <td>
                      <input type="tel" name="phone" id="textfield7" onChange={handleChange} required pattern="[0-9]{10}" maxLength="10" inputMode="numeric" title="Phone number must contain exactly 10 digits." />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">PASSWORD</th>
                    <td>
                      <input type="password" name="password" id="passwordField" onChange={handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">CONFIRM PASSWORD</th>
                    <td>
                      <input type="password" name="confirm_password" id="confirmPasswordField" onChange={handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2" scope="row">
                      <input className="btn btn-warning btn-block btn-lg" type="submit" name="button" id="button" value="Submit" />
                    </th>
                  </tr>
                </tbody>
              </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Sendregisterprovider;