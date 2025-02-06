import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
const GS11Edit = ({ editingDocument, advisors, handleInputChange }) => {
  return (
    <>
      <Form.Group style={{ padding: 5 }} controlId="datePicker">
        <Form.Label>เลือกวันที่</Form.Label>
        <Form.Control
          type="date"
          placeholder="เลือกวันที่"
          value={editingDocument.gs11ReportDate || ""}
          onChange={(e) => handleInputChange("gs11ReportDate", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group style={{ padding: 5 }}>
        <Form.Label>ประเภทโครงการ</Form.Label>
        <Form.Select
          value={editingDocument.gs11ProjectType || ""}
          onChange={(e) => handleInputChange("gs11ProjectType", e.target.value)}
          required
        >
          <option disabled>เลือกประเภทของโครงการ...</option>
          <option value="วิทยานิพนธ์">วิทยานิพนธ์</option>
          <option value="การศึกษาค้นคว้าอิสระ">การศึกษาค้นคว้าอิสระ</option>
        </Form.Select>
      </Form.Group>

      <Form.Group style={{ padding: 5 }}>
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อโครงการ (ภาษาไทย)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs11ProjectThai || ""}
              onChange={(e) =>
                handleInputChange("gs11ProjectThai", e.target.value)
              }
            />
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อโครงการ (ภาษาอังกฤษ)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs11ProjectEng || ""}
              onChange={(e) =>
                handleInputChange("gs11ProjectEng", e.target.value)
              }
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group style={{ padding: 5 }}>
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ได้ลงทะเบียนรายวิชามาแล้ว (จำนวน)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs11subjects || ""}
              onChange={(e) =>
                handleInputChange("gs11subjects", e.target.value)
              }
            />
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>มีคะแนนเฉลี่ยสะสม</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs11gpa || ""}
              onChange={(e) => handleInputChange("gs11gpa", e.target.value)}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group style={{ padding: 5 }}>
        <Form.Label>
          ในภาคเรียนการศึกษานี้ได้ลงทะเบียนวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
          (จำนวน){" "}
        </Form.Label>
        <Form.Control
          type="text"
          value={editingDocument.gs11subjectsProject || ""}
          onChange={(e) =>
            handleInputChange("gs11subjectsProject", e.target.value)
          }
        />
      </Form.Group>
      <Form.Group style={{ padding: 5 }}>
        <Row>
          <Col xs={6}>
            <Form.Label>อาจารย์ที่ปรึกษาหลัก</Form.Label>
            <Form.Select
              value={editingDocument.gs11advisorMain || ""}
              onChange={(e) =>
                handleInputChange("gs11advisorMain", e.target.value)
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
          </Col>

          <Col xs={6}>
            <Form.Label>อาจารย์ที่ปรึกษาร่วม</Form.Label>
            <Form.Select
              value={editingDocument.gs11advisorSecond || ""}
              onChange={(e) =>
                handleInputChange("gs11advisorSecond", e.target.value)
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
          </Col>
        </Row>
      </Form.Group>
      <Form.Group style={{ padding: 5 }}>
        <Form.Label>
          แนบไฟล์เอกสารคำร้องขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษา (คคอ. บว. 10){" "}
        </Form.Label>
        <Form.Control
          type="file"
          name="gs11docGs10rp"
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
                    handleInputChange("gs11docGs10rp", "uploads/" + file.name);
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
        {editingDocument.gs11docGs10rp && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs11docGs10rp} <br />
          </small>
        )}
      </Form.Group>
      <Form.Group style={{ padding: 5 }}>
        <Form.Label>
          แนบไฟล์เอกสารรายละเอียดโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ{" "}
        </Form.Label>
        <Form.Control
          type="file"
          name="gs11docProjectdetails"
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
                    handleInputChange(
                      "gs11docProjectdetails",
                      "uploads/" + file.name
                    );
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
        {editingDocument.gs11docProjectdetails && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs11docProjectdetails} <br />
          </small>
        )}
      </Form.Group>
    </>
  );
};
export default GS11Edit;
