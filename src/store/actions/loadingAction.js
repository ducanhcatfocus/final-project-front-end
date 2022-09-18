export const getActions = (dispatch) => {
  return {
    setLoading: () => dispatch(setLoading()),
    setDefaultError: () => dispatch(setDefaultError()),
  };
};

const setLoading = () => {
  return async (dispatch) => {
    dispatch({
      type: "LOADING.SET_LOADING",
    });
  };
};

const setDefaultError = () => {
  return (dispatch) => {
    dispatch({
      type: "LOADING.SET_ERROR",
      error: null,
    });
  };
};
