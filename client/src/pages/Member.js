import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MembershipTable from "../components/customers/MembershipTable";
import classes from "./Member.module.css";

const Customer = (props) => {
  const params = useParams();
  const [member, setMember] = useState({});
  const [memberships, setMemberships] = useState([]);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMember = async () => {
      // console.log("Fetch Member");
      const response = await fetch(
        process.env.REACT_APP_API_KEY + "/members/" + params.id,
      );
      if (!response.ok) {
        throw new Error("Error in loading member details");
      }

      const data = await response.json();
      setMember(data);
    };

    fetchMember().catch((error) => {
      setHttpError(error);
    });
    const fetchMembership = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_KEY + "/membership/member/" + params.id,
      );
      if (!response.ok) {
        throw new Error("Error in loading member details");
      }

      const data = await response.json();
      setMemberships(data);
    };

    fetchMembership().catch((error) => {
      setHttpError(error);
    });
  }, []);

  if (httpError) {
    return (
      <div>
        <h3>{httpError.message}</h3>
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* <h1>This is a customer details page having id : {params.id}</h1> */}

      <div className={classes.detailDiv}>
        <div>
          <img
            src={
              process.env.REACT_APP_API_KEY +
              "/public/images/" +
              member.member_image
            }
            alt="Member Image Not Available"
            className={classes.memberImage}
          />
        </div>
        <div>
          <h1>{member.name}</h1>
          <Link to={"/editMember/" + member._id}>Edit Member</Link>
        </div>
      </div>

      <div className={classes.detailDiv}>
        <div>Member Id </div>
        <div>: {member._id}</div>
      </div>

      <div className={classes.detailDiv}>
        <div>Mobile </div>
        <div>: {member.mobile}</div>
      </div>

      <div className={classes.detailDiv}>
        <div>Address </div>
        <div>: {member.address}</div>
      </div>

      <div className={classes.detailDiv}>
        <div>Remark </div>
        <div>: {member.remark}</div>
      </div>

      <div className={classes.membershipDiv}>
        <h2>Membership Details</h2>
        <Link to={"/addMembership/" + member._id} className={classes.myButton}>
          Add Membership
        </Link>
        <MembershipTable memberships={memberships} />
      </div>
    </React.Fragment>
  );
};
export default Customer;
