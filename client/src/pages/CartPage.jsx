import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import CartProductCard from '../components/CartProductCard';
import CartSummary from '../components/CartSummary';
import '../css/CartPage.css';

const CartPage = () => {
  const user = useUser();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user.getCart();
    user.getWishlist();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='cart-page-container'>
      <div className='cart-page-header'>
        <h3>My Cart ({auth?.user?.cart.length})</h3>
      </div>
      <section className='cart-info-section'>
        <div className='cart-products-list-container'>
          {auth.user?.cart.length ? (
            auth.user.cart.map((item, index) => (
              <CartProductCard key={index} item={item} />
            ))
          ) : (
            <div className='empty-cart'>
              <h3>No items in your cart</h3>
              <button
                className='btn-primary'
                onClick={() => navigate('/products')}
              >
                Shop Now
              </button>
            </div>
          )}
        </div>
        <div className='cart-summary'>
          <CartSummary />
        </div>
      </section>
    </div>
  );
};

export default CartPage;
