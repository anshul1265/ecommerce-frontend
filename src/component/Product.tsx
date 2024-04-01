import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type productProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const Product = ({ productId, price, name, photo, stock, handler }: productProps) => {
  console.log(stock + productId);
  return (
    <div className="product-card">

      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>${price}</span>
      <div>
        <button onClick={() => handler({ productId, stock, price, photo, quantity: 1, name })}>
          <FaPlus />
        </button>
      </div>
    </div>
  )
}

export default Product