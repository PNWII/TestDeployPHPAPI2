import { useState } from "react";
import Validation from "../../Components/Validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterStudent() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    idstdStudent: "",
    prefixStudent: "",
    nameStudent: "",
    prefixStudentEng: "",
    nameStudentEng: "",
    studyplanStudent: "",
    majorStudent: "",
    branchStudent: "",
    abbreviateStudent: "",
    addressStudent: "",
    telStudent: "",
    emailStudent: "",
    passwordStudent: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value, // Fix: no array
    }));
  };

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(""); // เก็บข้อความแจ้งเตือน

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values, "registerStudent");

    // ตั้งค่าผลลัพธ์การตรวจสอบลงใน state errors
    setErrors(validationErrors);

    // Create FormData for submission
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]); // Append each key-value pair
    }
    if (Object.keys(validationErrors).length === 0) {
      const url = "http://localhost/TestPHP-API2/backend/RegisterStudent.php";
      axios
        .post(url, formData)
        .then((response) => {
          if (response.data.status === "error") {
            // If the backend indicates an error, display it
            setNotification("Error: " + response.data.message);
          } else {
            // Success
            setNotification("ลงทะเบียนสำเร็จ โปรดรอการอนุมัติจากผู้ดูแล");
            setTimeout(() => {
              navigate("/");
            }, 2000); // ดีเลย์ 2 วินาที (2000 มิลลิวินาที)
          }
        })
        .catch((error) => {
          setNotification("Network Error: " + error.message);
        });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card w-60">
          <center>
            <img src="img/logo.png" alt="logo" width={100} height={180} />
          </center>
          <h2 className="text-center">
            ลงทะเบียนเข้าสู่ระบบคำร้องออนไลน์ระดับบัณฑิตศึกษา
          </h2>
          <h3 className="text-center">สำหรับนักศึกษาระดับบัณฑิตศึกษา</h3>
          <div className="card-body">
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
              {/* Form Fields */}
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
                  minLength={13}
                  maxLength={13}
                  pattern="^[0-9\s\-]+$"
                  title="กรุณากรอกข้อมูลให้เป็นตัวเลขหรืออักขระพิเศษ รวม 13 หลัก"
                />
                {errors.idstdStudent && (
                  <span className="text-danger">{errors.idstdStudent}</span>
                )}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="prefixStudent">คำนำหน้าชื่อภาษาไทย</label>
                  <select
                    id="prefixStudent"
                    className="form-select"
                    name="prefixStudent"
                    value={values.prefixStudent}
                    onChange={handleInput}
                  >
                    <option value="" disabled>
                      เลือกคำนำหน้าชื่อภาษาไทย
                    </option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                  {errors.prefixStudent && (
                    <span className="text-danger">{errors.prefixStudent}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="nameStudent">ชื่อ-นามสกุลภาษาไทย</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameStudent"
                    placeholder="ชื่อ-นามสกุลภาษาไทย"
                    name="nameStudent"
                    value={values.nameStudent}
                    onChange={handleInput}
                    pattern="^[\u0E00-\u0E7F\s\-]+$" // กำหนดให้กรอกเป็นภาษาไทย หรือช่องว่างหรือขีดกลาง
                    title="กรุณากรอกชื่อ-นามสกุลเป็นภาษาไทยเท่านั้น"
                  />
                  {errors.nameStudent && (
                    <span className="text-danger">{errors.nameStudent}</span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="prefixStudentEng">
                    คำนำหน้าชื่อภาษาอังกฤษ
                  </label>
                  <select
                    id="prefixStudentEng"
                    className="form-select"
                    name="prefixStudentEng"
                    value={values.prefixStudentEng}
                    onChange={handleInput}
                  >
                    <option value="" disabled>
                      เลือกคำนำหน้าชื่อภาษาอังกฤษ
                    </option>
                    <option value="Mr.">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                  {errors.prefixStudentEng && (
                    <span className="text-danger">
                      {errors.prefixStudentEng}
                    </span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="nameStudentEng">ชื่อ-นามสกุลภาษาอังกฤษ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameStudentEng"
                    placeholder="ชื่อ-นามสกุลภาษาอังกฤษ"
                    name="nameStudentEng"
                    value={values.nameStudentEng}
                    onChange={handleInput}
                    pattern="^[A-Za-z\s\-]+$" // กำหนดให้กรอกเป็นภาษาอังกฤษหรือช่องว่างหรือขีดกลาง
                    title="กรุณากรอกชื่อ-นามสกุลเป็นภาษาอังกฤษเท่านั้น"
                  />
                  {errors.nameStudentEng && (
                    <span className="text-danger">{errors.nameStudentEng}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="studyplanStudent">แผนการเรียน</label>
                <select
                  id="studyplanStudent"
                  value={values.studyplanStudent}
                  className="form-select"
                  onChange={handleInput}
                  name="studyplanStudent"
                >
                  <option value="" disabled>
                    เลือกแผนการเรียน
                  </option>
                  <option value="1">แผนการเรียน 1 แบบวิชาการ ภาคปกติ</option>
                  <option value="2">แผนการเรียน 1 แบบวิชาการ ภาคสมทบ</option>
                  <option value="3">แผนการเรียน 2 แบบวิชาชีพ ภาคปกติ</option>
                  <option value="4">แผนการเรียน 2 แบบวิชาชีพ ภาคสมทบ</option>
                </select>
              </div>
              {errors.studyplanStudent && (
                <span className="text-danger">{errors.studyplanStudent}</span>
              )}
              <div className="row">
                <div className="form-group col-md-4">
                  <label htmlFor="majorStudent">สาขาวิชา</label>
                  <input
                    type="text"
                    className="form-control"
                    id="majorStudent"
                    placeholder="สาขาวิชา"
                    name="majorStudent"
                    onChange={handleInput}
                  />
                  {errors.majorStudent && (
                    <span className="text-danger">{errors.majorStudent}</span>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label htmlFor="branchStudent">สาขา</label>
                  <input
                    type="text"
                    className="form-control"
                    id="branchStudent"
                    placeholder="สาขา"
                    name="branchStudent"
                    onChange={handleInput}
                  />
                  {errors.branchStudent && (
                    <span className="text-danger">{errors.branchStudent}</span>
                  )}
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="abbreviateStudent">อักษรย่อสาขาวิชา</label>
                  <input
                    type="text"
                    className="form-control"
                    id="abbreviateStudent"
                    placeholder="อักษรย่อสาขาวิชา"
                    name="abbreviateStudent"
                    onChange={handleInput}
                  />
                  {errors.abbreviateStudent && (
                    <span className="text-danger">
                      {errors.abbreviateStudent}
                    </span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="addressStudent">ที่อยู่</label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressStudent"
                    placeholder="ที่อยู่"
                    name="addressStudent"
                    onChange={handleInput}
                  />
                  {errors.addressStudent && (
                    <span className="text-danger">{errors.addressStudent}</span>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="telStudent">เบอร์โทรศัพท์</label>
                  <input
                    type="text"
                    className="form-control"
                    id="telStudent"
                    placeholder="เบอร์โทรศัพท์"
                    name="telStudent"
                    onChange={handleInput}
                    pattern="^[0-9\s]+$"
                    title="กรุณากรอกข้อมูลให้เป็นตัวเลขเท่านั้น"
                    minLength={10}
                    maxLength={10}
                  />
                  {errors.telStudent && (
                    <span className="text-danger">{errors.telStudent}</span>
                  )}
                </div>
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
                    onChange={handleInput}
                  />
                  {errors.emailStudent && (
                    <span className="text-danger">{errors.emailStudent}</span>
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
                    onChange={handleInput}
                  />
                  {errors.passwordStudent && (
                    <span className="text-danger">
                      {errors.passwordStudent}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success w-100 mt-4"
                style={{ marginBottom: "0.5rem" }}
              >
                ลงทะเบียน
              </button>
            </form>
            <p>
              คุณมีบัญชีอยู่แล้วใช่ไหม?
              <a
                href="/"
                style={{ textDecoration: "underline", color: "#007bff" }}
              >
                คลิกที่นี่เพื่อเข้าสู่ระบบ
              </a>{" "}
              หรือต้องการลงทะเบียนส่วนของคณะครูอาจารย์/เจ้าหน้าที่
              <a
                href="/registerteacher"
                style={{ textDecoration: "underline", color: "#007bff" }}
              >
                คลิกที่นี่
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterStudent;
