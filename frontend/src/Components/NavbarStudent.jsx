import logo from "/img/logo.png"; // Import logo dynamically
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./Navbarstudent.css";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

function NavbarStudent() {
  const expand = "lg"; // Define expand for responsiveness
  const [nameStudent, setNameStudent] = useState(""); // State to store name
  const [loading, setLoading] = useState(true); // State to track loading

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    window.location.href = "/"; // Redirect to login page
  };

  useEffect(() => {
    const userIDStudent = localStorage.getItem("id");

    if (!userIDStudent) {
      console.error("ID is missing from localStorage.");
      setLoading(false);
      return;
    }

    console.log("Fetched ID:", userIDStudent);

    // Send only the student ID to fetch the student data
    fetch("http://localhost/TestPHP-API2/backend/get_student.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userIDStudent }), // Only send ID
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Convert to JSON if the response is okay
      })
      .then((data) => {
        if (data.status === "success") {
          setNameStudent(data.data.name_student); // Set the student's name from the response
        } else {
          console.error("Error in data:", data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, []); // Empty dependency array to run once on component mount

  return (
    <Navbar expand={expand} className="navbar">
      <Container>
        <Navbar.Brand className="d-flex align-items-center navbar-left">
          <img src={logo} alt="ระบบคำร้องออนไลน์" width={50} height={100} />
          <div className="navbar-brand-text">
            <h4>ระบบคำร้องออนไลน์ระดับบัณฑิตศึกษา</h4>
            <h6>
              คณะครุศาสตร์อุตสาหกรรม มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
              วิทยาเขตขอนแก่น
            </h6>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto navLinks">
            <Nav.Link href="/home">หน้าแรก</Nav.Link>
            <NavDropdown title="ยืนคำร้อง" id="nestedDropdown">
              <NavDropdown.Item href="/gs10report">
                คคอ. บว.10
                แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
              </NavDropdown.Item>
              <NavDropdown.Item href="/gs11report">
                คคอ. บว.11 แบบขอเสนอโครงการวิทยานิพนธ์
              </NavDropdown.Item>
              <NavDropdown.Item href="/gs12report">
                คคอ. บว.12 แบบขอสอบหัวข้อวิทยานิพนธ์
              </NavDropdown.Item>
              <NavDropdown.Item href="/gs13report">
                คคอ. บว.13 แบบขอส่งโครงการวิทยานิพนธ์ ฉบับแก้ไข
              </NavDropdown.Item>
              <NavDropdown.Item href="/gs14report">
                คคอ. บว.14 แบบขอสอบความก้าวหน้าวิทยานิพนธ์
              </NavDropdown.Item>
              <NavDropdown.Item href="/gs15report">
                คคอ. บว.15 แบบขอสอบป้องกันวิทยานิพนธ์
              </NavDropdown.Item>
              <NavDropdown.Item href="/gs16report">
                คคอ. บว.16 แบบขอส่งเล่มวิทยานิพนธ์สมบูรณ์
              </NavDropdown.Item>
              <NavDropdown.Item href="/gs17report">
                คคอ. บว.17 แบบขออนุมัติผลการสำเร็จการศึกษา แผน 1 แบบวิชาการ
              </NavDropdown.Item>
              <NavDropdown.Item href="/gs18report">
                คคอ. บว.18 แบบขอสอบประมวลความรู้
              </NavDropdown.Item>
              <NavDropdown.Item href="/gs19report">
                คคอ. บว.19 แบบขออนุมัติผลการสำเร็จการศึกษา แผน 2 แบบวิชาชีพ
              </NavDropdown.Item>
              <NavDropdown.Item href="/gs23report">
                คคอ. บว. 23 แบบขอส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/historydocumentstudent">
              ติดตามสถานะคำร้อง
            </Nav.Link>
            <Nav.Link href="/advicepage">คำแนะนำ</Nav.Link>

            {/* User Section */}
            <NavDropdown
              title={
                <span className="nav-dropdown-icon">
                  <FaUserCircle className="icon" />
                  {loading
                    ? "กำลังโหลด..."
                    : `สวัสดี, ${nameStudent || "ผู้ใช้งาน"}`}
                </span>
              }
              id="userDropdown"
            >
              <NavDropdown.Item href="/profilestudent">
                ข้อมูลส่วนตัว
              </NavDropdown.Item>
              <NavDropdown.Item href="/historydocumentstudent">
                ติดตามสถานะคำร้องของคุณ
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                ออกจากระบบ
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarStudent;
