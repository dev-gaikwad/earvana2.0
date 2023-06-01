import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/layout/ProductCard';
import '../css/WishlistPage.css';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const user = useUser();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user.getCart();
    user.getWishlist();
  }, []);
  return (
    <div className='wishlist-page-container'>
      <div className='wishlist-page-header'>
        <h3>My Wishlist ({auth?.user?.wishlist.length})</h3>
      </div>
      <section className='wishlist-info-section'>
        {auth.user?.wishlist.length ? (
          auth.user.wishlist.map(({ product }, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className='empty-wishlist'>
            <h3>No items in your wishlist</h3>
            <button
              className='btn-primary'
              onClick={() => navigate('/products')}
            >
              Shop Now
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default WishlistPage;
