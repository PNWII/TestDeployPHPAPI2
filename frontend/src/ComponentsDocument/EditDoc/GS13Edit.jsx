import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";

const GS13Edit = ({ editingDocument, advisors, handleInputChange }) => {
  console.log(editingDocument);
  return (
    <>
      <Form.Group style={{ padding: 5 }} controlId="datePicker">
        <Form.Label>เลือกวันที่</Form.Label>
        <Form.Control
          type="date"
          value={editingDocument.gs13ReportDate || ""}
          onChange={(e) => handleInputChange("gs13ReportDate", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group style={{ padding: 5 }}>
        <Form.Label>ประเภทโครงการ</Form.Label>
        <Form.Select
          value={editingDocument.gs13ProjectType || ""}
          onChange={(e) => handleInputChange("gs13ProjectType", e.target.value)}
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
              value={editingDocument.gs13ProjectThai || ""}
              onChange={(e) =>
                handleInputChange("gs13ProjectThai", e.target.value)
              }
            />
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อโครงการ (ภาษาอังกฤษ)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs13ProjectEng || ""}
              onChange={(e) =>
                handleInputChange("gs13ProjectEng", e.target.value)
              }
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group style={{ padding: 5 }}>
        <Form.Label>
          ซึ่งได้ปรับปรุงแก้ไขตามข้อเสนอแนะของอาจารย์ที่ปรึกษาในการสอบโครงการ
          (เมื่อวันที่ / เดือน / ปี)
        </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>เมื่อวันที่</InputGroup.Text>
          <Form.Control
            type="date"
            value={editingDocument.gs13revisionDateAdvisor || ""}
            onChange={(e) =>
              handleInputChange("gs13revisionDateAdvisor", e.target.value)
            }
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Row>
          <Col xs={6}>
            <Form.Label>อาจารย์ที่ปรึกษาหลัก</Form.Label>
            <Form.Select
              value={editingDocument.gs13advisorMain || ""}
              onChange={(e) =>
                handleInputChange("gs13advisorMain", e.target.value)
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
              value={editingDocument.gs13advisorSecond || ""}
              onChange={(e) =>
                handleInputChange("gs13advisorSecond", e.target.value)
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
          แนบไฟล์เอกสารรายละเอียดโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
        </Form.Label>
        <Form.Control
          type="file"
          name="gs13docProjectdetailsGs21rp"
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
                      "gs13docProjectdetailsGs21rp",
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
        {editingDocument.gs13docProjectdetailsGs21rp && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs13docProjectdetailsGs21rp} <br />
          </small>
        )}
      </Form.Group>
    </>
  );
};
export default GS13Edit;
