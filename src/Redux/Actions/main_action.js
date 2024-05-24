import menuData from "../../menuData";
import { GET_MENU_DATA,  ERROR,
    LOADING,
    CART_DETAILS, } from "../Action_Type/actionType";

export const get_menuItem = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    dispatch({ type: GET_MENU_DATA, payload: menuData?.menuData });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const addToCart = (data) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      dispatch({ type: CART_DETAILS, payload: data });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };

