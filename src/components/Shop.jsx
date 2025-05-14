import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { Pagination } from "react-bootstrap";

import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import Cart from "./Cart";
import BasketList from "./BasketList";
import Alert from "./Alert";

function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Количество товаров на странице





  const addToBasket = (item) => {
    const itemIndex = order.findIndex(orderItem => orderItem.mainId === item.mainId);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1
        }
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder)
    }

    setAlertName(item.displayName)
  };

  const removeFromBasket = (itemId) => {
    const newOrder = order.filter(el => el.mainId !== itemId);
    setOrder(newOrder);
  }

  const incQuantity = (itemId) => {
    const newOrder = order.map(el => {
      if (el.mainId === itemId){
        const newQuantity = el.quantity + 1;
        return {
          ...el, 
          quantity: newQuantity
        }
      } else {
        return el
      }
    });
    setOrder(newOrder)
  }

  const decQuantity = (itemId) => {
    const newOrder = order.map(el => {
      if (el.mainId === itemId){
        const newQuantity = el.quantity - 1;
        return {
          ...el, 
          quantity: newQuantity >= 0 ? newQuantity : 0,
        }
      } else {
        return el
      }
    });
    setOrder(newOrder)
  }

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  }

  const closeAlert = () => {
    setAlertName('');
  }


  // Пагинация: вычисляем товары для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGoods = goods.slice(indexOfFirstItem, indexOfLastItem);

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(goods.length / itemsPerPage);

  // Обработчик смены страницы
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Прокрутка вверх
  };

  // Генерация элементов пагинации
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(function getGoods() {
    fetch(`${API_URL}/v2/shop?lang=ru`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Ошибка загрузки");
        return response.json();
      })
      .then((data) => {
        setGoods(data.shop || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? (
        <Preloader />
      ) : (
        <GoodsList goods={currentGoods} addToBasket={addToBasket} />
      )}
      {goods.length > itemsPerPage && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {paginationItems}
          <Pagination.Next
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
      {isBasketShow && (
        <BasketList
          order={order}
          handleBasketShow={handleBasketShow}
          removeFromBasket={removeFromBasket}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
        />
      )}
      {alertName && <Alert displayName={alertName} closeAlert={closeAlert} />}
    </main>
  );
}

export default Shop;
