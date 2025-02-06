import { useEffect, useState } from "react";
import NavbarIndustrialEducationDean from "../../Components/NavbarIndustrialEducationDean";
import { FaUser, FaEnvelope, FaPhone, FaBook } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Profile/ProfileIndustrialEducationDean.css";

function ProfileIndustrialEducationDean() {
  const [teacherData, setTeacherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const userIDTeacher = localStorage.getItem("teacherId");

    if (!userIDTeacher) {
      setErrorMessage("ไม่พบ ID ของอาจารย์ในระบบ");
      return;
    }

    fetch("http://localhost/TestPHP-API2/backend/get_teacher.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ IDTeacher: userIDTeacher }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setTeacherData(data);
          console.log(data); // ตรวจสอบข้อมูลที่ดึงมา
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
      <NavbarIndustrialEducationDean />
      <div className="container mt-4">
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
        {teacherData ? (
          <div className="profile-card-IndustrialEducationDean mx-auto">
            <div className="profile-header-IndustrialEducationDean text-center">
              <h1>ข้อมูลบุคลากร</h1>
              <h3>
                คณะครุศาสตร์อุตสาหกรรม มหาวิทยาลัยราชมงคลอีสาน วิทยาเขตขอนแก่น
              </h3>
            </div>
            <div className="profile-body-IndustrialEducationDean">
              <h5
                className="card-title text-center "
                style={{ fontSize: "1.8rem" }}
              >
                <FaUser className="me-2" /> {teacherData.prefix}{" "}
                {teacherData.name}
              </h5>

              <hr />
              <p className="card-text">
                <FaEnvelope className="me-2" />
                <strong>อีเมล:</strong> {teacherData.email}
              </p>
              <p className="card-text">
                <FaPhone className="me-2" />
                <strong>เบอร์โทร:</strong> {teacherData.tel}
              </p>
              <p className="card-text">
                <FaBook className="me-2" />
                <strong>ตำแหน่ง:</strong> {teacherData.role}
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

export default ProfileIndustrialEducationDean;
