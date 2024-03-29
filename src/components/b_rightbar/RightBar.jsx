import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getActions } from "../../store/actions/friendAction";
import SearchFriend from "./SearchFriend";
import Friends from "./Friends";
import { useState } from "react";

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  friends.forEach((f) => {
    const isUserOnline = onlineUsers.find((user) => user.userId === f._id);
    f.isOnline = isUserOnline ? true : false;
  });
  return friends;
};

const RightBar = ({ friendList, friends, onlineUsers }) => {
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    friendList();
  }, []);

  return (
    <div className="h-48 text-lg md:h-full lg:h-full overflow-auto md:scrollbar dark:scrollbar-thumb-gray-400 scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-track-dark-third bg-light-primary dark:bg-dark-primary border-t dark:border-none">
      <SearchFriend setSearchValue={setSearchValue} />
      {friends.length === 0 && (
        <div className="text-center dark:text-gray-500 text-gray-300">
          No friend
        </div>
      )}
      {checkOnlineUsers(friends, onlineUsers).map((f, index) => {
        if (!searchValue) {
          return (
            <Friends
              key={f._id}
              name={f.name}
              isOnline={f.isOnline}
              id={f._id}
              avatar={f.avatar}
            />
          );
        }
        if (f.name.includes(searchValue)) {
          return (
            <Friends
              key={f._id}
              name={f.name}
              isOnline={f.isOnline}
              id={f._id}
              avatar={f.avatar}
            />
          );
        }
      })}
    </div>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = ({ friend }) => {
  return {
    ...friend,
  };
};

export default connect(mapStateToProps, mapActionToProps)(RightBar);
