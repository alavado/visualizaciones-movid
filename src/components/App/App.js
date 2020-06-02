import React from 'react'
import './App.css'
import Mapa from '../Mapa/Mapa'
import Header from '../Header'
import Sidebar from '../Sidebar'
import OtraSidebar from '../OtraSidebar'

const App = () => {
  
  return (
    <div className="App">
      <Header />
      <main className="App__contenedor_principal">
        <Sidebar />
        <Mapa />
        <OtraSidebar />
      </main>
    </div>
  )
}

export default App
