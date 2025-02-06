import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavbarTeacher from "../Components/NavbarTeacher";
import axios from "axios";

import {
  Card,
  Col,
  Row,
  Button,
  Badge,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
const TeacherPage = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [formData, setFormData] = useState({ comment: "", name: "" });
  const [signature, setSignature] = useState(null);
  const navigate = useNavigate();
  const sigCanvas = useRef();
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectFormData, setRejectFormData] = useState({
    comment: "",
    name: "",
  });
  const [rejectSignature, setRejectSignature] = useState(null);
  const [showDocModal, setShowDocModal] = useState(false);
  const [currentDocUrl, setCurrentDocUrl] = useState(""); // URL ของเอกสารที่จะดู

  const handleCloseDocModal = () => {
    setShowDocModal(false);
    setCurrentDocUrl("");
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    if (!isLoggedIn || role !== "ครูอาจารย์ที่ปรึกษา") {
      alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
      navigate("/loginteacher");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      const teacherName = localStorage.getItem("teacherName");
      if (teacherName) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: teacherName, // Set the teacher name in formData
        }));
        setRejectFormData((prevRejectFormData) => ({
          ...prevRejectFormData,
          name: teacherName, // ตั้งชื่ออาจารย์ใน rejectFormData
        }));
      }

      if (!teacherName) {
        setError("ชื่ออาจารย์ไม่ครบถ้วน");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost/TestPHP-API2/backend/get-related-reportsTeacher.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nameTeacher: teacherName,
            }),
          }
        );

        const text = await response.text();
        const data = JSON.parse(text);
        // รีเฟรชข้อมูลหลังจากอนุมัติสำเร็จ
        fetchDocuments();

        if (data.status === "success") {
          // Sort documents by timeSubmit (newest first)
          const sortedDocuments = data.reports.sort(
            (a, b) => new Date(b.timeSubmit) - new Date(a.timeSubmit)
          );
          setDocuments(sortedDocuments);
        } else {
          setError("ไม่สามารถดึงข้อมูลเอกสารได้");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments(documents);
  }, []);

  const handleViewDocument = async (docId, docName) => {
    console.log("Request Body:", { id: docId, name: docName });
    if (!docId || !docName) {
      alert("ข้อมูลเอกสารไม่สมบูรณ์");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost/TestPHP-API2/backend/ViewDocument.php",
        { id: docId, name: docName }, // ส่งข้อมูลใน body
        {
          headers: {
            "Content-Type": "application/json", // ตั้งค่า Content-Type เป็น application/json
          },
        }
      );
      if (
        response.data &&
        response.data.reports &&
        response.data.reports.length > 0
      ) {
        const doc = response.data.reports[0]; // Accessing the first report
        console.log("Response Data:", response.data);
        setCurrentDoc(doc);
        setCurrentDocUrl(doc.fileUrl); // Ensure correct file URL is set
        setShowDocModal(true);
      } else {
        alert("ไม่พบข้อมูลเอกสาร");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      alert("เกิดข้อผิดพลาดในการดึงข้อมูลเอกสาร");
    }
  };
  const handleDownloadPDF = async (docId, docName) => {
    console.log("Request Body:", { id: docId, name: docName });
    let endpoint = "";
    if (
      docName ===
      "คคอ. บว. 10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      endpoint = "Gs10report.php";
    } else if (
      docName === "คคอ. บว. 11 แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      endpoint = "Gs11report.php";
    } else {
      alert("ไม่พบประเภทเอกสารที่รองรับ");
      return;
    }
    // URL ของ Backend
    const url = `http://localhost/TestPHP-API2/backend/FPDF/${endpoint}?id=${docId}`;

    try {
      // ตรวจสอบว่า Endpoint ใช้งานได้
      const response = await fetch(url, { method: "HEAD" });
      if (!response.ok) {
        throw new Error("ไม่สามารถดาวน์โหลดเอกสารได้");
      }

      // เริ่มการดาวน์โหลด
      window.location.href = url;
    } catch (error) {
      alert(error.message);
    }
  };
  const handleDownload = (docId, docName) => {
    console.log(docName);
    console.log(docId);
    let filePath = "";
    if (
      docName ===
      "คคอ. บว. 10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      filePath = currentDoc.gs10document;
    } else if (
      docName === "คคอ. บว. 11 แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      //filePath = currentDoc.gs11document;
    } else {
      alert("ไม่พบประเภทเอกสารที่รองรับ");
      return;
    }
    if (filePath) {
      window.location.href = `http://localhost/TestPHP-API2/backend/downloadFileDocument.php?id=${docId}&filePath=${filePath}`;
    } else {
      alert("Invalid file path.");
    }
  };
  return (
    <>
      <NavbarTeacher />
      <div className="container mt-4">
        <h2 className="text-center mb-4">อนุมัติเอกสารคำร้อง</h2>
        {isLoading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">กำลังโหลด...</span>
            </Spinner>
            <p>กำลังโหลดข้อมูล...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center mt-4">
            <p>ไม่พบข้อมูล</p>
          </div>
        ) : (
          <>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Row xs={1} md={2} lg={3} className="g-4 px-3">
              {documents.map((doc) => (
                <Col key={doc.id}>
                  <Card
                    className="shadow-lg border-0 d-flex flex-column"
                    style={{ height: "100%" }}
                  >
                    <Card.Header
                      className="text-white"
                      style={{ backgroundColor: "#7d3c98" }}
                    >
                      <strong className="card-title">
                        รหัสเอกสาร: {doc.id}
                      </strong>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-primary">
                        <strong>ชื่อเอกสาร: {doc.name || "ไม่พบข้อมูล"}</strong>
                      </Card.Title>
                      <Card.Text>
                        <strong>รหัสนักศึกษา:</strong> {doc.idstd_student}
                        <br />
                        <strong>ชื่อ:</strong> {doc.name_student}
                        <br />
                        <strong>วันเวลาที่ส่ง:</strong> {doc.timeSubmit}
                        <br />
                        <strong>สถานะ: </strong>
                        <Badge
                          bg={
                            doc.status ===
                            "ได้รับการอนุมัติจากครูอาจารย์ที่ปรึกษาแล้ว"
                              ? "success text-white"
                              : doc.status === "รอการพิจารณาจากอาจารย์ที่ปรึกษา"
                              ? "warning"
                              : doc.status ===
                                "ถูกปฏิเสธจากครูอาจารย์ที่ปรึกษาแล้ว"
                              ? "danger text-white"
                              : "warning"
                          }
                          text="dark"
                          className="text-dark"
                        >
                          {doc.status || "รอการพิจารณาจากอาจารย์ที่ปรึกษา"}
                        </Badge>
                      </Card.Text>
                      <div className="me-auto">
                        <Button
                          size="sm"
                          variant="primary"
                          className="me-2"
                          onClick={() => handleViewDocument(doc.id, doc.name)}
                        >
                          ดูเอกสาร
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Modal
              show={showDocModal}
              onHide={handleCloseDocModal}
              size="lg"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>รายละเอียดข้อมูลเอกสาร</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {currentDoc &&
                currentDoc.name ===
                  "คคอ. บว. 10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ" ? (
                  <div>
                    <div className="card shadow-sm mb-4">
                      <div className="card-header bg-primary text-white">
                        <h5>
                          รายละเอียดข้อมูลในเอกสาร คคอ. บว. 10
                          แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/
                          การศึกษาค้นคว้าอิสระ
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-light text-dark">
                            <strong>จัดทำโครงการประเภท</strong>
                          </span>
                          <input
                            type="text"
                            className="form-control bg-white"
                            value={currentDoc.projectType || "ไม่พบข้อมูล"}
                            disabled
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-light text-dark">
                            <strong>ชื่อโครงการ (ภาษาไทย)</strong>
                          </span>
                          <input
                            type="text"
                            className="form-control bg-white"
                            value={currentDoc.projectThai || "ไม่พบข้อมูล"}
                            disabled
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-light text-dark">
                            <strong>ชื่อโครงการ (ภาษาอังกฤษ)</strong>
                          </span>
                          <input
                            type="text"
                            className="form-control bg-white"
                            value={currentDoc.projectEng || "ไม่พบข้อมูล"}
                            disabled
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-light text-dark">
                            <strong>
                              มีความประสงค์ขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาซึ่งเป็นการ
                            </strong>
                          </span>
                          <input
                            type="text"
                            className="form-control bg-white"
                            value={currentDoc.advisorType || "ไม่พบข้อมูล"}
                            disabled
                          />
                        </div>
                        <div className="input-group mb-3">
                          <label>
                            <strong>ชุดเก่าที่ขอยกเลิก มีรายชื่อดังนี้</strong>
                          </label>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-light text-dark">
                            <strong>อาจารย์ที่ปรึกษาหลัก</strong>
                          </span>
                          <input
                            type="text"
                            className="form-control bg-white"
                            value={currentDoc.advisorMainOld || "ไม่มีข้อมูล"}
                            disabled
                          />
                          <span className="input-group-text bg-light text-dark">
                            <strong>อาจารย์ที่ปรึกษาร่วม</strong>
                          </span>
                          <input
                            type="text"
                            className="form-control bg-white"
                            value={currentDoc.advisorSecondOld || "ไม่มีข้อมูล"}
                            disabled
                          />
                        </div>
                        <div className="input-group mb-3">
                          <label>
                            <strong>
                              รายชื่ออาจารย์ที่ปรึกษาชุดใหม่ มีรายชื่อดังนี้
                            </strong>
                          </label>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-light text-dark">
                            <strong>อาจารย์ที่ปรึกษาหลัก</strong>
                          </span>
                          <input
                            type="text"
                            className="form-control bg-white"
                            value={currentDoc.advisorMainNew || "ไม่มีข้อมูล"}
                            disabled
                          />
                          <span className="input-group-text bg-light text-dark">
                            <strong>อาจารย์ที่ปรึกษาร่วม</strong>
                          </span>
                          <input
                            type="text"
                            className="form-control bg-white"
                            value={currentDoc.advisorSecondNew || "ไม่มีข้อมูล"}
                            disabled
                          />
                        </div>
                        <div className="input-group mt-3">
                          <span className="input-group-text bg-light text-dark">
                            <strong>เอกสารที่แนบมา (ถ้ามี)</strong>
                          </span>
                          <input
                            type="text"
                            className="form-control bg-white"
                            value={currentDoc.gs10document || "ไม่มีข้อมูล"}
                            disabled
                          />
                          <button
                            onClick={() =>
                              handleDownload(currentDoc.id, currentDoc.name)
                            }
                            className="btn btn-primary"
                          >
                            ดาวน์โหลดเอกสาร
                          </button>
                        </div>
                        <div className="text-center" style={{ margin: 20 }}>
                          <strong>ลายมือชื่อ : </strong>
                          {currentDoc.gs10signName || "ไม่มีข้อมูล"}
                        </div>
                        <div className="input-group mt-3 d-flex justify-content-center">
                          <img
                            src={currentDoc.gs10signature || ""}
                            alt="Signature"
                            style={{ maxWidth: "300px", maxHeight: "200px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentDoc &&
                  currentDoc.name ===
                    "คคอ. บว. 11 แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ" ? (
                  <Card className="shadow-sm mb-4">
                    <Card.Header className="bg-primary text-white">
                      <h5>
                        รายละเอียดข้อมูลในเอกสาร คคอ. บว. 11
                        แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
                      </h5>
                    </Card.Header>
                    <Card.Body>
                      {/* Add your content inside the Card.Body as needed */}
                    </Card.Body>
                  </Card>
                ) : (
                  <div>ไม่พบข้อมูลเอกสาร</div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDocModal}>
                  ปิด
                </Button>
                {currentDoc && (
                  <Button
                    variant="success"
                    onClick={() =>
                      handleDownloadPDF(currentDoc.id, currentDoc.name)
                    }
                  >
                    ดาวน์โหลดข้อมูลเป็น PDF
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default TeacherPage;
