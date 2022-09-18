import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllFlow } from "../../api/flow";
import MainPageContainer from "../MainPageContainer";

const MyFlow = () => {
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getAllFlow();
      setFlows(data);
    })();
  }, []);

  console.log(flows);

  return <MainPageContainer></MainPageContainer>;
};

export default MyFlow;
