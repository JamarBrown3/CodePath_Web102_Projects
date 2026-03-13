{/* Importing many images to the files */ }
import jamaica from './images/Jamaican_restaurant.jpeg'
import chinese from './images/Chinese_restaurant.jpeg'
import india from './images/Indian_restaurant.png'
import japanese from './images/Japanese_restaurant.jpeg'
import russian from './images/Russian_restaurant.jpg'
import spanish from './images/Spanish_restaurants.jpg'
import taiwan from './images/Taiwan_restaurant.jpg'
import thai from './images/Taiwan_restaurant.jpg'
import turkish from './images/Turkish_restaurant.jpeg'
import vietnamese from './images/Vietnamese_restaurant.jpg'
import awningPicture from './images/awning.png'
import './App.css'

function App() {


  return (
    <>
      <Awning picture={awningPicture} />


      <div className="wraperCards">
        <TestingContainer picture={<img className="testImage" src={vietnamese} alt="vietnamese restaurant picture"/>} header={"Pho Haven"} text={"Vietnamese Restarurant"}/>
        <TestingContainer picture={<img className="testImage" src={jamaica} alt="jamaica restaurant picture"/>} header={"Island Flavors"} text={"Jamaican Restarurant"}/>
        <TestingContainer picture={<img className="testImage" src={thai} alt="thai restuarant picture"/>} header={"Bangkok Bistro"} text={"Thai Restarurant"}/>
        <TestingContainer picture={<img className="testImage" src={japanese} alt="japanese restaurant picture"/>} header={"Sakura Sushi"} text={"Japanese Restarurant"}/>
        <TestingContainer picture={<img className="testImage" src={india} alt="indian restaurant picture"/>} header={"Spice Garden"} text={"India Restarurant"}/>
        <TestingContainer picture={<img className="testImage" src={chinese} alt="chinese restaurant"/>} header={"Golden Dragon"} text={"Chinese Restarurant"}/>
        <TestingContainer picture={<img className="testImage" src={turkish} alt="turkish restaurant"/>} header={"Ottoman Feast"}text={"Turkish Restarurant"}/>
        <TestingContainer picture={<img className="testImage" src={spanish} alt="spanish restaurant"/>} header={"La Paella"} text={"Spanish Restarurant"}/>
        <TestingContainer picture={<img className="testImage" src={taiwan} alt="taiwan restaurant"/>} header={"Formosa Bites"} text={"Taiwan Restarurant"}/>
        <TestingContainer picture={<img className="testImage" src={russian} alt="russian restaurant"/>} header={"Tsar's Table"}text={"Vietnamese Restarurant"}/>
      </div>
    </>
  )
}


function Awning({ picture }) {
  return (
    <>
        <div className="image-wrapper">
          <img className="full-width-img" src={picture} alt="awning" />
          <h1>Multiple Restaurants In Different Countries</h1>
        </div>
      
    </>
  )
}

function TestingContainer({picture,header,text}) {
  return (
    <div className="testerCard">
      {picture}
      <div className="containerTester">
        <h2><b>{header}</b></h2> 
        <p><b>{text}</b></p>
        <button>Click for more restaurtants</button>
      </div>
    </div>
  )
}

export default App
