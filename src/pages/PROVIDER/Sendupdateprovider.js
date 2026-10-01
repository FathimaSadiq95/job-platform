import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import API_URL from '../../api';

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
        const response = await axios.get(`${API_URL}/getproviderdata/${id}`);
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

    await axios.post(`${API_URL}/Sendupdateprovider/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    alert('Service Updated Successfully!!');
    window.location.href = '/Sendupdateprovider';
  };

  const normalizeDisplayUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${API_URL}/${path.replace(/^\//, '')}`;
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
      <Footer />
    </>
  );
};

export default Sendupdateprovider;


