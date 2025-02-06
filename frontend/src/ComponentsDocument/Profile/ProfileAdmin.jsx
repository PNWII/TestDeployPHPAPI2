import NavbarAdmin from "../../Components/NavbarAdmin";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaAddressBook } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfileAdmin.css";
function ProfileAdmin() {
  const [adminData, setAdminData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const userIDAdmin = localStorage.getItem("idAdmin");
    console.log("Fetched ID:", userIDAdmin);
    if (!userIDAdmin) {
      console.error("ID is missing from localStorage.");
      return;
    }

    // Send the correct key 'idAdmin' in the body of the request
    fetch("http://localhost/TestPHP-API2/backend/get_admin.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idAdmin: userIDAdmin }), // Changed 'id' to 'idAdmin'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setAdminData(data);
          console.log(data);
        } else {
          console.error("Error fetching admin name:", data.message);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="container mt-4">
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
        {adminData ? (
          <div className="profile-card-admin mx-auto">
            <div className="profile-header-admin text-center">
              <h1>ข้อมูลผู้ดูแลระบบ</h1>
              <h3>
                คณะครุศาสตร์อุตสาหกรรม มหาวิทยาลัยราชมงคลอีสาน วิทยาเขตขอนแก่น
              </h3>
            </div>
            <div className="profile-body-admin">
              <h5
                className="card-title text-center "
                style={{ fontSize: "1.8rem" }}
              >
                <FaUser className="me-2" /> {adminData.name_admin}
              </h5>

              <hr />
              <p className="card-text">
                <FaAddressBook className="me-2" />
                <strong>ชื่อผู้ใช้งาน: </strong> {adminData.usernameAdmin}
              </p>
              <p className="card-text">
                <FaEnvelope className="me-2" />
                <strong>อีเมล: </strong> {adminData.email_admin}
              </p>
              <p className="card-text">
                <FaPhone className="me-2" />
                <strong>เบอร์โทร:</strong> {adminData.tel_admin}
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

export default ProfileAdmin;
