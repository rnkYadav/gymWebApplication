import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MembersTable from "../components/MembersTable";
import Card from "../UI/Card";
import classes from "./AllMembers.module.css";

const AllCustomers = (props) => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [httpError, setHttpError] = useState();

  // "https://raogyms-default-rtdb.firebaseio.com/members.json"

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch(process.env.REACT_APP_API_KEY + "/members");
      if (!response.ok) {
        throw new Error("Error in loading members data");
      }
      const loadedMembers = await response.json();
      setMembers(loadedMembers);
      setIsLoading(false);
    };

    fetchMembers().catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading Member List ...</h2>;
  }

  return (
    <div>
      <Card>
        <div className={classes.myDiv}>
          <h2>All Members</h2>
          <Link to={"/addMember"}>
            <button className={classes.myButton}>Add Member</button>
          </Link>
        </div>
        <div>{/* <ul>{customerList}</ul> */}</div>
      </Card>
      <MembersTable members={members} btnClass={classes.myButtonSmall} />
    </div>
  );
};

export default AllCustomers;
