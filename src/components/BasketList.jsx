import BasketItem from "./BasketItem";

function BasketList(props) {
  const { order = [], 
    handleBasketShow = Function.prototype, 
    removeFromBasket = Function.prototype,
    incQuantity,
    decQuantity
  
  } = props;
  const totalPrice = order.reduce((sum, element) => {
    return sum + element.regularPrice * element.quantity
  }, 0)

  return (
    <ul className="collection basket-list">
      <li className="collection-item active">Basket</li>
      {order.length ? (
        order.map((item) => {
          return <BasketItem 
          key={item.mainId} {...item} 
          removeFromBasket={removeFromBasket}
          incQuantity = {incQuantity}
          decQuantity = {decQuantity}
          {...item}/>;
        })
      ) : (
        <li className="collection-item">Empty basket</li>
      )}
      <li className="collection-item active">
        Total Price: {totalPrice} rub
      </li>
        <li className="collection-item">
        <button className="btn btn-small">place an order</button>
      </li>
      <i className="material-icons basket-close" onClick={handleBasketShow}>
        close
      </i>
    </ul>
  );
}

export default BasketList;
