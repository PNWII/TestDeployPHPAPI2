import { useState } from "react";
import Validation from "../../Components/Validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterTeacher() {
  const [values, setValues] = useState({
    prefixTeacher: "",
    nameTeacher: "",
    telTeacher: "",
    emailTeacher: "",
    passwordTeacher: "",
    typeTeacher: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values, "registerTeacher");

    // ตั้งค่าผลลัพธ์การตรวจสอบลงใน state errors
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const url = "http://localhost/TestPHP-API2/backend/RegisterTeacher.php";

      try {
        const response = await axios.post(url, values);
        console.log(response.data);
        alert("ลงทะเบียนสำเร็จ");
        navigate("/loginteacher");
      } catch (error) {
        console.error("Error registering teacher:", error);
        alert("เกิดข้อผิดพลาดในการลงทะเบียน");
      }
      console.log("Values before sending:", values);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50">
        <center>
          <img src="img/logo.png" alt="logo" width={100} height={180} />
        </center>
        <h2 className="text-center">
          ลงทะเบียนเข้าสู่ระบบคำร้องออนไลน์ระดับบัณฑิตศึกษา
        </h2>
        <h3 className="text-center">สำหรับคณะครูอาจารย์และเจ้าหน้าที่</h3>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="prefixTeacher">คำนำหน้าชื่อ</label>
                <select
                  id="prefixTeacher"
                  name="prefixTeacher"
                  className="form-select"
                  value={values.prefixTeacher}
                  onChange={handleInput}
                >
                  <option value="" disabled>
                    เลือกคำนำหน้าชื่อ
                  </option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
                {errors.prefixTeacher && (
                  <span className="text-danger">{errors.prefixTeacher}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="nameTeacher">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameTeacher"
                  id="nameTeacher"
                  placeholder="ชื่อ-นามสกุล"
                  value={values.nameTeacher}
                  onChange={handleInput}
                />
                {errors.nameTeacher && (
                  <span className="text-danger">{errors.nameTeacher}</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="telTeacher">เบอร์โทรศัพท์</label>
              <input
                type="text"
                className="form-control"
                id="telTeacher"
                name="telTeacher"
                placeholder="เบอร์โทรศัพท์"
                value={values.telTeacher}
                onChange={handleInput}
              />
              {errors.telTeacher && (
                <span className="text-danger">{errors.telTeacher}</span>
              )}
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="emailTeacher">อีเมล</label>
                <input
                  type="email"
                  className="form-control"
                  name="emailTeacher"
                  id="emailTeacher"
                  placeholder="อีเมล"
                  value={values.emailTeacher}
                  onChange={handleInput}
                />
                {errors.emailTeacher && (
                  <span className="text-danger">{errors.emailTeacher}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="passwordTeacher">รหัสผ่าน</label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordTeacher"
                  id="passwordTeacher"
                  placeholder="รหัสผ่าน"
                  value={values.passwordTeacher}
                  onChange={handleInput}
                />
                {errors.passwordTeacher && (
                  <span className="text-danger">{errors.passwordTeacher}</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="typeTeacher">ตำแหน่งหน้าที่ส่วนงาน</label>
              <select
                id="typeTeacher"
                className="form-select"
                name="typeTeacher"
                value={values.typeTeacher}
                onChange={handleInput}
              >
                <option value="" disabled>
                  โปรดเลือกตำแหน่งหน้าที่ส่วนงาน
                </option>
                <option value="1">ครูอาจารย์ที่ปรึกษา</option>
                <option value="2">
                  เจ้าหน้าที่บัณฑิตศึกษาประจำคณะครุศาสตร์อุตสาหกรรม
                </option>
                <option value="3">ประธานคณะกรรมการบริหารหลักสูตร</option>
                <option value="4">รองคณบดีฝ่ายวิชาการและวิจัย</option>
                <option value="5">คณบดีคณะครุศาสตร์อุตสาหกรรม</option>
              </select>
              {errors.typeTeacher && (
                <span className="text-danger">{errors.typeTeacher}</span>
              )}
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
              href="/loginteacher"
              style={{ textDecoration: "underline", color: "#007bff" }}
            >
              คลิกที่นี่เพื่อเข้าสู่ระบบ
            </a>{" "}
            หรือต้องการลงทะเบียนส่วนของนักศึกษา
            <a
              href="/register"
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

export default RegisterTeacher;
