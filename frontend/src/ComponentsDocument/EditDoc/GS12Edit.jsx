import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";

const GS12Edit = ({ editingDocument, advisors, handleInputChange }) => {
  console.log(editingDocument);
  return (
    <>
      <Form.Group style={{ padding: 5 }} controlId="datePicker">
        <Form.Label>เลือกวันที่</Form.Label>
        <Form.Control
          type="date"
          value={editingDocument.gs12ReportDate || ""}
          onChange={(e) => handleInputChange("gs12ReportDate", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group style={{ padding: 5 }}>
        <Form.Label>ประเภทโครงการ</Form.Label>
        <Form.Select
          value={editingDocument.gs12ProjectType || ""}
          onChange={(e) => handleInputChange("gs12ProjectType", e.target.value)}
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
              value={editingDocument.gs12ProjectThai || ""}
              onChange={(e) =>
                handleInputChange("gs12ProjectThai", e.target.value)
              }
            />
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อโครงการ (ภาษาอังกฤษ)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs12ProjectEng || ""}
              onChange={(e) =>
                handleInputChange("gs12ProjectEng", e.target.value)
              }
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group style={{ padding: 5 }}>
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>มีความประสงค์ขอสอบหัวข้อในวันและเวลา ดังนี้</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">วันที่</InputGroup.Text>
              <Form.Control
                type="date"
                value={editingDocument.gs12examRequestDate || ""}
                onChange={(e) =>
                  handleInputChange("gs12examRequestDate", e.target.value)
                }
              />
            </InputGroup>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label style={{ margin: 13 }}></Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">เวลา</InputGroup.Text>
              <Form.Control
                type="time"
                value={editingDocument.gs12examRequestTime || ""}
                onChange={(e) =>
                  handleInputChange("gs12examRequestTime", e.target.value)
                }
              />
            </InputGroup>
          </Col>
        </Row>
      </Form.Group>
      <Form.Label>สถานที่ขอสอบหัวข้อ ณ </Form.Label>

      <Form.Group>
        <Row className="align-items-center">
          <Col xs={4} sm={4} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>ห้อง</InputGroup.Text>
              <Form.Control
                type="text"
                value={editingDocument.gs12examRequestRoom || ""}
                onChange={(e) =>
                  handleInputChange("gs12examRequestRoom", e.target.value)
                }
              />
            </InputGroup>
          </Col>
          <Col xs={4} sm={4} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>ชั้น</InputGroup.Text>
              <Form.Control
                type="text"
                value={editingDocument.gs12examRequestFloor || ""}
                onChange={(e) =>
                  handleInputChange("gs12examRequestFloor", e.target.value)
                }
              />
            </InputGroup>
          </Col>
          <Col xs={4} sm={4} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>อาคาร</InputGroup.Text>
              <Form.Control
                type="text"
                value={editingDocument.gs12examRequestBuilding || ""}
                onChange={(e) =>
                  handleInputChange("gs12examRequestBuilding", e.target.value)
                }
              />
            </InputGroup>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group style={{ padding: 5 }}>
        <Row>
          <Col xs={6}>
            <Form.Label>อาจารย์ที่ปรึกษาหลัก</Form.Label>
            <Form.Select
              value={editingDocument.gs12advisorMain || ""}
              onChange={(e) =>
                handleInputChange("gs12advisorMain", e.target.value)
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
              value={editingDocument.gs12advisorSecond || ""}
              onChange={(e) =>
                handleInputChange("gs12advisorSecond", e.target.value)
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
          แนบไฟล์เอกสารรายละเอียดโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ{" "}
        </Form.Label>
        <Form.Control
          type="file"
          name="gs12docProjectdetailsGs20rp"
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
                      "gs12docProjectdetailsGs20rp",
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
        {editingDocument.gs12docProjectdetailsGs20rp && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs12docProjectdetailsGs20rp} <br />
          </small>
        )}
      </Form.Group>
    </>
  );
};
export default GS12Edit;
