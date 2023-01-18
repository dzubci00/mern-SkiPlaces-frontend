import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setfile] = useState();
  const [previewUrl, setpreviewUrl] = useState();
  const [isValid, setisValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setpreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setfile(pickedFile);
      setisValid(true);
      fileIsValid = true;
    } else {
      setisValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div
          className={`image-upload__preview ${
            props.full_width && "full_width"
          }`}
        >
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
