import React from "react";
import { deleteMyDocument, getDocument } from "../../../api/document";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";

const formatDate = (date) => {
  const today = new Date();

  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let hh = date.getHours();
  let mi = date.getMinutes();
  const am = hh <= 12 ? "AM" : "PM";
  const isToday =
    today.getMonth() + 1 === mm &&
    today.getDate() === dd &&
    today.getFullYear() === yyyy
      ? "Today"
      : dd + "/" + mm + "/" + yyyy;
  if (mi < 10) mi = "0" + mi;
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return isToday + "," + " " + hh + ":" + mi + " " + am;
};

const Document = ({ email }) => {
  const [document, setDocument] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const { documentId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getDoc = async () => {
      const { document: doc } = await getDocument(documentId);
      console.log(doc);
      setDocument(doc);
    };
    getDoc();
  }, []);

  const handleDelete = () => {
    (async () => {
      await deleteMyDocument(documentId);
      navigate("/send-document");
    })();
  };
  return (
    <>
      {document ? (
        <div className="p-5">
          <div className="break-all mb-2 flex justify-start gap-1 p-1 cursor-pointer items-center  ">
            <img
              src={document.sender.avatar}
              className="h-10 w-10 bg-white rounded-full"
              alt="avatar"
            />
            <div className="">
              <div className="truncate flex items-center">
                <p>{document.sender.name}</p>
                <p className="text-xs ml-1 font-light">
                  {"<" + document.sender.email + ">"}
                </p>
              </div>
              <div className="text-xs font-extralight flex truncate">
                To:
                {document.receivers.map((r, index) => {
                  if (r === email) {
                    return (
                      <p key={index} className="ml-1">
                        me
                        {document.receivers.length - 1 === index ? null : ","}
                      </p>
                    );
                  }
                  return (
                    <p key={index} className="ml-1">
                      {r}
                      {document.receivers.length - 1 === index ? null : ","}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="ml-auto border-r-2 border-dark-third pr-2 whitespace-nowrap">
              {formatDate(new Date(document.createAt))}
            </div>
            <button
              onClick={() => setIsDelete(true)}
              className="hover:bg-dark-third h-8 w-8 rounded p-1"
            >
              <AiFillDelete size={24} />
            </button>
          </div>
          <div className="text-lg font-bold">{document.subject}</div>
          <div className="break-all">{document.content}</div>
          {document.file.mimetype === "" && document.file.filename === "" ? (
            <a
              href={document.file[0].url}
              download
              className="flex gap-2 p-1 bg-dark-third hover:bg-slate-600 rounded-sm justify-between mt-2 cursor-pointer"
            >
              <p>{document.file[0].filename}</p>
            </a>
          ) : null}
          {isDelete && (
            <motion.div
              animate={{ y: -75 }}
              transition={{ stiffness: 50 }}
              className="absolute h-16 w-[calc(24rem_-_2rem)] bottom-2 py-1 px-2 m-auto bg-dark-third flex justify-between rounded left-0 right-0"
            >
              <div className="font-semibold self-center">
                Would you like to perform this delete action?
                <button
                  onClick={() => setIsDelete(false)}
                  className="p-1 bg-gray-600 rounded mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 bg-blue-500 rounded"
                >
                  OK
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Document;
