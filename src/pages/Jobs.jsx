import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'react-toastify'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [applied, setApplied] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [interviewData, setInterviewData] = useState({
    jobId: '',
    jobTitle: '',
    applicantName: '',
    jobDes: '',
    jobReq: '',
    jobType: '',
    ready: false
  })

  const navigate = useNavigate()
  const userName = localStorage.getItem('name') || 'Guest'

  useEffect(() => {
    handleGetJobs()
  }, [])

  const handleGetJobs = async () => {
    try {
      const token = localStorage.getItem('token')
      document.cookie = `token=${token}; path=/`
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

  const handleApply = (job) => {
    setSelectedJob(job)
    setInterviewData({
      jobId: job._id,
      jobTitle: job.title,
      applicantName: userName,
      JobDes: job.description,
      JobReq: job.requirements,
      JobType: job.type,
      ready: false
    })
    setModalIsOpen(true)
  }

  const startInterview = () => {
    const encodedData = encodeURIComponent(JSON.stringify(interviewData));
    window.location.href = `https://acu-interview.streamlit.app/?data=${encodedData}`;
  }

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    (location === '' || job.location.toLowerCase().includes(location.toLowerCase()))
  )

  return (
    <div className="min-h-screen font-sans">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Interview Confirmation"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Ready for your interview?</h2>
          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Job:</span> {interviewData.jobTitle}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Applicant:</span> {interviewData.applicantName}
            </p>
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-800 mb-2">Interview Tips:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Ensure good lighting in your room</li>
                <li>Use a quiet environment</li>
                <li>Have your microphone and camera ready</li>
                <li>Prepare for common interview questions</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Not Now
            </button>
            <button
              onClick={startInterview}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Start Interview
            </button>
          </div>
        </div>
      </Modal>

      {/* Hero Section */}
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
            className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/80 px-4 py-3 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="City, state or zip"
            className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/80 px-4 py-3 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Job Details Panel */}
          {selectedJob && (
            <div className="w-full lg:w-2/5 bg-white p-8 rounded-xl shadow-lg sticky top-6 h-fit">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-800">{selectedJob.title}</h3>
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-1 rounded-full">
                  {selectedJob.type}
                </span>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{selectedJob.location || 'Remote'}</span>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Job Description</h4>
                <p className="text-gray-600 whitespace-pre-line">{selectedJob.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Requirements</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {Array.isArray(selectedJob.requirements)
                    ? selectedJob.requirements.map((req, i) => <li key={i}>{req}</li>)
                    : typeof selectedJob.requirements === 'string'
                      ? selectedJob.requirements.split('\n').map((req, i) => <li key={i}>{req}</li>)
                      : <li>No specific requirements listed</li>}
                </ul>


              </div>

              <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Salary</p>
                    <p className="text-xl font-bold text-indigo-700">{selectedJob.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Posted</p>
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(selectedJob.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleApply(selectedJob)}
                className={`w-full py-3 rounded-lg font-medium transition ${applied
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'}`}
                disabled={applied}
              >
                {applied ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Applied Successfully
                  </span>
                ) : (
                  'Apply Now'
                )}
              </button>
            </div>
          )}

          {/* Jobs List */}
          <div className={`flex-1 ${selectedJob ? 'lg:max-w-2xl' : 'max-w-4xl mx-auto'}`}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
              {(search || location) && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (filtered by {[search, location].filter(Boolean).join(' and ')})
                </span>
              )}
            </h3>

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className={`bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer border-l-4 ${selectedJob?._id === job._id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-transparent'}`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                        <p className="text-indigo-600 font-medium">{job.salary}</p>
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-1 rounded-full">
                        {job.type}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600 mt-2 mb-3">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{job.location}</span>
                    </div>

                    <p className="text-gray-600 line-clamp-2">{job.description}</p>

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleApply(job)
                        }}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Apply Now →
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-8 rounded-xl shadow text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-700 mt-4">No jobs found</h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearch('')
                      setLocation('')
                    }}
                    className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add some custom styles for the modal */}
      <style>{`
        .modal {
          position: absolute;
          top: 50%;
          left: 50%;
          right: auto;
          bottom: auto;
          margin-right: -50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 0;
          border-radius: 0.5rem;
          outline: none;
          width: 90%;
          max-width: 32rem;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
      `}</style>
    </div>
  )
}

export default Jobs