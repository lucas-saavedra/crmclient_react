import { useContext, useEffect } from "react"
import { OrderContext } from "../../context/orders/OrderContext"


const Total = () => {
    const { total, updateTotal, products } = useContext(OrderContext);

    useEffect(() => {
        updateTotal();
    }, [products])

    return (
        <div className="flex
         items-center mt-5 
         justify-between bg-gray-300
         p-3 
         border-solid
         border-2 
         border-gray-500 "
        >
            <h2 className="text-gray-800 text-lg font-bold mt-0">Total:</h2>
            <p className="text-gray-800 mt-0">$ {total}</p>
        </div>
    )
}

export default Total