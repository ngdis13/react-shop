function GoodsItem(props) {
  const { 
    mainId,
    displayName = 'Без названия', 
    displayDescription = 'Описание отсутствует', 
    price: { regularPrice } = { regularPrice: 'N/A' }, 
    displayAssets = [{ full_background: 'https://via.placeholder.com/300x400?text=No+Image' }],
    addToBasket = Function.prototype
  } = props;

  const image = displayAssets[0]?.full_background;

  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={displayName} />
      </div>
      <div className="card-content">
        <p>{displayDescription}</p>
      </div>
      <div className="card-action">
        <button
          className="btn card-button indigo lighten-2"
          onClick={() => addToBasket({
            mainId, 
            displayName,
            regularPrice
          })}
        >
          Купить
        </button>
        <span className="right card-price" >
          {regularPrice} руб.
        </span>
      </div>
    </div>
  );
}

export default GoodsItem;