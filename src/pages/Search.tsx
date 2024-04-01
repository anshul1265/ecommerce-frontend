import { useState } from "react"
import Product from "../component/Product";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { Skeleton } from "../component/Loader";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

const Search = () => {

	const { data: categoriesResponse, isLoading: loadingCategories, isError, error } = useCategoriesQuery("");

	const dispatch = useDispatch();

	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("");
	const [maxPrice, setMaxPrice] = useState(100000000);
	const [category, setCategory] = useState("");
	const [page, setPage] = useState(1);

	const { isLoading: productLoading, data: searchedProducts, error: productError, isError: productIsError } = useSearchProductsQuery({ search, sort, price: maxPrice, category, page });

	const addToCartHandler = (cartItem: CartItem) => {
		if (cartItem.stock < 1) return toast.error("Out of stock.");
		dispatch(addToCart(cartItem));
		toast.success("Added to cart.");
	};

	const isNextPage = true;
	const isPrevPage = true;

	if (isError) toast.error((error as CustomError).data.message);
	if (productIsError) toast.error((productError as CustomError).data.message);

	return (
		<div className="product-search-page">
			<aside>
				<h2>FILTERS</h2>
				<div>
					<h4>Sort</h4>
					<select value={sort} onChange={(e) => setSort(e.target.value)}>
						<option value={""}>None</option>
						<option value={"asc"}>Price: Low to High</option>
						<option value={"dsc"}>Price: High to Low</option>
					</select>
				</div>
				<div>
					<h4>Max Price: {maxPrice || ""}</h4>
					<input
						type="range"
						value={maxPrice}
						min={100}
						max={1000000}
						onChange={(e) => setMaxPrice(Number(e.target.value))} />
				</div>
				<div>
					<h4>Category</h4>
					<select value={category} onChange={(e) => setCategory(e.target.value)}>
						<option value={""}>ALL</option>

						{
							!loadingCategories && categoriesResponse?.categories.map((item) => (
								<option key={item} value={item}>{item.toUpperCase()}</option>
							))
						}

					</select>
				</div>
			</aside>
			<main>
				<h1>Products</h1>
				<input type="text" placeholder="Search by Name" value={search} onChange={(e) => setSearch(e.target.value)} />
				{
					productLoading ? <Skeleton length={20} /> :
						(<div className="search-product-list">
							{
								searchedProducts?.products.map((i) => (
									<Product
										key={i._id}
										productId={i._id}
										name={i.name}
										price={i.price}
										stock={i.stock}
										photo={i.photo}
										handler={addToCartHandler}
									/>
								))
							}
						</div>)
				}
				{
					searchedProducts && searchedProducts?.totalPage > 1 && (
						<article>
							<button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)}>
								Prev
							</button>
							<span>
								{page} of {searchedProducts?.totalPage}
							</span>
							<button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>
								Next
							</button>
						</article>
					)
				}


			</main>
		</div>
	)
}

export default Search