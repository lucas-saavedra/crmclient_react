
import {
    PRODUCT_AMOUNT,
    SELECT_CLIENT,
    SELECT_PRODUCT,
    UPDATE_TOTAL
} from "../../types";

const reducer = (state, action) => {
    switch (action.type) {
        case SELECT_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case SELECT_CLIENT:
            return {
                ...state,
                client: action.payload
            }
        case PRODUCT_AMOUNT:
            return {
                ...state,
                products: state.products.map((product) => product.id === action.payload.id ? product = action.payload : product)
            }
        case UPDATE_TOTAL:
            return {
                ...state,
                total: state.products.reduce((newTotal, art) => newTotal += art.price * art.quantity, 0)
            }
        default:
            return state;
    }
}
export default reducer
