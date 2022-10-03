import { useReducer } from "react";
import reducer from "./OrderReducer";
import {
    PRODUCT_AMOUNT,
    SELECT_CLIENT,
    SELECT_PRODUCT, UPDATE_TOTAL
} from "../../types";
import { OrderContext } from "./OrderContext";

export const OrderState = ({ children }) => {
    const initialState = {
        client: {},
        products: [],
        total: 0
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const addClient = client => {
        dispatch({
            type: SELECT_CLIENT,
            payload: client
        })
    }
    const addProducts = selectedProducts => {
        let newState;
        if (state.products.length > 0) {
            newState = selectedProducts.map(product => {
                const newObject = state.products.find((productState) => productState.id === product.id);
                return { ...product, ...newObject }
            })
        } else {
            newState = selectedProducts;
        }
        dispatch({
            type: SELECT_PRODUCT,
            payload: newState
        })
    }
    //modify amount product
    const quantityProducts = (newProduct) => {
        dispatch({
            type: PRODUCT_AMOUNT,
            payload: newProduct
        })
    }
    const updateTotal = () => {
        dispatch({
            type: UPDATE_TOTAL
        })
    }
    return (
        <OrderContext.Provider
            value={{
                client: state.client,
                total: state.total,
                products: state.products,
                addClient,
                addProducts,
                quantityProducts,
                updateTotal
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}



