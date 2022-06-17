import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./AddMembership.module.css";
import Card from "../UI/Card";

const EditMembership = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [amount, setAmount] = useState("");
  const [memberId, setMemberId] = useState("");
  const [payment, setPayment] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const amountChangeHandler = (e) => {
    setAmount(e.target.value);
  };
  const paymentChangeHandler = (e) => {
    setPayment(e.target.value);
  };
  const startChangeHandler = (e) => {
    setStart(e.target.value);
  };
  const endChangeHandler = (e) => {
    setEnd(e.target.value);
  };
  const clearForm = () => {
    setAmount("");
    setPayment("");
    setStart("");
    setEnd("");
  };
  const memberSubmitHandler = (event) => {
    event.preventDefault();

    const memberData = {
      amount: amount,
      memberId: memberId,
      paymentDate: payment,
      startDate: start,
      endDate: end,
    };

    // console.log(memberData);
    // return;
    // https://raogyms-default-rtdb.firebaseio.com/members.json
    fetch(process.env.REACT_APP_API_KEY + "/membership/" + params.msid, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAmount(data.amount);
        setMemberId(data.memberId);
        setPayment(data.paymentDate);
        setStart(data.startDate);
        setEnd(data.endDate);
      })
      .catch((error) => {
        console.log(error);
      });

    clearForm();
    navigate("/member/" + memberId);
  };
  const formatDate = (date) => {
    let dt = new Date(date);
    return (
      dt.getFullYear() +
      "-" +
      ("0" + (dt.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + dt.getDate()).slice(-2)
    );
  };
  useEffect(() => {
    fetch(process.env.REACT_APP_API_KEY + "/membership/" + params.msid, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        let ms = data.membership;
        setAmount(ms.amount);
        setMemberId(ms.memberId);
        setPayment(formatDate(ms.paymentDate));
        setStart(formatDate(ms.startDate));
        setEnd(formatDate(ms.endDate));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <section>
      <h4>Edit membership for Member Id {memberId}</h4>
      <div>
        <div>
          <Card myClasses={classes.myCard}>
            <form onSubmit={memberSubmitHandler} encType="multipart/form-data">
              <div className={classes.myDiv}>
                <label>Amount : </label>
                <input
                  type="text"
                  name="amount"
                  required
                  onChange={amountChangeHandler}
                  value={amount}
                />
              </div>
              <div className={classes.myDiv}>
                <label>Payment Date : </label>
                <input
                  type="date"
                  name="paymentDate"
                  required
                  onChange={paymentChangeHandler}
                  value={payment}
                />
              </div>
              <div className={classes.myDiv}>
                <label>Start Date : </label>
                <input
                  type="date"
                  name="startDate"
                  onChange={startChangeHandler}
                  value={start}
                />
              </div>
              <div className={classes.myDiv}>
                <label>End Date : </label>
                <input
                  type="date"
                  name="endDate"
                  onChange={endChangeHandler}
                  value={end}
                />
              </div>
              <div>
                <button type="submit" className={classes.saveBtn}>
                  Save
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EditMembership;
