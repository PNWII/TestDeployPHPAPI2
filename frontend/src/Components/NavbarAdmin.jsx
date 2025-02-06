import logo from "/img/logo.png";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
function NavbarAdmin() {
  const expand = "lg";
  const [usernameAdmin, setUsernameAdmin] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // ลบสถานะการล็อกอิน
    window.location.href = "/loginadmin"; // เปลี่ยนไปยังหน้า Login
  };

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
          setUsernameAdmin(data.usernameAdmin);
        } else {
          console.error("Error fetching admin name:", data.message);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <Navbar
      expand={expand}
      className="navbar"
      style={{ backgroundColor: "#A42626", whiteSpace: "nowrap" }}
    >
      <Container>
        <Navbar.Brand className="d-flex align-items-center navbar-left">
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
            <Nav.Link href="/adminpage" style={{ color: "white" }}>
              หน้าแรก
            </Nav.Link>
            <Nav.Link href="/adminpage" style={{ color: "white" }}>
              บัญชีนักศึกษาที่รออนุมัติ
            </Nav.Link>
            <Nav.Link href="/historydocumentadmin" style={{ color: "white" }}>
              ประวัติการยื่นเอกสารคำร้อง
            </Nav.Link>
            <Nav.Link href="/aboutpageadmin" style={{ color: "white" }}>
              เกี่ยวกับเรา
            </Nav.Link>

            {/* User Section */}
            <NavDropdown
              title={
                <span className="nav-dropdown-icon" style={{ color: "white" }}>
                  <FaUserCircle className="icon" style={{ color: "white" }} />
                  สวัสดี, {usernameAdmin || "ผู้ใช้งาน"}{" "}
                </span>
              }
              id="userDropdown"
            >
              <NavDropdown.Item href="/profileadmin" style={{ color: "black" }}>
                ข้อมูลส่วนตัว
              </NavDropdown.Item>
              <NavDropdown.Item href="/adminpage" style={{ color: "black" }}>
                บัญชีนักศึกษาที่รออนุมัติ
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

export default NavbarAdmin;
