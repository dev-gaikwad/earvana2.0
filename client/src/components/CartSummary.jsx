import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';
import '../css/CartSummary.css';
import { toast } from 'react-toastify';

const CartSummary = ({ checkout }) => {
  const auth = useAuth();
  const user = useUser();
  const navigate = useNavigate();

  const { getDiscountedPrice } = useContext(ProductContext);

  const cartSummary = auth.user?.cart.reduce(
    (acc, { product, quantity }) =>
      product.discount
        ? {
            ...acc,
            totalItems: acc.totalItems + quantity,
            totalValue: acc.totalValue + product.price * quantity,
            totalDiscount:
              acc.totalDiscount + getDiscountedPrice(product.price) * quantity,
          }
        : {
            ...acc,
            totalItems: acc.totalItems + quantity,
            totalValue: acc.totalValue + product.price * quantity,
          },
    { totalItems: 0, totalValue: 0, totalDiscount: 0 }
  );

  const productAmount = cartSummary?.totalValue - cartSummary?.totalDiscount;
  const deliveryCharges = productAmount > 12000 ? 0 : 99;

  return (
    <>
      {cartSummary && (
        <article className='cart-summary-container'>
          <h3 className='summary-card-header'>Cart Details</h3>
          <div className='price-split-container'>
            {auth.user?.cart.map(({ product, quantity }) => (
              <div className='price-split' key={product._id}>
                <p className='price-def'>
                  {quantity} X {product.name}
                </p>
                <p className='price'>₹{product.price * quantity}</p>
              </div>
            ))}

            <div className='price-split sub-total'>
              <p className='price-def'>Sub Total</p>
              <p className='price'>₹{cartSummary.totalValue}</p>
            </div>
            <div className='price-split'>
              <p className='price-def'>Total Discount</p>
              <p className='price'>- ₹{cartSummary.totalDiscount}</p>
            </div>
            <div className='price-split'>
              <p className='price-def'>Delivery Charges</p>
              <p
                className={`price ${!deliveryCharges && 'free-delivery-price'}`}
              >
                ₹99
              </p>
            </div>
            <div className='delivery-message-container'>
              {!deliveryCharges ? (
                <small className='free-delivery'>
                  *Free delivery is applicable on this cart
                </small>
              ) : (
                <small>
                  *Add more products worth <span>₹{12000 - productAmount}</span>{' '}
                  to avail free delivery
                </small>
              )}
            </div>
          </div>
          <div className='price-split cart-total'>
            <p className='price-def'>Total Amount</p>
            <p className='price'>₹{productAmount + deliveryCharges}</p>
          </div>
          <div className='applied-offer'></div>
          {checkout ? (
            <button
              className='btn-primary'
              disabled={user.selectedAddress !== null ? false : true}
              onClick={() => {
                user.placeOrder();
                toast.success('Order placed successfully');
                navigate('/products');
              }}
            >
              Place Order
            </button>
          ) : (
            <button
              className={
                cartSummary?.totalItems > 0 ? 'btn-primary' : 'btn-secondary'
              }
              disabled={cartSummary?.totalItems > 0 ? false : true}
              onClick={() => navigate('/checkout')}
            >
              Proceed
            </button>
          )}
        </article>
      )}
    </>
  );
};

export default CartSummary;
