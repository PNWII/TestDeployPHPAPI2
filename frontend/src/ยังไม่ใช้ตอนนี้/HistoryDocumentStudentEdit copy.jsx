import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const HistoryDocumentStudentEdit = ({
  show,
  onHide,
  editingDocument,
  setEditingDocument,
  handleEditSubmit,
}) => {
  const [advisors, setAdvisors] = useState([]);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await axios.get(
          "http://localhost/TestPHP-API2/backend/getAdvisors.php"
        );
        setAdvisors(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching advisors:", error);
        setAdvisors([]);
      }
    };
    fetchAdvisors();
  }, []);

  // ฟังก์ชันสำหรับตรวจสอบการเปลี่ยนแปลงข้อมูล
  const handleInputChange = (field, value) => {
    setEditingDocument({
      ...editingDocument,
      [field]: value,
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>แก้ไขเอกสาร</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editingDocument ? (
          <Form>
            <Form.Group style={{ padding: 5 }} controlId="documentType">
              <Form.Label>ชื่อเอกสาร</Form.Label>
              <Form.Control
                type="text"
                value={editingDocument.documentType}
                disabled
              />
            </Form.Group>

            {/* เงื่อนไขแสดงฟอร์มสำหรับ GS10 */}
            {editingDocument.documentType.includes(
              "คคอ. บว. 10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
            ) && (
              <>
                <Form.Group style={{ padding: 5 }} controlId="datePicker">
                  <Form.Label>เลือกวันที่</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="เลือกวันที่"
                    value={editingDocument.gs10ReportDate || ""}
                    onChange={(e) =>
                      handleInputChange("gs10ReportDate", e.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group style={{ padding: 5 }} controlId="gs10ProjectType">
                  <Form.Label>ประเภทโครงการ</Form.Label>
                  <Form.Select
                    value={editingDocument.gs10projectType || ""}
                    onChange={(e) =>
                      handleInputChange("gs10projectType", e.target.value)
                    }
                    required
                  >
                    <option disabled>เลือกประเภทของโครงการ...</option>
                    <option value="วิทยานิพนธ์">วิทยานิพนธ์</option>
                    <option value="การศึกษาค้นคว้าอิสระ">
                      การศึกษาค้นคว้าอิสระ
                    </option>
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
                    onChange={(e) =>
                      handleInputChange("gs10advisorType", e.target.value)
                    }
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
                      แต่งตั้งแทนอาจารย์ที่ปรึกษาวิทยานิพนธ์ /
                      การศึกษาค้นคว้าอิสระ
                    </option>
                  </Form.Select>
                </Form.Group>

                {/* ชุดเก่าที่ขอยกเลิก */}
                <Form.Group style={{ padding: 5 }}>
                  <Form.Label>
                    ชุดเก่าที่ขอยกเลิก ดังมีรายชื่อต่อไปนี้
                  </Form.Label>
                  <Row>
                    <Col xs={6}>
                      <Form.Label>อาจารย์ที่ปรึกษาหลัก</Form.Label>
                      <Form.Select
                        value={editingDocument.gs10advisorMainOld || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "gs10advisorMainOld",
                            e.target.value
                          )
                        }
                        required
                      >
                        <option value="">เลือกอาจารย์ที่ปรึกษา...</option>
                        {advisors.length > 0 ? (
                          advisors.map((advisor) => (
                            <option
                              key={advisor.id_teacher}
                              value={advisor.name_teacher}
                            >
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
                          handleInputChange(
                            "gs10advisorSecondOld",
                            e.target.value
                          )
                        }
                        required
                      >
                        <option value="">เลือกอาจารย์ที่ปรึกษา...</option>
                        {advisors.length > 0 ? (
                          advisors.map((advisor) => (
                            <option
                              key={advisor.id_teacher}
                              value={advisor.name_teacher}
                            >
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
                          handleInputChange(
                            "gs10advisorMainNew",
                            e.target.value
                          )
                        }
                        required
                      >
                        <option value="">เลือกอาจารย์ที่ปรึกษา...</option>
                        {advisors.length > 0 ? (
                          advisors.map((advisor) => (
                            <option
                              key={advisor.id_teacher}
                              value={advisor.name_teacher}
                            >
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
                          handleInputChange(
                            "gs10advisorSecondNew",
                            e.target.value
                          )
                        }
                        required
                      >
                        <option value="">เลือกอาจารย์ที่ปรึกษา...</option>
                        {advisors.length > 0 ? (
                          advisors.map((advisor) => (
                            <option
                              key={advisor.id_teacher}
                              value={advisor.name_teacher}
                            >
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
                    แนบไฟล์เอกสาร{" "}
                    <span className="text-danger">
                      **(ถ้ามีให้แนบเอกสารใหม่)
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="gs10Document"
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
                                "gs10Document",
                                "uploads/" + file.name
                              );
                            } else {
                              console.error("การอัปโหลดไฟล์ล้มเหลว");
                            }
                          })
                          .catch((error) => {
                            console.error(
                              "เกิดข้อผิดพลาดในการอัปโหลดไฟล์:",
                              error
                            );
                          });
                      }
                    }}
                  />
                  {editingDocument.gs10Document && (
                    <small>
                      ไฟล์ที่เลือก: {editingDocument.gs10Document} <br />
                    </small>
                  )}
                </Form.Group>
              </>
            )}

            {/* เงื่อนไขแสดงฟอร์มสำหรับ GS11 */}
            {editingDocument.documentType.includes(
              "คคอ. บว. 11 แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
            ) && (
              <>
                <Form.Group style={{ padding: 5 }} controlId="datePicker">
                  <Form.Label>เลือกวันที่</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="เลือกวันที่"
                    value={editingDocument.gs11ReportDate || ""}
                    onChange={(e) =>
                      handleInputChange("gs11ReportDate", e.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group style={{ padding: 5 }}>
                  <Form.Label>ประเภทโครงการ</Form.Label>
                  <Form.Select
                    value={editingDocument.gs11ProjectType || ""}
                    onChange={(e) =>
                      handleInputChange("gs11ProjectType", e.target.value)
                    }
                    required
                  >
                    <option disabled>เลือกประเภทของโครงการ...</option>
                    <option value="วิทยานิพนธ์">วิทยานิพนธ์</option>
                    <option value="การศึกษาค้นคว้าอิสระ">
                      การศึกษาค้นคว้าอิสระ
                    </option>
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
                        onChange={(e) =>
                          handleInputChange("gs11gpa", e.target.value)
                        }
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
                            <option
                              key={advisor.id_teacher}
                              value={advisor.name_teacher}
                            >
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
                            <option
                              key={advisor.id_teacher}
                              value={advisor.name_teacher}
                            >
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
                    แนบไฟล์เอกสารคำร้องขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษา (คคอ.
                    บว. 10){" "}
                    <span className="text-danger">
                      **(ถ้ามีให้แนบเอกสารใหม่)
                    </span>
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
                              handleInputChange(
                                "gs11docGs10rp",
                                "uploads/" + file.name
                              );
                            } else {
                              console.error("การอัปโหลดไฟล์ล้มเหลว");
                            }
                          })
                          .catch((error) => {
                            console.error(
                              "เกิดข้อผิดพลาดในการอัปโหลดไฟล์:",
                              error
                            );
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
                    <span className="text-danger">
                      **(ถ้ามีให้แนบเอกสารใหม่)
                    </span>
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
                            console.error(
                              "เกิดข้อผิดพลาดในการอัปโหลดไฟล์:",
                              error
                            );
                          });
                      }
                    }}
                  />
                  {editingDocument.gs11docProjectdetails && (
                    <small>
                      ไฟล์ที่เลือก: {editingDocument.gs11docProjectdetails}{" "}
                      <br />
                    </small>
                  )}
                </Form.Group>
              </>
            )}
            {editingDocument.documentType.includes(
              "คคอ. บว. 12 แบบขอสอบหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
            ) && (
              <>
                <Form.Group style={{ padding: 5 }} controlId="datePicker">
                  <Form.Label>เลือกวัvvนที่</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="เลือกวันที่"
                    value={editingDocument.gs11ReportDate || ""}
                    onChange={(e) =>
                      handleInputChange("gs11ReportDate", e.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group style={{ padding: 5 }}>
                  <Form.Label>ประเภทโครงการ</Form.Label>
                  <Form.Select
                    value={editingDocument.gs11ProjectType || ""}
                    onChange={(e) =>
                      handleInputChange("gs11ProjectType", e.target.value)
                    }
                    required
                  >
                    <option disabled>เลือกประเภทของโครงการ...</option>
                    <option value="วิทยานิพนธ์">วิทยานิพนธ์</option>
                    <option value="การศึกษาค้นคว้าอิสระ">
                      การศึกษาค้นคว้าอิสระ
                    </option>
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
                        onChange={(e) =>
                          handleInputChange("gs11gpa", e.target.value)
                        }
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
                            <option
                              key={advisor.id_teacher}
                              value={advisor.name_teacher}
                            >
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
                            <option
                              key={advisor.id_teacher}
                              value={advisor.name_teacher}
                            >
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
                    แนบไฟล์เอกสารคำร้องขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษา (คคอ.
                    บว. 10){" "}
                    <span className="text-danger">
                      **(ถ้ามีให้แนบเอกสารใหม่)
                    </span>
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
                              handleInputChange(
                                "gs11docGs10rp",
                                "uploads/" + file.name
                              );
                            } else {
                              console.error("การอัปโหลดไฟล์ล้มเหลว");
                            }
                          })
                          .catch((error) => {
                            console.error(
                              "เกิดข้อผิดพลาดในการอัปโหลดไฟล์:",
                              error
                            );
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
                    <span className="text-danger">
                      **(ถ้ามีให้แนบเอกสารใหม่)
                    </span>
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
                            console.error(
                              "เกิดข้อผิดพลาดในการอัปโหลดไฟล์:",
                              error
                            );
                          });
                      }
                    }}
                  />
                  {editingDocument.gs11docProjectdetails && (
                    <small>
                      ไฟล์ที่เลือก: {editingDocument.gs11docProjectdetails}{" "}
                      <br />
                    </small>
                  )}
                </Form.Group>
              </>
            )}
          </Form>
        ) : (
          <Alert variant="danger">ไม่พบข้อมูลสำหรับแก้ไข</Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          ยกเลิก
        </Button>
        <Button
          variant="primary"
          onClick={handleEditSubmit}
          disabled={!editingDocument}
        >
          ยืนยันการแก้ไข
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HistoryDocumentStudentEdit;
