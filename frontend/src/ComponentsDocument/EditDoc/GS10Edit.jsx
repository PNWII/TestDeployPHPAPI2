import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";

const GS10Edit = ({ editingDocument, advisors, handleInputChange }) => {
  return (
    <>
      <Form.Group style={{ padding: 5 }} controlId="datePicker">
        <Form.Label>เลือกวันที่</Form.Label>
        <Form.Control
          type="date"
          placeholder="เลือกวันที่"
          value={editingDocument.gs10ReportDate || ""}
          onChange={(e) => handleInputChange("gs10ReportDate", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group style={{ padding: 5 }} controlId="gs10ProjectType">
        <Form.Label>ประเภทโครงการ</Form.Label>
        <Form.Select
          value={editingDocument.gs10projectType || ""}
          onChange={(e) => handleInputChange("gs10projectType", e.target.value)}
          required
        >
          <option disabled>เลือกประเภทของโครงการ...</option>
          <option value="วิทยานิพนธ์">วิทยานิพนธ์</option>
          <option value="การศึกษาค้นคว้าอิสระ">การศึกษาค้นคว้าอิสระ</option>
        </Form.Select>
      </Form.Group>

      <Form.Group style={{ padding: 5 }} controlId="gs10ProjectThai">
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อโครงการ (ภาษาไทย)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs10ProjectThai || ""}
              onChange={(e) =>
                handleInputChange("gs10ProjectThai", e.target.value)
              }
            />
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อโครงการ (ภาษาอังกฤษ)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs10ProjectEng || ""}
              onChange={(e) =>
                handleInputChange("gs10ProjectEng", e.target.value)
              }
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group style={{ padding: 5 }} controlId="gs10advisorType">
        <Form.Label>
          มีความประสงค์ขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์ /
          การศึกษาค้นคว้าอิสระ ซึ่งเป็นการ
        </Form.Label>
        <Form.Select
          value={editingDocument.gs10advisorType || ""}
          onChange={(e) => handleInputChange("gs10advisorType", e.target.value)}
          required
        >
          <option value={""}>เลือกความประสงค์...</option>
          <option value={"แต่งตั้งใหม่"}>แต่งตั้งใหม่</option>
          <option value={"แต่งตั้งเพิ่ม"}>แต่งตั้งเพิ่ม</option>
          <option
            value={
              "แต่งตั้งแทนอาจารย์ที่ปรึกษาวิทยานิพนธ์ / การศึกษาค้นคว้าอิสระ"
            }
          >
            แต่งตั้งแทนอาจารย์ที่ปรึกษาวิทยานิพนธ์ / การศึกษาค้นคว้าอิสระ
          </option>
        </Form.Select>
      </Form.Group>

      {/* ชุดเก่าที่ขอยกเลิก */}
      <Form.Group style={{ padding: 5 }}>
        <Form.Label>ชุดเก่าที่ขอยกเลิก ดังมีรายชื่อต่อไปนี้</Form.Label>
        <Row>
          <Col xs={6}>
            <Form.Label>อาจารย์ที่ปรึกษาหลัก</Form.Label>
            <Form.Select
              value={editingDocument.gs10advisorMainOld || ""}
              onChange={(e) =>
                handleInputChange("gs10advisorMainOld", e.target.value)
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
              value={editingDocument.gs10advisorSecondOld || ""}
              onChange={(e) =>
                handleInputChange("gs10advisorSecondOld", e.target.value)
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

      {/* ชุดใหม่ */}
      <Form.Group style={{ padding: 5 }}>
        <Form.Label>ชุดใหม่ที่ขอตั้ง ดังมีรายชื่อต่อไปนี้</Form.Label>
        <Row>
          <Col xs={6}>
            <Form.Label>อาจารย์ที่ปรึกษาหลัก</Form.Label>
            <Form.Select
              value={editingDocument.gs10advisorMainNew || ""}
              onChange={(e) =>
                handleInputChange("gs10advisorMainNew", e.target.value)
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
              value={editingDocument.gs10advisorSecondNew || ""}
              onChange={(e) =>
                handleInputChange("gs10advisorSecondNew", e.target.value)
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
        <Form.Label>แนบไฟล์เอกสาร</Form.Label>
        <Form.Control
          type="file"
          name="gs10document"
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
                    handleInputChange("gs10document", "uploads/" + file.name);
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
        {editingDocument.gs10document && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs10document} <br />
          </small>
        )}
      </Form.Group>
    </>
  );
};
export default GS10Edit;
