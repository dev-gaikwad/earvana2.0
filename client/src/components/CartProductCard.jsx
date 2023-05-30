import React from 'react';

const CartProductCard = ({ item }) => {
  const { product, quantity } = item;

  const wishlistHandler = () => {};
  const cartRemoveHandler = () => {};
  return (
    <article className='cart-card-container'>
      <div className='product-image'>
        <img src={product.image_url} alt='product.name' />
      </div>
      <div className='product-name'>
        <h3>{product.name}</h3>
      </div>
      <div className='product-quantity'>
        Quantity
        <button>+</button>
        {quantity}
        <button>-</button>
      </div>
      <div className='product-card-buttons-container'>
        <button className='btn-secondary' onClick={wishlistHandler}>
          Add To Wishlist
        </button>

        <button className='btn-secondary' onClick={cartRemoveHandler}>
          Remove from Cart
        </button>
      </div>
    </article>
  );
};

export default CartProductCard;
