import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import Dashboard from "../components/Dashboard"
import Loading from "../components/Loading";
import Product from "../components/Product";
import { GET_PRODUCTS } from "../graphql/queries/product.queries";

const Products = () => {
    const { data, loading, error } = useQuery(GET_PRODUCTS);
    if (loading) return <Loading />

    const { getProducts } = data;

    return (
        <Dashboard>
            <h1 className="text-2xl text-gray-800 font-light">Products</h1>
            <Link href="/newproduct">
                New Product
            </Link>
            <div className="overflow-x-scroll">
                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white ">
                            <th className="w-1/5 py-2">Name</th>
                            <th className="w-1/5 py-2">Stock</th>
                            <th className="w-1/5 py-2">Price</th>
                            <th className="w-1/5 py-2">Edit</th>
                            <th className="w-1/5 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {!data ? < p > No products.</p> :
                            getProducts.map((product) => (
                                <Product key={product.id} product={product} />
                            ))}
                    </tbody>
                </table>
            </div>

        </Dashboard>
    )
}

export default Products