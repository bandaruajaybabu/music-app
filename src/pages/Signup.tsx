import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import "../App.css";
import { redirect, useNavigate } from "react-router-dom";
import { Button, Form, Image } from "react-bootstrap";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import EmailRequest from "./emailReq";

export const baseURL = "http://localhost:3000";

export default function () {
  const [loginStatus, setLoginStatus] = useState("");
  let [authMode, setAuthMode] = useState("signin");
  const [emailValidation, setEmailValidation] = useState(false);
  const [emailMatch, setEmailMatch] = useState(false);
  const [passValidation, setPassValidation] = useState(false);
  const [passError, setPassError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameValidation, setNameValidation] = useState(false);
  const [nameError, setNameError] = useState("");
  useEffect(() => {
    setPassError("");
    setPassValidation(false);
    setEmailValidation(false);
    setEmailMatch(false);
  }, [authMode]);
  // export emailValidation;

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  let navigate = useNavigate();

  function handleFullname(e) {
    let name: string = e.target.value;
    var letterNumber = /^[ .na-zA-Z]+$/;
    if (!name.match(letterNumber)) {
      setNameValidation(true);
      setNameError("invalid name");
    } else setNameValidation(false);
  }

  const handleSignIn = async (e: SyntheticEvent) => {
    e.preventDefault();
    // handleSubmit(e);
    let target = e.target as typeof e.target & { value: any }[];
    let email = target[0].value;
    let password = target[1].value;

    if (email && password && !emailValidation && !passValidation) {
      const allUsers = await fetch("http://localhost:5000/user").then(
        (response) => response.json()
      );
      console.log("allUsers");
      console.log(allUsers);
      let isUserExists = allUsers.find((user) => user.email === email);
      console.log(isUserExists);
      if (
        isUserExists &&
        isUserExists.email === email &&
        isUserExists.password === password
      ) {
        navigate("/app");
      } else {
        console.log("user doest exists");
        setLoginStatus("user does not exist");
      }
    }
  };

  const handleSignUp = async (e: SyntheticEvent) => {
    e.preventDefault();
    // handleSubmit(e);
    let target = e.target as typeof e.target & { value: any }[];
    let name = target[0].value;
    let email = target[1].value;
    let password = target[2].value;

    if (email && password && !emailValidation && !passValidation) {
      const status = await fetch("http://localhost:5000/user", {
        method: "POST",
        body: JSON.stringify({ email, name, password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(" new user signup status --- ", status);

      navigate("/app");
    }
  };

  if (authMode === "signin") {
    return (
      <div className="bg-gray-800">
        <Image src="src/assets/logo.png" className="logo" />
        <div className="Auth-form-container">
          <Form
            className="Auth-form"
            onSubmit={handleSignIn}
            noValidate
            // validated={validated}
          >
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span
                  className="link-primary"
                  onClick={changeAuthMode}
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </span>
              </div>
              <EmailRequest authMode={authMode} />
              <p
                style={{
                  color: "red",
                }}
              >
                {loginStatus}
              </p>
              <div className="d-grid gap-2 my-3">
                <Button
                  type="submit"
                  className="border rounded-md p-2 bg-blue-600 text-white hover:bg-blue-800"
                >
                  Sign In{" "}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800">
      <Image src="src/assets/logo.png" className="logo1" />
      <div className="Auth-form-container">
        <Form className="Auth-form" onSubmit={handleSignUp}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span
                className="link-primary"
                onClick={changeAuthMode}
                style={{ cursor: "pointer" }}
              >
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <Form.Control
                type="text"
                required
                minLength={5}
                className="form-control mt-1"
                placeholder="e.g Ajaybabu"
                isInvalid={nameValidation}
                onChange={handleFullname}
              />
              <Form.Control.Feedback type="invalid">
                {nameError}
              </Form.Control.Feedback>
            </div>
            <EmailRequest />
            <Form.Group className="d-grid gap-2 my-3">
              <button
                type="submit"
                className="border rounded-md p-2 bg-blue-600 text-white hover:bg-blue-800"
              >
                Sign Up
              </button>
            </Form.Group>
          </div>
        </Form>
      </div>
    </div>
  );
}
