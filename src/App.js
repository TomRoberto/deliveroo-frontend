import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Meals from "./components/Meals";
import BasketItem from "./components/BasketItem";
import logo from "./assets/Deliveroo_logo.svg.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

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

  const displayPrice = () => {
    let price = 0;
    for (let i = 0; i < basket.length; i++) {
      price += Number(basket[i].price) * basket[i].quantity;
    }

    return price;
  };

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
                    <Meals
                      meals={elem.meals}
                      basket={basket}
                      setBasket={setBasket}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="basket-container">
            <div className="basket">
              <button
                className={
                  basket.length === 0
                    ? "button-empty-basket"
                    : "button-not-empty-basket"
                }
              >
                Valider mon panier
              </button>
              <div className={basket.length === 0 && "hidden"}>
                <div className="basket-content">
                  {basket.map((elem, index) => {
                    return (
                      <BasketItem
                        key={elem.id}
                        meal={elem}
                        basket={basket}
                        setBasket={setBasket}
                      />
                    );
                  })}
                </div>
                <div className="basket-price">
                  <div className="sous">
                    <p>Sous-total</p>
                    <p>{displayPrice().toFixed(2)} €</p>
                  </div>
                  <div className="livraison">
                    <p>Frais de livraison</p>
                    <p>2.50 €</p>
                  </div>
                </div>
                <div className="basket-total">
                  <p>Total</p>
                  <p>{(displayPrice() + 2.5).toFixed(2)} €</p>
                </div>
              </div>
              <div
                className={basket.length !== 0 ? "hidden" : "your-basket-empty"}
              >
                <p>Votre panier est vide</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
