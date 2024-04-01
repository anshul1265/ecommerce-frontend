import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Skeleton } from '../component/Loader';
import Product from '../component/Product';
import { useLatestProductsQuery } from '../redux/api/productApi';
import { addToCart } from '../redux/reducer/cartReducer';
import { CartItem } from '../types/types';

const Home = () => {

  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1)
      return toast.error("Out of Stock.");
    dispatch(addToCart(cartItem));
    toast.success("Successfully added to your Cart.")
  }

  if (isError) toast.error("Can't fetch the Products.");

  return (
    <div className='home'>
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className='findMore'>More</Link>
      </h1>

      <main>
        {
          isLoading ? <Skeleton width={"80vw"} /> :
            (
              data?.products.map((product) => (
                <Product
                  key={product._id}
                  productId={product._id}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  photo={product.photo}
                  handler={addToCartHandler}
                />
              ))
            )
        }
      </main>
    </div>
  )
}

export default Home