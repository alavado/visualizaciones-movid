import React from 'react'
import './OtraSidebar.css'
import { useSelector } from 'react-redux'

const OtraSidebar = () => {

  const { sidebarSecundariaAbierta } = useSelector(state => state.sidebars)

  return (
    <div className={`OtraSidebar${sidebarSecundariaAbierta ? ' OtraSidebar--abierta' : ''}`}>
      <h1>Región Metropolitana</h1>
    </div>
  )
}

export default OtraSidebar
