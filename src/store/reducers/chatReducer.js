const initState = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
  loadMore: true,
  page: 0,
  loading: false,
  typing: "",
  newMessage: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "CHAT.SET_CHOSEN_CHAT_DETAILS":
      return {
        ...state,
        chosenChatDetails: action.chatDetails,
        chatType: action.chatType,
        messages: [],
      };
    case "CHAT.SET_MESSAGES":
      return { ...state, messages: [...action.messages, ...state.messages] };
    case "CHAT.UPDATE_MESSAGES":
      return { ...state, messages: [...state.messages, action.message] };
    case "CHAT.SET_TYPING":
      return { ...state, typing: action.typing };
    case "CHAT.SET_LOAD_MORE":
      return { ...state, loadMore: action.loadMore };
    case "CHAT.SET_LOADING":
      return { ...state, loading: action.loading };
    case "CHAT.SET_PAGE":
      return { ...state, page: action.page + 1 };
    case "CHAT.SET_NEW_MESSAGE":
      return { ...state, newMessage: true };
    case "CHAT.RESET_STATE":
      return {
        ...state,
        chosenChatDetails: null,
        chatType: null,
        messages: [],
        loadMore: true,
        page: 0,
        loading: false,
        typing: "",
      };
    default:
      return state;
  }
};

export default reducer;
