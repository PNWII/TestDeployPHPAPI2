import { useEffect, useState } from "react";
import NavbarStudent from "../../Components/NavbarStudent";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaBook,
  FaBuilding,
  FaAward,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfileStudent.css";
import { useNavigate } from "react-router-dom";

function ProfileStudent() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const idstdStudent = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    if (!isLoggedIn || !idstdStudent || role !== "นักเรียนนักศึกษา") {
      alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const userIDStudent = localStorage.getItem("id");

    if (!userIDStudent) {
      setErrorMessage("ไม่พบ ID ของนักเรียนในระบบ");
      return;
    }

    fetch("http://localhost/TestPHP-API2/backend/get_student.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userIDStudent }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setStudentData(data.data);
        } else {
          setErrorMessage(data.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
        }
      })
      .catch((error) => {
        setErrorMessage("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <>
      <NavbarStudent />
      <div className="container mt-4">
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
        {studentData ? (
          <div className="profile-card mx-auto">
            <div className="profile-header text-center">
              <h1>ข้อมูลนักศึกษาระดับบัณฑิตศึกษา</h1>
              <h3>
                คณะครุศาสตร์อุตสาหกรรม มหาวิทยาลัยราชมงคลอีสาน วิทยาเขตขอนแก่น
              </h3>
            </div>
            <div className="profile-body">
              <h5
                className="card-title text-center "
                style={{ fontSize: "1.8rem" }}
              >
                <FaUser className="me-2" /> {studentData.prefix_student}{" "}
                {studentData.name_student}
              </h5>

              <hr />
              <p className="card-text">
                <FaBook className="me-2" />
                <strong>รหัสนักศึกษา:</strong> {studentData.idstd_student}
              </p>
              <p className="card-text">
                <FaBuilding className="me-2" />
                <strong>แผนการเรียน:</strong> {studentData.name_studyplan}
              </p>

              <p className="card-text">
                <FaAward className="me-2" />
                <strong>สาขา:</strong> {studentData.major_student}{" "}
                <span className="ms-5"></span>
                <strong>สาขาวิชา:</strong> {studentData.branch_student}
                <span className="ms-5"></span>
                <strong>อักษรย่อสาขาวิชา:</strong>{" "}
                {studentData.abbreviate_student}
              </p>

              <p className="card-text">
                <FaEnvelope className="me-2" />
                <strong>อีเมล:</strong> {studentData.email_student}
              </p>
              <p className="card-text">
                <FaHome className="me-2" />
                <strong>ที่อยู่:</strong> {studentData.address_student}
              </p>
              <p className="card-text">
                <FaPhone className="me-2" />
                <strong>เบอร์โทร:</strong> {studentData.tel_student}
              </p>
            </div>
          </div>
        ) : (
          !errorMessage && <p className="text-center">กำลังโหลดข้อมูล...</p>
        )}
      </div>
    </>
  );
}

export default ProfileStudent;
