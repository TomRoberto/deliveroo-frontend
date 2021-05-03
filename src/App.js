import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Meals from "./components/Meals";
import logo from "./assets/Deliveroo_logo.svg.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://le-reacteur-deliveroo-backend.herokuapp.com/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="app">
      <header>
        <img src={logo} alt="" />
      </header>
      <div className="under-header container">
        <div>
          <h2>{data.restaurant.name}</h2>
          <p>{data.restaurant.description}</p>
        </div>
        <div>
          <img src={data.restaurant.picture} alt="" />
        </div>
      </div>
      <main>
        <div className="container">
          <div className="meals-container">
            {data.categories.map((elem, index) => {
              if (elem.meals.length > 0) {
                return (
                  <div key={index}>
                    <h3>{elem.name}</h3>
                    <Meals meals={elem.meals} />
                  </div>
                );
              }
            })}
          </div>
          <div className="basket-container"></div>
        </div>
      </main>
    </div>
  );
}

export default App;
