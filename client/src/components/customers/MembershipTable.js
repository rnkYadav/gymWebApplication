import { Link } from "react-router-dom";
import classes from "./MembershipTable.module.css";

const MembershipTable = (props) => {
  const formatDate = (gDate) => {
    if (gDate == null) return;
    const d = new Date(gDate);
    return (
      ("0" + d.getDate()).slice(-2) +
      " - " +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      " - " +
      d.getFullYear()
    );
  };
  const membershipList = props.memberships.map((membership) => {
    return (
      <tr key={membership._id}>
        <td>{membership.amount}</td>
        <td>{formatDate(membership.paymentDate)}</td>
        <td>{formatDate(membership.startDate)}</td>
        <td>{formatDate(membership.endDate)}</td>
        <td>
          <Link to={"/editMembership/" + membership._id}>Edit</Link>
        </td>
      </tr>
    );
  });
  return (
    <table className={classes.myTable}>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Payment Date</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{membershipList}</tbody>
    </table>
  );
};

export default MembershipTable;
