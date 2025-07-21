import React from 'react'
import { useParams } from 'react-router-dom'

const StartupDetails = () => {
  const { id } = useParams()

  return (
    <div>
      <h2>Startup Page for {id}</h2>
      <p>📄 Pitch Summary: This is where the startup pitch goes.</p>
      <p>📊 Static Value Chart</p>
      <p>📋 Open Outsource Projects</p>
      <button>Invest Time</button>
      <button>Invest Money</button>
    </div>
  )
}

export default StartupDetails
