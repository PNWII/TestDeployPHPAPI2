import NavbarTeacher from "../Components/NavbarTeacher";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TeacherPage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);

  const handleShowModal = (action) => {
    setCurrentAction(action);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAction(null);
  };

  const handleViewForm = async (formsubmitID) => {
    try {
      const response = await axios.get(
        `http://localhost/TestPHP-API2/backend/fetch_documentFormSubmit_id.php?id=${formsubmitID}`
      );
      if (response.data && response.data.length > 0) {
        setSelectedDocument(response.data[0]);
        setShowModal(true);
      } else {
        alert("ไม่พบข้อมูลเอกสาร");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      alert("เกิดข้อผิดพลาดในการดึงข้อมูลเอกสาร");
    }
  };
  const handleDownloadPDF = async (formsubmitID) => {
    let endpoint = "";

    // ตรวจสอบประเภทเอกสารจาก formsubmit_type หรือ name_gs10report
    if (selectedDocument.formsubmit_type === selectedDocument.name_gs10report) {
      endpoint = "Gs10report.php"; // URL สำหรับ GS10
    } else if (
      selectedDocument.formsubmit_type === selectedDocument.name_gs11report
    ) {
      endpoint = "Gs11report.php"; // URL สำหรับ GS11
    } else {
      alert("ไม่พบประเภทเอกสารที่รองรับ");
      return;
    }

    // URL ของ Backend
    const url = `http://localhost/TestPHP-API2/backend/FPDF/${endpoint}?id=${formsubmitID}`;

    // เริ่มการดาวน์โหลด
    window.location.href = url;
  };

  const handleActionConfirm = async () => {
    if (currentAction) {
      try {
        const response = await axios.post(
          "http://localhost/TestPHP-API2/backend/action_handler.php",
          currentAction
        );
        alert(response.data.message);
        fetchDocuments();
        handleCloseModal();
      } catch (error) {
        console.error("Error during action:", error);
        alert("ไม่สามารถทำรายการได้ กรุณาลองใหม่อีกครั้ง");
      }
    }
  };
  const handleDownload = (formsubmitID) => {
    let filePath = "";

    // กำหนดเส้นทางไฟล์ตามประเภทเอกสารที่เลือกจาก selectedDocument
    if (selectedDocument.formsubmit_type === selectedDocument.name_gs10report) {
      filePath = selectedDocument.document_gs10report; // รับข้อมูลไฟล์จาก selectedDocument
      console.log("Formsubmit type matches with gs10 report name.");
    } else if (
      selectedDocument.formsubmit_type === selectedDocument.name_gs11report
    ) {
      filePath = selectedDocument.document_gs11report; // รับข้อมูลไฟล์จาก selectedDocument
      console.log("Formsubmit type matches with gs11 report name.");
    }

    // หากพบเส้นทางไฟล์ที่ถูกต้อง ให้ทำการดาวน์โหลด
    if (filePath) {
      window.location.href = `http://localhost/TestPHP-API2/backend/downloadFileDocument.php?id=${formsubmitID}&filePath=${filePath}`;
    } else {
      alert("Invalid file path.");
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/loginteacher");
    }
  }, [navigate]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        "http://localhost/TestPHP-API2/backend/fetch_documentFormSubmit.php"
      );
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert("Failed to load documents data. Please try again later.");
    }
  };

  const renderDocumentDetails = () => {
    if (!selectedDocument) return <p>ไม่พบข้อมูลประเภทเอกสาร</p>;

    // ข้อมูลการส่งเอกสาร (Card 1)
    const generalInfo = (
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>ข้อมูลการส่งเอกสาร</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>รหัสเอกสาร:</strong>{" "}
            {selectedDocument.formsubmit_id || "ไม่มีข้อมูล"}
          </div>
          <div className="mb-3">
            <strong>ประเภทเอกสาร:</strong>{" "}
            {selectedDocument.formsubmit_type || "ไม่มีข้อมูล"}
          </div>
          <div className="mb-3">
            <strong>รหัสนักศึกษา: </strong>
            {selectedDocument.idstd_student || "ไม่มีข้อมูล"}
            <span style={{ marginLeft: "20px" }}></span>
            <strong>ชื่อ-นามสกุล: </strong>
            {selectedDocument.name_student || "ไม่มีข้อมูล"}
          </div>
          <div className="mb-3">
            <label>
              <strong>แผนการเรียน:</strong>{" "}
              {selectedDocument.name_studyplan || "ไม่มีข้อมูล"}
            </label>
            <span style={{ marginLeft: "20px" }}></span>
            <label>
              <strong>สาขาวิชา:</strong>{" "}
              {selectedDocument.branch_student || "ไม่มีข้อมูล"}
            </label>
            <span style={{ marginLeft: "20px" }}></span>
            <label>
              <strong>อักษรย่อสาขาวิชา:</strong>{" "}
              {selectedDocument.abbreviate_student || "ไม่มีข้อมูล"}
            </label>
          </div>
          <div className="mb-3">
            <strong>ที่อยู่:</strong>{" "}
            {selectedDocument.address_student || "ไม่มีข้อมูล"}
          </div>
          <div className="mb-3">
            <label>
              <strong>อีเมล:</strong>{" "}
              {selectedDocument.email_student || "ไม่มีข้อมูล"}
            </label>
            <span style={{ marginLeft: "20px" }}></span>
            <label>
              <strong>เบอร์โทรศัพท์:</strong>{" "}
              {selectedDocument.tel_student || "ไม่มีข้อมูล"}
            </label>
          </div>
          <div className="mb-3">
            <strong>สถานะ:</strong>
            <span
              className={`badge ${
                selectedDocument.formsubmit_status ===
                "กำลังรอการพิจารณาจากอาจารย์ที่ปรึกษา"
                  ? "bg-warning text-dark"
                  : selectedDocument.formsubmit_status ===
                    "ได้รับการอนุมัติจากอาจารย์ที่ปรึกษา"
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {selectedDocument.formsubmit_status || "ไม่มีข้อมูล"}
            </span>
          </div>
          <div className="mb-3">
            <strong>วันที่ส่ง:</strong>{" "}
            {selectedDocument.formsubmit_at || "ไม่มีข้อมูล"}
          </div>
        </div>
      </div>
    );

    // รายละเอียดเอกสาร (Card 2)
    const renderGs10Data = selectedDocument.formsubmit_type ===
      selectedDocument.name_gs10report && (
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
              value={selectedDocument.projectType_gs10report || "ไม่มีข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ชื่อโครงการ (ภาษาไทย)</strong>
            </span>
            <input
              disabled
              type="text"
              className="form-control bg-white"
              value={selectedDocument.projectThai_gs10report || "ไม่มีข้อมูล"}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ชื่อโครงการ (ภาษาอังกฤษ)</strong>
            </span>
            <input
              disabled
              type="text"
              className="form-control bg-white"
              value={selectedDocument.projectEng_gs10report || "ไม่มีข้อมูล"}
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
              disabled
              className="form-control bg-white"
              value={selectedDocument.advisorType_gs10report || "ไม่มีข้อมูล"}
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
              disabled
              className="form-control bg-white"
              value={
                selectedDocument.advisorMainOld_gs10report || "ไม่มีข้อมูล"
              }
            />
            <span className="input-group-text bg-light text-dark">
              <strong>อาจารย์ที่ปรึกษาร่วม</strong>
            </span>
            <input
              type="text"
              disabled
              className="form-control bg-white"
              value={
                selectedDocument.advisorSecondOld_gs10report || "ไม่มีข้อมูล"
              }
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>รานชื่ออาจารย์ที่ปรึกษาชุดใหม่ มีรายชื่อดังนี้</strong>
            </label>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>อาจารย์ที่ปรึกษาหลัก</strong>
            </span>
            <input
              type="text"
              disabled
              className="form-control bg-white"
              value={
                selectedDocument.advisorMainNew_gs10report || "ไม่มีข้อมูล"
              }
            />
            <span className="input-group-text bg-light text-dark">
              <strong>อาจารย์ที่ปรึกษาร่วม</strong>
            </span>
            <input
              type="text"
              disabled
              className="form-control bg-white"
              value={
                selectedDocument.advisorSecondNew_gs10report || "ไม่มีข้อมูล"
              }
            />
          </div>
          <div className="input-group mt-3">
            <span className="input-group-text bg-light text-dark">
              <strong>เอกสารที่แนบมา (ถ้ามี)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={selectedDocument.document_gs10report || "ไม่มีข้อมูล"}
              disabled
            />
            <button
              onClick={handleDownload}
              className="btn btn-primary"
              disabled={
                selectedDocument.document_gs10report === "" ||
                selectedDocument.document_gs10report === "ไม่มีข้อมูล"
              }
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>

          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ :</strong>{" "}
            {selectedDocument.signName_gs10report || "ไม่มีข้อมูล"}
          </div>
          {selectedDocument.signature_gs10report && (
            <div className="input-group mt-3 d-flex justify-content-center">
              <img
                src={selectedDocument.signature_gs10report}
                alt="Signature"
                style={{ maxWidth: "300px", maxHeight: "200px" }}
              />
            </div>
          )}
        </div>
      </div>
    );

    const renderGs11Data = selectedDocument.formsubmit_type ===
      selectedDocument.name_gs11report && (
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-secondary text-white">
          <h5>รายละเอียดเอกสาร คคอ. บว. 11</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>ชื่อโครงการ (GS11):</strong>{" "}
            {selectedDocument.projectThai_gs11report || "ไม่มีข้อมูล"}
          </div>
          <div className="mb-3">
            <strong>รหัสโครงการ (GS11):</strong>{" "}
            {selectedDocument.id_gs11report || "ไม่มีข้อมูล"}
          </div>
        </div>
      </div>
    );

    return (
      <div>
        {generalInfo}
        {renderGs10Data}
        {renderGs11Data}
      </div>
    );
  };

  const renderCards = (documents) => {
    if (documents.length === 0) {
      return (
        <div className="text-center mt-4">
          <p>ไม่พบข้อมูล</p>
        </div>
      );
    }

    return (
      <Row xs={1} md={2} lg={3} className="g-4 px-3">
        {documents.map((formsubmit) => (
          <Col key={formsubmit.formsubmit_id}>
            <Card className="shadow-lg border-0">
              <Card.Header
                className="text-white"
                style={{ backgroundColor: "#7d3c98" }}
              >
                <strong>รหัสเอกสาร: {formsubmit.formsubmit_id}</strong>
              </Card.Header>
              <Card.Body>
                <Card.Title className="text-primary">
                  ชื่อเอกสาร: {formsubmit.formsubmit_type}
                </Card.Title>
                <Card.Text>
                  <strong>รหัสนักศึกษา:</strong> {formsubmit.idstd_student}
                  <br />
                  <strong>ชื่อ:</strong> {formsubmit.name_student}
                  <br />
                  <strong>วันเวลาที่ส่ง:</strong> {formsubmit.formsubmit_at}
                  <br />
                  <strong>สถานะ:</strong>
                  <span
                    className={`badge ${
                      formsubmit.formsubmit_status ===
                      "กำลังรอการพิจารณาจากอาจารย์ที่ปรึกษา"
                        ? "bg-warning text-dark"
                        : formsubmit.formsubmit_status ===
                          "ได้รับการอนุมัติจากอาจารย์ที่ปรึกษา"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {formsubmit.formsubmit_status}
                  </span>
                </Card.Text>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleViewForm(formsubmit.formsubmit_id)}
                >
                  ดูเอกสาร
                </Button>
                <ActionButtons
                  status={formsubmit.formsubmit_status}
                  formsubmitID={formsubmit.formsubmit_id}
                  handleShowModal={handleShowModal}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <NavbarTeacher />
      <div className="container mt-4">
        <h2 className="text-center mb-4">อนุมัติเอกสารคำร้อง</h2>
        {renderCards(documents)}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดเอกสาร</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderDocumentDetails()}</Modal.Body>
        <Modal.Footer>
          <div>
            <Button
              variant="success"
              onClick={() => handleDownloadPDF(selectedDocument.formsubmit_id)}
            >
              ดาวน์โหลดข้อมูลเป็นเอกสาร PDF
            </Button>
            <span style={{ marginLeft: "20px" }}></span>

            <Button variant="secondary" onClick={handleCloseModal}>
              ปิด
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const ActionButtons = ({ status, formsubmitID, handleShowModal }) => {
  const actions = [];

  if (status === "กำลังรอการพิจารณาจากอาจารย์ที่ปรึกษา") {
    actions.push(
      <Button
        variant="success"
        size="sm"
        className="me-2"
        onClick={() =>
          handleShowModal({
            type: "approval",
            formsubmitID,
            status: "ได้รับการอนุมัติ",
          })
        }
      >
        อนุมัติ
      </Button>
    );
    actions.push(
      <Button
        variant="danger"
        size="sm"
        onClick={() =>
          handleShowModal({
            type: "approval",
            formsubmitID,
            status: "ถูกปฏิเสธ",
          })
        }
      >
        ปฏิเสธ
      </Button>
    );
  }
  return <>{actions}</>;
};

export default TeacherPage;
