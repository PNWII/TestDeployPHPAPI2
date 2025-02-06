import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";

const GS14Edit = ({ editingDocument, advisors, handleInputChange }) => {
  console.log(editingDocument);
  return (
    <>
      <Form.Group style={{ padding: 5 }} controlId="datePicker">
        <Form.Label>เลือกวันที่</Form.Label>
        <Form.Control
          type="date"
          value={editingDocument.gs14ReportDate || ""}
          onChange={(e) => handleInputChange("gs14ReportDate", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group style={{ padding: 5 }}>
        <Form.Label>ประเภทโครงการ</Form.Label>
        <Form.Select
          value={editingDocument.gs14ProjectType || ""}
          onChange={(e) => handleInputChange("gs14ProjectType", e.target.value)}
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
              value={editingDocument.gs14ProjectThai || ""}
              onChange={(e) =>
                handleInputChange("gs14ProjectThai", e.target.value)
              }
            />
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อโครงการ (ภาษาอังกฤษ)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs14ProjectEng || ""}
              onChange={(e) =>
                handleInputChange("gs14ProjectEng", e.target.value)
              }
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" style={{ padding: 5 }}>
        <Form.Label>
          ได้รับอนุมัติหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ (เมื่อวันที่ /
          เดือน / ปี)
        </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>เมื่อวันที่</InputGroup.Text>
          <Form.Control
            type="date"
            value={editingDocument.gs14projectApprovalDate || ""}
            onChange={(e) =>
              handleInputChange("gs14projectApprovalDate", e.target.value)
            }
          />
        </InputGroup>
        <Form.Label>
          มีความประสงค์ขอสอบความก้าวหน้าโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระในวันและเวลา
          ดังนี้
        </Form.Label>
        <Row>
          <Col xs={6} sm={6} md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">วันที่</InputGroup.Text>
              <Form.Control
                type="date"
                value={editingDocument.gs14progressExamRequestDate || ""}
                onChange={(e) =>
                  handleInputChange(
                    "gs14progressExamRequestDate",
                    e.target.value
                  )
                }
              />
            </InputGroup>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">เวลา</InputGroup.Text>
              <Form.Control
                type="time"
                value={editingDocument.gs14progressExamRequestTime || ""}
                onChange={(e) =>
                  handleInputChange(
                    "gs14progressExamRequestTime",
                    e.target.value
                  )
                }
              />
            </InputGroup>
          </Col>
        </Row>
        <Form.Label>สถานที่ขอสอบความก้าวหน้า ณ ห้อง</Form.Label>
        <Row className="align-items-center">
          <Col xs={4} sm={4} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>ห้อง</InputGroup.Text>
              <Form.Control
                type="text"
                value={editingDocument.gs14progressExamRequestRoom || ""}
                onChange={(e) =>
                  handleInputChange(
                    "gs14progressExamRequestRoom",
                    e.target.value
                  )
                }
              />
            </InputGroup>
          </Col>
          <Col xs={4} sm={4} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>ชั้น</InputGroup.Text>
              <Form.Control
                type="text"
                value={editingDocument.gs14progressExamRequestFloor || ""}
                onChange={(e) =>
                  handleInputChange(
                    "gs14progressExamRequestFloor",
                    e.target.value
                  )
                }
              />
            </InputGroup>
          </Col>
          <Col xs={4} sm={4} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>อาคาร</InputGroup.Text>
              <Form.Control
                type="text"
                value={editingDocument.gs14progressExamRequestBuilding || ""}
                onChange={(e) =>
                  handleInputChange(
                    "gs14progressExamRequestBuilding",
                    e.target.value
                  )
                }
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Label>อาจารย์ที่ปรึกษาหลัก</Form.Label>
            <Form.Select
              value={editingDocument.gs14advisorMain || ""}
              onChange={(e) =>
                handleInputChange("gs14advisorMain", e.target.value)
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
              value={editingDocument.gs14advisorSecond || ""}
              onChange={(e) =>
                handleInputChange("gs14advisorSecond", e.target.value)
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
      <Form.Group>
        <Form.Label>
          แนบไฟล์เอกสารรายละเอียดโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ{" "}
        </Form.Label>
        <Form.Control
          type="file"
          name="gs14docProjectdetailsGs22rp"
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
                      "gs14docProjectdetailsGs22rp",
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
        {editingDocument.gs14docProjectdetailsGs22rp && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs14docProjectdetailsGs22rp} <br />
          </small>
        )}
      </Form.Group>
    </>
  );
};
export default GS14Edit;
