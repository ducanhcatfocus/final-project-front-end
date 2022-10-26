import { getChat, getAllConversations } from "../../api/chat";

export const getActions = (dispatch) => {
  return {
    setChosenChatDetails: (details, chatType) =>
      dispatch(setChosenChatDetails(details, chatType)),
    setMessages: (conversationId, page) =>
      dispatch(setMessages(conversationId, page)),
    defaultTyping: () => dispatch(defaultTyping()),
    closeChat: () => dispatch(closeChat()),
    loadingMessage: () => dispatch(loadingMessage()),
    setPage: (page) => dispatch(setPage(page)),
  };
};

export const setChosenChatDetails = (chatDetails, type) => {
  return (dispatch) => {
    dispatch({
      type: "CHAT.SET_CHOSEN_CHAT_DETAILS",
      chatType: type,
      chatDetails,
    });
    dispatch({
      type: "CHAT.SET_LOAD_MORE",
      loadMore: true,
    });
    dispatch({
      type: "CHAT.SET_PAGE",
      page: -1,
    });
  };
};
const setMessages = (userId, page) => {
  return async (dispatch) => {
    const { error, conversation = [] } = await getChat(userId, page);
    if (error) {
      console.log(error);
      return;
    }
    if (conversation.length === 0) {
      dispatch({
        type: "CHAT.SET_LOAD_MORE",
        loadMore: false,
      });
      return;
    }
    dispatch({
      type: "CHAT.SET_MESSAGES",
      messages: conversation,
    });
  };
};

const loadingMessage = () => {
  return (dispatch) => {
    dispatch({
      type: "CHAT.SET_LOADING",
      loading: true,
    });
  };
};
const setPage = (page) => {
  return (dispatch) => {
    dispatch({
      type: "CHAT.SET_PAGE",
      page: page,
    });
  };
};

const defaultTyping = () => {
  return (dispatch) => {
    dispatch({
      type: "CHAT.SET_Typing",
      typing: "",
    });
  };
};

const closeChat = () => {
  return (dispatch) => {
    dispatch({
      type: "CHAT.RESET_STATE",
    });
  };
};

// export const setMessages = (messages) => {
//   return {
//     type: "CHAT.SET_MESSAGES",
//     messages,
//   };
// };

// const conversationList = () => {
//   return async (dispatch) => {
//     const data = await getAllConversations();
//     console.log(data);
//     // if (error) {
//     //   console.log(error);
//     //   return;
//     // }
//     console.log(data);
//     dispatch({
//       type: "CHAT.SET_CONVERSATIONS",
//       conversations: data,
//     });
//   };
// };
