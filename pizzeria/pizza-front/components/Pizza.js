import React, { useEffect, useState } from "react";

export const Pizza = ({ pizza, total, setTotal, cart, setCart }) => {
  const { id, name, price, ingredients } = pizza;
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(quantity + 1);
    setTotal((total) => total + price);
    setCart((cart) => {
      const newCart = cart.filter((item) => item[0] !== id);
      newCart.push([id, quantity + 1, price, name]);
      return newCart;
    });
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setTotal((total) => total - price);
      setCart((cart) => {
        const newCart = cart.filter((item) => item[0] !== id);
        if (quantity > 1) {
          newCart.push([id, quantity - 1, price, name]);
        }
        return newCart;
      });
    }
  };

  useEffect(() => {
    if (total === 0 && cart.length === 0 && quantity > 0) {
      setQuantity(0);
    }
  }, [total]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Precio por unidad {price} €
        </h6>
        <p className="card-text">
          {ingredients.map((ingredient) => (
            <span key={id + ingredient} className="badge bg-primary">
              {ingredient}
            </span>
          ))}
        </p>
        <h3>Cantidad para ordenar:</h3>
        <div className="quantity mb-2">
          <button className="btn btn-primary" onClick={handleRemove}>
            -
          </button>
          <span>{quantity}</span>
          <button className="btn btn-primary" onClick={handleAdd}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};
