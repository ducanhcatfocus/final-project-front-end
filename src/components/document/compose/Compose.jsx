import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { getReceiver, sendDocument } from "../../../api/document";
import { ImSpinner2 } from "react-icons/im";
import { motion } from "framer-motion";

const Compose = () => {
  const [email, setEmail] = useState("");
  const [receiver, setReceiver] = useState([]);
  const [listReceiver, setListReceiver] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

  const subjectRef = useRef();
  const contentRef = useRef();
  const fileRef = useRef();

  useEffect(() => {
    const controller = new AbortController();
    const delayDebounceFn = setTimeout(() => {
      if (email.length >= 2) {
        searchUser();
      } else {
        setReceiver([]);
      }
    }, 1000);

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [email]);

  const searchUser = async () => {
    const data = await getReceiver(email);
    setReceiver(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (listReceiver.length > 0 && contentRef.current.value !== "") {
      setLoading(true);
      const { message } = await sendDocument({
        subject: subjectRef.current.value,
        content: contentRef.current.value,
        receiver: listReceiver,
        files: fileRef.current.files[0],
      });
      setInfo(message);
      setTimeout(() => {
        setInfo(null);
      }, 3000);
      subjectRef.current.value = "";
      contentRef.current.value = "";
      setEmail("");
      setListReceiver([]);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-6 w-full border-l-0.5 border-dark-third "
    >
      <div className="flex">
        <div className="h-12 border-b-0.5 border-dark-third flex relative">
          {(email.length >= 2 || listReceiver.length > 0) && (
            <p className="self-center w-10">To:</p>
          )}

          {listReceiver.map((l, index) => (
            <div
              key={index}
              className="self-center bg-dark-third mr-2 rounded-lg p-1 cursor-pointer flex hover:bg-slate-500"
              onClick={() => {
                setListReceiver(listReceiver.filter((_, i) => i !== index));
              }}
            >
              {l}
            </div>
          ))}

          {receiver.length > 0 && (
            <div className="top-11 left-2 min-h-12 max-h-48 overflow-auto absolute bg-dark-third p-2 w-80 border-0.5 border-dark-third rounded-lg">
              {receiver.map((r, index) => (
                <li
                  key={index}
                  className="break-all mb-2 flex justify-start gap-1 hover:bg-slate-500 p-1 cursor-pointer  "
                  onClick={() => {
                    if (
                      listReceiver.length < 4 &&
                      !listReceiver.includes(r.email)
                    ) {
                      setListReceiver([...listReceiver, r.email]);
                      setReceiver([]);
                    }
                  }}
                >
                  <img
                    src={r.avatar}
                    className="h-10 w-10 bg-white rounded-full"
                    alt="avatar"
                  />
                  <div className="text-sm truncate">
                    <p>{r.name}</p>
                    <p>{r.email}</p>
                  </div>
                </li>
              ))}
            </div>
          )}
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Receiver"
          className="h-12 bg-dark-secondary focus:outline-none border-b-0.5 border-dark-third w-full min-w-24"
        />
      </div>

      <input
        type="text"
        placeholder="Subject"
        className="h-12 bg-dark-secondary focus:outline-none border-b-0.5 border-dark-third"
        ref={subjectRef}
      />
      <textarea
        className="bg-dark-secondary focus:outline-none resize-none h-80"
        ref={contentRef}
      ></textarea>

      <label htmlFor="fileId" className="">
        <div className="bg-dark-third h-14 w-14 rounded-lg  border border-dashed cursor-pointer">
          <AiOutlineCloudUpload className="h-8 w-8" />
        </div>
        <input ref={fileRef} hidden type="file" name="file" id="fileId" />
      </label>

      {!loading ? (
        <button className="bg-blue-500  h-10 w-24 rounded-lg hover:bg-blue-600">
          Send
        </button>
      ) : (
        <div className="bg-blue-500 h-10 w-24 rounded-lg flex items-center justify-center">
          <ImSpinner2 className="animate-spin " />
        </div>
      )}
      {info && (
        <motion.div
          animate={{ y: -75 }}
          transition={{ stiffness: 50 }}
          className="absolute h-12 w-96 bottom-2 py-1 px-2 m-auto bg-dark-third flex justify-between rounded left-0 right-0"
        >
          <div className="font-semibold self-center">{info}</div>
        </motion.div>
      )}
    </form>
  );
};

export default Compose;
