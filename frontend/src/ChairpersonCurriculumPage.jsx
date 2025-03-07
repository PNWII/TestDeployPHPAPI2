import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavbarChairpersonCurriculum from "./Components/NavbarChairpersonCurriculum";
import DocumentDetailsModal from "./Components/modals/DocumentDetailsModal";
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
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import { ButtonGroup } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ChairpersonCurriculumPage() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ comment: "", name: "" });
  const [currentDoc, setCurrentDoc] = useState(null);
  const [signature, setSignature] = useState("");
  const sigCanvas = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");
    const teacherName = localStorage.getItem("teacherName");
    if (teacherName) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: teacherName,
      }));
      setRejectFormData((prevRejectFormData) => ({
        ...prevRejectFormData,
        name: teacherName,
      }));
    }

    if (!isLoggedIn || role !== "ประธานคณะกรรมการบริหารหลักสูตร") {
      alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
      navigate("/loginteacher");
    } else {
      fetch(
        "http://localhost/TestPHP-API2/backend/SendDocuments-ChairpersonCurriculumPage.php"
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.documentsToSend && data.documentsToSend.length > 0) {
            setDocuments(data.documentsToSend);
            // รีเฟรชข้อมูลหลังจากอนุมัติสำเร็จ
            const sortedDocuments = data.documentsToSend.sort(
              (a, b) => new Date(b.timeSubmit) - new Date(a.timeSubmit)
            );
            setDocuments(sortedDocuments);
          } else {
            console.log("ไม่มีเอกสารที่ต้องอนุมัติ");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching documents:", error);
          setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
          setIsLoading(false);
        });
    }
  }, [navigate]);

  const handleApprove = (doc) => {
    setCurrentDoc(doc);
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
      type: currentDoc.docName,
      action: "approve",
      name: formData.name?.trim(),
      comment: formData.comment?.trim(),
      signature: signature,
      teacherId: teacherId,
      examChair: formData.examChair?.trim(),
      examChairPosition: formData.examChairPosition?.trim(),
      examChairWorkplace: formData.examChairWorkplace?.trim(),
      examChairTel: formData.examChairTel?.trim(),
      examAdvisorMain: formData.examAdvisorMain?.trim(),
      examAdvisorMainPosition: formData.examAdvisorMainPosition?.trim(),
      examAdvisorMainWorkplace: formData.examAdvisorMainWorkplace?.trim(),
      examAdvisorMainTel: formData.examAdvisorMainTel?.trim(),
      examAdvisorSecond: formData.examAdvisorSecond?.trim(),
      examAdvisorSecondPosition: formData.examAdvisorSecondPosition?.trim(),
      examAdvisorSecondWorkplace: formData.examAdvisorSecondWorkplace?.trim(),
      examAdvisorSecondTel: formData.examAdvisorSecondTel?.trim(),
      examCurriculum: formData.examCurriculum?.trim(),
      examCurriculumPosition: formData.examCurriculumPosition?.trim(),
      examCurriculumWorkplace: formData.examCurriculumWorkplace?.trim(),
      examCurriculumTel: formData.examCurriculumTel?.trim(),
    };
    console.log(payload);
    try {
      const response = await fetch(
        "http://localhost/TestPHP-API2/backend/ApproveDocument-ChairpersonCurriculum.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const text = await response.text();

      try {
        const result = JSON.parse(text);
        if (result.status === "success") {
          alert("เอกสารได้รับการอนุมัติเรียบร้อยแล้ว");
          // รีเฟรชข้อมูลหลังจากอนุมัติสำเร็จ
          fetchDocuments();
          setFormData((prevFormData) => ({
            ...prevFormData,
            comment: "",
            examChair: "",
            examChairPosition: "",
            examChairWorkplace: "",
            examChairTel: "",
            examAdvisorMain: "",
            examAdvisorMainPosition: "",
            examAdvisorMainWorkplace: "",
            examAdvisorMainTel: "",
            examAdvisorSecond: "",
            examAdvisorSecondPosition: "",
            examAdvisorSecondWorkplace: "",
            examAdvisorSecondTel: "",
            examCurriculum: "",
            examCurriculumPosition: "",
            examCurriculumWorkplace: "",
            examCurriculumTel: "",
          }));
          setApprovalModal(false);
          setSignature(null);
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

  const fetchDocuments = () => {
    fetch(
      "http://localhost/TestPHP-API2/backend/SendDocuments-ChairpersonCurriculumPage.php"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.documentsToSend && data.documentsToSend.length > 0) {
          setDocuments(data.documentsToSend);
        } else {
          console.log("ไม่มีเอกสารที่ต้องอนุมัติ");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
        setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
        setIsLoading(false);
      });
  };

  const handleSignatureEnd = () => {
    setSignature(sigCanvas.current.toDataURL());
  };

  const handleClearSignature = () => {
    sigCanvas.current.clear();
    setSignature(null);
    setRejectSignature(null);
  };

  const handleReject = (doc) => {
    setCurrentDoc(doc);
    setRejectModal(true);
  };

  const handleRejectSignatureEnd = () => {
    const signatureData = sigCanvas.current.toDataURL();
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
      type: currentDoc.docName,
      action: "reject",
      name: rejectFormData.name.trim(),
      comment: rejectFormData.comment.trim(),
      signature: rejectSignature,
      teacherId,
    };

    try {
      const response = await fetch(
        "http://localhost/TestPHP-API2/backend/RejectDocument-ChairpersonCurriculum.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      console.log(payload);
      const result = await response.json();
      if (result.status === "success") {
        alert("เอกสารถูกปฏิเสธเรียบร้อยแล้ว");
        fetchDocuments();
        setRejectFormData((prevRejectFormData) => ({
          ...prevRejectFormData,
          comment: "", // ลบเฉพาะ comment แต่คง name ไว้
        }));
        setRejectSignature(null);
        setRejectModal(false);
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc.id !== currentDoc.id)
        );
        setRejectModal(false);
      } else {
        alert("เกิดข้อผิดพลาด: " + result.message);
      }
    } catch (error) {
      console.error("Error rejecting document:", error);
      alert("เกิดข้อผิดพลาดในการปฏิเสธเอกสาร");
    }
  };

  const handleCloseModal = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      comment: "",
      examChair: "",
      examChairPosition: "",
      examChairWorkplace: "",
      examChairTel: "",
      examAdvisorMain: "",
      examAdvisorMainPosition: "",
      examAdvisorMainWorkplace: "",
      examAdvisorMainTel: "",
      examAdvisorSecond: "",
      examAdvisorSecondPosition: "",
      examAdvisorSecondWorkplace: "",
      examAdvisorSecondTel: "",
      examCurriculum: "",
      examCurriculumPosition: "",
      examCurriculumWorkplace: "",
      examCurriculumTel: "",
    }));
    setRejectFormData((prevRejectFormData) => ({
      ...prevRejectFormData,
      comment: "", // ลบเฉพาะ comment แต่คง name ไว้
    }));
    setRejectSignature(null); // ลบลายมือชื่อ
    sigCanvas.current.clear(); // ล้างข้อมูลใน SignatureCanvas
    setRejectModal(false);
    setApprovalModal(false);
    setSignature(null);
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
      <NavbarChairpersonCurriculum />
      <div className="container mt-4">
        <h2 className="text-center mb-4">อนุมัติเอกสารคำร้อง</h2>

        {isLoading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">กำลังโหลด...</span>
            </Spinner>
            <p>กำลังโหลดข้อมูล...</p>
          </div>
        ) : error ? (
          <div className="text-center mt-4">
            <p style={{ color: "red" }}>{error}</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center mt-4">
            <p>ไม่พบข้อมูล</p>
          </div>
        ) : (
          <Row xs={1} md={1} lg={2} className="g-4 custom-card-row">
            {currentDocuments.map((doc, index) => (
              //  <Col key={doc.id}>
              <Col key={`${doc.id}-${index}`}>
                <Card className="shadow-lg border-0 custom-card">
                  <Card.Header
                    className="text-white"
                    style={{ backgroundColor: "#7d3c98" }}
                  >
                    <strong>รหัสเอกสาร: {doc.id}</strong>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-primary">
                      <strong>ชื่อเอกสาร: {doc.docName}</strong>
                    </Card.Title>
                    <Card.Text>
                      <strong>รหัสนักศึกษา:</strong> {doc.idStudent}
                      <br />
                      <strong>ชื่อ:</strong> {doc.nameStudent}
                      <br />
                      <strong>วันเวลาที่ส่ง:</strong> {doc.timeSubmit}
                      <br />
                      <strong>สถานะ:</strong>{" "}
                      <Badge
                        bg={
                          doc.status ===
                          "ได้รับการอนุมัติจากประธานคณะกรรมการบริหารหลักสูตรแล้ว"
                            ? "success text-white"
                            : doc.status ===
                              "รอการพิจารณาจากประธานคณะกรรมการบริหารหลักสูตร"
                            ? "warning"
                            : doc.status ===
                              "ถูกปฏิเสธจากประธานคณะกรรมการบริหารหลักสูตรแล้ว"
                            ? "danger text-white"
                            : "warning"
                        }
                        text="dark"
                        className="text-dark"
                      >
                        {doc.status ||
                          "รอการพิจารณาจากประธานคณะกรรมการบริหารหลักสูตร"}
                      </Badge>
                    </Card.Text>
                    <div className="me-auto">
                      <Button
                        size="sm"
                        variant="primary"
                        className="me-2"
                        onClick={() => handleViewDocument(doc.id, doc.docName)}
                      >
                        ดูเอกสาร
                      </Button>
                      <Button
                        size="sm"
                        variant="success"
                        className="me-2"
                        onClick={() => handleApprove(doc)}
                        disabled={
                          doc.status ===
                            "ได้รับการอนุมัติจากประธานคณะกรรมการบริหารหลักสูตรแล้ว" ||
                          doc.status ===
                            "ถูกปฏิเสธจากประธานคณะกรรมการบริหารหลักสูตรแล้ว"
                        }
                      >
                        อนุมัติ
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleReject(doc)}
                        disabled={
                          doc.status ===
                            "ได้รับการอนุมัติจากประธานคณะกรรมการบริหารหลักสูตรแล้ว" ||
                          doc.status ===
                            "ถูกปฏิเสธจากประธานคณะกรรมการบริหารหลักสูตรแล้ว"
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
        )}
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
        {currentDoc && rejectModal && (
          <Modal show={rejectModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>ปฏิเสธเอกสาร: {currentDoc.docName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formRejectName">
                  <Form.Label>ลงชื่อ-นามสกุล</Form.Label>
                  <Form.Control
                    type="text"
                    value={rejectFormData.name || ""}
                    onChange={(e) =>
                      setRejectFormData({
                        ...rejectFormData,
                        name: e.target.value,
                      })
                    }
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>ความคิดเห็นเพิ่มเติม</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="comment"
                    value={rejectFormData.comment || ""}
                    onChange={(e) =>
                      setRejectFormData({
                        ...rejectFormData,
                        comment: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>ลงลายมือชื่อ</Form.Label>
                  <SignatureCanvas
                    ref={sigCanvas}
                    onEnd={handleRejectSignatureEnd} // เรียกเมื่อผู้ใช้เซ็นเสร็จ
                    penColor="black"
                    canvasProps={{
                      width: 455,
                      height: 150,
                      className: "signature-canvas",
                    }}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button variant="secondary" onClick={handleClearSignature}>
                    ลบลายมือชื่อ
                  </Button>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                ปิด
              </Button>
              <Button
                variant="danger"
                disabled={
                  !rejectSignature ||
                  !rejectFormData.name ||
                  !rejectFormData.comment
                }
                onClick={handleSubmitReject} // Call handleSubmitReject when button is clicked
              >
                ปฏิเสธ
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {currentDoc && (
          <>
            {currentDoc.docName ===
            "คคอ. บว. 15 คำร้องขอสอบป้องกันวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ" ? (
              <Modal
                show={approvalModal}
                onHide={handleCloseModal}
                centered
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>อนุมัติเอกสาร: {currentDoc.docName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>ลงชื่อ-นามสกุล</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        ได้พิจารณาคุณสมบัติแล้ว เห็นสมควรอนุมัติให้สอบป้องกัน
                        โครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
                        พร้อมนี้ขอเสนอชื่อคณะกรรมการสอบป้องกัน ดังนี้ <br />
                        1. ประธานกรรมการสอบ{" "}
                        <span className="text-danger">
                          **ต้องไม่ใช่อาจารย์ที่ปรึกษาหลักหรืออาจารย์ที่ปรึกษาร่วม
                        </span>
                      </Form.Label>
                      <Row>
                        <Col md={6}>
                          <Form.Label>ชื่อ-นามสกุล ประธานกรรมการสอบ</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examChair || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examChair: e.target.value,
                              })
                            }
                          />
                        </Col>

                        {/* ฟิลด์ "ตำแหน่ง (บริหาร/วิชาการ)" */}
                        <Col md={6}>
                          <Form.Label>
                            ตำแหน่ง (บริหาร/วิชาการ) ประธานกรรมการสอบ
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examChairPosition || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examChairPosition: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col md={6}>
                          <Form.Label>
                            สถานที่ทำงาน ประธานกรรมการสอบ{" "}
                            <span className="text-danger">
                              **ระบุที่อยู่ให้ครบ
                            </span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examChairWorkplace || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examChairWorkplace: e.target.value,
                              })
                            }
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Label>
                            เบอร์โทรศัพท์ ประธานกรรมการสอบ
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examChairTel || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examChairTel: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        2. กรรมการสอบ (อาจารย์ที่ปรึกษาหลัก)
                      </Form.Label>
                      <Row>
                        <Col md={6}>
                          <Form.Label>
                            ชื่อ-นามสกุล อาจารย์ที่ปรึกษาหลัก
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examAdvisorMain || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examAdvisorMain: e.target.value,
                              })
                            }
                          />
                        </Col>

                        {/* ฟิลด์ "ตำแหน่ง (บริหาร/วิชาการ)" */}
                        <Col md={6}>
                          <Form.Label>
                            ตำแหน่ง (บริหาร/วิชาการ) อาจารย์ที่ปรึกษาหลัก
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examAdvisorMainPosition || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examAdvisorMainPosition: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col md={6}>
                          <Form.Label>
                            สถานที่ทำงาน อาจารย์ที่ปรึกษาหลัก{" "}
                            <span className="text-danger">
                              **ระบุที่อยู่ให้ครบ
                            </span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examAdvisorMainWorkplace || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examAdvisorMainWorkplace: e.target.value,
                              })
                            }
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Label>
                            เบอร์โทรศัพท์ อาจารย์ที่ปรึกษาหลัก
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examAdvisorMainTel || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examAdvisorMainTel: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        3. กรรมการสอบ (อาจารย์ที่ปรึกษาร่วม)
                      </Form.Label>
                      <Row>
                        <Col md={6}>
                          <Form.Label>
                            ชื่อ-นามสกุล อาจารย์ที่ปรึกษาร่วม
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examAdvisorSecond || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examAdvisorSecond: e.target.value,
                              })
                            }
                          />
                        </Col>

                        {/* ฟิลด์ "ตำแหน่ง (บริหาร/วิชาการ)" */}
                        <Col md={6}>
                          <Form.Label>
                            ตำแหน่ง (บริหาร/วิชาการ) อาจารย์ที่ปรึกษาร่วม
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examAdvisorSecondPosition || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examAdvisorSecondPosition: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col md={6}>
                          <Form.Label>
                            สถานที่ทำงาน อาจารย์ที่ปรึกษาร่วม{" "}
                            <span className="text-danger">
                              **ระบุที่อยู่ให้ครบ
                            </span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examAdvisorSecondWorkplace || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examAdvisorSecondWorkplace: e.target.value,
                              })
                            }
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Label>
                            เบอร์โทรศัพท์ อาจารย์ที่ปรึกษาร่วม
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examAdvisorSecondTel || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examAdvisorSecondTel: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        4. กรรมการสอบ (อาจารย์กรรมการประจำหลักสูตร)
                      </Form.Label>
                      <Row>
                        <Col md={6}>
                          <Form.Label>
                            ชื่อ-นามสกุล อาจารย์ประจำหลักสูตร
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examCurriculum || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examCurriculum: e.target.value,
                              })
                            }
                          />
                        </Col>

                        {/* ฟิลด์ "ตำแหน่ง (บริหาร/วิชาการ)" */}
                        <Col md={6}>
                          <Form.Label>
                            ตำแหน่ง (บริหาร/วิชาการ) อาจารย์ประจำหลักสูตร
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examCurriculumPosition || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examCurriculumPosition: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col>
                          <Form.Label>
                            สถานที่ทำงาน อาจารย์ประจำหลักสูตร{" "}
                            <span className="text-danger">
                              **ระบุที่อยู่ให้ครบ
                            </span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examCurriculumWorkplace || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examCurriculumWorkplace: e.target.value,
                              })
                            }
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Label>
                            เบอร์โทรศัพท์ อาจารย์ประจำหลักสูตร
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.examCurriculumTel || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examCurriculumTel: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>ความคิดเห็นเพิ่มเติม</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.comment}
                        onChange={(e) =>
                          setFormData({ ...formData, comment: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 text-center">
                      <Form.Label>ลายมือชื่อ</Form.Label>
                      <div className="d-flex justify-content-center">
                        <SignatureCanvas
                          ref={sigCanvas}
                          onEnd={handleSignatureEnd}
                          penColor="black"
                          canvasProps={{
                            width: 455,
                            height: 150,
                            className: "signature-canvas border",
                          }}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <Button
                          variant="secondary"
                          className="mt-2"
                          onClick={handleClearSignature}
                        >
                          ลบลายเซ็น
                        </Button>
                      </div>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    ปิด
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleSubmitApproval}
                    disabled={
                      !signature ||
                      !formData.name ||
                      !formData.comment ||
                      !formData.examChair ||
                      !formData.examChairPosition ||
                      !formData.examChairWorkplace ||
                      !formData.examChairTel ||
                      !formData.examAdvisorMain ||
                      !formData.examAdvisorMainPosition ||
                      !formData.examAdvisorMainWorkplace ||
                      !formData.examAdvisorMainTel ||
                      !formData.examAdvisorSecond ||
                      !formData.examAdvisorSecondPosition ||
                      !formData.examAdvisorSecondWorkplace ||
                      !formData.examAdvisorSecondTel ||
                      !formData.examCurriculum ||
                      !formData.examCurriculumPosition ||
                      !formData.examCurriculumWorkplace ||
                      !formData.examCurriculumTel
                    }
                  >
                    อนุมัติ
                  </Button>
                </Modal.Footer>
              </Modal>
            ) : (
              <Modal show={approvalModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                  <Modal.Title>อนุมัติเอกสาร: {currentDoc.docName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>ลงชื่อ-นามสกุล</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>ความคิดเห็นเพิ่มเติม</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.comment}
                        onChange={(e) =>
                          setFormData({ ...formData, comment: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>ลายมือชื่อ</Form.Label>
                      <SignatureCanvas
                        ref={sigCanvas}
                        onEnd={handleSignatureEnd}
                        penColor="black"
                        canvasProps={{
                          width: 455,
                          height: 150,
                          className: "signature-canvas",
                        }}
                      />
                      <div className="d-flex justify-content-center">
                        <Button
                          variant="secondary"
                          className="mt-2"
                          onClick={handleClearSignature}
                        >
                          ลบลายเซ็น
                        </Button>
                      </div>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    ปิด
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleSubmitApproval}
                    disabled={!signature || !formData.name || !formData.comment}
                  >
                    อนุมัติ
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </>
        )}
        <DocumentDetailsModal
          show={showModal}
          handleClose={handleCloseDocModal}
          currentDoc={currentDoc}
          handleDownload={handleDownload}
          handleDownloadPDF={handleDownloadPDF}
        />
      </div>
    </>
  );
}

export default ChairpersonCurriculumPage;
