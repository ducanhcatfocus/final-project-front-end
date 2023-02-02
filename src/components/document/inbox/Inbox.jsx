import React from "react";
import { useState, useEffect } from "react";
import { receivedDocument } from "../../../api/document";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return dd + "/" + mm + "/" + yyyy;
};

const Inbox = ({ email }) => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await receivedDocument(email);
      console.log(data);
      setDocuments(data);
    })();
  }, []);
  return (
    <div className="">
      {documents.map((d) => (
        <div
          onClick={() => navigate("/document/" + d.document._id)}
          className={
            d.isRead
              ? "h-10 dark:hover:bg-gray-700 border-b-0.5 border-dark-third flex items-center px-2 cursor-pointer bg-gray-600"
              : "h-10 dark:hover:bg-gray-700 border-b-0.5 border-dark-third flex items-center px-2 cursor-pointer"
          }
        >
          <div className="lg:w-80 w-24 flex items-center">
            <img
              src={d.document.sender.avatar}
              alt=""
              className="rounded-full h-8 w-8"
            />
            <div className="truncate  font-light ml-1">
              {d.document.sender.name}
            </div>
          </div>
          <div className="flex ml-1">
            <p className="font-semibold lg:w-80 w-24 truncate ">
              {d.document.subject}
            </p>
            <p className="font-light text-gray-400 truncate lg:w-96 w-24">
              {d.document.content}
            </p>
          </div>
          <div className="font-light text-gray-400 text-sm ml-auto">
            {formatDate(new Date(d.document.createAt))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
