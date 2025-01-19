import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, setAddedToCart, setCartCount }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.slice(1)); // Remove "$" and parse as number
      return total + itemCost * item.quantity;
    }, 0).toFixed(2); // Keep two decimal places
  };

  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.slice(1)); // Remove "$" and parse as number
    return (itemCost * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    // Dispatch the removal action
    dispatch(removeItem(item));

    // Debugging: Log the cart count and item quantity before update


    // Update the cart count by decrementing the quantity of the removed item
    //setCartCount(prevCount => { prevCount - item.quantity;
    //setCartCount(prevCount => prevCount - item.name);
   // });

    // Re-enable the "Add to Cart" button by setting the added state to false
    setAddedToCart(prevState => ({
      ...prevState,
      [item.name]: false, // Re-enable the "Add to Cart" button
    }));
  };

  const handleCheckout = () => {
    setCheckoutMessage("Coming Soon");
  };

  // Monitor the checkoutMessage state to confirm it's updating
  useEffect(() => {
    console.log('Updated checkout message:', checkoutMessage);
  }, [checkoutMessage]);

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Display checkout message */}
      {checkoutMessage && (
        <div className="checkout-message">{checkoutMessage}</div>
      )}

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="get-started-button1" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    {/* Display Cart Count */}
    <div className="cart-count">
    <h3>Cart Items Count: {cart.length}</h3>
  </div>
</div>
  );
};

export default CartItem;
