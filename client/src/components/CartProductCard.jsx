import { useContext, useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import '../css/CartProductCard.css';
import { ProductContext } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const CartProductCard = ({ item }) => {
  const { product, quantity } = item;
  const [inWishList, setInWishlist] = useState(false);

  const auth = useAuth();
  const user = useUser();
  const { getDiscountedPrice } = useContext(ProductContext);

  useEffect(() => {
    const existsInWishlist = auth?.user?.wishlist?.some(
      (item) => item.product._id === product._id
    );
    setInWishlist(existsInWishlist);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  return (
    <article className='cart-card-container'>
      <div className='cart-product-image'>
        <img src={product.image_url} alt='product.name' />
      </div>
      <div className='product-info-container'>
        <div className='product-name'>
          <h3>{product.name}</h3>
        </div>
        <div className='product-price-container'>
          {product.discount ? (
            <div className='product-price'>
              <div className='selling-price'>
                {product.price - getDiscountedPrice(product.price)}
              </div>
              <s className='original-price'>{product.price}</s>
            </div>
          ) : (
            <div className='product-price'>
              <div className='selling-price'>{product.price}</div>
            </div>
          )}
        </div>
        <div className='product-quantity'>
          <p>Quantity</p>
          <div className='quantity-buttons'>
            <button onClick={() => user.updateCart(product)}>-</button>
            {quantity}
            <button onClick={() => user.addToCart(product)}>+</button>
          </div>
        </div>
        <div className='product-card-buttons-container'>
          {!inWishList && (
            <button
              className='btn-secondary'
              onClick={() => user.updateWishlist(product)}
            >
              Add To Wishlist
            </button>
          )}

          <button
            className='btn-secondary'
            onClick={() => user.deleteFromCart(product)}
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartProductCard;
