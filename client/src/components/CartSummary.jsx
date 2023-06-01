import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import '../css/CartSummary.css';
import { ProductContext } from '../context/ProductContext';

const CartSummary = () => {
  const auth = useAuth();
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

  const checkoutHandler = () => {};

  return (
    <>
      {cartSummary && (
        <article className='cart-summary-container'>
          <h3 className='summary-card-header'>Cart Details</h3>
          <div className='price-split-container'>
            <div className='price-split'>
              <p className='price-def'>
                Price ({cartSummary.totalItems} X Item)
              </p>
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
          <button
            className={
              cartSummary?.totalItems > 0 ? 'btn-primary' : 'btn-secondary'
            }
            disabled={cartSummary?.totalItems > 0 ? false : true}
            onClick={() => checkoutHandler}
          >
            Proceed
          </button>
        </article>
      )}
    </>
  );
};

export default CartSummary;
