import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { getReceivedDocument } from "../../api/document";
import { AiOutlineDownload } from "react-icons/ai";
import { ImSpinner8 } from "react-icons/im";
import MainPageContainer from "../MainPageContainer";
import TopViewDocument from "../items/TopViewDocument";
import Footer from "../user/Footer";
import SecondViewDocument from "../items/SecondViewDocument";
import ThirdViewDocument from "../items/ThirdViewDocument";
import FormViewDocument from "../items/FormViewDocument";
import CommentViewDocument from "../items/CommentViewDocument";

const Document = ({ user }) => {
  const [doc, setDoc] = useState({});
  const [loading, setLoading] = useState(true);
  const { documentId } = useParams();

  const { name, email } = user;

  useEffect(() => {
    (async () => {
      const { document } = await getReceivedDocument(documentId);
      setDoc(document);
      setLoading(false);
    })();
  }, [documentId]);

  console.log(doc);

  return (
    <MainPageContainer>
      {!loading ? (
        <>
          <TopViewDocument createAt={doc.createAt} />
          <div className="grid grid-cols-3 grid-flow-row h-full">
            <div
              className={
                doc.document.isFlow
                  ? "col-span-2 flex flex-col justify-between"
                  : "col-span-3 flex flex-col justify-between"
              }
            >
              <SecondViewDocument
                name={doc.senderId.name}
                email={doc.senderId.email}
                other={doc.document.receiverId.length}
                receiverId="me"
              />

              <ThirdViewDocument
                title={doc.document.document.title}
                content={doc.document.document.content}
                file={doc.document.document.doc}
              />
              {doc.document.isFlow && <FormViewDocument />}
            </div>
            {doc.document.isFlow && <CommentViewDocument />}
          </div>
        </>
      ) : (
        <div className="place-items-center grid h-full">
          <ImSpinner8 className="animate-spin h-48 w-48" />
        </div>
      )}
    </MainPageContainer>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

export default connect(mapStateToProps)(Document);
