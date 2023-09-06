import React, { useState } from "react";
import RejectedTable from "./RejectedTable";

function RejectedReceipt({ receipts, onRecreqno }) {
  const [recreqno, setRecreqno] = useState(null);
  const handleRecreqno = (value) => {
    setRecreqno(value);
    onRecreqno(value);
  };
  return (
    <div>
      <RejectedTable receipts={receipts} onRecreqno={handleRecreqno} />
    </div>
  );
}

export default RejectedReceipt;
