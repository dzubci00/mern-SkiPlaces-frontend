import React, { useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
//import { VALIDATOR_EMAIL } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import "./PlaceForm.css";

const NewPlace = () => {
  const [formState, inputChangeHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      place: {
        value: "",
        isValid: false,
      },
      adress: {
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

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("place", formState.inputs.place.value);
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("adress", formState.inputs.adress.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="place"
          element="input"
          type="text"
          label="Place"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid place"
          onInput={inputChangeHandler}
        />

        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputChangeHandler}
        />

        <Input
          id="adress"
          element="input"
          type="text"
          label="Adress"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid adress"
          onInput={inputChangeHandler}
        />

        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)"
          onInput={inputChangeHandler}
        />

        <ImageUpload
          center
          full_width
          id="image"
          onInput={inputChangeHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
