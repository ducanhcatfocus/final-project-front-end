import React, { useRef, useState } from "react";
import { sendDocument } from "../../api/document";
import { getUserByEmail } from "../../api/friend";
import FormDocument from "../form/FormDocument";
import MainPageContainer from "../MainPageContainer";
import { RiAddBoxLine } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { createFlow } from "../../api/flow";
import { useEffect } from "react";

const SendDocument = () => {
  const [document, setDocument] = useState({
    email: "",
    title: "",
    content: "",
    doc: {},
    type: "single",
  });
  const [users, setUsers] = useState([]);
  const [flow, setFlow] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    let array = [];
    users.filter((u) => {
      return array.push(u.id);
    });
    setDocument({
      ...document,
      email: array,
    });
  }, [users]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (users.filter((u) => u.email === document.email).length > 0) {
      return console.log("user duplicated");
    }
    if (users.length === 5) {
      return console.log("maximum 5 persons");
    }
    const { user } = await getUserByEmail({ email: document.email });
    setUsers([...users, user]);
    inputRef.current.value = "";
  };

  const removeUserHandler = (index, e) => {
    e.preventDefault();
    if (users.length === 1) {
      setDocument({
        ...document,
        type: "single",
      });
      setFlow(false);
    }
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setDocument({ ...document, [name]: value });
  };

  const handleFileChange = ({ target }) => {
    console.log(target.files[0]);
    setDocument({ ...document, doc: target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    inputRef.current.value = "";

    const data = await sendDocument(document, flow);
  };

  const saveFlowHandler = async (e) => {
    e.preventDefault();
    let array = [];
    users.filter((u) => {
      return array.push(u.id);
    });
    const data = await createFlow(array);
  };

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setFlow(true);
    } else {
      setFlow(false);
    }
  };
  console.log(flow);

  const { title, content } = document;
  return (
    <MainPageContainer className="">
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto p-5 border-dark-third space-y-3 "
      >
        <div className="">
          <div className="flex justify-between">
            <FormDocument
              label="To: "
              placeholder="email@address.com"
              name="email"
              onChange={handleChange}
              input="input"
              inputRef={inputRef}
            />
            <button onClick={handleAddUser} className="">
              <RiAddBoxLine className="h-10 w-10 mt-3.5 ml-1 rounded hover:h-11 hover:w-11" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {users.length > 0 && (
              <>
                {users.map((u, index) => {
                  return (
                    <div key={index} className="flex justify-start">
                      <img
                        src={u.avatar}
                        className="rounded-full p-1 w-8 h-8 dark:bg-white"
                        alt="avatar"
                      />
                      <div className="grid grid-rows-2 grid-flow-col">
                        <span className="flex-1 ml-1 whitespace-nowrap font-semibold col-span-2 text-xs">
                          {u.name}
                        </span>
                        <span className="flex-1 ml-1 whitespace-nowrap font-light col-span-2 text-xs">
                          {u.email}
                        </span>
                      </div>
                      <button
                        className="self-start ml-0.5"
                        onClick={(e) => removeUserHandler(index, e)}
                      >
                        <AiOutlineCloseCircle color="red" />
                      </button>
                    </div>
                  );
                })}
                <button
                  className="h-6 w-10 bg-green-700 rounded self-center"
                  onClick={saveFlowHandler}
                >
                  Save
                </button>
              </>
            )}
          </div>

          <FormDocument
            value={title}
            label="Title: "
            placeholder="Your title..."
            name="title"
            onChange={handleChange}
            input="input"
          />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Content:
          </label>
          <textarea
            rows="4"
            value={content}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-third dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
            placeholder="Your message..."
            name="content"
            onChange={handleChange}
          ></textarea>

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Upload multiple files
          </label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            multiple=""
            name="doc"
            onChange={handleFileChange}
          />
        </div>
        {users.length > 0 && (
          <div class="flex items-center">
            <input
              id="link-checkbox"
              type="checkbox"
              value="flow"
              className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-dark-third"
              onChange={handleCheckBox}
            />
            <label htmlFor="link-checkbox" class="ml-2 text-sm font-medium">
              Queue sending
            </label>
          </div>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Send
        </button>
      </form>
    </MainPageContainer>
  );
};

export default SendDocument;
