import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react"
import Select from "react-select"
import { OrderContext } from "../../context/orders/OrderContext";
import { GET_PRODUCTS } from "../../graphql/queries/product.queries";



const SelectProducts = () => {
    const { data, loading, error } = useQuery(GET_PRODUCTS);
    const [products, setProducts] = useState([]);
    const { addProducts } = useContext(OrderContext);
    useEffect(() => {
        addProducts(products)
    }, [products])
    const selectProducts = (products) => {
        setProducts(products)
    }
    if (loading) return null;
    const { getProducts } = data;
    return (
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-grey-700 p-2 text-sm font-bold'>2.- Assing products</p>
            <Select options={getProducts}
                onChange={(opts) => selectProducts(opts)}
                isMulti={true}
                getOptionLabel={opt => `${opt.name} - ${opt.stock} Aviables`}
                getOptionValue={opt => opt.id}
                placeholder="Search or select the products"
            />
        </>
    )
}

export default SelectProducts