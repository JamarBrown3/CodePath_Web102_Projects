import dungeon_img from './images/dungeon_party.jpg'
import './App.css'


function App() {

  return (
    <>
      <div className="App">
        <h1>Welcome to the Dungeons and Dragons Crew!</h1>
        <p>Use the navigation bar to create your own crew members, view your crew gallery, and see detailed stats for each member of your party.</p>
        <br />
        <img src={dungeon_img} alt="Dungeons and Dragons Party" className="hero-image" />
      </div>
    </>
  )
}

export default App
