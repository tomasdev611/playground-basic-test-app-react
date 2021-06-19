import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';

const PractitionerCard = ({ data, onDelete }) => {
  const [personalInfo, setPersonalInfo] = useState(data);

  useEffect(() => {
    setPersonalInfo(data);
  }, [data]);

  const {
    photo,
    name,
    gender,
    dob
  } = personalInfo;

  return (
    <tr>
      <td>
        <img
          src={photo}
          alt="Avatar"
          style={{ height: 50, width: 50, borderRadius: "50%" }}
        />
      </td>
      <td>{name ? name : 'N/A'}</td>
      <td>{gender ? gender : 'N/A'}</td>
      <td>{dob ? moment(dob).format('YYYY/MM/DD') : 'N/A'}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
}

PractitionerCard.propTypes = {
  data: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    gender: PropTypes.string,
    dob: PropTypes.string
  })
}

export default PractitionerCard;