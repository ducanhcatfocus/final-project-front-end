import { loginUser, getIsAuth } from "../../api/auth";
import { connectWithSocketServer } from "../../socket/socketConnection";

export const getActions = (dispatch) => {
  return {
    login: (userDetail, navigate) => dispatch(login(userDetail, navigate)),
    register: (userDetail, navigate) =>
      dispatch(register(userDetail, navigate)),
    logout: (navigate) => dispatch(logout(navigate)),
    changeAvatar: (avatar) => dispatch(changeAvatar(avatar)),
    isAuth: (token) => dispatch(isAuth(token)),
  };
};

const login = (userDetail, navigate) => {
  return async (dispatch) => {
    dispatch({ type: "AUTH.SET_PENDING", isPending: true });
    const { email, password } = userDetail;
    const { error, user } = await loginUser({ email, password });
    console.log(user);

    if (error) {
      dispatch({ type: "AUTH.SET_PENDING", isPending: false });
      return; // error handler
    }
    if (!user.isVerified) {
      dispatch({ type: "AUTH.SET_PENDING", isPending: false });
      navigate("/auth/verification", {
        state: { user: user },
        replace: true,
      });
      return;
    }
    localStorage.setItem("auth-token", user.token);
    dispatch({ type: "AUTH.SET_USER_DETAIL", user });
    dispatch({ type: "AUTH.SET_PENDING", isPending: false });
    // connectWithSocketServer(user.token);
    navigate("/");
  };
};

const logout = (navigate) => {
  return async (dispatch) => {
    localStorage.removeItem("auth-token");
    dispatch({ type: "DEFAULT" });

    navigate("/auth/login");
  };
};

const register = (user, navigate) => {
  //   return async (dispatch) => {
  //     const { email, password } = user;
  //     const { error, user } = await loginUser({ email, password });
  //     if (error) return;
  //     if (!user.isVerified) {
  //       navigate("/auth/verification", { state: { user: user }, replace: true });
  //       return;
  //     }
  //     localStorage.setItem("auth-token", user.token);
  //     dispatch({ type: "AUTH.SET_USER_DETAIL", user });
  //     navigate("/");
  //   };
};

const changeAvatar = (avatar) => {
  return (dispatch) => {
    dispatch({ type: "AUTH.SET_AVATAR", avatar });
  };
};

const isAuth = (token) => {
  return async (dispatch) => {
    const { error, user } = await getIsAuth(token);
    if (user) {
      dispatch({ type: "AUTH.SET_USER_DETAIL", user });
      connectWithSocketServer(token);
      dispatch({
        type: "LOADING.SET_LOADING",
      });
    }
    if (error) {
      dispatch({ type: "AUTH.SET_USER_DETAIL", user: null });
    }
  };
};
