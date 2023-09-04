import React from "react";
import { Collapse } from "react-bootstrap";
function ConfiredCollapse({ open, children }) {
  return (
    <Collapse in={open}>
      <div className="text-end">{children}</div>
    </Collapse>
  );
}

export default ConfiredCollapse;
