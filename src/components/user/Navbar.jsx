import React, { useEffect, useRef } from "react";
import { CgDarkMode } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks";
import Container from "../Container";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { disconnectSocket } from "../../socket/socketConnection";

const NavBar = ({ logout, user }) => {
  const { toggleTheme } = useTheme();
  const [contextMenu, setContextMenu] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref?.current?.contains(e.target)) {
        setContextMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [ref]);

  const handleLogout = () => {
    setContextMenu(false);
    disconnectSocket();
    logout(navigate);
  };

  return (
    <>
      {user ? (
        <>
          <div className="bg-light-primary dark:bg-dark-primary border-b-0.5 border-light-third dark:border-dark-third h-14">
            <Container className="p-2 ">
              <div className="flex justify-between items-center">
                <Link to="/">
                  <img src="./logo.jpg" className="h-10" alt="" />
                </Link>
                <ul className="flex items-center space-x-4">
                  <li>
                    <button
                      onClick={toggleTheme}
                      className="dark:bg-white bg-dark-subtle p-1 rounded"
                    >
                      <CgDarkMode className="text-secondary" size={24} />
                    </button>
                  </li>
                  <li>
                    <input
                      type="text"
                      className="bg-dark-third p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
                      placeholder="search..."
                    />
                  </li>
                  <li>
                    <button
                      ref={ref}
                      onClick={() => setContextMenu(!contextMenu)}
                      className="text-white font-semibold flex hover:bg-dark-third p-1 rounded"
                    >
                      <div className="self-center mr-2 font-semibold">
                        {user?.name}
                      </div>
                      <img
                        src={user?.avatar}
                        className="h-9 w-9 bg-white rounded-full"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </Container>
            {contextMenu && (
              <div
                style={{
                  top: `60px`,
                  left: `${window.innerWidth - 104}px`,
                  position: "absolute",
                }}
              >
                <ul className="bg-gray-700 w-24 rounded text-gray-300 p-1 text-lg shadow-2xl select-none">
                  <li className="hover:bg-blue-600 rounded p-1">
                    <button onClick={() => navigate(`/my-profile`)}>
                      Profile
                    </button>
                  </li>
                  <li className="hover:bg-blue-600 rounded p-1 flex justify-between">
                    <button onClick={handleLogout}>Logout</button>
                    <AiOutlineLogout className="self-center" />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="h-14 bg-light-secondary dark:bg-dark-primary">
          <button
            onClick={toggleTheme}
            className="dark:bg-white p-1 rounded m-2 w-8 justify-self-end col-start-1 col-end-7"
          >
            <CgDarkMode className="dark:text-dark-primary" size={24} />
          </button>
        </div>
      )}
    </>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

export default connect(mapStateToProps, mapActionToProps)(NavBar);
