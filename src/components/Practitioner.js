import React, { useEffect, useState } from "react";
import PractitionerCard from "./PractitionerCard";

import { selectFetchingPractitioners } from "../redux/selectors/practitioner";
import { fetchPractitioners } from "../redux/actions/practitioner";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

const Practitioner = () => {

  const [practitioners, setPractitioners] = useState([]);
  const dispatch = useDispatch();
  const isFetchingPractitioners = useSelector(selectFetchingPractitioners);

  useEffect(() => {
    dispatch(fetchPractitioners()).then((res) => {
      console.log(flattenPractitionerObj(res.payload));
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

  if (isFetchingPractitioners) {
    return (
      <div className="position-absolute" style={{ top: '50%', left: '50%' }}>
        <ReactLoading type="spin" color="#000000" width="80px" height="80px" />
      </div>
    )
  }

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Profile Image</th>
            <th scope="col">Full Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {
            practitioners.map((practitioner, index) => (
              <PractitionerCard
                data={practitioner}
                key={index}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Practitioner;
