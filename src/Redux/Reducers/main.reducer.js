import {
    ERROR, GET_MENU_DATA,
    ORDER_DETAILS,
    LOADING,
    CART_DETAILS,
} from "../Action_Type/actionType";


const initalState = {
    loading: false,
    error: "",
    orders: [],
    detailOrders: [],
    orderStatus: [],
    allMenuItems: [],
    cartItems: []
};

export const reducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case GET_MENU_DATA:
            return {
                ...state,
                isLoading: false,
                error: false,
                allMenuItems: payload,
            };
        case ORDER_DETAILS:
            return {
                ...state,
                isLoading: false,
                error: "",
                detailOrders: payload,
            };

        case CART_DETAILS:
            return {
                ...state,
                isLoading: false,
                error: "",
                cartItems: payload,
            };

        default:
            return state;
    }
};
