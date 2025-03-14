import React, { useEffect, useState } from 'react'

const CandidateForm = () => {
  const [name, setName] = useState('');

  useEffect (() => {
    const name = localStorage.getItem('name');
    setName(name)
  })
  return (
    <div>{name}</div>
  )
}

export default CandidateForm