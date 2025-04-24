import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Form state
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([
    {
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
    },
  ]);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) setName(storedName);
    handleGetProfile();
  }, []);

  const handleGetProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const res = await api.get(`/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setProfileData(data);
      setBio(data.bio || '');
      setSkills(data.skills || []);
      setExperience(data.experience || []);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/');
  };

  const handleProfileSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        '/profile',
        { bio, skills, experience },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Profile updated:', res.data);
      setModalOpen(false);
      handleGetProfile();
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = field === 'current' ? value.target.checked : value;
    setExperience(updated);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
      },
    ]);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="relative w-full h-56">
        <img
          src="https://images.unsplash.com/photo-1688719330946-f179bc8fc86c?q=80&w=1470&auto=format&fit=crop"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            ☰
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <img
          src="https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?q=80&w=1480&auto=format&fit=crop"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white absolute bottom-[-48px] left-1/2 transform -translate-x-1/2"
        />
      </div>

      {/* Profile Info */}
      <div className="mt-24 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {profileData?.user?.name || name || 'Guest'}!
        </h1>
        <p className="text-gray-500">Full Stack Developer</p>

        <div className="mt-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow">
          {profileData ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Applicant Info</h2>
              <ul className="text-left text-gray-600 space-y-2">
                <li><strong>Email:</strong> {profileData.user.email}</li>
                <li><strong>Location:</strong> {profileData.experience[0]?.location || 'N/A'}</li>
                <li><strong>Bio:</strong> {profileData.bio}</li>
                <li><strong>Skills:</strong> {profileData.skills.join(', ')}</li>
                <li>
                  <strong>Experience:</strong>
                  <ul className="ml-4 list-disc">
                    {profileData.experience.map((exp) => (
                      <li key={exp._id}>
                        {exp.title} at {exp.company} ({new Date(exp.from).getFullYear()} - {exp.current ? 'Present' : new Date(exp.to).getFullYear()})
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update Profile
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">No profile data found.</p>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Create Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label className="block font-semibold">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Skills (comma separated)</label>
              <input
                value={skills.join(', ')}
                onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Experience</label>
              {experience.map((exp, i) => (
                <div key={i} className="border p-3 rounded mb-3 bg-gray-50">
                  <input
                    type="text"
                    placeholder="Title"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(i, 'title', e.target.value)}
                    className="w-full mb-2 px-2 py-1 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(i, 'company', e.target.value)}
                    className="w-full mb-2 px-2 py-1 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(i, 'location', e.target.value)}
                    className="w-full mb-2 px-2 py-1 border rounded"
                  />
                  <input
                    type="date"
                    value={exp.from}
                    onChange={(e) => handleExperienceChange(i, 'from', e.target.value)}
                    className="w-full mb-2 px-2 py-1 border rounded"
                  />
                  {!exp.current && (
                    <input
                      type="date"
                      value={exp.to}
                      onChange={(e) => handleExperienceChange(i, 'to', e.target.value)}
                      className="w-full mb-2 px-2 py-1 border rounded"
                    />
                  )}
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => handleExperienceChange(i, 'current', e)}
                      className="mr-2"
                    />
                    <label>Currently working here</label>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(i, 'description', e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </div>
              ))}
              <button onClick={addExperience} className="text-sm text-blue-600 hover:underline">
                + Add Experience
              </button>
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={handleProfileSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
