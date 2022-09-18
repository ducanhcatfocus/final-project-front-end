import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { receivedDocument } from "../../api/document";
import AllDocumentBody from "../items/AllDocumentBody";
import AllDocumentTop from "../items/AllDocumentTop";
import MainPageContainer from "../MainPageContainer";
import TopPageContainer from "../TopPageContainer";
import Footer from "../user/Footer";

const Inbox = () => {
  const [doc, setDoc] = useState([]);
  const [documentId, setDocumentId] = useState({ documentId: "", status: "" });

  useEffect(() => {
    (async () => {
      const { data } = await receivedDocument();
      setDoc(data);
    })();
  }, []);

  const getMoreDocumentHandle = () => {
    setDocumentId({ documentId: doc[doc.length - 1]._id, status: "next" });
  };

  const getBackDocumentHandle = () => {
    setDocumentId({ documentId: doc[0]._id, status: "back" });
  };

  console.log(doc);
  return (
    <MainPageContainer>
      <TopPageContainer>
        <AllDocumentTop />
      </TopPageContainer>
      <ul className="mb-auto">
        {doc.map((d) => (
          <AllDocumentBody
            key={d._id}
            id={d._id}
            titleLength={d.document.document.title.length}
            contentLength={d.document.document.content.length}
            title={d.document.document.title}
            content={d.document.document.content}
            createAt={d.createAt}
            path="received-document"
          />
        ))}
      </ul>
    </MainPageContainer>
  );
};

export default Inbox;
