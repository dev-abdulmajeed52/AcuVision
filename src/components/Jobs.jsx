import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [applied, setApplied] = useState(false)

  const navigate = useNavigate()
  const userName = localStorage.getItem('name') || 'Guest'

  useEffect(() => {
    handleGetJobs()
  }, [])

  const handleGetJobs = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await api.get('/jobs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setJobs(response.data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem('token')
      await api.post('/applicant/apply', {
        jobId: jobId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setApplied(true)
      alert('Application submitted successfully!')
      navigate(`/interview/${jobId}`)
    } catch (error) {
      console.error('Error applying for job:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className=" min-h-screen font-sans">
      <div
        className="bg-cover bg-center py-20 px-4 text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1737931315560-57f1ba1dd87d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Find Your <span className="text-indigo-200">Dream Job</span>
        </h2>
        <p className="text-lg font-light mb-8">
          Search for remote or local jobs with ease.
        </p>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        <input
  type="text"
  placeholder="Job title or keyword"
  className="bg-transparent border-b-2 border-white text-white placeholder-white px-4 py-2 w-64 focus:outline-none"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<input
  type="text"
  placeholder="City, state or zip"
  className="bg-transparent border-b-2 border-white text-white placeholder-white px-4 py-2 w-64 focus:outline-none"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>

          <button className="bg-indigo-600 text-white px-6 py-2  hover:bg-indigo-700 transition">
            Find Jobs
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex px-4 py-12 gap-6">
        {/* Left: Job Detail */}
        {selectedJob && (
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow sticky top-24 h-fit self-start">
            <h3 className="text-2xl font-bold text-indigo-600 mb-2">
              {selectedJob.title}
            </h3>
            <p className="text-gray-700 mb-4">{selectedJob.description}</p>
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>
                <strong>Location:</strong> {selectedJob.location || 'Remote'}
              </p>
              <p>
                <strong>Type:</strong> Full Time
              </p>
              <p>
                <strong>Salary:</strong>{' '}
                <span className="text-indigo-600 font-medium">
                  {selectedJob.salary}
                </span>
              </p>
            </div>
            <button
              onClick={() => handleApply(selectedJob._id)}
              className="bg-indigo-600 text-white w-full py-2 rounded-full hover:bg-indigo-700 transition"
            >
              {applied ? 'Applied' : 'Apply Now'}
            </button>
          </div>
        )}

        {/* Right: Job Cards */}
        <div
          className={`grid gap-6 ${
            selectedJob ? 'lg:w-1/2' : 'w-full'
          } max-h-[70vh] overflow-y-auto pr-2`}
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => {
                  setSelectedJob(job)
                  setApplied(false)
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <span className="text-xs text-white bg-indigo-500 px-2 py-1 rounded-full">
                    New
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {job.description}
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <strong>Location:</strong> {job.location || 'Remote'}
                  </p>
                  <p>
                    <strong>Type:</strong> Full Time
                  </p>
                  <p>
                    <strong>Salary:</strong>{' '}
                    <span className="text-indigo-600 font-medium">
                      {job.salary}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No jobs found.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobs
