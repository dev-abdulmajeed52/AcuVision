import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Profile = () => {
  const [data, setData] = useState({
    name: '',
    skills: [],
    experiences: [],
    education: [],
    contactInfo: { email: '', phone: '', linkedin: '', portfolio: '' },
    profileImg: null,
    totalExperienceYears: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const dummyBanner = 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const dummyAvatar = 'https://images.unsplash.com/photo-1599110906885-b024c90c2773?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Profile data:', response.data); 
      setData(response.data);
    } catch (error) {
      setError('Failed to fetch profile data');
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };
  const calculateProfileCompletion = () => {
    let completedFields = 0;
    const totalFields = 7;
    if (data.name) completedFields++;
    if (data.skills?.length > 0) completedFields++;
    if (data.experiences?.length > 0) completedFields++;
    if (data.education?.length > 0) completedFields++;
    if (data.contactInfo?.email) completedFields++;
    if (data.profileImg) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present';
  };

  if (loading) return <div className="text-center p-4">Loading profile...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="w-full h-48 mb-16">
        <img 
          src={dummyBanner} 
          alt="Profile Banner" 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="relative -mt-32">
        <div className="flex justify-center">
          <img 
            src={data.profileImg || dummyAvatar} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            onError={(e) => {
              console.log('Image failed to load:', data.profileImg); // Debug log
              e.target.src = dummyAvatar;
            }}
          />
        </div>

        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">{data.name || 'Unnamed User'}</h2>
          <p className="text-gray-600">
            {data.experiences.length > 0 ? data.experiences[0].position : 'No position specified'}
          </p>
          <p className="text-gray-500">
            {data.contactInfo?.email || 'No email provided'}
          </p>
          
          <div className="mt-4 max-w-xs mx-auto">
            <p className="text-sm text-gray-600 mb-1">
              Profile Completion: {calculateProfileCompletion()}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${calculateProfileCompletion()}%` }}
              ></div>
            </div>
          </div>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
            Update Profile
          </button>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            {data.experiences.length > 0 ? (
              data.experiences.map((exp, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <p className="font-medium">{exp.position} - {exp.companyName}</p>
                  <p className="text-gray-600">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                  {exp.responsibilities?.length > 0 && (
                    <ul className="list-disc ml-5 text-gray-600">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No experience added yet</p>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            {data.education.length > 0 ? (
              data.education.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <p className="font-medium">{edu.degree} - {edu.institution}</p>
                  <p className="text-gray-600">{edu.fieldOfStudy}</p>
                  <p className="text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No education added yet</p>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            {data.skills.length > 0 ? (
              <p className="text-gray-600">{data.skills.join(', ')}</p>
            ) : (
              <p className="text-gray-600">No skills added yet</p>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <div className="space-y-2 text-gray-600">
              <p>Email: {data.contactInfo.email || 'Not provided'}</p>
              <p>Phone: {data.contactInfo.phone || 'Not provided'}</p>
              <p>
                LinkedIn:{' '}
                {data.contactInfo.linkedin ? (
                  <a href={data.contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {data.contactInfo.linkedin}
                  </a>
                ) : (
                  'Not provided'
                )}
              </p>
              <p>
                Portfolio:{' '}
                {data.contactInfo.portfolio ? (
                  <a href={data.contactInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {data.contactInfo.portfolio}
                  </a>
                ) : (
                  'Not provided'
                )}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Experience</h3>
            <p className="text-gray-600">{data.totalExperienceYears.toFixed(1)} years</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;