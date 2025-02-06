import NavbarAdmin from "./Components/NavbarAdmin";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Row, Col, Badge } from "react-bootstrap";

function AdminPage() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null); // ข้อมูลการดำเนินการ
  const [students, setStudents] = useState([]); // Ensure it's an array
  const [showCreateModal, setShowCreateModal] = useState(false); // State for Create Modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case "อนุมัติแล้ว":
        return "success text-white"; // green
      case "รออนุมัติ":
        return "warning"; // yellow
      case "ไม่อนุมัติ":
        return "danger text-white"; // red
      default:
        return "";
    }
  };

  const [newStudent, setNewStudent] = useState({
    idstd_student: "", // Reset ID if needed
    name_student: "",
    name_studentEng: "",
    email_student: "",
    prefix_student: "",
    prefix_studentEng: "",
    branch_student: "",
    major_student: "",
    abbreviate_student: "",
    address_student: "",
    tel_student: "",
    password_student: "", // Reset password if needed
    name_studyplan: "", // Reset studyplan if needed
  });

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };
  const handleShowModalView = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };
  const handleCloseCreateModal = () => {
    setSelectedStudent(null); // Clear the selected student when closing the modal
    setShowViewModal(false);
    setShowCreateModal(false);
    setNewStudent({
      idstd_student: "", // Reset ID if needed
      name_student: "",
      name_studentEng: "",
      email_student: "",
      prefix_student: "",
      prefix_studentEng: "",
      branch_student: "",
      major_student: "",
      abbreviate_student: "",
      address_student: "",
      tel_student: "",
      password_student: "", // Reset password if needed
      name_studyplan: "", // Reset studyplan if needed
    });
    setFormErrors("");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };
  const [formErrors, setFormErrors] = useState({
    idstd_student: "",
    name_student: "",
    name_studentEng: "",
    email_student: "",
    prefix_student: "",
    prefix_studentEng: "",
    branch_student: "",
    major_student: "",
    abbreviate_student: "",
    address_student: "",
    tel_student: "",
    password_student: "",
    name_studyplan: "",
  });
  const validateForm = () => {
    const errors = {};

    // ตรวจสอบกรอกรหัสนักศึกษา
    if (!newStudent.idstd_student) {
      errors.idstd_student = "กรุณากรอกรหัสนักศึกษา";
    } else if (!/^[0-9\s\-]+$/.test(newStudent.idstd_student)) {
      errors.idstd_student =
        "กรุณากรอกข้อมูลให้เป็นตัวเลขหรืออักขระพิเศษ รวม 13 หลัก";
    } else if (newStudent.idstd_student.length !== 13) {
      errors.idstd_student = "กรุณากรอกข้อมูลให้ครบ 13 หลัก";
    }
    // ตรวจสอบชื่อ-นามสกุลภาษาไทย (ต้องเป็นภาษาไทยหรือช่องว่างหรือขีดกลาง)
    if (!newStudent.name_student) {
      errors.name_student = "กรุณากรอกชื่อ-นามสกุลภาษาไทย";
    } else if (!/^[\u0E00-\u0E7F\s\-]+$/.test(newStudent.name_student)) {
      errors.name_student = "กรุณากรอกชื่อ-นามสกุลเป็นภาษาไทยเท่านั้น";
    }

    // ตรวจสอบชื่อ-นามสกุลภาษาอังกฤษ (ต้องเป็นภาษาอังกฤษหรือช่องว่างหรือขีดกลาง)
    if (!newStudent.name_studentEng) {
      errors.name_studentEng = "กรุณากรอกชื่อ-นามสกุลภาษาอังกฤษ";
    } else if (!/^[A-Za-z\s\-]+$/.test(newStudent.name_studentEng)) {
      errors.name_studentEng = "กรุณากรอกชื่อ-นามสกุลเป็นภาษาอังกฤษเท่านั้น";
    }
    // ตรวจสอบอีเมล
    if (!newStudent.email_student) {
      errors.email_student = "กรุณากรอกอีเมล";
    }

    // ตรวจสอบรหัสผ่าน
    if (!newStudent.password_student) {
      errors.password_student = "กรุณากรอกรหัสผ่าน";
    }

    // ตรวจสอบแผนการเรียน
    if (!newStudent.name_studyplan) {
      errors.name_studyplan = "กรุณากรอกแผนการเรียน";
    }

    // ตรวจสอบคำนำหน้าชื่อภาษาไทย
    if (!newStudent.prefix_student) {
      errors.prefix_student = "กรุณากรอกคำนำหน้าชื่อภาษาไทย";
    }

    // ตรวจสอบคำนำหน้าชื่อภาษาอังกฤษ
    if (!newStudent.prefix_studentEng) {
      errors.prefix_studentEng = "กรุณากรอกคำนำหน้าชื่อภาษาอังกฤษ";
    }

    // ตรวจสอบสาขา
    if (!newStudent.branch_student) {
      errors.branch_student = "กรุณากรอกสาขา";
    }

    // ตรวจสอบสาขาวิชา
    if (!newStudent.major_student) {
      errors.major_student = "กรุณากรอกสาขาวิชา";
    }

    // ตรวจสอบอักษรย่อสาขาวิชา
    if (!newStudent.abbreviate_student) {
      errors.abbreviate_student = "กรุณากรอกอักษรย่อสาขาวิชา";
    }

    // ตรวจสอบที่อยู่
    if (!newStudent.address_student) {
      errors.address_student = "กรุณากรอกที่อยู่";
    }

    // ตรวจสอบหมายเลขโทรศัพท์
    if (!newStudent.tel_student) {
      errors.tel_student = "กรุณากรอกหมายเลขโทรศัพท์";
    } else if (!/^[0-9\s\-]+$/.test(newStudent.tel_student)) {
      errors.tel_student =
        "กรุณากรอกข้อมูลให้เป็นตัวเลขหรืออักขระพิเศษ รวม 10 หลัก";
    } else if (newStudent.tel_student.length !== 10) {
      errors.tel_student = "กรุณากรอกข้อมูลให้ครบ 10 หลัก";
    }

    return errors;
  };

  const handleCreateStudent = async () => {
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const studentData = {
        idstd_student: newStudent.idstd_student,
        name_student: newStudent.name_student,
        name_studentEng: newStudent.name_studentEng,
        email_student: newStudent.email_student,
        prefix_student: newStudent.prefix_student,
        prefix_studentEng: newStudent.prefix_studentEng,
        branch_student: newStudent.branch_student,
        major_student: newStudent.major_student,
        abbreviate_student: newStudent.abbreviate_student,
        address_student: newStudent.address_student,
        tel_student: newStudent.tel_student,
        password_student: newStudent.password_student,
        studyplan_student: newStudent.name_studyplan,
      };

      console.log("Sending student data:", studentData); // Debugging log

      // Send data to the backend
      const response = await axios.post(
        "http://localhost/TestPHP-API2/backend/admin_createstudent.php",
        studentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      // Check if the response is successful and if newStudent data exists
      if (response.data.status === "success") {
        if (response.data.newStudent) {
          setStudents((prevStudents) => [
            ...prevStudents,
            response.data.newStudent,
          ]);
          setShowCreateModal(false);
          setNewStudent({
            idstd_student: "",
            name_student: "",
            name_studentEng: "",
            email_student: "",
            prefix_student: "",
            prefix_studentEng: "",
            branch_student: "",
            major_student: "",
            abbreviate_student: "",
            address_student: "",
            tel_student: "",
            password_student: "",
            name_studyplan: "",
          });
        } else {
          // alert("New student data is missing in the response.");
          window.location.reload(); // Reload the page
        }
      } else {
        alert(`Error: ${response.data.message || "Failed to create account"}`);
      }
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Failed to create the student. Please try again.");
    }
  };

  const handleShowModal = (action) => {
    setCurrentAction(action); // เก็บข้อมูลการดำเนินการ
    setShowModal(true); // แสดง Modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // ซ่อน Modal
    setCurrentAction(null); // รีเซ็ตข้อมูลการดำเนินการ
  };

  const handleDelete = async (studentId) => {
    try {
      const response = await axios.post(
        "http://localhost/TestPHP-API2/backend/delEdit_approvaluser.php",
        { action: "delete", student_id: studentId }
      );
      if (response.data.status === "success") {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.idstd_student !== studentId)
        );
      } else {
        alert("Failed to delete the student. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("An error occurred while deleting the student.");
    }
  };
  const [editStudent, setEditStudent] = useState({
    idstd_student: "",
    name_student: "",
    name_studentEng: "",
    email_student: "",
    prefix_student: "",
    prefix_studentEng: "",
    branch_student: "",
    major_student: "",
    abbreviate_student: "",
    address_student: "",
    tel_student: "",
    password_student: "",
    name_studyplan: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (studentId) => {
    const studentToEdit = students.find(
      (student) => student.id_student === studentId
    );
    setEditStudent({
      id_student: studentToEdit.id_student,
      idstd_student: studentToEdit.idstd_student,
      name_student: studentToEdit.name_student,
      name_studentEng: studentToEdit.name_studentEng,
      email_student: studentToEdit.email_student,
      prefix_student: studentToEdit.prefix_student,
      prefix_studentEng: studentToEdit.prefix_studentEng,
      branch_student: studentToEdit.branch_student,
      major_student: studentToEdit.major_student,
      abbreviate_student: studentToEdit.abbreviate_student,
      address_student: studentToEdit.address_student,
      tel_student: studentToEdit.tel_student,
      password_student: studentToEdit.password_student,
      name_studyplan: studentToEdit.name_studyplan,
      id_studyplan: studentToEdit.id_studyplan,
    });
    setShowEditModal(true);
  };
  const [formErrorsEdit, setFormErrorsEdit] = useState({
    idstd_student: "",
  });
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    const errors = {}; // สร้างตัวแปร errors เพื่อเก็บข้อความผิดพลาด

    if (
      !editStudent.idstd_student ||
      !/^[0-9\s\-]{13,}$/.test(editStudent.idstd_student)
    ) {
      errors.idstd_student =
        "กรุณากรอกรหัสนักศึกษาเป็นตัวเลข 13 ตัว และสามารถมีอักขระพิเศษ เช่น -";
    }
    if (
      !editStudent.email_student ||
      !/\S+@\S+\.\S+/.test(editStudent.email_student)
    ) {
      errors.email_student = "กรุณากรอกอีเมลที่ถูกต้อง";
    }
    if (
      !editStudent.name_student ||
      !/^[ก-๙\s]+$/.test(editStudent.name_student)
    ) {
      errors.name_student = "กรุณากรอกชื่อเป็นภาษาไทยเท่านั้น";
    }
    if (
      !editStudent.name_studentEng ||
      !/^[A-Za-z\s]+$/.test(editStudent.name_studentEng)
    ) {
      errors.name_studentEng = "กรุณากรอกชื่อเป็นภาษาอังกฤษเท่านั้น";
    }
    if (!editStudent.tel_student || !/^\d{10}$/.test(editStudent.tel_student)) {
      errors.tel_student = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)";
    }
    setFormErrorsEdit(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    if (!editStudent.id_student) {
      alert("ID of student is missing.");
      return;
    }

    const data = {
      action: "edit",
      student_id: editStudent.idstd_student,
      name: editStudent.name_student,
      nameEng: editStudent.name_studentEng,
      email: editStudent.email_student,
      prefix: editStudent.prefix_student,
      prefixEng: editStudent.prefix_studentEng,
      branch: editStudent.branch_student,
      major: editStudent.major_student,
      abbreviate: editStudent.abbreviate_student,
      address: editStudent.address_student,
      tel: editStudent.tel_student,
      password: editStudent.password_student,
      studyplan: editStudent.id_studyplan,
      id: editStudent.id_student, // ตรวจสอบว่า id มีค่าก่อน
    };
    console.log("Data to submit:", data);
    try {
      const response = await axios.post(
        "http://localhost/TestPHP-API2/backend/delEdit_approvaluser.php",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", response.data);

      if (response.data.status === "success") {
        // handle success
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id_student === editStudent.id_student
              ? { ...student, ...editStudent }
              : student
          )
        );
        fetchStudents();
        setShowEditModal(false);
      } else {
        alert(response.data.message || "Error updating student");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to update, please try again.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost/TestPHP-API2/backend/fetchstudent.php"
      );
      console.log("Fetched student data:", response.data); // Log the raw response to see the structure
      setStudents(response.data); // Assuming the structure of response.data matches the student's data format
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to load student data. Please try again later.");
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // ตรวจสอบสถานะการเข้าสู่ระบบ
    const role = localStorage.getItem("role"); // ตรวจสอบตำแหน่ง (role) ของผู้ใช้
    console.log("Role:", role); // Debug: ดูค่าของ role

    if (!isLoggedIn || role !== "admin") {
      navigate("/loginadmin"); // เปลี่ยนเส้นทางไปหน้า login หากไม่ใช่ admin
    } else {
      fetchStudents(); // หากตรวจสอบผ่าน ให้โหลดข้อมูลนักศึกษา
    }
  }, [navigate]);

  const handleApproval = async (studentId, approvalStatus) => {
    try {
      const response = await axios.post(
        "http://localhost/TestPHP-API2/backend/admin_approvaluser.php",
        {
          student_id: studentId,
          approval_status: approvalStatus,
        }
      );

      if (response.data.status === "success") {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.idstd_student === studentId
              ? { ...student, status_student: approvalStatus }
              : student
          )
        );
      } else {
        alert("Error updating student status");
      }
    } catch (error) {
      console.error("Error updating student status:", error);
      alert("Failed to update status, please try again.");
    }
  };

  const [itemsPerPage] = useState(5); // จำนวนรายการต่อหน้า
  const [currentPage, setCurrentPage] = useState(1); // หน้าในส่วนที่อนุมัติแล้ว
  const [currentNotPage, setCurrentNotPage] = useState(1); // หน้าในส่วนที่ไม่ได้รับอนุมัติ
  const [currentPendingPage, setCurrentPendingPage] = useState(1); // หน้าในส่วนที่รออนุมัติ

  const approvedStudents = students.filter(
    (student) => student.status_student === "อนุมัติแล้ว"
  );
  const notApprovedStudents = students.filter(
    (student) => student.status_student === "ไม่อนุมัติ"
  );
  const pendingStudents = students.filter(
    (student) => student.status_student === "รออนุมัติ"
  );

  // Pagination logic for approved students
  const indexOfLastApprovedStudent = currentPage * itemsPerPage;
  const indexOfFirstApprovedStudent = indexOfLastApprovedStudent - itemsPerPage;
  const currentApprovedStudents = approvedStudents.slice(
    indexOfFirstApprovedStudent,
    indexOfLastApprovedStudent
  );

  // Pagination logic for not approved students
  const indexOfLastNotApprovedStudent = currentNotPage * itemsPerPage;
  const indexOfFirstNotApprovedStudent =
    indexOfLastNotApprovedStudent - itemsPerPage;
  const currentNotApprovedStudents = notApprovedStudents.slice(
    indexOfFirstNotApprovedStudent,
    indexOfLastNotApprovedStudent
  );

  // Pagination logic for pending students
  const indexOfLastPendingStudent = currentPendingPage * itemsPerPage;
  const indexOfFirstPendingStudent = indexOfLastPendingStudent - itemsPerPage;
  const currentPendingStudents = pendingStudents.slice(
    indexOfFirstPendingStudent,
    indexOfLastPendingStudent
  );

  const handlePaginationApproved = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= pageNumbersApproved.length) {
      setCurrentPage(pageNumber);
    }
  };

  const handlePaginationNotApproved = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= pageNumbersNotApproved.length) {
      setCurrentNotPage(pageNumber);
    }
  };

  const handlePaginationPending = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= pageNumbersPending.length) {
      setCurrentPendingPage(pageNumber);
    }
  };

  // Render table
  const renderTable = (status, badgeClass, currentStudents) => {
    if (currentStudents.length === 0) {
      return (
        <tr>
          <td colSpan="13" className="text-center">
            ไม่พบข้อมูล
          </td>
        </tr>
      );
    }
    return currentStudents.map((student) => (
      <tr key={student.idstd_student}>
        <td>{student.idstd_student}</td>
        <td>{student.name_student}</td>
        <td>{student.name_studyplan}</td>
        <td>{student.major_student}</td>
        <td>{student.tel_student}</td>
        <td>{student.email_student}</td>
        <td>{student.password_student}</td>
        <td className="text-center">
          <span className={`badge ${badgeClass}`}>
            {student.status_student}
          </span>
        </td>
        <td>
          <div className="d-flex justify-content-around">
            {status === "รออนุมัติ" && (
              <>
                <Button
                  variant="success"
                  size="sm"
                  style={{ margin: 5 }}
                  onClick={() =>
                    handleShowModal({
                      type: "approval",
                      studentId: student.idstd_student,
                      status: "อนุมัติแล้ว",
                    })
                  }
                >
                  อนุมัติ
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  style={{ margin: 5 }}
                  onClick={() =>
                    handleShowModal({
                      type: "approval",
                      studentId: student.idstd_student,
                      status: "ไม่อนุมัติ",
                    })
                  }
                >
                  ปฏิเสธ
                </Button>
              </>
            )}
            {status !== "รออนุมัติ" && (
              <>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(student.id_student)}
                  style={{ margin: 5 }}
                >
                  แก้ไข
                </Button>
                <Button
                  variant="danger"
                  style={{ margin: 5 }}
                  size="sm"
                  onClick={() =>
                    handleShowModal({
                      type: "delete",
                      studentId: student.idstd_student,
                    })
                  }
                >
                  ลบ
                </Button>
              </>
            )}
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleShowModalView(student)}
              style={{ margin: 5 }}
            >
              ดูข้อมูล
            </Button>
          </div>
        </td>
      </tr>
    ));
  };

  // Calculate page numbers for each status (with fallback to 0 if no students)
  // Calculate page numbers for each status (with fallback to an empty array if no students)
  const pageNumbersApproved =
    approvedStudents.length > 0
      ? [
          ...Array(Math.ceil(approvedStudents.length / itemsPerPage)).keys(),
        ].map((i) => i + 1)
      : [];
  const pageNumbersNotApproved =
    notApprovedStudents.length > 0
      ? [
          ...Array(Math.ceil(notApprovedStudents.length / itemsPerPage)).keys(),
        ].map((i) => i + 1)
      : [];
  const pageNumbersPending =
    pendingStudents.length > 0
      ? [...Array(Math.ceil(pendingStudents.length / itemsPerPage)).keys()].map(
          (i) => i + 1
        )
      : [];

  return (
    <>
      <NavbarAdmin />
      <div className="container mt-5">
        <h2 className="text-center mb-4">บัญชีนักศึกษาที่รออนุมัติ</h2>
        <Button
          className="text-right mb-4"
          variant="outline-primary"
          onClick={handleShowCreateModal}
        >
          + เพิ่มบัญชีผู้ใช้งานนักศึกษา
        </Button>
        <Table striped bordered hover responsive>
          <thead className="table-dark text-center">
            <tr>
              <th>รหัสนักศึกษา</th>

              <th>ชื่อ-นามสกุล</th>
              <th>แผนการเรียน</th>
              <th>สาขาวิชา</th>
              <th>เบอร์โทร</th>
              <th>อีเมล</th>
              <th>รหัสผ่าน</th>
              <th>สถานะ</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {renderTable(
              "รออนุมัติ",
              "bg-warning text-dark",
              currentPendingStudents
            )}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePaginationPending(currentPendingPage - 1)}
                disabled={currentPendingPage === 1}
              >
                ก่อนหน้า
              </button>
            </li>
            {pageNumbersPending.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPendingPage === number ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePaginationPending(number)}
                >
                  {number}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePaginationPending(currentPendingPage + 1)}
                disabled={currentPendingPage === pageNumbersPending.length}
              >
                ถัดไป
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-4">
        <h2 className="text-center mb-4">บัญชีนักศึกษาที่อนุมัติแล้ว</h2>
        <Table striped bordered hover responsive>
          <thead className="table-dark text-center">
            <tr>
              <th>รหัสนักศึกษา</th>

              <th>ชื่อ-นามสกุล</th>
              <th>แผนการเรียน</th>
              <th>สาขาวิชา</th>
              <th>เบอร์โทร</th>
              <th>อีเมล</th>
              <th>รหัสผ่าน</th>
              <th>สถานะ</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {renderTable("อนุมัติแล้ว", "bg-success", currentApprovedStudents)}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePaginationApproved(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ก่อนหน้า
              </button>
            </li>
            {pageNumbersApproved.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePaginationApproved(number)}
                >
                  {number}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePaginationApproved(currentPage + 1)}
                disabled={currentPage === pageNumbersApproved.length}
              >
                ถัดไป
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-4">
        <h2 className="text-center mb-4">
          บัญชีนักศึกษาที่ไม่ได้รับการอนุมัติ
        </h2>
        <Table striped bordered hover responsive>
          <thead className="table-dark text-center">
            <tr>
              <th>รหัสนักศึกษา</th>

              <th>ชื่อ-นามสกุล</th>
              <th>แผนการเรียน</th>
              <th>สาขาวิชา</th>
              <th>เบอร์โทร</th>
              <th>อีเมล</th>
              <th>รหัสผ่าน</th>
              <th>สถานะ</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {renderTable("ไม่อนุมัติ", "bg-danger", currentNotApprovedStudents)}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePaginationNotApproved(currentNotPage - 1)}
                disabled={currentNotPage === 1}
              >
                ก่อนหน้า
              </button>
            </li>
            {pageNumbersNotApproved.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentNotPage === number ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePaginationNotApproved(number)}
                >
                  {number}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePaginationNotApproved(currentNotPage + 1)}
                disabled={currentNotPage === pageNumbersNotApproved.length}
              >
                ถัดไป
              </button>
            </li>
          </ul>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการทำรายการ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentAction &&
            (currentAction.type === "approval"
              ? `คุณต้องการ${
                  currentAction.status === "อนุมัติแล้ว" ? "อนุมัติ" : "ปฏิเสธ"
                }บัญชีนี้ใช่หรือไม่?`
              : currentAction.type === "delete"
              ? "คุณต้องการลบบัญชีนี้ใช่หรือไม่?"
              : "คุณต้องการแก้ไขบัญชีนี้ใช่หรือไม่?")}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ยกเลิก
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              if (currentAction) {
                if (currentAction.type === "approval") {
                  handleApproval(currentAction.studentId, currentAction.status);
                } else if (currentAction.type === "delete") {
                  handleDelete(currentAction.studentId);
                } else if (currentAction.type === "edit") {
                  handleEdit(currentAction.studentId);
                }
              }
              handleCloseModal();
            }}
          >
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={showCreateModal}
        onHide={handleCloseCreateModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มบัญชีผู้ใช้งาน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>รหัสนักศึกษา</Form.Label>
              <Form.Control
                type="text"
                name="idstd_student"
                id="idstd_student"
                value={newStudent.idstd_student}
                onChange={handleInputChange}
                isInvalid={formErrors.idstd_student}
                placeholder="กรุณากรอกรหัสนักศึกษา"
                minLength={13}
                maxLength={13}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.idstd_student}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>คำนำหน้าชื่อภาษาไทย</Form.Label>
              <Form.Select
                name="prefix_student"
                id="prefix_student"
                value={newStudent.prefix_student}
                isInvalid={formErrors.prefix_student}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  กรุณากรอกคำนำหน้าชื่อภาษาไทย
                </option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.prefix_student}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อ-นามสกุลภาษาไทย</Form.Label>
              <Form.Control
                type="text"
                name="name_student"
                id="name_student"
                value={newStudent.name_student}
                onChange={handleInputChange}
                placeholder="กรุณากรอกชื่อ-นามสกุลภาษาไทย"
                isInvalid={formErrors.name_student}
              />

              <Form.Control.Feedback type="invalid">
                {formErrors.name_student}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>คำนำหน้าชื่อภาษาอังกฤษ</Form.Label>
              <Form.Select
                name="prefix_studentEng"
                id="prefix_studentEng"
                value={newStudent.prefix_studentEng}
                isInvalid={formErrors.prefix_studentEng}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  กรุณากรอกคำนำหน้าชื่อภาษาอังกฤษ
                </option>
                <option value="Mr.">Mr.</option>
                <option value="Miss">Miss</option>
                <option value="Mrs.">Mrs.</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.prefix_studentEng}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อ-นามสกุลภาษาอังกฤษ</Form.Label>
              <Form.Control
                type="text"
                name="name_studentEng"
                id="name_studentEng"
                value={newStudent.name_studentEng}
                onChange={handleInputChange}
                placeholder="กรุณากรอกชื่อ-นามสกุลภาษาอังกฤษ"
                isInvalid={formErrors.name_studentEng}
              />

              <Form.Control.Feedback type="invalid">
                {formErrors.name_studentEng}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>แผนการเรียน</Form.Label>
              <Form.Select
                name="name_studyplan"
                id="name_studyplan"
                value={newStudent.name_studyplan}
                onChange={handleInputChange}
                isInvalid={formErrors.name_studyplan}
              >
                <option value="" disabled>
                  กรุณากรอกแผนการเรียน
                </option>
                <option value="1">แผนการเรียน 1 แบบวิชาการ ภาคปกติ</option>
                <option value="2">แผนการเรียน 1 แบบวิชาการ ภาคสมทบ</option>
                <option value="3">แผนการเรียน 2 แบบวิชาชีพ ภาคปกติ</option>
                <option value="4">แผนการเรียน 2 แบบวิชาชีพ ภาคสมทบ</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.name_studyplan}
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>สาขาวิชา</Form.Label>
                <Form.Control
                  type="text"
                  name="major_student"
                  id="major_student"
                  value={newStudent.major_student}
                  onChange={handleInputChange}
                  placeholder="กรุณากรอกสาขาวิชา"
                  isInvalid={formErrors.major_student}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.major_student}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>สาขา</Form.Label>
                <Form.Control
                  type="text"
                  name="branch_student"
                  id="branch_student"
                  value={newStudent.branch_student}
                  onChange={handleInputChange}
                  placeholder="กรุณากรอกสาขา"
                  isInvalid={formErrors.branch_student}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.branch_student}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>อักษรย่อสาขาวิชา</Form.Label>
                <Form.Control
                  type="text"
                  name="abbreviate_student"
                  id="abbreviate_student"
                  value={newStudent.abbreviate_student}
                  onChange={handleInputChange}
                  placeholder="กรุณากรอกอักษรย่อสาขาวิชา"
                  isInvalid={formErrors.abbreviate_student}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.abbreviate_student}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>ที่อยู่</Form.Label>
                <Form.Control
                  type="text"
                  name="address_student"
                  id="address_student"
                  value={newStudent.address_student}
                  onChange={handleInputChange}
                  placeholder="กรุณากรอกที่อยู่"
                  isInvalid={formErrors.address_student}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.address_student}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>เบอร์โทรศัพท์</Form.Label>
                <Form.Control
                  type="text"
                  name="tel_student"
                  id="tel_student"
                  value={newStudent.tel_student}
                  onChange={handleInputChange}
                  placeholder="กรุณากรอกเบอร์โทรศัพท์"
                  isInvalid={formErrors.tel_student}
                  minLength={10}
                  maxLength={10}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.tel_student}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>อีเมล</Form.Label>
              <Form.Control
                type="email"
                name="email_student"
                id="email_student"
                value={newStudent.email_student}
                onChange={handleInputChange}
                placeholder="กรุณากรอกอีเมล"
                isInvalid={formErrors.email_student}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email_student}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                name="password_student"
                id="password_student"
                value={newStudent.password_student}
                onChange={handleInputChange}
                placeholder="กรุณากรอกรหัสผ่าน"
                isInvalid={formErrors.password_student}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.password_student}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleCreateStudent}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูลนักศึกษา</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>รหัสนักศึกษา</Form.Label>
              <Form.Control
                type="text"
                name="idstd_student"
                value={editStudent.idstd_student}
                onChange={handleEditInputChange}
                placeholder="กรุณากรอกรหัสนักศึกษา"
                maxLength={13} // จำกัดความยาวให้กรอกได้แค่ 13 ตัว
                isInvalid={formErrorsEdit.idstd_student}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrorsEdit.idstd_student}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>คำนำหน้าชื่อภาษาไทย</Form.Label>
              <Form.Select
                name="prefix_student"
                value={editStudent.prefix_student}
                onChange={handleEditInputChange}
              >
                <option value="" disabled>
                  กรุณากรอกคำนำหน้าชื่อภาษาไทย
                </option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อ-นามสกุลภาษาไทย</Form.Label>
              <Form.Control
                type="text"
                name="name_student"
                value={editStudent.name_student}
                onChange={handleEditInputChange}
                placeholder="กรุณากรอกชื่อ-นามสกุล"
                isInvalid={formErrorsEdit.name_student}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrorsEdit.name_student}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>คำนำหน้าชื่อภาษาอังกฤษ</Form.Label>
              <Form.Select
                name="prefix_studentEng"
                value={editStudent.prefix_studentEng}
                onChange={handleEditInputChange}
              >
                <option value="" disabled>
                  กรุณากรอกคำนำหน้าชื่อภาษาอังกฤษ
                </option>
                <option value="Mr.">Mr.</option>
                <option value="Miss">Miss</option>
                <option value="Mrs.">Mrs.</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อ-นามสกุลภาษาอังกฤษ</Form.Label>
              <Form.Control
                type="text"
                name="name_studentEng"
                value={editStudent.name_studentEng}
                onChange={handleEditInputChange}
                placeholder="กรุณากรอกชื่อ-นามสกุล"
                isInvalid={formErrorsEdit.name_studentEng}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrorsEdit.name_studentEng}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>แผนการเรียน</Form.Label>
              <Form.Select
                name="id_studyplan"
                value={editStudent.id_studyplan}
                onChange={handleEditInputChange}
              >
                <option value="">กรุณากรอกแผนการเรียน</option>
                <option value="1">แผนการเรียน 1 แบบวิชาการ ภาคปกติ</option>
                <option value="2">แผนการเรียน 1 แบบวิชาการ ภาคสมทบ</option>
                <option value="3">แผนการเรียน 2 แบบวิชาชีพ ภาคปกติ</option>
                <option value="4">แผนการเรียน 2 แบบวิชาชีพ ภาคสมทบ</option>
              </Form.Select>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>สาขาวิชา</Form.Label>
                <Form.Control
                  type="text"
                  name="major_student"
                  value={editStudent.major_student}
                  onChange={handleEditInputChange}
                  placeholder="กรุณากรอกสาขาวิชา"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>สาขา</Form.Label>
                <Form.Control
                  type="text"
                  name="branch_student"
                  value={editStudent.branch_student}
                  onChange={handleEditInputChange}
                  placeholder="กรุณากรอกสาขา"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>อักษรย่อสาขาวิชา</Form.Label>
                <Form.Control
                  type="text"
                  name="abbreviate_student"
                  id="abbreviate_student"
                  value={editStudent.abbreviate_student}
                  onChange={handleEditInputChange}
                  placeholder="กรุณากรอกอักษรย่อสาขาวิชา"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>ที่อยู่</Form.Label>
                <Form.Control
                  type="text"
                  name="address_student"
                  value={editStudent.address_student}
                  onChange={handleEditInputChange}
                  placeholder="กรุณากรอกที่อยู่"
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>เบอร์โทรศัพท์</Form.Label>
                <Form.Control
                  type="text"
                  name="tel_student"
                  value={editStudent.tel_student}
                  onChange={handleEditInputChange}
                  placeholder="กรุณากรอกเบอร์โทรศัพท์"
                  isInvalid={formErrorsEdit.tel_student}
                  minLength={10}
                  maxLength={10}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formErrorsEdit.tel_student}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>อีเมล</Form.Label>
              <Form.Control
                type="email"
                name="email_student"
                value={editStudent.email_student}
                onChange={handleEditInputChange}
                placeholder="กรุณากรอกอีเมล"
                isInvalid={formErrorsEdit.email_student}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrorsEdit.email_student}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type="text"
                name="password_student"
                id="password_student"
                value={editStudent.password_student}
                onChange={handleEditInputChange}
                placeholder="กรุณากรอกรหัสผ่าน"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            บันทึกการเปลี่ยนแปลง
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={showViewModal}
        onHide={handleCloseCreateModal}
        centered
      >
        <Modal.Header closeButton>
          {selectedStudent ? (
            <Modal.Title>
              ดูข้อมูลบัณฑิตศึกษา {selectedStudent.name_student} (
              {selectedStudent.idstd_student})
            </Modal.Title>
          ) : (
            <Modal.Title>กำลังโหลดข้อมูล...</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {selectedStudent ? (
            <div>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>ชื่อ - นามสกุล ภาษาไทย:</strong>
                </Col>
                <Col>
                  {selectedStudent.prefix_student}{" "}
                  {selectedStudent.name_student}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>ชื่อ - นามสกุล ภาษาอังกฤษ:</strong>
                </Col>
                <Col>
                  {selectedStudent.prefix_studentEng}{" "}
                  {selectedStudent.name_studentEng}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>รหัสนักศึกษา:</strong>
                </Col>
                <Col>{selectedStudent.idstd_student}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>แผนการเรียน:</strong>
                </Col>
                <Col>{selectedStudent.name_studyplan}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>สาขาวิชา:</strong>
                </Col>
                <Col>{selectedStudent.major_student}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>สาขา:</strong>
                </Col>
                <Col>{selectedStudent.branch_student}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>อักษรย่อสาขาวิชา:</strong>
                </Col>
                <Col>{selectedStudent.abbreviate_student}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>อีเมล:</strong>
                </Col>
                <Col>{selectedStudent.email_student}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>เบอร์โทรศัพท์:</strong>
                </Col>
                <Col>{selectedStudent.tel_student}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>สถานะบัญชี:</strong>
                </Col>
                <Col>
                  <Badge
                    className={`bg-${getStatusClass(
                      selectedStudent.status_student
                    )}`}
                  >
                    {selectedStudent.status_student}
                  </Badge>
                </Col>
              </Row>
            </div>
          ) : (
            <p>กำลังโหลดข้อมูล...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminPage;
