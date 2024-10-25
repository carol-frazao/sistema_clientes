import { checkSession } from "../../redux/actions/auth";
import { isAuthenticated } from "../../router/auth";

export const verifyAuth = async (dispatch) => {
  if (isAuthenticated()) {
    const userData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData'));
    await dispatch(checkSession(userData));
  }
};