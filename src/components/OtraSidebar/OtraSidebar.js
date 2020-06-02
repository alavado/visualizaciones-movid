import React from 'react'
import './OtraSidebar.css'
import { useSelector } from 'react-redux'

const OtraSidebar = () => {

  const { sidebarSecundariaAbierta } = useSelector(state => state.sidebars)
  const { nombreRegion } = useSelector(state => state.region)

  return (
    <div className={`OtraSidebar${sidebarSecundariaAbierta ? ' OtraSidebar--abierta' : ''}`}>
      <h1>{nombreRegion}</h1>
    </div>
  )
}

export default OtraSidebar
