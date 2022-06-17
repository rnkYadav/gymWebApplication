import { Link } from "react-router-dom";
import classes from "./CustomerList.module.css";
const Customer = (props) => {
  const member = props.member;
  const deleteClickhandler = () => {
    props.removeMember(member);
    let random = Math.random().toFixed(3) * 1000;
    let res = prompt("Enter " + random + " to delete this member.");
    // console.log("deleting member " + res + " " + random);
    if (parseInt(res) === parseInt(random)) {
      console.log("deleting member fetch");
      fetch(process.env.REACT_APP_API_KEY + "/members/" + member._id, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          props.removeMember(member);
        })
        .catch((err) => {
          console.log(err);
        });
    } else console.log("Not match");
  };
  return (
    <div className={classes.customerDiv}>
      <div>
        {/* <label>{props.sn}</label> */}
        <label>
          <img src="" alt="Member" height={100} width="100" />
        </label>
      </div>
      <div>
        <h3>{member.name}</h3>
        <p>{member.mobile}</p>
      </div>
      <div>
        <h3>{member.address}</h3>
        <p>{member.remark}</p>
      </div>
      <div>
        <Link to={"/member/" + member._id}>
          <button className={classes.myBtn2}>Details</button>
        </Link>
        <button onClick={deleteClickhandler} className={classes.myBtn2}>Delete</button>
      </div>
    </div>
  );
};
export default Customer;
