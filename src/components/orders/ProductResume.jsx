import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/orders/OrderContext";

const ProductResume = ({ product }) => {
    const [amount, setAmount] = useState(0);
    const { quantityProducts, updateTotal } = useContext(OrderContext);
    useEffect(() => {
        setQuantity(amount);
        updateTotal();
    }, [amount])

    const setQuantity = (quantity) => {
        const newProduct = {
            ...product,
            quantity: Number(quantity)
        }
        quantityProducts(newProduct)
    }
    return (
        <>

            <div className="md:flex md:justify-between md:items-center mt-5 ">
                <div className="md:w-2/4 mb-2 md:mb-0">
                    <p className="text-sm">{product.name}</p>
                    <p className="text-sm">$ {product.price}</p>
                </div>
                <input
                    min={0}

                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="
                shadow
                apperance-none
                border rounded
                w-full py-2 px-3
                text-gray-700 leading-tight
                focus:outline-none
                focus:shadow-outline   "
                    type="number"
                    placeholder="Quantity"
                />
            </div>
        </>
    );
};

export default ProductResume;
