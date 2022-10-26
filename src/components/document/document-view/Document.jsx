import React from "react";
import { getDocument } from "../../../api/document";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const Document = ({ email }) => {
  const [document, setDocument] = useState();
  const { documentId } = useParams();
  useEffect(() => {
    const getDoc = async () => {
      const { document: doc } = await getDocument(documentId);
      console.log(doc);
      setDocument(doc);
    };
    getDoc();
  }, []);
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
                {document.receivers.map((r) => {
                  if (r === email) {
                    return <p className="ml-1">me,</p>;
                  }
                  return <p className="ml-1">{r},</p>;
                })}
              </div>
            </div>
            <div className="ml-auto border-r-2 border-dark-third pr-2 whitespace-nowrap">
              Today, 08:34 AM
            </div>
            <button className="hover:bg-dark-third h-8 w-8 rounded p-1">
              <AiFillDelete size={24} />
            </button>
          </div>
          <div className="text-lg font-bold">{document.subject}</div>
          <div className="break-all">{document.content}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Document;
