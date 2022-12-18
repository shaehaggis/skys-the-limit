import React from "react";

import Alert from "react-bootstrap/Alert";

const Message = ({ type, content, deleteFlash }) => (
  <Alert variant={type} onClose={deleteFlash} dismissible>
    {content}
  </Alert>
);

export default Message;
