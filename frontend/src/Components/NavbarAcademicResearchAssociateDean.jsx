import logo from "/img/logo.png"; // Import logo dynamically
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

function NavbarAcademicResearchAssociateDean() {
  const [nameTeacher, setNameTeacher] = useState(""); // State to store name
  const expand = "lg"; // Define expand for responsiveness

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    localStorage.removeItem("teacherId"); // Remove teacherId
    window.location.href = "/loginteacher"; // Redirect to Login
  };

  useEffect(() => {
    const userIDTeacher = localStorage.getItem("teacherId"); // Use the correct key
    const teacherName = localStorage.getItem("teacherName"); // Use the correct key

    console.log("Fetched ID:", userIDTeacher); // Check ID in console
    console.log("Fetched name:", teacherName); // Check name in console

    if (!userIDTeacher) {
      console.error("ID is missing from localStorage.");
      return;
    }

    fetch("http://localhost/TestPHP-API2/backend/get_teacher.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ IDTeacher: userIDTeacher }), // Ensure this matches what the backend expects
    })
      .then((response) => response.text()) // Use .text() to log raw response
      .then((text) => {
        console.log("Raw response body:", text); // Log raw response for debugging
        try {
          const data = JSON.parse(text); // Attempt to parse as JSON
          if (data.status === "success") {
            setNameTeacher(data.name); // Set name based on response
          } else {
            console.error("Error fetching teacher name:", data.message);
          }
        } catch (error) {
          console.error("Error parsing response as JSON:", error);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <Navbar
      expand={expand}
      className="navbar"
      style={{
        backgroundColor: "#7d3c98",
        color: "white",
        whiteSpace: "nowrap",
      }} // Set color to white for text
    >
      <Container>
        <Navbar.Brand
          className="d-flex align-items-center navbar-left"
          style={{ color: "white" }}
        >
          <img src={logo} alt="ระบบคำร้องออนไลน์" width={50} height={100} />
          <div className="navbar-brand-text">
            <h4 style={{ color: "white" }}>
              ระบบคำร้องออนไลน์ระดับบัณฑิตศึกษา
            </h4>
            <h6 style={{ color: "white" }}>
              คณะครุศาสตร์อุตสาหกรรม มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
              วิทยาเขตขอนแก่น
            </h6>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto navLinks">
            <Nav.Link
              href="/academic-research-associate-dean"
              style={{ color: "white" }}
            >
              หน้าแรก
            </Nav.Link>
            <Nav.Link
              href="/academic-research-associate-dean"
              style={{ color: "white" }}
            >
              อนุมัติเอกสารคำร้อง
            </Nav.Link>
            <Nav.Link
              href="/viewstudent-academic-research-associate-dean"
              style={{ color: "white" }}
            >
              ข้อมูลบัณฑิตศึกษา
            </Nav.Link>
            <Nav.Link
              href="/aboutpageacademic-research-associate-dean"
              style={{ color: "white" }}
            >
              เกี่ยวกับเรา
            </Nav.Link>

            {/* User Section */}
            <NavDropdown
              title={
                <span className="nav-dropdown-icon" style={{ color: "white" }}>
                  <FaUserCircle className="icon" />
                  สวัสดี, {nameTeacher || "ผู้ใช้งาน"}{" "}
                  {/* Default to 'ผู้ใช้งาน' if name is not loaded */}
                </span>
              }
              id="userDropdown"
            >
              <NavDropdown.Item
                href="/profileacademic-research-associate-dean"
                style={{ color: "black" }}
              >
                ข้อมูลส่วนตัว
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/academic-research-associate-dean"
                style={{ color: "black" }}
              >
                อนุมัติเอกสารคำร้อง
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={handleLogout}
                style={{ color: "black" }}
              >
                ออกจากระบบ
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAcademicResearchAssociateDean;
