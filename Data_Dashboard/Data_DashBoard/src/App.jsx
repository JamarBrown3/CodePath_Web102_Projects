
import './App.css'
import Api_fetch from './components/Api-fetch' 

function App() {
 

  return (
    <>
      <div className="app" id="topWeb">
        <div className="sideDiv">
          <div className="Header">
            <h1>Breweries Data Table 🍺</h1>
          </div>
          <div className="Menu">
            <h1>NavBar</h1>
            <ul>
              <li> <a href="#search">Search Bar 🔍</a></li>
              <li> <a href="#topWeb">
            Top of bar 🏠
          </a></li>
               </ul>
          </div>
        </div>
        <Api_fetch/>
      </div>

 
    </>
  )
}

export default App
