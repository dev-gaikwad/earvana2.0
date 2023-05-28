import { useEffect } from 'react';
import CartProductCard from '../components/CartProductCard';
import CartSummary from '../components/CartSummary';
import { useUser } from '../context/UserContext';
import '../css/CartPage.css';

const CartPage = () => {
  const user = useUser();

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
          <CartProductCard />
        </div>
        <CartSummary />
      </section>
    </div>
  );
};

export default CartPage;
