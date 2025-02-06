import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginTeacher() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    emailTeacher: "",
    passwordTeacher: "",
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(""); // เพิ่ม state สำหรับข้อความแจ้งเตือน
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.emailTeacher) newErrors.emailTeacher = "กรุณากรอกอีเมล";
    if (!values.passwordTeacher)
      newErrors.passwordTeacher = "กรุณากรอกรหัสผ่าน";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({}); // Clear previous errors
    setNotification(""); // ล้างข้อความแจ้งเตือนก่อน

    if (!validateForm()) {
      return; // Do not proceed if there are validation errors
    }

    const url = "http://localhost/TestPHP-API2/backend/LoginTeacher.php";

    try {
      const response = await axios.post(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response from backend:", response.data); // Check the response data

      if (response.data.status === "error") {
        setNotification(`Error: ${response.data.message}`); // แสดงข้อความแจ้งเตือน
      } else {
        const { role, teacher_id, name_teacher } = response.data;

        if (!role || !teacher_id || !name_teacher) {
          setNotification(
            "Error : ไม่สามารถโหลดข้อมูลได้ กรุณาตรวจสอบระบบอีกครั้ง"
          );
          return; // Stop if data is missing
        }

        // Save data in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", role);
        localStorage.setItem("teacherName", name_teacher);
        localStorage.setItem("teacherId", teacher_id);

        setNotification(`เข้าสู่ระบบสำเร็จในฐานะ (${role})`); // แสดงข้อความสำเร็จ

        setTimeout(() => {
          switch (role) {
            case "ครูอาจารย์ที่ปรึกษา":
              navigate("/TeacherPage");
              break;
            case "ประธานคณะกรรมการบริหารหลักสูตร":
              navigate("/chairperson-curriculum");
              break;
            case "เจ้าหน้าที่บัณฑิตศึกษาประจำคณะครุศาสตร์อุตสาหกรรม":
              navigate("/graduate-officer");
              break;
            case "รองคณบดีฝ่ายวิชาการและวิจัย":
              navigate("/academic-research-associate-dean");
              break;
            case "คณบดีคณะครุศาสตร์อุตสาหกรรม":
              navigate("/industrial-education-dean");
              break;
            default:
              alert("บทบาทของคุณไม่มีเส้นทางที่กำหนดไว้ในระบบ");
              navigate("/");
          }
        }, 2000); // 5000 มิลลิวินาที (5 วินาที)
      }
    } catch (error) {
      setNotification(`Network Error: ${error.message}`); // แสดงข้อความแจ้งเตือนกรณี error
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-30">
        <center>
          <img src="img/logo.png" alt="logo" width={100} height={180} />
        </center>
        <h2 className="text-center">
          เข้าสู่ระบบคำร้องออนไลน์ระดับบัณฑิตศึกษา
        </h2>
        <h3 className="text-center">สำหรับคณะครูอาจารย์และเจ้าหน้าที่</h3>
        <div className="card-body">
          {notification && (
            <div
              className={`alert ${
                notification.includes("Error") // เช็กว่าข้อความ notification มีคำว่า "Error" หรือไม่
                  ? "alert-danger" // ถ้ามี ใช้คลาส alert-danger (สีแดง)
                  : "alert-success" // ถ้าไม่มี ใช้คลาส alert-success (สีเขียว)
              }`}
              role="alert"
            >
              {notification}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* <div className="row"> */}
            <div className="form-group">
              <label htmlFor="emailTeacher">อีเมล</label>
              <input
                type="email"
                className="form-control"
                id="emailTeacher"
                placeholder="อีเมล"
                name="emailTeacher"
                value={values.emailTeacher}
                onChange={handleInput}
              />
              {errors.emailTeacher && (
                <div className="text-danger">{errors.emailTeacher}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="passwordTeacher">รหัสผ่าน</label>
              <input
                type="password"
                className="form-control"
                id="passwordTeacher"
                placeholder="รหัสผ่าน"
                name="passwordTeacher"
                value={values.passwordTeacher}
                onChange={handleInput}
              />
              {errors.passwordTeacher && (
                <div className="text-danger">{errors.passwordTeacher}</div>
              )}
            </div>

            <button type="submit" className="btn btn-success w-100 mt-4">
              เข้าสู่ระบบ
            </button>
          </form>
          <span style={{ margin: "5px" }}></span>
          <p>
            คุณยังไม่มีบัญชีใช่ไหม?
            <a
              href="/registerteacher"
              style={{ textDecoration: "underline", color: "#007bff" }}
            >
              คลิกที่นี่เพื่อลงทะเบียน
            </a>{" "}
            หรือต้องการเข้าสู่ระบบส่วนของนักศึกษา
            <a
              href="/"
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

export default LoginTeacher;
