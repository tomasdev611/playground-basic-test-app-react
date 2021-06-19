import React, { useEffect, useState } from "react";
import PractitionerCard from "./PractitionerCard";

import { selectFetchingPractitioners } from "../redux/selectors/practitioner";
import { fetchPractitioners } from "../redux/actions/practitioner";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Practitioner = () => {
  const [practitioners, setPractitioners] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const isFetchingPractitioners = useSelector(selectFetchingPractitioners);

  useEffect(() => {
    dispatch(fetchPractitioners()).then((res) => {
      setPractitioners(flattenPractitionerObj(res.payload));
    })
  }, [dispatch]);

  const flattenPractitionerObj = (response) => {
    return (response.entry || []).map((item) => {
      const name = item.resource.name || [];
      return {
        id: item.resource.id,
        name: name.length ? `${((name[0] || {}).given || []).join(" ")} ${(name[0] || {}).family}` : null,
        gender: item.resource.gender,
        dob: item.resource.birthDate,
        photo:
          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
      };
    });
  };

  const showDeleteModal = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  }

  const closeDeleteModal = () => {
    setSelectedId(null);
    setShowDelete(false);
  }

  const deletePractitioner = () => {
    setPractitioners(practitioners.filter((p) => p.id !== selectedId))
    closeDeleteModal();
  }

  if (isFetchingPractitioners) {
    return (
      <div className="position-absolute" style={{ top: '50%', left: '50%' }}>
        <ReactLoading type="spin" color="#000000" width="80px" height="80px" />
      </div>
    )
  }

  return (
    <div>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Profile Image</th>
            <th scope="col">Full Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Date of Birth</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            practitioners.map((practitioner, index) => (
              <PractitionerCard
                data={practitioner}
                onDelete={() => showDeleteModal(practitioner.id)}
                key={index}
              />
            ))
          }
        </tbody>
      </table>
      <Modal show={showDelete} onHide={closeDeleteModal}>
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this practitioner?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deletePractitioner}>
            Yes
          </Button>
          <Button variant="secondary" onClick={closeDeleteModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Practitioner;
