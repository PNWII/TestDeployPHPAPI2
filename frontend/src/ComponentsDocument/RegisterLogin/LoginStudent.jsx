import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginStudent() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    idstdStudent: "",
    emailStudent: "",
    passwordStudent: "",
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(""); // เก็บข้อความแจ้งเตือน

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.idstdStudent) newErrors.idstdStudent = "กรุณากรอกรหัสนักศึกษา";
    if (!values.emailStudent) newErrors.emailStudent = "กรุณากรอกอีเมล";
    if (!values.passwordStudent)
      newErrors.passwordStudent = "กรุณากรอกรหัสผ่าน";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const url = "http://localhost/TestPHP-API2/backend/LoginStudent.php";
    axios
      .post(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setNotification("Error: " + response.data.message); // ตั้งข้อความแจ้งเตือน
        } else {
          setNotification("เข้าสู่ระบบสำเร็จ"); // ตั้งข้อความแจ้งเตือน
          localStorage.setItem("id", values.idstdStudent);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", "นักเรียนนักศึกษา");
          setTimeout(() => {
            navigate("/home");
          }, 2000); // ดีเลย์ 2 วินาที (2000 มิลลิวินาที)
        }
      })
      .catch((error) => {
        setNotification("Network Error: " + error.message); // ตั้งข้อความแจ้งเตือน
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-40">
        <center>
          <img src="img/logo.png" alt="logo" width={100} height={180} />
        </center>
        <h2 className="text-center">
          เข้าสู่ระบบคำร้องออนไลน์ระดับบัณฑิตศึกษา
        </h2>
        <h3 className="text-center">สำหรับนักศึกษาระดับบัณฑิตศึกษา</h3>
        <div className="card-body">
          {/* แสดงข้อความแจ้งเตือน */}
          {notification && (
            <div
              className={`alert ${
                notification.includes("Error")
                  ? "alert-danger"
                  : "alert-success"
              }`}
              role="alert"
            >
              {notification}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="idstdStudent">รหัสนักศึกษา</label>
              <input
                type="text"
                className="form-control"
                id="idstdStudent"
                placeholder="รหัสนักศึกษา"
                name="idstdStudent"
                value={values.idstdStudent}
                onChange={handleInput}
              />
              {errors.idstdStudent && (
                <div className="text-danger">{errors.idstdStudent}</div>
              )}
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="emailStudent">อีเมล</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailStudent"
                  placeholder="อีเมล"
                  name="emailStudent"
                  value={values.emailStudent}
                  onChange={handleInput}
                />
                {errors.emailStudent && (
                  <div className="text-danger">{errors.emailStudent}</div>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="passwordStudent">รหัสผ่าน</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordStudent"
                  placeholder="รหัสผ่าน"
                  name="passwordStudent"
                  value={values.passwordStudent}
                  onChange={handleInput}
                />
                {errors.passwordStudent && (
                  <div className="text-danger">{errors.passwordStudent}</div>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-4">
              เข้าสู่ระบบ
            </button>
          </form>
          <p>
            คุณยังไม่มีบัญชีใช่ไหม?
            <a
              href="/register"
              style={{ textDecoration: "underline", color: "#007bff" }}
            >
              คลิกที่นี่เพื่อลงทะเบียน
            </a>{" "}
            หรือต้องการเข้าสู่ระบบส่วนของคณะครูอาจารย์/เจ้าหน้าที่
            <a
              href="/loginteacher"
              style={{ textDecoration: "underline", color: "#007bff" }}
            >
              คลิกที่นี่
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginStudent;
