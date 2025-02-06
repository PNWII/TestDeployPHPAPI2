import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    usernameAdmin: "",
    emailAdmin: "",
    passwordAdmin: "",
  });
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.usernameAdmin) newErrors.usernameAdmin = "กรุณากรอก Username";
    if (!values.emailAdmin) newErrors.emailAdmin = "กรุณากรอก E-mail";
    if (!values.passwordAdmin) newErrors.passwordAdmin = "กรุณากรอก Password";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values); // ตรวจสอบข้อมูลใน console

    if (!validateForm()) {
      return; // Do not proceed if there are validation errors
    }

    const url = "http://localhost/TestPHP-API2/backend/LoginAdmin.php";
    axios
      .post(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          alert("Error: " + response.data.message);
        } else {
          alert("เข้าสู่ระบบสำเร็จ");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("idAdmin", values.emailAdmin);
          localStorage.setItem("role", "admin");
          console.log(values.emailAdmin);
          navigate("/adminpage");
        }
      })
      .catch((error) => {
        alert("Network Error: " + error.message);
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: 600, height: "auto" }}>
        <center>
          <img src="img/logo.png" alt="logo" width={100} height={180} />
        </center>
        <h2 className="text-center">
          เข้าสู่ระบบคำร้องออนไลน์ระดับบัณฑิตศึกษา
        </h2>
        <h3 className="text-center">สำหรับผู้ดูแล (Admin)</h3>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="usernameAdmin">Username</label>
              <input
                type="text"
                className="form-control"
                id="usernameAdmin"
                placeholder="Username"
                name="usernameAdmin"
                value={values.usernameAdmin}
                onChange={handleInput}
              />
              {errors.usernameAdmin && (
                <div className="text-danger">{errors.usernameAdmin}</div>
              )}
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="emailAdmin">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailAdmin"
                  placeholder="E-mail"
                  name="emailAdmin"
                  value={values.emailAdmin}
                  onChange={handleInput}
                />
                {errors.emailAdmin && (
                  <div className="text-danger">{errors.emailAdmin}</div>
                )}
              </div>
              <div className="form-group col-6">
                <label htmlFor="passwordAdmin">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordAdmin"
                  placeholder="Password"
                  name="passwordAdmin"
                  value={values.passwordAdmin}
                  onChange={handleInput}
                />
                {errors.passwordAdmin && (
                  <div className="text-danger">{errors.passwordAdmin}</div>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-4">
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
