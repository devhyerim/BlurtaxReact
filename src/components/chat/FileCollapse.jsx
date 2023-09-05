import React from "react";
import { Collapse } from "react-bootstrap";

function FileCollapse({ open, children }) {
  return (
    <Collapse in={open}>
      <div>{children}</div>
    </Collapse>
  );
}

export default FileCollapse;
