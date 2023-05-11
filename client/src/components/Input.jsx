import React from "react";
import Form from "react-bootstrap/Form";

const Input = ({ className, label, attributes }) => {
  return (
    <Form.Group className={className}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...attributes} />
    </Form.Group>
  );
};

export default Input;
