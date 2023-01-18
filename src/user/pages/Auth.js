import React, { useState, useContext } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setisLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          username: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setisLoginMode((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("userName", formState.inputs.username.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <Backdrop show={!!error} onClick={clearError} timeout={100}></Backdrop>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              placeholder="Username"
              id="username"
              element="input"
              type="text"
              //label="Username"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please eneter a username."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload center id="image" onInput={inputHandler} />
          )}
          <Input
            placeholder="E-mail"
            id="email"
            element="input"
            type="email"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email adress."
            onInput={inputHandler}
          />

          <Input
            placeholder="Password"
            id="password"
            element="input"
            type="password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />

          <Button type="submit" size="fullwidth" disabled={!formState.isValid}>
            {isLoginMode ? "Log in" : "Sign up"}
          </Button>
        </form>
        <div>
          <h5>
            <span>OR</span>
          </h5>
        </div>
        {isLoginMode ? (
          <Card className="auth-form">
            Don't have an account?
            <a inverse="true" onClick={switchModeHandler}>
              Sign up
            </a>
          </Card>
        ) : (
          <Card className="auth-form">
            Have an account?
            <a inverse="true" onClick={switchModeHandler}>
              Log in
            </a>
          </Card>
        )}
      </Card>
    </React.Fragment>
  );
};

export default Auth;
