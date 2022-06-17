import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import classes from "./AddMember.module.css";
import Card from "../UI/Card";

const EditMember = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  //   console.log(params.id);
  const [enterName, setEnterName] = useState("");
  const [enterMobile, setEnterMobile] = useState("");
  const [enterAddress, setEnterAddress] = useState("");
  const [enterRemark, setEnterRemark] = useState("");
  const [imageName, setImageName] = useState("");

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
    setImageName(e.target.files[0]);
    // console.log(e.target.files[0]);
  };
  const clearForm = () => {
    setEnterName("");
    setEnterMobile("");
    setEnterAddress("");
    setEnterRemark("");
  };
  const getMember = () => {
    fetch(process.env.REACT_APP_API_KEY + "/members/" + params.id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setEnterName(data.name);
        setEnterMobile(data.mobile);
        setEnterAddress(data.address);
        setEnterRemark(data.remark);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const memberSubmitHandler = (event) => {
    event.preventDefault();

    if (enterMobile.toString().length !== 10) {
      alert("Invalid Mobile Number");
      return;
    }
    const formData = new FormData();
    formData.append("name", enterName);
    formData.append("mobile", enterMobile);
    formData.append("address", enterAddress);
    formData.append("remark", enterRemark);
    formData.append("memberImage", imageName);

    // console.log(formData.get("name"));

    axios
      .post(process.env.REACT_APP_API_KEY + "/members/" + params.id, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch(process.env.REACT_APP_API_KEY + "/members/" + params.id, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: formData,
    //   // body: JSON.stringify(memberData),
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
    navigate("/member/" + params.id);
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <section>
      <h1>Edit member details</h1>
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
                <label>Member Image : </label>
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

export default EditMember;
