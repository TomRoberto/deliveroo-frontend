const BasketItem = ({ meal, basket, setBasket }) => {
  const handleClickMinus = () => {
    if (meal.quantity === 1) {
      const index = basket.indexOf(meal);
      const newBasket = [...basket];
      newBasket.splice(index, 1);
      setBasket(newBasket);
    } else {
      const index = basket.indexOf(meal);
      const newBasket = [...basket];
      newBasket[index].quantity--;
      setBasket(newBasket);
    }
  };

  const handleClickPlus = () => {
    const index = basket.indexOf(meal);
    const newBasket = [...basket];
    newBasket[index].quantity++;
    setBasket(newBasket);
  };
  return (
    <div className="basket-item">
      <div className="basket-buttons">
        <button
          className="basket-plus-minus"
          onClick={() => {
            handleClickMinus();
          }}
        >
          -
        </button>
        <p>{meal.quantity} </p>
        <button
          className="basket-plus-minus"
          onClick={() => {
            handleClickPlus();
          }}
        >
          +
        </button>
      </div>

      <div className="basket-title-price">
        <p>{meal.title}</p>
        <p>{meal.price} €</p>
      </div>
    </div>
  );
};

export default BasketItem;
