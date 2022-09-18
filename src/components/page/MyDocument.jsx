import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { myDocument } from "../../api/document";
import MainPageContainer from "../MainPageContainer";
import TopPageContainer from "../TopPageContainer";
import AllDocumentTop from "../items/AllDocumentTop";
import AllDocumentBody from "../items/AllDocumentBody";
import Footer from "../user/Footer";

const MyDocument = () => {
  const [doc, setDoc] = useState([]);
  const [page, setPage] = useState(null);
  const [documentId, setDocumentId] = useState({ documentId: "", status: "" });

  useEffect(() => {
    (async () => {
      const { data, page } = await myDocument(documentId);
      setDoc(data);
      setPage(page);
    })();
  }, [documentId]);

  const getMoreDocumentHandle = () => {
    if (doc.length === 21) {
      setDocumentId({ documentId: doc[doc.length - 2]._id, status: "next" });
      return;
    }
  };

  const getBackDocumentHandle = () => {
    if (doc.length === 21) {
      setDocumentId({ documentId: doc[1]._id, status: "back" });
      return;
    }
    setDocumentId({ documentId: doc[0]._id, status: "back" });
  };
  console.log(doc);
  console.log(page);

  return (
    <MainPageContainer>
      <TopPageContainer>
        <AllDocumentTop
          getMoreDocumentHandle={getMoreDocumentHandle}
          getBackDocumentHandle={getBackDocumentHandle}
          isFinalPage={doc.length}
          page={page}
        />
      </TopPageContainer>
      <ul className="mb-auto">
        {doc.map((d) => (
          <AllDocumentBody
            receiverId={d.receiverId.length}
            key={d._id}
            id={d._id}
            titleLength={d.document.title.length}
            contentLength={d.document.content.length}
            title={d.document.title}
            content={d.document.content}
            createAt={d.createAt}
            path="document"
          />
        ))}
      </ul>
    </MainPageContainer>
  );
};

export default MyDocument;
