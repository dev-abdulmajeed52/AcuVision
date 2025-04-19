import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CandidateProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    experiences: [{ companyName: '', position: '', startDate: '', endDate: '' }],
    education: [{ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
    contactInfo: {
      email: '',
      phone: '',
      linkedin: '',
      portfolio: ''
    },
    profileImg: null,
    resume: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [name, setName] = useState('')

  useEffect (() => {
    const Uname = localStorage.getItem('name');
    setName(Uname)
    })



  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;
    
    if (name.includes('experiences') || name.includes('education') || name.includes('contactInfo')) {
      if (name.includes('experiences')) {
        const [_, idx, prop] = name.split('.');
        const newExperiences = [...formData.experiences];
        newExperiences[index][prop] = value;
        setFormData({ ...formData, experiences: newExperiences });
      } else if (name.includes('education')) {
        const [_, idx, prop] = name.split('.');
        const newEducation = [...formData.education];
        newEducation[index][prop] = value;
        setFormData({ ...formData, education: newEducation });
      } else if (name.includes('contactInfo')) {
        const [_, prop] = name.split('.');
        setFormData({
          ...formData,
          contactInfo: { ...formData.contactInfo, [prop]: value }
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { companyName: '', position: '', startDate: '', endDate: '' }]
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }]
    });
  };

  const removeExperience = (index) => {
    const newExperiences = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: newExperiences });
  };

  const removeEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('skills', formData.skills);
      data.append('experiences', JSON.stringify(formData.experiences));
      data.append('education', JSON.stringify(formData.education));
      data.append('contactInfo', JSON.stringify(formData.contactInfo));
      if (formData.profileImg) data.append('profileImg', formData.profileImg);
      if (formData.resume) data.append('resume', formData.resume);
  
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await api.post('/profile', data, config);
      setSuccess('Profile created successfully!');
      setFormData({
        name: '',
        skills: '',
        experiences: [{ companyName: '', position: '', startDate: '', endDate: '' }],
        education: [{ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
        contactInfo: {
          email: '',
          phone: '',
          linkedin: '',
          portfolio: ''
        },
        profileImg: null,
        resume: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Candidate Profile</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 mb-4">{success}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Skills (comma-separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Contact Information</label>
          <div className="border p-4 rounded">
            <input
              type="email"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="tel"
              name="contactInfo.phone"
              value={formData.contactInfo.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="url"
              name="contactInfo.linkedin"
              value={formData.contactInfo.linkedin}
              onChange={handleInputChange}
              placeholder="LinkedIn URL"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="url"
              name="contactInfo.portfolio"
              value={formData.contactInfo.portfolio}
              onChange={handleInputChange}
              placeholder="Portfolio URL"
              className="w-full p-2 border rounded mb-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Experience</label>
          {formData.experiences.map((exp, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <input
                type="text"
                name={`experiences.${index}.companyName`}
                value={exp.companyName}
                onChange={(e) => handleInputChange(e, index, 'experience')}
                placeholder="Company Name"
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="text"
                name={`experiences.${index}.position`}
                value={exp.position}
                onChange={(e) => handleInputChange(e, index, 'experience')}
                placeholder="Position"
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="date"
                name={`experiences.${index}.startDate`}
                value={exp.startDate}
                onChange={(e) => handleInputChange(e, index, 'experience')}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="date"
                name={`experiences.${index}.endDate`}
                value={exp.endDate}
                onChange={(e) => handleInputChange(e, index, 'experience')}
                className="w-full p-2 border rounded mb-2"
              />
              {formData.experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="text-blue-500"
          >
            Add Experience
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Education</label>
          {formData.education.map((edu, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <input
                type="text"
                name={`education.${index}.institution`}
                value={edu.institution}
                onChange={(e) => handleInputChange(e, index, 'education')}
                placeholder="Institution"
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="text"
                name={`education.${index}.degree`}
                value={edu.degree}
                onChange={(e) => handleInputChange(e, index, 'education')}
                placeholder="Degree"
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="text"
                name={`education.${index}.fieldOfStudy`}
                value={edu.fieldOfStudy}
                onChange={(e) => handleInputChange(e, index, 'education')}
                placeholder="Field of Study"
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="date"
                name={`education.${index}.startDate`}
                value={edu.startDate}
                onChange={(e) => handleInputChange(e, index, 'education')}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="date"
                name={`education.${index}.endDate`}
                value={edu.endDate}
                onChange={(e) => handleInputChange(e, index, 'education')}
                className="w-full p-2 border rounded mb-2"
              />
              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="text-blue-500"
          >
            Add Education
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Profile Image</label>
          <input
            type="file"
            name="profileImg"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Resume (PDF)</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            accept=".pdf"
            className="w-full p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Profile
        </button>
      </form>
    </div>
  );
};

export default CandidateProfileForm;