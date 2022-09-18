import React from "react";
import SideBarItem from "../items/SideBarItem";
import { connect } from "react-redux";

import { AiOutlineInbox } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { RiFlowChart } from "react-icons/ri";
import { BiDotsHorizontal } from "react-icons/bi";

const Sidebar = ({ roomDetails }) => {
  return (
    <div className="col-start-1 col-end-1 py-4 px-1 bg-light-primary  dark:bg-dark-primary">
      <ul className="space-y-2">
        <SideBarItem
          to="/send-document"
          label="Sent Document"
          icon={<BsFileEarmarkPlus />}
        />
        <SideBarItem to="/inbox" label="Inbox" icon={<AiOutlineInbox />} />
        <SideBarItem
          to="/my-document"
          label="My document"
          icon={<AiOutlineSend />}
        />
        <SideBarItem to="/flow" label="My flow" icon={<RiFlowChart />} />
        <SideBarItem to="/" label="In progress" icon={<BiDotsHorizontal />} />
      </ul>
      <ul className="pt-4 mt-4 space-y-2 border-t border-light-third dark:border-dark-third">
        <SideBarItem
          to="/add-friend"
          label="Add friend"
          icon={<AiOutlinePlusSquare />}
        />
        <SideBarItem
          to="/create-room"
          label="Create room"
          icon={<AiOutlinePlusSquare />}
        />
        <SideBarItem
          to="/join-room"
          label="Join room"
          icon={<AiOutlineUsergroupAdd />}
        />
        {roomDetails ? (
          <SideBarItem to="/room" label={roomDetails.roomName} />
        ) : null}
        <SideBarItem to="/" label="Help" icon={<BiHelpCircle />} />
      </ul>
    </div>
  );
};

const mapStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStateToProps)(Sidebar);
