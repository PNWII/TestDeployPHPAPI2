import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavbarTeacher from "./Components/NavbarTeacher";
import axios from "axios";
import DocumentDetailsModal from "./Components/modals/DocumentDetailsModal";
import ApprovalModal from "./ComponentsDocument/TeacherApprovalReject/TeacherApprovalModal";
import RejectModal from "./ComponentsDocument/TeacherApprovalReject/TeacherRejectModal";
import { Card, Col, Row, Badge, Spinner } from "react-bootstrap";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
  const [approvalModal, setApprovalModal] = useState(false);
  const [rejectFormData, setRejectFormData] = useState({
    comment: "",
    name: "",
  });
  const [rejectSignature, setRejectSignature] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(18); // จำนวนเอกสารต่อหน้า

  const handleCloseDocModal = () => {
    setShowModal(false);
  };
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev,
      comment: "", // ล้างเฉพาะ comment แต่คง name ไว้
    }));
    setRejectFormData((prev) => ({
      ...prev,
      comment: "", // ล้างเฉพาะ comment แต่คง name ไว้
    }));
    setRejectSignature(null);
    sigCanvas.current.clear();
    setRejectModal(false);
    setApprovalModal(false);
    setSignature(null);
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
        console.log(data);
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
  const handleSignatureEnd = () => {
    const signatureData = sigCanvas.current.toDataURL(); // Get signature data as Base64
    setSignature(signatureData);
  };

  const handleClearSignature = () => {
    sigCanvas.current.clear();
    setSignature(null);
    setRejectSignature(null);
  };

  const handleApprove = (doc) => {
    setCurrentDoc({
      id: doc.id,
      name: doc.name,
    });
    setApprovalModal(true);
  };

  const handleSubmitApproval = async () => {
    if (!currentDoc || !formData.name || !formData.comment || !signature) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const teacherId = localStorage.getItem("teacherId");

    const payload = {
      id: currentDoc.id,
      type: currentDoc.name,
      action: "approve",
      name: formData.name.trim(),
      comment: formData.comment.trim(),
      signature: signature,
      teacherId: teacherId,
    };

    console.log("Payload:", payload); // ตรวจสอบว่า payload ส่งไปถูกต้อง

    try {
      const response = await fetch(
        "http://localhost/TestPHP-API2/backend/ApproveDocument-Teacher.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const text = await response.text();

      try {
        const result = JSON.parse(text);
        console.log("Parsed result:", result);

        if (result.status === "success") {
          alert("เอกสารได้รับการอนุมัติเรียบร้อยแล้ว");

          setDocuments((prevDocuments) =>
            prevDocuments.filter((doc) => doc.id !== currentDoc.id)
          );

          setFormData((prev) => ({
            ...prev,
            comment: "",
          }));
          setSignature(null);
          setApprovalModal(false);
        } else {
          alert("เกิดข้อผิดพลาด: " + result.message);
        }
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        alert("ไม่สามารถอ่านข้อมูลจากเซิร์ฟเวอร์ได้");
      }
    } catch (error) {
      console.error("Error approving document:", error);
      alert("เกิดข้อผิดพลาดในการอนุมัติเอกสาร");
    }
  };

  const handleReject = (doc) => {
    setCurrentDoc(doc);
    setRejectModal(true);
  };

  const handleRejectSignatureEnd = () => {
    const signatureData = sigCanvas.current.toDataURL(); // Get signature data as Base64
    setRejectSignature(signatureData);
  };

  const handleSubmitReject = async () => {
    if (
      !currentDoc ||
      !rejectFormData.name ||
      !rejectFormData.comment ||
      !rejectSignature
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const teacherId = localStorage.getItem("teacherId");

    const payload = {
      id: currentDoc.id,
      type: currentDoc.name,
      action: "reject",
      name: rejectFormData.name.trim(),
      comment: rejectFormData.comment.trim(),
      signature: rejectSignature,
      teacherId: teacherId,
    };
    console.log(payload);

    try {
      const response = await fetch(
        "http://localhost/TestPHP-API2/backend/RejectDocument-Teacher.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        alert("เอกสารถูกปฏิเสธเรียบร้อยแล้ว");
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc.id !== currentDoc.id)
        );
        setRejectModal(false);
        setRejectFormData((prev) => ({
          ...prev,
          comment: "", // ล้างเฉพาะ comment แต่คง name ไว้
        }));
        setRejectSignature(null);
        setRejectModal(false);
      } else {
        alert("เกิดข้อผิดพลาด: " + result.message);
      }
    } catch (error) {
      console.error("Error rejecting document:", error);
      alert("เกิดข้อผิดพลาดในการปฏิเสธเอกสาร");
    }
  };
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
        setShowModal(true);
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
    } else if (
      docName === "คคอ. บว. 12 แบบขอสอบหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      endpoint = "Gs12report.php";
    } else if (
      docName ===
      "คคอ. บว. 13 แบบขอส่งโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับแก้ไข"
    ) {
      endpoint = "Gs13report.php";
    } else if (
      docName ===
      "คคอ. บว. 14 แบบขอสอบความก้าวหน้าวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      endpoint = "Gs14report.php";
    } else if (
      docName ===
      "คคอ. บว. 15 คำร้องขอสอบป้องกันวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      endpoint = "Gs15report.php";
    } else if (docName === "คคอ. บว. 16 แบบขอส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์") {
      endpoint = "Gs16report.php";
    } else if (
      docName ===
      "คคอ. บว. 17 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 1 แบบวิชาการ"
    ) {
      endpoint = "Gs17report.php";
    } else if (docName === "คคอ. บว. 18 แบบขอสอบประมวลความรู้") {
      endpoint = "Gs18report.php";
    } else if (
      docName ===
      "คคอ. บว. 19 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 2 แบบวิชาชีพ"
    ) {
      endpoint = "Gs19report.php";
    } else if (
      docName === "คคอ. บว. 23 แบบขอส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์"
    ) {
      endpoint = "Gs23report.php";
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
      window.open(url, "_blank");
    } catch (error) {
      alert(error.message);
    }
  };
  const handleDownload = (docId, docName, fileKey) => {
    // console.log("Document Name:", docName);
    // console.log("Document ID:", docId);
    // console.log("File Key:", fileKey);
    let filePath = "";
    if (
      docName ===
      "คคอ. บว. 10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      filePath = currentDoc.gs10document;
    } else if (
      docName === "คคอ. บว. 11 แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      if (fileKey === "gs11docGs10rp") {
        filePath = currentDoc.gs11docGs10rp;
      } else if (fileKey === "gs11docProjectdetails") {
        filePath = currentDoc.gs11docProjectdetails;
      } else {
        alert("ไม่พบประเภทเอกสารที่รองรับ");
        return;
      }
    } else if (
      docName === "คคอ. บว. 12 แบบขอสอบหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      filePath = currentDoc.gs12docProjectDetails;
    } else if (
      docName ===
      "คคอ. บว. 13 แบบขอส่งโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับแก้ไข"
    ) {
      if (fileKey === "docProjectdetailsGs21rp") {
        filePath = currentDoc.docProjectdetailsGs21rp;
      } else if (fileKey === "gs13officeProjectApprovalDocument") {
        filePath = currentDoc.gs13officeProjectApprovalDocument;
      } else {
        alert("ไม่พบประเภทเอกสารที่รองรับ");
        return;
      }
    } else if (
      docName ===
      "คคอ. บว. 14 แบบขอสอบความก้าวหน้าวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      filePath = currentDoc.gs22rpGs14report;
    } else if (
      docName ===
      "คคอ. บว. 15 คำร้องขอสอบป้องกันวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
    ) {
      if (fileKey === "gs15docGs40rpGs41rp") {
        filePath = currentDoc.gs15docGs40rpGs41rp;
      } else if (fileKey === "gs15docGs50rp") {
        filePath = currentDoc.gs15docGs50rp;
      } else if (fileKey === "gs15docThesisExamCopy") {
        filePath = currentDoc.gs15docThesisExamCopy;
      } else {
        alert("ไม่พบประเภทเอกสารที่รองรับ");
        return;
      }
    } else if (docName === "คคอ. บว. 16 แบบขอส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์") {
      if (fileKey === "gf16officeThesisCertificateDoc") {
        filePath = currentDoc.gf16officeThesisCertificateDoc;
      } else if (fileKey === "gf16officeGraduationApprovalReport") {
        filePath = currentDoc.gf16officeGraduationApprovalReport;
      } else if (fileKey === "gs16ThesisDoc") {
        filePath = currentDoc.gs16ThesisDoc;
      } else if (fileKey === "gs16ThesisPDF") {
        filePath = currentDoc.gs16ThesisPDF;
      } else {
        alert("ไม่พบประเภทเอกสารที่รองรับ");
        return;
      }
    } else if (
      docName ===
      "คคอ. บว. 17 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 1 แบบวิชาการ"
    ) {
      filePath = currentDoc.gf17officeMasterPlanOneApprovalDoc;
    } else if (docName === "คคอ. บว. 18 แบบขอสอบประมวลความรู้") {
      filePath = currentDoc.gs18DocGs41rp;
    } else if (
      docName ===
      "คคอ. บว. 19 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 2 แบบวิชาชีพ"
    ) {
      filePath = currentDoc.gf19officeMasterPlanTwoApprovalDoc;
    } else if (
      docName === "คคอ. บว. 23 แบบขอส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์"
    ) {
      if (fileKey === "gs23IndependentStudyDoc") {
        filePath = currentDoc.gs23IndependentStudyDoc;
      } else if (fileKey === "gs23IndependentStudyPDF") {
        filePath = currentDoc.gs23IndependentStudyPDF;
      } else {
        alert("ไม่พบประเภทเอกสารที่รองรับ");
        return;
      }
    } else {
      alert("ไม่พบประเภทเอกสารที่รองรับ");
      return;
    }
    if (filePath) {
      window.location.href = `http://localhost/TestPHP-API2/backend/downloadFileDocument.php?id=${docId}&filePath=${filePath}`;
      // const downloadUrl = `http://localhost/TestPHP-API2/backend/downloadFileDocument.php?id=${docId}&filePath=${filePath}`;
      // console.log("Download URL:", downloadUrl);
      // window.location.href = downloadUrl;
    } else {
      alert("Invalid file path.");
    }
  };
  // คำนวณเอกสารที่จะแสดงในแต่ละหน้า
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  // ฟังก์ชันไปหน้าถัดไป
  const nextPage = () => {
    if (currentPage < Math.ceil(documents.length / documentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ฟังก์ชันไปหน้าก่อนหน้า
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const totalPages = Math.ceil(documents.length / documentsPerPage);

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
              {currentDocuments.map((doc, index) => (
                <Col key={`${doc.id}-${index}`}>
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
                            doc.statusGs ===
                            "ถูกปฏิเสธจากครูอาจารย์ที่ปรึกษาแล้ว"
                              ? "danger text-white"
                              : doc.status ===
                                "ได้รับการอนุมัติจากครูอาจารย์ที่ปรึกษาแล้ว"
                              ? "success text-white"
                              : doc.status === "รอการพิจารณาจากอาจารย์ที่ปรึกษา"
                              ? "warning"
                              : "warning"
                          }
                          text="dark"
                          className={
                            doc.statusGs ===
                            "ถูกปฏิเสธจากครูอาจารย์ที่ปรึกษาแล้ว"
                              ? "text-white"
                              : "text-dark"
                          }
                        >
                          {doc.statusGs ===
                          "ถูกปฏิเสธจากครูอาจารย์ที่ปรึกษาแล้ว"
                            ? "ถูกปฏิเสธจากครูอาจารย์ที่ปรึกษาแล้ว"
                            : doc.status || "รอการพิจารณาจากอาจารย์ที่ปรึกษา"}
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
                        <Button
                          size="sm"
                          variant="success"
                          className="me-2"
                          onClick={() => handleApprove(doc)}
                          disabled={
                            doc.statusGs ===
                              "ถูกปฏิเสธจากครูอาจารย์ที่ปรึกษาแล้ว" ||
                            doc.status ===
                              "ได้รับการอนุมัติจากครูอาจารย์ที่ปรึกษาแล้ว"
                          }
                        >
                          อนุมัติ
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleReject(doc)}
                          disabled={
                            doc.statusGs ===
                              "ถูกปฏิเสธจากครูอาจารย์ที่ปรึกษาแล้ว" ||
                            doc.status ===
                              "ได้รับการอนุมัติจากครูอาจารย์ที่ปรึกษาแล้ว"
                          }
                        >
                          ปฏิเสธ
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* แสดงหมายเลขหน้า */}
            <div
              style={{ padding: 30 }}
              className="d-flex justify-content-center mt-4"
            >
              <ButtonGroup className="align-items-center">
                {/* ปุ่มก่อนหน้า */}
                <Button
                  variant="outline-primary"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 d-flex align-items-center"
                >
                  <FaChevronLeft className="me-2" />
                  ก่อนหน้า
                </Button>

                {/* ข้อความแสดงหน้า */}
                <span className="mx-3">
                  {`หน้า ${currentPage} จาก ${totalPages}`}
                </span>

                {/* ปุ่มถัดไป */}
                <Button
                  variant="outline-primary"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 d-flex align-items-center"
                >
                  ถัดไป
                  <FaChevronRight className="ms-2" />
                </Button>
              </ButtonGroup>
            </div>
            <DocumentDetailsModal
              show={showModal}
              handleClose={handleCloseDocModal}
              currentDoc={currentDoc}
              handleDownload={handleDownload}
              handleDownloadPDF={handleDownloadPDF}
            />
            <ApprovalModal
              show={approvalModal}
              handleClose={handleCloseModal}
              formData={formData}
              setFormData={setFormData}
              handleSignatureEnd={handleSignatureEnd}
              handleClearSignature={handleClearSignature}
              handleSubmitApproval={handleSubmitApproval}
              signature={signature}
              sigCanvas={sigCanvas}
              currentDoc={currentDoc}
            />
            <RejectModal
              show={rejectModal}
              handleClose={handleCloseModal}
              rejectFormData={rejectFormData}
              setRejectFormData={setRejectFormData}
              handleRejectSignatureEnd={handleRejectSignatureEnd}
              handleClearSignature={handleClearSignature}
              handleSubmitReject={handleSubmitReject}
              rejectSignature={rejectSignature}
              sigCanvas={sigCanvas}
              currentDoc={currentDoc}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TeacherPage;
