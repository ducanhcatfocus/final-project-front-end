const initState = {
  user: null,
  isPending: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "AUTH.SET_USER_DETAIL":
      return { ...state, user: action.user };
    case "AUTH.SET_AVATAR":
      return { ...state, user: { ...state.user, avatar: action.avatar } };
    case "AUTH.SET_PENDING":
      return { ...state, isPending: action.isPending };
    case "AUTH.SET_ERROR":
      return { ...state, error: action.error };
    case "DEFAULT":
      return initState;
    default:
      return state;
  }
};

export default reducer;
