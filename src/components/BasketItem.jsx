function BasketItem(props) {
  const { mainId, 
    displayName, 
    regularPrice, 
    quantity, 
    removeFromBasket = Function.prototype,
    incQuantity = Function.prototype, 
    decQuantity = Function.prototype,
  
  } = props;

  return <li className="collection-item">
    {displayName} 
    <i className="material-icons  basket-quantity" onClick={() => decQuantity(mainId)}>remove</i>
    x{quantity}
    <i className="material-icons basket-quantity"onClick={() => incQuantity(mainId)} >add</i>
     = {regularPrice * quantity}
    <span class="secondary-content" onClick={() => removeFromBasket(mainId)}>
        <i class="material-icons basket-delete">close</i>
    </span>
    </li>;
}

export default BasketItem;
