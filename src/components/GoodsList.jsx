import GoodsItem from './GoodsItem';

function GoodsList(props) {
  const {goods = [], addToBasket = Function.prototype} = props;

  if (!goods.length){
    <h3>Nothing here</h3>
  }

  return (
    <div className="goods-list">
      {goods.map((item) => (
        <GoodsItem
          key={item.mainId}
          mainId={item.mainId}
          displayName={item.displayName}
          displayDescription={item.displayDescription}
          price={item.price}
          displayAssets={item.displayAssets}
          addToBasket = {addToBasket}
        />
      ))}
    </div>
  );
}

export default GoodsList;