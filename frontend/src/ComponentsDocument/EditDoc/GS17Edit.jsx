import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const GS17Edit = ({ editingDocument, advisors, handleInputChange }) => {
  console.log(editingDocument);
  const currentYear = new Date().getFullYear() + 543; // แปลงเป็นพุทธศักราช
  const years = Array.from({ length: 8 }, (_, i) => currentYear - 4 + i); // 4 ปีย้อนหลัง + ปีปัจจุบัน + 3 ปีข้างหน้า

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>เลือกวันที่</Form.Label>
        <Form.Control
          type="date"
          value={editingDocument.gs17ReportDate || ""}
          onChange={(e) => handleInputChange("gs17ReportDate", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>
          มีความประสงค์ ขออนุมัติผลการสำเร็จการศึกษานักศึกษาระดับปริญญาโท แผน 1
          แบบวิชาการ
          ทั้งนี้ได้ปฏิบัติตามเงื่อนไขเพื่อขออนุมัติผลการสำเร็จการศึกษา
        </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ในภาคการศึกษาที่</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs17SemesterAt || ""}
              onChange={(e) =>
                handleInputChange("gs17SemesterAt", e.target.value)
              }
            />
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ปีการศึกษา</Form.Label>
            <Form.Select
              id="academicYear"
              value={editingDocument.gs17AcademicYear || ""}
              onChange={(e) =>
                handleInputChange("gs17AcademicYear", e.target.value)
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
                value={editingDocument.gs17CourseCredits || ""}
                onChange={(e) =>
                  handleInputChange("gs17CourseCredits", e.target.value)
                }
              />
              <InputGroup.Text>หน่วยกิต</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>มีคะแนนเฉลี่ย</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs17CumulativeGPA || ""}
              onChange={(e) =>
                handleInputChange("gs17CumulativeGPA", e.target.value)
              }
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="gs17DocCheck15"
          label="นักศึกษาได้ดำเนินการส่ง คคอ. บว. 50 คำร้องขอส่งเอกสารผลงานที่ได้รับการตีพิมพ์หรือนำเสนอ"
          checked={editingDocument.gs17DocCheck15 || false} // ตรวจสอบว่ามีค่าหรือไม่ (true/false)
          onChange={
            (e) => handleInputChange("gs17DocCheck15", e.target.checked ? 1 : 0) // แปลงเป็น 1/0
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <InputGroup className="mb-3">
          <InputGroup.Text>
            สอบป้องกันวิทยานิพนธ์ผ่านแล้ว (เมื่อวันที่ / เดือน / ปี)
          </InputGroup.Text>
          <Form.Control
            type="date"
            value={editingDocument.gs17ProjectDefenseDate || ""}
            onChange={(e) =>
              handleInputChange("gs17ProjectDefenseDate", e.target.value)
            }
          />
        </InputGroup>
        <Form.Group className="mb-3">
          <Form.Label>รายละเอียดเพิ่มเติม (เพิ่มเติม)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={editingDocument.gs17AdditionalDetails || ""}
            onChange={(e) =>
              handleInputChange("gs17AdditionalDetails", e.target.value)
            }
          />
        </Form.Group>
        <Form.Label>ชื่ออาจารย์ที่ปรึกษา</Form.Label>
        <Form.Select
          value={editingDocument.gs17ThesisAdvisor || ""}
          onChange={(e) =>
            handleInputChange("gs17ThesisAdvisor", e.target.value)
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
    </>
  );
};
export default GS17Edit;
