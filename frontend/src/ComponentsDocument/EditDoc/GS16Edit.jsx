import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";

const GS16Edit = ({ editingDocument, advisors, handleInputChange }) => {
  console.log(editingDocument);
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>เลือกวันที่</Form.Label>
        <Form.Control
          type="date"
          value={editingDocument.gs16ReportDate || ""}
          onChange={(e) => handleInputChange("gs16ReportDate", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>มีความประสงค์ ขอส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์</Form.Label>
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อวิทยานิพนธ์ (ภาษาไทย)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs16ProjectThai || ""}
              onChange={(e) =>
                handleInputChange("gs16ProjectThai", e.target.value)
              }
            />
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อวิทยานิพนธ์ (ภาษาอังกฤษ)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs16ProjectEng || ""}
              onChange={(e) =>
                handleInputChange("gs16ProjectEng", e.target.value)
              }
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          ได้ดำเนินการสอบป้องกันวิทยานิพนธ์แล้ว (เมื่อวันที่ / เดือน / ปี)
        </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>เมื่อวันที่</InputGroup.Text>
          <Form.Control
            type="date"
            value={editingDocument.gs16ProjectDefenseDate || ""}
            onChange={(e) =>
              handleInputChange("gs16ProjectDefenseDate", e.target.value)
            }
          />
        </InputGroup>
        <Form.Group>
          <Form.Label>ผลการสอบป้องกันวิทยานิพนธ์</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="gs16ResultPass"
              name="gs16ProjectDefenseResult"
              value="ผ่าน (ส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์ไม่เกิน 15 วันนับจากวันสอบ)"
              onChange={(e) =>
                handleInputChange("gs16ProjectDefenseResult", e.target.value)
              }
              label="ผ่าน (ส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์ไม่เกิน 15 วันนับจากวันสอบ)"
              checked={
                editingDocument.gs16ProjectDefenseResult ===
                "ผ่าน (ส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์ไม่เกิน 15 วันนับจากวันสอบ)"
              }
              className="mb-3"
            />
            <Form.Check
              type="radio"
              id="gs16ResultConditionalPass"
              name="gs16ProjectDefenseResult"
              value="ผ่านโดยมีเงื่อนไข (ส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์ไม่เกิน 30 วันนับจากวันสอบ)"
              onChange={(e) =>
                handleInputChange("gs16ProjectDefenseResult", e.target.value)
              }
              label="ผ่านโดยมีเงื่อนไข (ส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์ไม่เกิน 30 วันนับจากวันสอบ)"
              checked={
                editingDocument.gs16ProjectDefenseResult ===
                "ผ่านโดยมีเงื่อนไข (ส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์ไม่เกิน 30 วันนับจากวันสอบ)"
              }
              className="mb-3"
            />
          </div>
        </Form.Group>

        <Form.Label>ชื่ออาจารย์ที่ปรึกษาวิทยานิพนธ์</Form.Label>
        <Form.Select
          value={editingDocument.gs16ThesisAdvisor || ""}
          onChange={(e) =>
            handleInputChange("gs16ThesisAdvisor", e.target.value)
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
      <Form.Group>
        <Form.Label>
          บัดนี้ได้ปรับปรุงแก้ไขเล่มวิทยานิพนธ์ตามข้อเสนอแนะของคณะกรรมการสอบเรียบร้อยแล้ว
          และได้ส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์ พร้อม Flash drive (file .doc และ
          .pdf)
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>แนบไฟล์เล่มวิทยานิพนธ์ฉบับสมบูรณ์ (.doc)</Form.Label>
        <Form.Control
          type="file"
          name="gs16ThesisDoc"
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
                    handleInputChange("gs16ThesisDoc", "uploads/" + file.name);
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
        {editingDocument.gs16ThesisDoc && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs16ThesisDoc} <br />
          </small>
        )}
      </Form.Group>

      <Form.Group style={{ padding: 5 }}>
        <Form.Label>แนบไฟล์เล่มวิทยานิพนธ์ฉบับสมบูรณ์ (.pdf)</Form.Label>
        <Form.Control
          type="file"
          name="gs16ThesisPDF"
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
                    handleInputChange("gs16ThesisPDF", "uploads/" + file.name);
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
        {editingDocument.gs16ThesisPDF && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs16ThesisPDF} <br />
          </small>
        )}
      </Form.Group>
    </>
  );
};
export default GS16Edit;
