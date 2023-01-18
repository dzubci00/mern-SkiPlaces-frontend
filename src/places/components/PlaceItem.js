import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import Map from "../../shared/components/UIElements/Map";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./PlaceItem.css";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setshowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => setshowConfirmModal(true);
  const cancelDeleteHandler = () => setshowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setshowConfirmModal(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={showMap}
        onCancle={closeMapHandler}
        header={props.adress}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16}></Map>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancle={cancelDeleteHandler}
        header="Delete place?"
        delete
        contentClass="place-item__modal-content_delete"
        footerClass="place-item__modal-actions"
        footer={
          <div className="place-item__actions_delete">
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </div>
        }
      >
        <p>
          Are you sure you want to delete <b>{props.place}</b> ski place?
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
          <div className="place-item__header">
            <h2>{props.place}</h2>
            <p>{props.title}</p>
          </div>
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h3>{props.adress}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.userId === props.creatorId && (
              <React.Fragment>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};
export default PlaceItem;
