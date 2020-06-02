import React from 'react'
import './App.css'
import Mapa from '../Mapa/Mapa'
import Header from '../Header'
import Sidebar from '../Sidebar'
import OtraSidebar from '../OtraSidebar'
import HeaderMapa from '../HeaderMapa'

const App = () => {
  
  return (
    <div className="App">
      <Header />
      <main className="App__contenedor_principal">
        <Sidebar />
        <div className="App__contenedor_central">
          <HeaderMapa />
          <div className="App__contenedor_mapa">
            <Mapa />
            <OtraSidebar />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
