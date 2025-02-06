import { useState, useEffect } from "react";
import NavbarGraduateOfficer from "../../Components/NavbarGraduateOfficer";
import { FaSearch } from "react-icons/fa"; // นำเข้าไอคอนจาก react-icons
import { Button, Modal } from "react-bootstrap"; // นำเข้า Modal และ Button จาก react-bootstrap

function ViewStudentOfficer() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ค่าค้นหา
  const [currentPage, setCurrentPage] = useState(1); // หน้าเริ่มต้น
  const [studentsPerPage] = useState(20); // จำนวนแถวที่แสดงในแต่ละหน้า
  const [showModal, setShowModal] = useState(false); // สำหรับเปิด/ปิด modal
  const [selectedStudent, setSelectedStudent] = useState(null); // สำหรับเก็บข้อมูลนักศึกษาที่เลือก

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost/TestPHP-API2/backend/fetchstudent.php"
        );
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // ฟังก์ชันในการกรองข้อมูลจากคำค้นหา
  const filteredStudents = students.filter(
    (student) =>
      student.status_student === "อนุมัติแล้ว" && // กรองเฉพาะนักศึกษาที่ได้รับการอนุมัติแล้ว
      (student.name_student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email_student
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.idstd_student
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.name_studentEng
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  // คำนวณจำนวนหน้าที่จะแสดง
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // ฟังก์ชันในการย้ายไปยังหน้าถัดไป
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredStudents.length / studentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ฟังก์ชันในการย้ายไปยังหน้าก่อนหน้า
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ฟังก์ชันสำหรับเปิด modal และตั้งค่าข้อมูลนักศึกษาที่เลือก
  const handleDetail = (studentId) => {
    const student = students.find((s) => s.id_student === studentId);
    setSelectedStudent(student);
    setShowModal(true);
  };

  // ฟังก์ชันสำหรับปิด modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <NavbarGraduateOfficer />
      <h2 className="my-4 text-center">ข้อมูลบัณฑิตศึกษา</h2>
      <div className="container">
        <div className="input-group mb-3 justify-content-end">
          <span className="input-group-text" id="basic-addon1">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control w-auto"
            placeholder="ค้นหาชื่อนักศึกษา, รหัสนักศึกษา, อีเมล"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ตาราง */}
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>รหัสนักศึกษา</th>
              <th>ชื่อ</th>
              <th>ชื่อภาษาอังกฤษ</th>
              <th>แผนการเรียน</th>
              <th>สาขาวิชา</th>
              <th>อีเมล</th>
              <th>เบอร์โทร</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr key={student.id_student}>
                  <td>{student.idstd_student}</td>
                  <td>
                    {student.prefix_student} {student.name_student}
                  </td>
                  <td>
                    {student.prefix_studentEng} {student.name_studentEng}
                  </td>
                  <td>{student.name_studyplan}</td>
                  <td>{student.major_student}</td>
                  <td>{student.email_student}</td>
                  <td>{student.tel_student}</td>
                  <td className="text-center">
                    <Button
                      className="btn btn-primary"
                      onClick={() => handleDetail(student.id_student)}
                      size="sm"
                    >
                      ดูข้อมูลส่วนตัว
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">ไม่พบข้อมูลนักศึกษา</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ปุ่มสำหรับเปลี่ยนหน้า */}
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-primary"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            ก่อนหน้า
          </button>
          <button
            className="btn btn-primary"
            onClick={nextPage}
            disabled={
              currentPage ===
              Math.ceil(filteredStudents.length / studentsPerPage)
            }
          >
            ถัดไป
          </button>
        </div>
      </div>

      {/* Modal สำหรับแสดงรายละเอียดนักศึกษา */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>ข้อมูลนักศึกษา</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent ? (
            <div>
              <p>
                <strong>รหัสนักศึกษา: </strong>
                {selectedStudent.idstd_student}
              </p>
              <p>
                <strong>ชื่อ: </strong>
                {selectedStudent.prefix_student} {selectedStudent.name_student}
              </p>
              <p>
                <strong>ชื่อภาษาอังกฤษ: </strong>
                {selectedStudent.prefix_studentEng}{" "}
                {selectedStudent.name_studentEng}
              </p>
              <p>
                <strong>แผนการเรียน: </strong>
                {selectedStudent.name_studyplan}
              </p>
              <p>
                <span>
                  <strong>สาขาวิชา: </strong>
                  {selectedStudent.major_student}
                </span>
                <span style={{ marginLeft: "50px" }}>
                  <strong>สาขา: </strong>
                  {selectedStudent.branch_student}
                </span>
              </p>
              <p>
                {" "}
                <span>
                  <strong>อักษรย่อสาขาวิชา: </strong>
                  {selectedStudent.abbreviate_student}
                </span>
              </p>
              <p>
                <strong>ที่อยู่: </strong>
                {selectedStudent.address_student}
              </p>
              <p>
                <strong>อีเมล: </strong>
                {selectedStudent.email_student}
              </p>
              <p>
                <strong>เบอร์โทร: </strong>
                {selectedStudent.tel_student}
              </p>
            </div>
          ) : (
            <p>ไม่พบข้อมูลนักศึกษา</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewStudentOfficer;
