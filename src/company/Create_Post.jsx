import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';

const Create_Post = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    type: '',
    location: '',
  });
  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const payload = {
        ...formData,
        createdBy: userId
      };

      const response = editId
        ? await api.put(`/jobs/${editId}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : await api.post('/jobs', payload, {
            headers: { Authorization: `Bearer ${token}` },
          });

      toast.success(editId ? 'Job updated successfully!' : 'Job posted successfully!');
      setFormData({ title: '', description: '', requirements: '', salary: '', type: '', location: '' });
      setOpen(false);
      setEditId(null);
      hanldeGetJobs();
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit job.');
    }
  };

  const hanldeGetJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const response = await api.get(`/jobs?createdBy=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(response.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      description: job.description,
      requirements: job.requirements.join(', '),
      salary: job.salary,
      type: job.type || '',
      location: job.location,
    });
    setEditId(job._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Job deleted');
      hanldeGetJobs();
    } catch (err) {
      console.error('Failed to delete job:', err);
    }
  };

  useEffect(() => {
    hanldeGetJobs();
  }, []);

  return (
    <div className="p-6">
      <button
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        onClick={() => {
          setFormData({ title: '', description: '', requirements: '', salary: '', type: '', location: '' });
          setEditId(null);
          setOpen(true);
        }}
      >
        Create Job Post
      </button>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Salary</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className="px-4 py-2 border">{job.title}</td>
                <td className="px-4 py-2 border">{job.description}</td>
                <td className="px-4 py-2 border">${job.salary}</td>
                <td className="px-4 py-2 border">{job.location}</td>
                <td className="px-4 py-2 border flex gap-4 justify-center">
                  <button onClick={() => handleEdit(job)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(job._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-6 text-center">
              {editId ? 'Edit Job Post' : 'Create Job Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 placeholder-gray-500"
                />
              ))}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  {editId ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create_Post;
