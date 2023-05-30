import { useContext, useEffect } from 'react';

import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import CartProductCard from '../components/CartProductCard';
import CartSummary from '../components/CartSummary';
import '../css/CartPage.css';

const CartPage = () => {
  const user = useUser();
  const auth = useAuth();
  const { allProducts } = useContext(ProductContext);

  useEffect(() => {
    user.getCart();
  }, []);

  return (
    <div className='cart-page-container'>
      <div className='cart-page-header'>
        <h3>My Cart ()</h3>
      </div>
      <section className='cart-info-section'>
        <div className='cart-products-list-container'>
          {auth.user?.cart.length ? (
            auth.user.cart.map((item, index) => (
              <CartProductCard key={index} item={item} />
            ))
          ) : (
            <h3>No items in your cart</h3>
          )}
        </div>
        <CartSummary />
      </section>
    </div>
  );
};

export default CartPage;
