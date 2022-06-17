import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./Dashboard.module.css";

const Dashboard = (props) => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [activeMembers, setActiveMembers] = useState(0);
  const [inactiveMembers, setInactiveMembers] = useState(0);

  useEffect(() => {
    // console.log(process.env.REACT_APP_API_KEY + "/members");
    const fetchData = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_KEY + "/dashboard",
      );
      if (!response.ok) {
        throw new Error("Error in loading dashboard data");
      }
      const data = await response.json();
      // console.log(data);
      setTotalMembers(data.totalMembers);
      setActiveMembers(data.activeMembers);
      setInactiveMembers(data.inactiveMembers);
    };

    fetchData().catch((err) => {
      console.log(err);
      // setIsLoading(false);
      // setHttpError(err);
    });
  }, []);

  return (
    <React.Fragment>
      <div className={classes.row}>
        <div className={classes.col}>
          <Card>
            <h3>Total No of Members</h3>
            <h2>: {totalMembers}</h2>
          </Card>
        </div>
        <div className={classes.col}>
          <Card>
            <h3>No. of Active Members</h3>
            <h2>: {activeMembers}</h2>
          </Card>
        </div>
        <div className={classes.col}>
          <Card>
            <h3>No. of Inactive Members</h3>
            <h2>: {inactiveMembers}</h2>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Dashboard;
