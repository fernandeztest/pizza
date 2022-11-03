import { useState } from "react";
import { Pizza } from "../components/Pizza";

export default function Home({ pizzas }) {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);

  const pay = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total,
        choices: cart,
      }),
    };
    const createOrder = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/orders",
          options
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    const result = createOrder();
    if (result) {
      alert(
        `      Su pedido ha sido realizado con éxito.
      El total es de ${total} € .
      Los productos que ha pedido son: ${cart.map(
        (item) => `${item[1]} ${item[3]} `
      )}`
      );
      setCart([]);
      setTotal(0);
    }
  };

  return (
    <div>
      <h1 className="text-center">Lista de pizzas</h1>
      <div className="pizza-container">
        {pizzas.map((pizza) => (
          <Pizza
            key={pizza.id + pizza.name}
            pizza={pizza}
            total={total}
            setTotal={setTotal}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
      <div>
        {/* Checkout que se muestra cuando hay pizzas en el carrito */}
        <div className="checkout">
          <h2>Carrito</h2>
          <h3>Pizzas de la orden:</h3>
          <div className="pizza-container">
            {cart.map((item) => (
              <div key={item[0]} className="card">
                {item[1]} {item[3]} {item[2]} €
              </div>
            ))}
          </div>
          <button className="btn btn-primary" onClick={pay}>
            Pagar
          </button>

          <div className="checkout-total">{`Total:${total} €`}</div>
        </div>
        {/* fin de carrito */}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/pizzas`);
  const pizzas = await res.json();
  return { props: { pizzas } };
}
