import NavbarStudent from "./Components/NavbarStudent";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const idstdStudent = localStorage.getItem("id");
    console.log("Fetched ID:", idstdStudent);
    const role = localStorage.getItem("role"); // ตรวจสอบตำแหน่ง (role) ของผู้ใช้
    console.log("Role:", role); // Debug: ดูค่าของ role

    if (!isLoggedIn || !idstdStudent || role !== "นักเรียนนักศึกษา") {
      alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <NavbarStudent />

      <div className="home-text text-center" style={{ margin: 150 }}>
        <h1>
          <b>ยินดีเข้าสู่ระบบคำร้องออนไลน์ระดับบัณฑิตศึกษา</b>
        </h1>
        <h3>คณะครุศาสตร์อุตสาหกรรม มหาวิทยาลัยราชมงคลอีสาน วิทยาเขตขอนแก่น</h3>
        <div style={{ margin: 40 }}>
          <h3>ค้นหาเอกสารเพื่อยื่นคำร้องได้ที่นี่</h3>
        </div>
        <SearchBar />
      </div>
    </>
  );
}

export default Home;
