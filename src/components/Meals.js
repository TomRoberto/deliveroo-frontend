import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Meals = ({ meals }) => {
  return (
    <div className="meals">
      {meals.map((elem, index) => {
        return (
          <div key={elem.id} className="meal">
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
