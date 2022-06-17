import { Link } from "react-router-dom";
import classes from "./customers/MembershipTable.module.css";

const MembersTable = (props) => {
  const deleteClickhandler = (mid) => {
    console.log(mid);
    // return;
    let random = Math.random().toFixed(3) * 1000;
    let res = prompt("Enter " + random + " to delete this member.");
    // console.log("deleting member " + res + " " + random);
    if (parseInt(res) === parseInt(random)) {
      console.log("deleting member fetch");
      fetch(process.env.REACT_APP_API_KEY + "/members/" + mid, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else console.log("Not match");
  };
  const memberList = props.members.map((member) => {
    return (
      <tr key={member._id}>
        <td>
          <img
            src={
              process.env.REACT_APP_API_KEY +
              "/public/images/" +
              member.member_image
            }
            alt="Not Available"
            height={100}
            width={100}
          />
        </td>
        <td>{member.name}</td>
        <td>{member.mobile}</td>
        <td>{member.address}</td>
        <td>{member.remark}</td>
        <td>
          <Link to={"/editMember/" + member._id} className={props.btnClass}>
            Edit
          </Link>
          <button
            onClick={deleteClickhandler.bind(null, member._id)}
            className={props.btnClass}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <table className={classes.myTable}>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Mobile</th>
          <th>Address</th>
          <th>Remark</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{memberList}</tbody>
    </table>
  );
};

export default MembersTable;
