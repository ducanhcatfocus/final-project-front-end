import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { myDocument, searchMyDocument } from "../../../api/document";
import { useRef } from "react";

const formatDate = (date) => {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let hh = date.getHours();
  let mi = date.getMinutes();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return dd + "/" + mm + "/" + yyyy;
};

const SendDocument = () => {
  const [documents, setDocuments] = useState([]);
  const searchRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await myDocument();
      console.log(data);
      setDocuments(data);
    })();
  }, []);

  const handleSearch = () => {
    const searchValue = searchRef.current.value;
    if (searchValue !== "") {
      (async () => {
        const { data } = await searchMyDocument(searchValue);
        console.log(data);
        setDocuments(data);
      })();
      return;
    }
    (async () => {
      const { data } = await myDocument();
      console.log(data);
      setDocuments(data);
    })();
  };

  return (
    <div className="">
      <div className="h-14 border-b-0.5 border-dark-third p-2 flex">
        <div className="w-80">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <button
              onClick={handleSearch}
              class="absolute inset-y-0 left-0 flex items-center pl-1 cursor-pointer "
            >
              <AiOutlineSearch className="hover:bg-gray-700 h-8 w-8 p-1 rounded-full" />
            </button>
            <input
              ref={searchRef}
              type="search"
              id="default-search"
              class="block w-full p-2 pl-10 text-sm text-gray-900 border border-dark-third rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-secondary dark:border-dark-third dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:ring-0.5 dark:focus:border-gray-500 dark:focus:border-0.5 dark:outline-none"
              placeholder="Search mai..."
              required
            />
          </div>
        </div>
      </div>
      {documents.map((d) => (
        <div
          key={d.id}
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
            <div className="font-light text-gray-400 truncate lg:w-96 w-24">
              {d.content}
            </div>
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
