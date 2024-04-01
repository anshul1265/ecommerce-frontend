import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../component/CartItem";
import { addToCart, applyDiscount, calculatePrice, removeCartItem } from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";

const Cart = () => {

  const dispatch = useDispatch();

  const { cartItems, subTotal, total, tax, discount, shippingCharges } = useSelector((state: RootState) => state.cartReducer);

  const [counponCode, setCouponCode] = useState<string>("");
  const [isValidCounponCode, setIsValidCounponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {

    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  }

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity === 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  }

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  }

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {

      axios.get(`${server}/api/v1/payment/discount?code=${counponCode}`, {
        cancelToken: token,
      })
        .then((res) => {
          dispatch(applyDiscount(res.data.discount));
          setIsValidCounponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(applyDiscount(0));
          setIsValidCounponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCounponCode(false);
    }

  }, [counponCode, dispatch]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  return (
    <div className="cart">
      <main>

        {
          cartItems.length > 0 ?
            (cartItems.map((i, idx) => (
              <CartItemCard
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                removeHandler={removeHandler}
                key={idx}
                cartItem={i} />
            ))) :
            (<h1>Your Cart is Empty.</h1>)
        }

      </main>

      <aside>
        <p>SubTotal: ${subTotal}</p>
        <p>Shipping Charges: ${shippingCharges}</p>
        <p>Tax: ${tax}</p>
        <p>Discount: <em className="red">${discount}</em></p>
        <p>Total: <b>${total}</b></p>
        <input type="text" placeholder="Apply Coupon Code here" value={counponCode} onChange={(e) => setCouponCode(e.target.value)} />

        {
          counponCode &&
          (
            isValidCounponCode ?
              (<span className="green">${discount} off using the <code>{counponCode}</code></span>) :
              (<span className="red">Invalid Coupon Code.<VscError /></span>)
          )
        }

        {
          cartItems.length > 0 &&
          <Link to={"/shipping"}>Checkout</Link>
        }

      </aside>
    </div>
  )
}

export default Cart