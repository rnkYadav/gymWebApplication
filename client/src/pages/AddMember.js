import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./AddMember.module.css";
import Card from "../UI/Card";

const AddMember = (props) => {
  const navigate = useNavigate();
  const [enterName, setEnterName] = useState("");
  const [enterMobile, setEnterMobile] = useState("");
  const [enterAddress, setEnterAddress] = useState("");
  const [enterRemark, setEnterRemark] = useState("");
  const [image, setImage] = useState("");
  const nameChangeHandler = (e) => {
    setEnterName(e.target.value);
  };
  const mobileChangeHandler = (e) => {
    setEnterMobile(e.target.value);
  };
  const addressChangeHandler = (e) => {
    setEnterAddress(e.target.value);
  };
  const remarkChangeHandler = (e) => {
    setEnterRemark(e.target.value);
  };
  const imageChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const clearForm = () => {
    setEnterName("");
    setEnterMobile("");
    setEnterAddress("");
    setEnterRemark("");
  };
  const memberSubmitHandler = (event) => {
    event.preventDefault();
    if (enterMobile.length !== 10) {
      alert("Invalid Mobile Number");
      return;
    }

    const formData = new FormData();
    formData.append("name", enterName);
    formData.append("mobile", enterMobile);
    formData.append("address", enterAddress);
    formData.append("remark", enterRemark);
    formData.append("memberImage", image);

    axios
      .post(process.env.REACT_APP_API_KEY + "/members", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch(process.env.REACT_APP_API_KEY + "/members", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: enterName,
    //     mobile: enterMobile,
    //     address: enterAddress,
    //     remark: enterRemark,
    //   }),
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    clearForm();
    navigate("/allMembers");
  };
  return (
    <section>
      <h1>Enter new member details</h1>
      <div>
        <div>
          <Card myClasses={classes.myCard}>
            <form onSubmit={memberSubmitHandler} encType="multipart/form-data">
              <div>
                <label>Name : </label>
                <input
                  type="text"
                  name="member_name"
                  required
                  onChange={nameChangeHandler}
                  value={enterName}
                />
              </div>
              <div>
                <label>Mobile : </label>
                <input
                  type="number"
                  name="member_mobile"
                  required
                  onChange={mobileChangeHandler}
                  value={enterMobile}
                />
              </div>
              <div>
                <label>Address : </label>
                <input
                  type="text"
                  name="member_address"
                  onChange={addressChangeHandler}
                  value={enterAddress}
                />
              </div>
              <div>
                <label>Remark : </label>
                <input
                  type="text"
                  name="member_remark"
                  onChange={remarkChangeHandler}
                  value={enterRemark}
                />
              </div>
              <div>
                <label>Image : </label>
                <input
                  type="file"
                  name="member_image"
                  onChange={imageChangeHandler}
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

export default AddMember;
