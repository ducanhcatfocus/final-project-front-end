import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { myDocument } from "../../../api/document";

const formatDate = (date) => {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return dd + "/" + mm + "/" + yyyy;
};

const SendDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await myDocument();
      console.log(data);
      setDocuments(data);
    })();
  }, []);

  return (
    <div className="">
      {documents.map((d) => (
        <div
          key={d.id}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => navigate("/document/" + d._id)}
          className="h-10 dark:hover:bg-gray-700 border-b-0.5 border-dark-third flex items-center px-2 cursor-pointer"
        >
          <div className="lg:w-80 w-24 flex">
            To:
            <div className="flex  truncate text-sm font-extralight ml-1">
              {d.receivers[0]}
              {d.receivers.length > 1
                ? `, and ${d.receivers.length - 1} others`
                : ""}
            </div>
          </div>
          <div className="flex ml-1">
            <p className="font-semibold lg:w-80 w-24 truncate ">{d.subject}</p>
            <p className="font-light text-gray-400 truncate lg:w-96 w-24">
              {d.content}
            </p>
          </div>

          <div className="font-light text-gray-400 text-sm ml-auto">
            {formatDate(new Date(d.createAt))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SendDocument;
