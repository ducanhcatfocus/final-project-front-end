import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { getDocument } from "../../api/document";
import { ImSpinner8 } from "react-icons/im";
import MainPageContainer from "../MainPageContainer";
import TopViewDocument from "../items/TopViewDocument";
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
    const getDoc = async () => {
      const { document } = await getDocument(documentId);
      setDoc(document);
      setLoading(false);
    };
    getDoc();
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
                doc.isFlow
                  ? "col-span-2 flex flex-col justify-between"
                  : "col-span-3 flex flex-col justify-between"
              }
            >
              <SecondViewDocument
                name={name}
                email={email}
                other={doc.receiverId.length}
                receiverId={doc.receiverId[0].name}
              />

              <ThirdViewDocument
                title={doc.document.title}
                content={doc.document.content}
                file={doc.document.doc}
              />
              {doc.isFlow && <FormViewDocument />}
            </div>
            {doc.isFlow && <CommentViewDocument />}
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
