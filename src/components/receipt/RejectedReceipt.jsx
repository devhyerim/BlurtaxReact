import React, { useState } from "react";
import ModalMemo from "./ModalMemo";
import RejectedCollapse from "./RejectedCollapse";
import { useEffect } from "react";
import RejectedTable from "./RejectedTable";
import axios from "axios";

function RejectedReceipt() {
  const [receipts, setReceipts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8081/receipt/test").then((res) => {
      const data = res.data;
      console.log(data);

      setReceipts(res.data);
    });
  }, []);
  return (
    <div>
      <RejectedTable receipts={receipts} />
    </div>
  );
}

export default RejectedReceipt;
