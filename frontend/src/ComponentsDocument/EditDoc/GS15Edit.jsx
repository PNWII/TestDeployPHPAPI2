import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";

const GS15Edit = ({ editingDocument, advisors, handleInputChange }) => {
  console.log(editingDocument);
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>เลือกวันที่</Form.Label>
        <Form.Control
          type="date"
          value={editingDocument.gs15ReportDate || ""}
          onChange={(e) => handleInputChange("gs15ReportDate", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>ประเภทโครงการ</Form.Label>
        <Form.Select
          value={editingDocument.gs15ProjectType || ""}
          onChange={(e) => handleInputChange("gs15ProjectType", e.target.value)}
          required
        >
          <option disabled>เลือกประเภทของโครงการ...</option>
          <option value="วิทยานิพนธ์">วิทยานิพนธ์</option>
          <option value="การศึกษาค้นคว้าอิสระ">การศึกษาค้นคว้าอิสระ</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อโครงการ (ภาษาไทย)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs15ProjectThai || ""}
              onChange={(e) =>
                handleInputChange("gs15ProjectThai", e.target.value)
              }
            />
          </Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Label>ชื่อโครงการ (ภาษาอังกฤษ)</Form.Label>
            <Form.Control
              type="text"
              value={editingDocument.gs15ProjectEng || ""}
              onChange={(e) =>
                handleInputChange("gs15ProjectEng", e.target.value)
              }
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          ได้รับอนุมัติหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ (เมื่อวันที่ /
          เดือน / ปี)
        </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>เมื่อวันที่</InputGroup.Text>
          <Form.Control
            type="date"
            value={editingDocument.gs15projectApprovalDate || ""}
            onChange={(e) =>
              handleInputChange("gs15projectApprovalDate", e.target.value)
            }
          />
        </InputGroup>
        <Form.Label>
          สอบความก้าวหน้าวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ (เมื่อวันที่ / เดือน /
          ปี)
        </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>เมื่อวันที่</InputGroup.Text>
          <Form.Control
            type="date"
            value={editingDocument.gs15projectProgressDate || ""}
            onChange={(e) =>
              handleInputChange("gs15projectProgressDate", e.target.value)
            }
          />
        </InputGroup>

        <Form.Label>
          มีความประสงค์ขอสอบป้องกันโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระในวันและเวลา
          ดังนี้
        </Form.Label>
        <Row>
          <Col xs={6} sm={6} md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">วันที่</InputGroup.Text>
              <Form.Control
                type="date"
                value={editingDocument.gs15defenseRequestDate || ""}
                onChange={(e) =>
                  handleInputChange("gs15defenseRequestDate", e.target.value)
                }
              />
            </InputGroup>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">เวลา</InputGroup.Text>
              <Form.Control
                type="time"
                value={editingDocument.gs15defenseRequestTime || ""}
                onChange={(e) =>
                  handleInputChange("gs15defenseRequestTime", e.target.value)
                }
              />
            </InputGroup>
          </Col>
        </Row>

        <Form.Label>สถานที่ขอสอบป้องกัน ณ ห้อง</Form.Label>
        <Row className="align-items-center">
          <Col xs={4} sm={4} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>ห้อง</InputGroup.Text>
              <Form.Control
                type="text"
                value={editingDocument.gs15defenseRequestRoom || ""}
                onChange={(e) =>
                  handleInputChange("gs15defenseRequestRoom", e.target.value)
                }
              />
            </InputGroup>
          </Col>
          <Col xs={4} sm={4} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>ชั้น</InputGroup.Text>
              <Form.Control
                type="text"
                value={editingDocument.gs15defenseRequestFloor || ""}
                onChange={(e) =>
                  handleInputChange("gs15defenseRequestFloor", e.target.value)
                }
              />
            </InputGroup>
          </Col>
          <Col xs={4} sm={4} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>อาคาร</InputGroup.Text>
              <Form.Control
                type="text"
                value={editingDocument.gs15defenseRequestBuilding || ""}
                onChange={(e) =>
                  handleInputChange(
                    "gs15defenseRequestBuilding",
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
              value={editingDocument.gs15advisorMain || ""}
              onChange={(e) =>
                handleInputChange("gs15advisorMain", e.target.value)
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
              value={editingDocument.gs15advisorSecond || ""}
              onChange={(e) =>
                handleInputChange("gs15advisorSecond", e.target.value)
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
          ข้าพเจ้าได้ดำเนินการตามข้อบังคับฯ มหาวิทยาลัย
          ว่าด้วยการศึกาาระดับบัณฑิตศึกษา หมวดที่ 9 การสำเร็จการศึกษาฯ แล้วคือ
          1. ศึกษาวิชาครบตามที่กำหนดในหลักสูตร (จำนวน)
        </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            ศึกษารายวิชาครบตามที่กำหนดในหลักสูตร (จำนวน)
          </InputGroup.Text>
          <Form.Control
            type="text"
            value={editingDocument.gs15courseCredits || ""}
            onChange={(e) =>
              handleInputChange("gs15courseCredits", e.target.value)
            }
          />
          <InputGroup.Text>ได้คะแนนเฉลี่ยสะสม</InputGroup.Text>
          <Form.Control
            type="text"
            value={editingDocument.gs15cumulativeGPA || ""}
            onChange={(e) =>
              handleInputChange("gs15cumulativeGPA", e.target.value)
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            และได้รับการประเมินวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ (จำนวน)
          </InputGroup.Text>
          <Form.Control
            type="text"
            value={editingDocument.gs15thesisCredits || ""}
            onChange={(e) =>
              handleInputChange("gs15thesisCredits", e.target.value)
            }
          />
        </InputGroup>
        <Form.Label>
          2. เรียบเรียงวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ตามข้อกำหนด
          ในคู่มือจัดทำวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ของมหาวิทยาลัย
          คณะครุศาสตร์อุตสาหกรรม เสร็จเรียบร้อยแล้ว
        </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            3. เอกสารโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับสอบ
            สำหรับคณะกรรมการ (จำนวน)
          </InputGroup.Text>
          <Form.Control
            type="text"
            value={editingDocument.gs15thesisDefenseDoc || ""}
            onChange={(e) =>
              handleInputChange("gs15thesisDefenseDoc", e.target.value)
            }
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label>แนบไฟล์เอกสารแผนการเรียน (คคอ. บว. 40/41)</Form.Label>
        <Form.Control
          type="file"
          name="gs15docGs40rpGs41rp"
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
                      "gs15docGs40rpGs41rp",
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
        {editingDocument.gs15docGs40rpGs41rp && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs15docGs40rpGs41rp} <br />
          </small>
        )}
      </Form.Group>

      <Form.Group style={{ padding: 5 }}>
        <Form.Label>
          แนบไฟล์เอกสารแบบขอส่งผลงานที่ได้นำเสนอ/ตีพิมพ์ (คคอ. บว. 50)
        </Form.Label>
        <Form.Control
          type="file"
          name="gs15docGs50rp"
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
                    handleInputChange("gs15docGs50rp", "uploads/" + file.name);
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
        {editingDocument.gs15docGs50rp && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs15docGs50rp} <br />
          </small>
        )}
      </Form.Group>

      <Form.Group style={{ padding: 5 }}>
        <Form.Label>
          แนบไฟล์เอกสารโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับสอบ
          (สำหรับคณะกรรมการสอบ)
        </Form.Label>
        <Form.Control
          type="file"
          name="gs15docThesisExamCopy"
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
                      "gs15docThesisExamCopy",
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
        {editingDocument.gs15docThesisExamCopy && (
          <small>
            ไฟล์ที่เลือก: {editingDocument.gs15docThesisExamCopy} <br />
          </small>
        )}
      </Form.Group>
    </>
  );
};
export default GS15Edit;
