import React, { FormEvent, useState } from "react";
// import { Form } from "react-router-dom"
import "../App.css";
import { Button, Form, Image } from "react-bootstrap";

export default function EmailRequest(props: any) {
  let authMode = props.authMode;
  const [emailValidation, setEmailValidation] = useState(false);
  const [passValidation, setPassValidation] = useState(false);
  const [passError, setPassError] = useState("");
  // const [emailMatch, setEmailMatch] = useState(false);
  const [emailError, setEmailError] = useState("");
  function handlePassword(e: FormEvent) {
    console.log("In handle password");
    let pass: string = (e.target as HTMLInputElement).value;
    if (pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/))
      setPassValidation(false);
    else {
      setPassValidation(true);
      setPassError(
        "Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number"
      );
    }
  }
  function handleEmail(e) {
    let email: string = e.target.value;

    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setEmailValidation(false);
    } else {
      setEmailValidation(true);
      setEmailError("Please enter email properly.");
      console.log(emailError);
    }
  }
  return (
    <div>
      <Form.Group className="form-group mt-3" controlId="">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          required
          className="form-control mt-1"
          placeholder="Enter email"
          isInvalid={emailValidation}
          onChange={handleEmail}
        />
        <Form.Control.Feedback type="invalid">
          {emailError}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          className="form-control mt-1"
          placeholder="Enter password"
          onChange={(e) => {
            console.log("In onchange event.....")
            if (authMode === "signin") {
              console.log("in if block");
              setPassError("");
              setPassValidation(false);
            } else {
              console.log("In else block");
              handlePassword(e);
            }
          }}
          isInvalid={passValidation}
        />
        <Form.Control.Feedback type="invalid">
          {passError}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
}
