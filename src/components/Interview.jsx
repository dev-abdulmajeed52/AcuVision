import React, { useEffect, useState } from 'react'
import api from '../services/api'

const Interview = () => {
    const [interview, setInterview] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        handleInterview()
    }, [])

    const handleInterview = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await api.get('/applicant/chat-interview', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setInterview(response.data)
        } catch (error) {
            console.error('Error fetching interview:', error)
        } finally {
            setLoading(false)
        }
    }


  return (
    <div>Interview</div>
  )
}

export default Interview