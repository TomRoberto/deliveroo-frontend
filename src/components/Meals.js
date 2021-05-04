import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Meals = ({ meals, basket, setBasket }) => {
  const handleClick = (elem) => {
    let counter = 0;
    for (let i = 0; i < basket.length; i++) {
      if (elem.id === basket[i].id) {
        const newTab = [...basket];
        newTab[i].quantity++;
        setBasket(newTab);
      } else {
        counter++;
      }
    }
    if (counter === basket.length) {
      const newObj = {
        id: elem.id,
        title: elem.title,
        price: elem.price,
        quantity: 1,
      };
      const newBasket = [...basket];
      newBasket.push(newObj);
      setBasket(newBasket);
    }
  };

  return (
    <div className="meals">
      {meals.map((elem, index) => {
        return (
          <div
            key={elem.id}
            className="meal"
            onClick={() => {
              handleClick(elem);
            }}
          >
            <div
              className={
                elem.picture ? "meal-description-img" : "meal-description"
              }
            >
              <h4>{elem.title} </h4>
              {elem.description && <p>{elem.description}</p>}

              <div className="meal-price-and-popular">
                <p>{elem.price} €</p>
                {elem.popular && (
                  <div className="star-popular">
                    <FontAwesomeIcon icon="star" className="popular star" />{" "}
                    <p className="popular">Populaire</p>
                  </div>
                )}
              </div>
            </div>

            {elem.picture && (
              <div className="img-menu">
                <img src={elem.picture} alt="" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Meals;
