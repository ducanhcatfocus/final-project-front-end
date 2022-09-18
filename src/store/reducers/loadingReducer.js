const initState = {
  loading: true,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING.SET_LOADING":
      return { ...state, loading: !state.loading };
    case "LOADING.SET_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default reducer;
