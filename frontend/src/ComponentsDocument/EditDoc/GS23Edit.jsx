import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";

const GS23Edit = ({ editingDocument, advisors, handleInputChange }) => {
  console.log(editingDocument);
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>เลือกวันที่</Form.Label>
        <Form.Control
          type="date"
          value={editingDocument.gs23ReportDate || ""}
          onChange={(e) => handleInputChange("gs23ReportDate", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>
          มีความประสงค์ ขอส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์
        </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อการศึกษาค้นคว้าอิสระ (ภาษาไทย)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs23ProjectThai || ""}
              onChange={(e) =>
                handleInputChange("gs23ProjectThai", e.target.value)
              }
            />
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อการศึกษาค้นคว้าอิสระ (ภาษาอังกฤษ)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs23ProjectEng || ""}
              onChange={(e) =>
                handleInputChange("gs23ProjectEng", e.target.value)
              }
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          ได้ดำเนินการสอบป้องกันการศึกษาค้นคว้าอิสระแล้ว (เมื่อวันที่ / เดือน /
          ปี)
        </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>เมื่อวันที่</InputGroup.Text>
          <Form.Control
            type="date"
            value={editingDocument.gs23ProjectDefenseDate || ""}
            onChange={(e) =>
              handleInputChange("gs23ProjectDefenseDate", e.target.value)
            }
          />
        </InputGroup>
        <Form.Group>
          <Form.Label>ผลการสอบป้องกันการศึกษาค้นคว้าอิสระ</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="gs23ResultPass"
              name="gs23ProjectDefenseResult"
              value="ผ่าน (ส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ไม่เกิน 15 วันนับจากวันสอบ)"
              onChange={(e) =>
                handleInputChange("gs23ProjectDefenseResult", e.target.value)
              }
              label="ผ่าน (ส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ไม่เกิน 15 วันนับจากวันสอบ)"
              checked={
                editingDocument.gs23ProjectDefenseResult ===
                "ผ่าน (ส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ไม่เกิน 15 วันนับจากวันสอบ)"
              }
              className="mb-3"
            />
            <Form.Check
              type="radio"
              id="gs23ResultConditionalPass"
              name="gs23ProjectDefenseResult"
              value="ผ่านโดยมีเงื่อนไข (ส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ไม่เกิน 30 วันนับจากวันสอบ)"
              onChange={(e) =>
                handleInputChange("gs23ProjectDefenseResult", e.target.value)
              }
              label="ผ่านโดยมีเงื่อนไข (ส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ไม่เกิน 30 วันนับจากวันสอบ)"
              checked={
                editingDocument.gs23ProjectDefenseResult ===
                "ผ่านโดยมีเงื่อนไข (ส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ไม่เกิน 30 วันนับจากวันสอบ)"
              }
              className="mb-3"
            />
          </div>
        </Form.Group>

        <Form.Label>ชื่ออาจารย์ที่ปรึกษาการศึกษาค้นคว้าอิสระ</Form.Label>
        <Form.Select
          value={editingDocument.gs23IndependentStudyAdvisor || ""}
          onChange={(e) =>
            handleInputChange("gs23IndependentStudyAdvisor", e.target.value)
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
          บัดนี้ได้ปรับปรุงแก้ไขเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ตามข้อเสนอแนะของคณะกรรมการสอบเรียบร้อยแล้ว
          และได้ส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ พร้อม Flash drive (file
          .doc และ .pdf)
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          แนบไฟล์เล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ (.doc)
        </Form.Label>
        <Form.Control
          type="file"
          name="gs23IndependentStudyDoc"
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
                      "gs23IndependentStudyDoc",
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
        {editingDocument.gs23IndependentStudyDoc && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs23IndependentStudyDoc} <br />
          </small>
        )}
      </Form.Group>

      <Form.Group style={{ padding: 5 }}>
        <Form.Label>
          แนบไฟล์เล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ (.pdf)
        </Form.Label>
        <Form.Control
          type="file"
          name="gs23IndependentStudyPDF"
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
                      "gs23IndependentStudyPDF",
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
        {editingDocument.gs23IndependentStudyPDF && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs23IndependentStudyPDF} <br />
          </small>
        )}
      </Form.Group>
    </>
  );
};
export default GS23Edit;
