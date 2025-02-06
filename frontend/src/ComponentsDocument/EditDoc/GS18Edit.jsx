import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";

const GS18Edit = ({ editingDocument, advisors, handleInputChange }) => {
  console.log(editingDocument);
  const currentYear = new Date().getFullYear() + 543; // แปลงเป็นพุทธศักราช
  const years = Array.from({ length: 8 }, (_, i) => currentYear - 4 + i); // 4 ปีย้อนหลัง + ปีปัจจุบัน + 3 ปีข้างหน้า

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>เลือกวันที่</Form.Label>
        <Form.Control
          type="date"
          value={editingDocument.gs18ReportDate || ""}
          onChange={(e) => handleInputChange("gs18ReportDate", e.target.value)}
          required
        />
      </Form.Group>
      {/* <Form.Group className="mb-2">
        <Form.Label>
          มีความประสงค์ ขออนุมัติผลการสำเร็จการศึกษานักศึกษาระดับปริญญาโท แผน 1
          แบบวิชาการ
          ทั้งนี้ได้ปฏิบัติตามเงื่อนไขเพื่อขออนุมัติผลการสำเร็จการศึกษา
        </Form.Label>
      </Form.Group> */}

      <Form.Group className="mb-3">
        <Row>
          <Col xs={5} sm={5} md={5}>
            <Form.Label>มีความประสงค์ขอสอบประมวลความรู้ใน</Form.Label>
            <InputGroup>
              <InputGroup.Text>ภาคการศึกษาที่</InputGroup.Text>
              <Form.Control
                type="text"
                value={editingDocument.gs18SemesterAt || ""}
                onChange={(e) =>
                  handleInputChange("gs18SemesterAt", e.target.value)
                }
              />
            </InputGroup>
          </Col>
          <Col xs={4} sm={4} md={4}>
            <Form.Label>ปีการศึกษา</Form.Label>
            <Form.Select
              id="academicYear"
              value={editingDocument.gs18AcademicYear || ""}
              onChange={(e) =>
                handleInputChange("gs18AcademicYear", e.target.value)
              }
              required
            >
              <option value="">เลือกปีการศึกษา...</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={3} sm={3} md={3}>
            <Form.Label>ครั้งที่</Form.Label>
            <Form.Select
              id="academicYear"
              value={editingDocument.gs18ExamRoundProject || ""}
              onChange={(e) =>
                handleInputChange("gs18ExamRoundProject", e.target.value)
              }
              required
            >
              <option value="">เลือกรอบสอบ...</option>
              <option value="ครั้งที่ 1">ครั้งที่ 1</option>
              <option value="ครั้งที่ 2">ครั้งที่ 2</option>{" "}
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ศึกษารายวิชาครบตามที่กำหนดในหลักสูตร</Form.Label>
            <InputGroup>
              <InputGroup.Text>จำนวน</InputGroup.Text>
              <Form.Control
                type="text"
                value={editingDocument.gs18CourseCredits || ""}
                onChange={(e) =>
                  handleInputChange("gs18CourseCredits", e.target.value)
                }
              />
              <InputGroup.Text>หน่วยกิต</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>มีคะแนนเฉลี่ย</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs18CumulativeGPA || ""}
              onChange={(e) =>
                handleInputChange("gs18CumulativeGPA", e.target.value)
              }
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>ชื่ออาจารย์ที่ปรึกษา</Form.Label>
        <Form.Select
          value={editingDocument.gs18ThesisAdvisor || ""}
          onChange={(e) =>
            handleInputChange("gs18ThesisAdvisor", e.target.value)
          }
          required
        >
          <option value="">เลือกอาจารย์ที่ปรึกษา...</option>
          {advisors.length > 0 ? (
            advisors.map((advisor) => (
              <option key={advisor.id_teacher} value={advisor.name_teacher}>
                {advisor.name_teacher}
              </option>
            ))
          ) : (
            <option disabled>ไม่มีข้อมูลอาจารย์ที่ปรึกษา</option>
          )}
        </Form.Select>
      </Form.Group>
      <Form.Group style={{ padding: 3 }}>
        <Form.Label>
          {" "}
          แนบไฟล์แผนการเรียน แผน 2 แบบวิชาชีพ (คคอ. บว. 41) จำนวน 1 ชุด
        </Form.Label>
        <Form.Control
          type="file"
          name="gs18DocGs41rp"
          onChange={(e) => {
            // ตรวจสอบว่าเลือกไฟล์หรือไม่
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];

              // สร้าง FormData
              const formData = new FormData();
              formData.append("file", file);

              // ส่งไฟล์ไปที่ server
              axios
                .post(
                  "http://localhost/TestPHP-API2/backend/uploadFileEdit.php",
                  formData
                )
                .then((response) => {
                  if (response.data.success) {
                    // หากการอัปโหลดสำเร็จ จะได้รับเส้นทางของไฟล์
                    handleInputChange("gs18DocGs41rp", "uploads/" + file.name);
                  } else {
                    console.error("การอัปโหลดไฟล์ล้มเหลว");
                  }
                })
                .catch((error) => {
                  console.error("เกิดข้อผิดพลาดในการอัปโหลดไฟล์:", error);
                });
            }
          }}
        />
        {editingDocument.gs18DocGs41rp && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs18DocGs41rp} <br />
          </small>
        )}
      </Form.Group>
    </>
  );
};
export default GS18Edit;
