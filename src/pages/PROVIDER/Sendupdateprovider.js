import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const Sendupdateprovider = () => {
  const [serviceData, setServiceData] = useState({
    name: '',
    position: '',
    organisation: '',
    aboutorganisation: '',
    aboutyou: '',
    images: '',
    location: '',
    website: '',
    email: '',
    phone: '',
    profile_photo: '',
    address: '',
    login_id: '',
  });

  const [profilePreview, setProfilePreview] = useState('');
  const [companyPreview, setCompanyPreview] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('id');

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getproviderdata/${id}`);
        if (response.data) {
          setServiceData(response.data);
          setProfilePreview(response.data.profile_photo || '');
          setCompanyPreview(response.data.images || '');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const nextValue = files ? files[0] : value;

    setServiceData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (files && files[0]) {
      const previewUrl = URL.createObjectURL(files[0]);
      if (name === 'profile_photo') setProfilePreview(previewUrl);
      if (name === 'images') setCompanyPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem('uid');
    const formData = new FormData();

    Object.entries(serviceData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });

    await axios.post(`http://localhost:4000/Sendupdateprovider/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    alert('Service Updated Successfully!!');
    window.location.href = '/Sendupdateprovider';
  };

  const normalizeDisplayUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://localhost:4000/${path.replace(/^\//, '')}`;
  };

  return (
    <>
      <Header />
      <section className="site-section bg-light py-5" id="next">
        <div className="container"><div className="row justify-content-center"><div className="col-lg-8"><div className="bg-white p-4 p-md-5 shadow-sm">
          <div className="text-center mb-4"><h2 className="section-title mb-2">Update Provider Profile</h2><p className="text-muted mb-0">Keep your company information current.</p></div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group mb-3"><label htmlFor="provider-name">Name</label><input type="text" name="name" id="provider-name" className="form-control" value={serviceData.name} onChange={handleChange} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed." /></div>
            <div className="form-group mb-3"><label htmlFor="provider-position">Post</label><input type="text" name="position" id="provider-position" className="form-control" value={serviceData.position} onChange={handleChange} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed." /></div>
            <div className="form-group mb-3"><label htmlFor="provider-organisation">Organization</label><input type="text" name="organisation" id="provider-organisation" className="form-control" value={serviceData.organisation} onChange={handleChange} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed." /></div>
            <div className="form-group mb-3"><label htmlFor="aboutyou">About You</label><textarea name="aboutyou" id="aboutyou" className="form-control" rows="4" value={serviceData.aboutyou} onChange={handleChange} required /></div>
            <div className="form-group mb-3"><label htmlFor="aboutorganisation">About Organization</label><textarea name="aboutorganisation" id="aboutorganisation" className="form-control" rows="4" value={serviceData.aboutorganisation} onChange={handleChange} required /></div>
            <div className="row"><div className="col-md-6 form-group mb-3"><label htmlFor="provider-location">Location</label><input type="text" name="location" id="provider-location" className="form-control" value={serviceData.location} onChange={handleChange} required minLength="3" pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use at least 3 letters; spaces are allowed." /></div><div className="col-md-6 form-group mb-3"><label htmlFor="address">Address</label><input type="text" name="address" id="address" className="form-control" value={serviceData.address} onChange={handleChange} required minLength="3" /></div></div>
            <div className="form-group mb-3"><label htmlFor="website">Website</label><input type="url" name="website" id="website" className="form-control" value={serviceData.website} onChange={handleChange} required placeholder="https://example.com" /></div>
            <div className="row"><div className="col-md-6 form-group mb-3"><label htmlFor="provider-email">Email</label><input type="email" name="email" id="provider-email" className="form-control" value={serviceData.email} onChange={handleChange} required /></div><div className="col-md-6 form-group mb-3"><label htmlFor="provider-phone">Phone</label><input type="tel" name="phone" id="provider-phone" className="form-control" value={serviceData.phone} onChange={handleChange} required pattern="[0-9]{10}" maxLength="10" inputMode="numeric" title="Phone number must contain exactly 10 digits." /></div></div>
            <div className="row"><div className="col-md-6 form-group mb-3"><label htmlFor="images">Organization Image</label><input type="file" name="images" id="images" className="form-control" accept="image/*" onChange={handleChange} /></div><div className="col-md-6 form-group mb-3"><label htmlFor="profile_photo">Profile Photo</label><input type="file" name="profile_photo" id="profile_photo" className="form-control" accept="image/*" onChange={handleChange} /></div></div>
            <button type="submit" className="btn btn-primary btn-block mt-3">Update Profile</button>
          </form>
        </div></div></div></div>
      </section>
      {/* Existing preview markup retained below for compatibility. */}
      {/* <form onSubmit={handleSubmit} encType="multipart/form-data">
          <table width="588" height="526" border="1">
          <tbody>
            <tr>
              <th scope="row">NAME</th>
              <td>
                <input type="text" name="name" id="textfield" value={serviceData.name} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th scope="row">POST</th>
              <td>
                <input type="text" name="position" id="textfield2" value={serviceData.position} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th scope="row">ORGANIZATION</th>
              <td>
                <input type="text" name="organisation" id="textfield3" value={serviceData.organisation} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th scope="row">ABOUT-YOU</th>
              <td>
                <textarea name="aboutyou" id="textarea" cols="45" rows="5" value={serviceData.aboutyou} onChange={handleChange} required></textarea>
              </td>
            </tr>
            <tr>
              <th scope="row">ABOUT ORG</th>
              <td>
                <textarea name="aboutorganisation" id="textarea2" cols="45" rows="5" value={serviceData.aboutorganisation} onChange={handleChange} required></textarea>
              </td>
            </tr>
            <tr>
              <th scope="row">IMAGES</th>
              <td>
                {companyPreview && (
                  <img src={normalizeDisplayUrl(companyPreview)} alt="Company preview" style={{ width: 120, height: 80, objectFit: 'cover', display: 'block', marginBottom: 8 }} />
                )}
                <input type="file" name="images" id="fileField2" accept="image/*" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th scope="row">LOCATION</th>
              <td>
                <input type="text" name="location" id="textfield4" value={serviceData.location} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th scope="row">WEBSITE</th>
              <td>
                <input type="url" name="website" id="textfield5" value={serviceData.website} onChange={handleChange} required placeholder="https://example.com" />
              </td>
            </tr>
            <tr>
              <th scope="row">ADDRESS</th>
              <td>
                <input type="text" name="address" id="addressField" value={serviceData.address} onChange={handleChange} required minLength="3" />
              </td>
            </tr>
            <tr>
              <th scope="row">EMAIL</th>
              <td>
                <input type="email" name="email" id="textfield6" value={serviceData.email} onChange={handleChange} required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}" title="Enter a valid email address, for example email@gmail.com." />
              </td>
            </tr>
            <tr>
              <th scope="row">PHONE</th>
              <td>
                <input type="tel" name="phone" id="textfield7" value={serviceData.phone} onChange={handleChange} required pattern="[0-9]{10}" maxLength="10" inputMode="numeric" title="Phone number must contain exactly 10 digits." />
              </td>
            </tr>
            <tr>
              <th scope="row">PHOTO</th>
              <td>
                {profilePreview && (
                  <img src={normalizeDisplayUrl(profilePreview)} alt="Profile preview" style={{ width: 80, height: 80, objectFit: 'cover', display: 'block', marginBottom: 8, borderRadius: 8 }} />
                )}
                <input type="file" name="profile_photo" id="fileField3" accept="image/*" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th colSpan="2" scope="row">
                <input type="submit" name="button" id="button" value="Update" />
              </th>
            </tr>
          </tbody>
        </table>
      </form> */}
      <Footer />
    </>
  );
};

export default Sendupdateprovider;


