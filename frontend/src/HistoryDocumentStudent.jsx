import NavbarStudent from "./Components/NavbarStudent";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import HistoryDocumentStudentEdit from "./ComponentsDocument/HistoryDocumentStudentEdit";
import Modal from "react-bootstrap/Modal";
import DocumentDetailsModal from "./Components/modals/DocumentDetailsModal";

function HistoryDocumentStudent() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false); // Control modal
  const [editingDocument, setEditingDocument] = useState(null); // เอกสารที่กำลังแก้ไข
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Control delete modal
  const [documentToDelete, setDocumentToDelete] = useState(null); // Document to delete
  const [showModal, setShowModal] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const handleCloseDocModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const idstdStudent = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    if (!isLoggedIn || !idstdStudent || role !== "นักเรียนนักศึกษา") {
      alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
      navigate("/");
    } else {
      fetchDocuments(idstdStudent);
    }
  }, [navigate]);

  const fetchDocuments = async (idstdStudent) => {
    try {
      const response = await axios.get(
        `http://localhost/TestPHP-API2/backend/HistoryDocumentStd.php?idstd_student=${idstdStudent}`
      );
      console.log("API Response:", response.data);

      if (
        response.data?.data &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        // มีเอกสาร
        const documentsWithDetails = response.data.data.map((doc) => {
          if (
            doc.documentStatus === "ถูกปฏิเสธจากประธานคณะกรรมการบริหารหลักสูตร"
          ) {
            if (
              doc.ccurrsignaStatus ===
              "ถูกปฏิเสธจากประธานคณะกรรมการบริหารหลักสูตรแล้ว"
            ) {
              doc.rejectionDescriptionName =
                doc.currSignName || "ไม่ระบุชื่อผู้ปฏิเสธ";
              doc.rejectionDescription =
                doc.currSignDescription || "ไม่มีรายละเอียด";
            } else if (
              doc.currSignGs15Status ===
              "ถูกปฏิเสธจากประธานคณะกรรมการบริหารหลักสูตรแล้ว"
            ) {
              doc.rejectionDescriptionName =
                doc.currSignGs15Name || "ไม่ระบุชื่อผู้ปฏิเสธ";
              doc.rejectionDescription =
                doc.currSignGs15Description || "ไม่มีรายละเอียด";
            }
          }

          if (doc.documentStatus === "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษา") {
            if (
              doc.gradOfficerSignStatus ===
              "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว"
            ) {
              doc.rejectionDescriptionName =
                doc.gradOfficerSignName || "ไม่ระบุชื่อผู้ปฏิเสธ";
              doc.rejectionDescription =
                doc.gradOfficerSignDescription || "ไม่มีรายละเอียด";
            } else if (
              doc.gradOfficerSignGs10Status ===
              "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว"
            ) {
              doc.rejectionDescriptionName =
                doc.gradOfficerSignGs10Name || "ไม่ระบุชื่อผู้ปฏิเสธ";
              doc.rejectionDescription =
                doc.gradOfficerSignGs10Description || "ไม่มีรายละเอียด";
            } else if (
              doc.gradOfficerSignGs12Status ===
              "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว"
            ) {
              doc.rejectionDescriptionName =
                doc.gradOfficerSignGs12Name || "ไม่ระบุชื่อผู้ปฏิเสธ";
              doc.rejectionDescription =
                doc.gradOfficerSignGs12Description || "ไม่มีรายละเอียด";
            } else if (
              doc.gradOfficerSignGs13Status ===
              "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว"
            ) {
              doc.rejectionDescriptionName =
                doc.gradOfficerSignGs13Name || "ไม่ระบุชื่อผู้ปฏิเสธ";
              doc.rejectionDescription =
                doc.gradOfficerSignGs13Description || "ไม่มีรายละเอียด";
            } else if (
              doc.gradOfficerSignGs16Status ===
              "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว"
            ) {
              doc.rejectionDescriptionName =
                doc.gradOfficerSignGs16Name || "ไม่ระบุชื่อผู้ปฏิเสธ";
              doc.rejectionDescription =
                doc.gradOfficerSignGs16Description || "ไม่มีรายละเอียด";
            } else if (
              doc.gradOfficerSignGs17Status ===
              "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว"
            ) {
              doc.rejectionDescriptionName =
                doc.gradOfficerSignGs17Name || "ไม่ระบุชื่อผู้ปฏิเสธ";
              doc.rejectionDescription =
                doc.gradOfficerSignGs17Description || "ไม่มีรายละเอียด";
            } else if (
              doc.gradOfficerSignGs19Status ===
              "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว"
            ) {
              doc.rejectionDescriptionName =
                doc.gradOfficerSignGs19Name || "ไม่ระบุชื่อผู้ปฏิเสธ";
              doc.rejectionDescription =
                doc.gradOfficerSignGs19Description || "ไม่มีรายละเอียด";
            } else if (
              doc.gradOfficerSignGs23Status ===
              "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว"
            ) {
              doc.rejectionDescriptionName =
                doc.gradOfficerSignGs23Name || "ไม่ระบุชื่อผู้ปฏิเสธ";
              doc.rejectionDescription =
                doc.gradOfficerSignGs23Description || "ไม่มีรายละเอียด";
            }
          }
          if (
            doc.documentStatus === "ถูกปฏิเสธจากรองคณบดีฝ่ายวิชาการและวิจัย" &&
            doc.vdAcrsignStatus ===
              "ถูกปฏิเสธจากรองคณบดีฝ่ายวิชาการและวิจัยแล้ว"
          ) {
            doc.rejectionDescriptionName =
              doc.vdAcrsignName || "ไม่ระบุชื่อผู้ปฏิเสธ";
            doc.rejectionDescription =
              doc.vdAcrsignDescription || "ไม่มีรายละเอียด";
          }
          if (
            doc.documentStatus === "ถูกปฏิเสธจากคณบดีคณะครุศาสตร์อุตสาหกรรม" &&
            doc.deanfiesignStatus ===
              "ถูกปฏิเสธจากคณบดีคณะครุศาสตร์อุตสาหกรรมแล้ว"
          ) {
            doc.rejectionDescriptionName =
              doc.deanfiesignName || "ไม่ระบุชื่อผู้ปฏิเสธ";
            doc.rejectionDescription =
              doc.deanfiesignDescription || "ไม่มีรายละเอียด";
          }
          return doc;
        });
        setDocuments(documentsWithDetails);
      } else {
        // ถ้าไม่มีข้อมูลใน response
        setDocuments([]);
        //  alert("ไม่มีข้อมูลเอกสารสำหรับรหัสนักเรียนนี้");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        // กรณีไม่พบข้อมูล
        console.warn("No data found:", error.response.data);
        setDocuments([]);
        //  alert("ไม่พบเอกสารสำหรับรหัสนักเรียนนี้");
      } else {
        console.error(
          "Error fetching documents:",
          error.response?.data || error.message
        );
        alert("ไม่สามารถโหลดข้อมูลได้ในขณะนี้");
      }
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
    console.log("Request Body:", { dataFormId: docId, documentType: docName });
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

  const deleteDocument = async () => {
    if (!documentToDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost/TestPHP-API2/backend/DeleteDocument.php?id=${documentToDelete.dataFormId}`
      );

      if (response.data.success) {
        //  alert("ลบเอกสารสำเร็จ");
        setDocuments(
          documents.filter(
            (doc) => doc.dataFormId !== documentToDelete.dataFormId
          )
        );
      } else {
        alert("ลบเอกสารไม่สำเร็จ: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("ไม่สามารถลบเอกสารได้ในขณะนี้");
    } finally {
      setShowDeleteModal(false);
    }
  };
  const handleEditSubmit = async () => {
    if (!editingDocument) return;

    // ตรวจสอบว่า documentType มีค่าและตรงกับประเภทเอกสารที่คาดหวัง
    if (!editingDocument.documentType) {
      alert("ประเภทเอกสารไม่ถูกต้อง");
      return;
    }

    console.log("ข้อมูลที่ส่งไปยังเซิร์ฟเวอร์:", editingDocument);

    try {
      const response = await axios.post(
        "http://localhost/TestPHP-API2/backend/EditDocument.php",
        {
          documentId: editingDocument.dataFormId,
          documentType: editingDocument.documentType,
          gs10projectType: editingDocument.gs10projectType,
          gs10ProjectThai: editingDocument.gs10ProjectThai,
          gs10ProjectEng: editingDocument.gs10ProjectEng,
          gs10advisorType: editingDocument.gs10advisorType,
          gs10ReportDate: editingDocument.gs10ReportDate,
          gs10advisorMainNew: editingDocument.gs10advisorMainNew,
          gs10advisorSecondNew: editingDocument.gs10advisorSecondNew,
          gs10advisorMainOld: editingDocument.gs10advisorMainOld,
          gs10advisorSecondOld: editingDocument.gs10advisorSecondOld,
          gs10document: editingDocument.gs10document,
          gs10gs10At: editingDocument.gs10At,
          gs11ProjectType: editingDocument.gs11ProjectType,
          gs11ProjectThai: editingDocument.gs11ProjectThai,
          gs11ProjectEng: editingDocument.gs11ProjectEng,
          gs11advisorMain: editingDocument.gs11advisorMain,
          gs11advisorSecond: editingDocument.gs11advisorSecond,
          gs11subjects: editingDocument.gs11subjects,
          gs11gpa: editingDocument.gs11gpa,
          gs11subjectsProject: editingDocument.gs11subjectsProject,
          gs11docGs10rp: editingDocument.gs11docGs10rp,
          gs11docProjectdetails: editingDocument.gs11docProjectdetails,
          gs11ReportDate: editingDocument.gs11ReportDate,
          gs11gs11At: editingDocument.gs11At,
          studentId: editingDocument.studentId,
          gs12ProjectType: editingDocument.gs12ProjectType,
          gs12ProjectThai: editingDocument.gs12ProjectThai,
          gs12ProjectEng: editingDocument.gs12ProjectEng,
          gs12advisorMain: editingDocument.gs12advisorMain,
          gs12advisorSecond: editingDocument.gs12advisorSecond,
          gs12examRequestDate: editingDocument.gs12examRequestDate,
          gs12examRequestTime: editingDocument.gs12examRequestTime,
          gs12examRequestRoom: editingDocument.gs12examRequestRoom,
          gs12examRequestFloor: editingDocument.gs12examRequestFloor,
          gs12examRequestBuilding: editingDocument.gs12examRequestBuilding,
          gs12docProjectdetailsGs20rp:
            editingDocument.gs12docProjectdetailsGs20rp,
          gs12ReportDate: editingDocument.gs12ReportDate,
          gs13ProjectType: editingDocument.gs13ProjectType,
          gs13ProjectThai: editingDocument.gs13ProjectThai,
          gs13ProjectEng: editingDocument.gs13ProjectEng,
          gs13advisorMain: editingDocument.gs13advisorMain,
          gs13advisorSecond: editingDocument.gs13advisorSecond,
          gs13revisionDateAdvisor: editingDocument.gs13revisionDateAdvisor,
          gs13gs13docProjectdetailsGs21rp:
            editingDocument.gs13gs13docProjectdetailsGs21rp,
          gs13ReportDate: editingDocument.gs13ReportDate,
          gs14ProjectType: editingDocument.gs14ProjectType,
          gs14ProjectThai: editingDocument.gs14ProjectThai,
          gs14ProjectEng: editingDocument.gs14ProjectEng,
          gs14advisorMain: editingDocument.gs14advisorMain,
          gs14advisorSecond: editingDocument.gs14advisorSecond,
          gs14projectApprovalDate: editingDocument.gs14projectApprovalDate,
          gs14progressExamRequestDate:
            editingDocument.gs14progressExamRequestDate,
          gs14progressExamRequestTime:
            editingDocument.gs14progressExamRequestTime,
          gs14progressExamRequestRoom:
            editingDocument.gs14progressExamRequestRoom,
          gs14progressExamRequestFloor:
            editingDocument.gs14progressExamRequestFloor,
          gs14progressExamRequestBuilding:
            editingDocument.gs14progressExamRequestBuilding,
          gs14docProjectdetailsGs22rp:
            editingDocument.gs14docProjectdetailsGs22rp,
          gs14ReportDate: editingDocument.gs14ReportDate,
          gs15ProjectType: editingDocument.gs15ProjectType,
          gs15ProjectThai: editingDocument.gs15ProjectThai,
          gs15ProjectEng: editingDocument.gs15ProjectEng,
          gs15advisorMain: editingDocument.gs15advisorMain,
          gs15advisorSecond: editingDocument.gs15advisorSecond,
          gs15projectApprovalDate: editingDocument.gs15projectApprovalDate,
          gs15projectProgressDate: editingDocument.gs15projectProgressDate,
          gs15defenseRequestDate: editingDocument.gs15defenseRequestDate,
          gs15defenseRequestTime: editingDocument.gs15defenseRequestTime,
          gs15defenseRequestRoom: editingDocument.gs15defenseRequestRoom,
          gs15defenseRequestFloor: editingDocument.gs15defenseRequestFloor,
          gs15defenseRequestBuilding:
            editingDocument.gs15defenseRequestBuilding,
          gs15courseCredits: editingDocument.gs15courseCredits,
          gs15cumulativeGPA: editingDocument.gs15cumulativeGPA,
          gs15thesisCredits: editingDocument.gs15thesisCredits,
          gs15thesisDefenseDoc: editingDocument.gs15thesisDefenseDoc,
          gs15docGs40rpGs41rp: editingDocument.gs15docGs40rpGs41rp,
          gs15docGs50rp: editingDocument.gs15docGs50rp,
          gs15docThesisExamCopy: editingDocument.gs15docThesisExamCopy,
          gs15ReportDate: editingDocument.gs15ReportDate,
          gs16ProjectThai: editingDocument.gs16ProjectThai,
          gs16ProjectEng: editingDocument.gs16ProjectEng,
          gs16ProjectDefenseDate: editingDocument.gs16ProjectDefenseDate,
          gs16ProjectDefenseResult: editingDocument.gs16ProjectDefenseResult,
          gs16ThesisAdvisor: editingDocument.gs16ThesisAdvisor,
          gs16ThesisDoc: editingDocument.gs16ThesisDoc,
          gs16ThesisPDF: editingDocument.gs16ThesisPDF,
          gs16ReportDate: editingDocument.gs16ReportDate,
          gs17ThesisAdvisor: editingDocument.gs17ThesisAdvisor,
          gs17SemesterAt: editingDocument.gs17SemesterAt,
          gs17AcademicYear: editingDocument.gs17AcademicYear,
          gs17CourseCredits: editingDocument.gs17CourseCredits,
          gs17CumulativeGPA: editingDocument.gs17CumulativeGPA,
          gs17ProjectDefenseDate: editingDocument.gs17ProjectDefenseDate,
          gs17AdditionalDetails: editingDocument.gs17AdditionalDetails,
          gs17DocCheck15: editingDocument.gs17DocCheck15,
          gs17ReportDate: editingDocument.gs17ReportDate,
          gs18ThesisAdvisor: editingDocument.gs18ThesisAdvisor,
          gs18SemesterAt: editingDocument.gs18SemesterAt,
          gs18AcademicYear: editingDocument.gs18AcademicYear,
          gs18ExamRoundProject: editingDocument.gs18ExamRoundProject,
          gs18CourseCredits: editingDocument.gs18CourseCredits,
          gs18CumulativeGPA: editingDocument.gs18CumulativeGPA,
          gs18DocGs41rp: editingDocument.gs18DocGs41rp,
          gs18ReportDate: editingDocument.gs18ReportDate,
          gs19ThesisAdvisor: editingDocument.gs19ThesisAdvisor,
          gs19SemesterAt: editingDocument.gs19SemesterAt,
          gs19AcademicYear: editingDocument.gs19AcademicYear,
          gs19CourseCredits: editingDocument.gs19CourseCredits,
          gs19CumulativeGPA: editingDocument.gs19CumulativeGPA,
          gs19ProjectKnowledgeExamDate:
            editingDocument.gs19ProjectKnowledgeExamDate,
          gs19ProjectDefenseDate: editingDocument.gs19ProjectDefenseDate,
          gs19AdditionalDetails: editingDocument.gs19AdditionalDetails,
          gs19ReportDate: editingDocument.gs19ReportDate,
          gs23ProjectThai: editingDocument.gs23ProjectThai,
          gs23ProjectEng: editingDocument.gs23ProjectEng,
          gs23ProjectDefenseDate: editingDocument.gs23ProjectDefenseDate,
          gs23ProjectDefenseResult: editingDocument.gs23ProjectDefenseResult,
          gs23IndependentStudyDoc: editingDocument.gs23IndependentStudyDoc,
          gs23IndependentStudyPDF: editingDocument.gs23IndependentStudyPDF,
          gs23IndependentStudyAdvisor:
            editingDocument.gs23IndependentStudyAdvisor,
          gs23ReportDate: editingDocument.gs23ReportDate,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data); // ตรวจสอบข้อมูลที่ได้รับกลับมาจาก API

      if (response.data.success) {
        alert("แก้ไขเอกสารสำเร็จ");
        setDocuments(
          documents.map((doc) =>
            doc.dataFormId === editingDocument.dataFormId
              ? editingDocument
              : doc
          )
        );

        setShowEditModal(false);
      } else {
        alert("แก้ไขเอกสารไม่สำเร็จ: " + response.data.message);
      }
    } catch (error) {
      console.error("Error editing document:", error);

      alert("ไม่สามารถแก้ไขเอกสารได้ในขณะนี้");
    }
    setShowEditModal(false);
  };

  const renderDocumentStatus = (status) => {
    switch (status) {
      case "ได้รับการอนุมัติจากคณบดีคณะครุศาสตร์อุตสาหกรรม":
        return <Badge bg="success">เอกสารได้รับการอนุมัติเรียบร้อย</Badge>;
      case "รอการพิจารณาจากอาจารย์ที่ปรึกษา":
        return <Badge bg="warning">อยู่ระหว่างการดำเนินการ</Badge>;
      case "ถูกปฏิเสธจากอาจารย์ที่ปรึกษา":
      case "ถูกปฏิเสธจากประธานคณะกรรมการบริหารหลักสูตร":
      case "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษา":
      case "ถูกปฏิเสธจากรองคณบดีฝ่ายวิชาการและวิจัย":
      case "ถูกปฏิเสธจากคณบดีคณะครุศาสตร์อุตสาหกรรม":
        return <Badge bg="danger">ถูกปฏิเสธ</Badge>;
      default:
        return <Badge bg="warning">อยู่ระหว่างการดำเนินการ</Badge>;
    }
  };

  const renderTableRows = (documents) => {
    if (!Array.isArray(documents) || documents.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="text-center">
            ไม่มีข้อมูล
          </td>
        </tr>
      );
    }

    return documents.map((doc) => (
      <tr key={doc.dataFormId}>
        <td className="text-center">{doc.dataFormId}</td>
        <td>{doc.documentType}</td>
        <td className="text-center">{doc.submissionDate}</td>
        <td>
          {doc.documentStatus}
          <br />
          {renderDocumentStatus(doc.documentStatus)}
        </td>
        <td className="text-center">
          {doc.rejectionDescription ? (
            <div className="text-danger mt-2">
              {doc.rejectionDescription} <br />
              <p>ผู้ปฏิเสธ: {doc.rejectionDescriptionName || "ไม่ระบุ"}</p>
            </div>
          ) : (
            <p className="mt-2">-</p>
          )}
        </td>
        <td>
          <div className="d-flex align-items-center justify-content-center">
            {doc.documentStatus === "รอการพิจารณาจากอาจารย์ที่ปรึกษา" &&
              doc.teacherSignId !== doc.dataFormId && (
                <>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setDocumentToDelete(doc);
                      setShowDeleteModal(true);
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    ลบ
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => {
                      setEditingDocument(doc);
                      setShowEditModal(true);
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    แก้ไข
                  </Button>
                </>
              )}

            {doc.documentStatus ===
              "ได้รับการอนุมัติจากคณบดีคณะครุศาสตร์อุตสาหกรรม" && (
              <Button
                variant="success"
                size="sm"
                style={{ fontSize: "14px", padding: "8px 6px" }}
                onClick={() =>
                  handleViewDocument(doc.dataFormId, doc.documentType)
                }
              >
                ดาวน์โหลดเอกสาร
              </Button>
            )}
            {(doc.documentStatus === "ถูกปฏิเสธจากอาจารย์ที่ปรึกษา" ||
              doc.documentStatus ===
                "ถูกปฏิเสธจากประธานคณะกรรมการบริหารหลักสูตร" ||
              doc.documentStatus === "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษา" ||
              doc.documentStatus ===
                "ถูกปฏิเสธจากรองคณบดีฝ่ายวิชาการและวิจัย" ||
              doc.documentStatus ===
                "ถูกปฏิเสธจากคณบดีคณะครุศาสตร์อุตสาหกรรม") && (
              <Button
                variant="danger"
                size="sm"
                href={
                  doc.documentType ===
                  "คคอ. บว. 23 แบบขอส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์"
                    ? "/gs23report"
                    : doc.documentType ===
                      "คคอ. บว. 10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
                    ? "/gs10report"
                    : doc.documentType ===
                      "คคอ. บว. 11 แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
                    ? "/gs11report"
                    : doc.documentType ===
                      "คคอ. บว. 12 แบบขอสอบหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
                    ? "/gs12report"
                    : doc.documentType ===
                      "คคอ. บว. 13 แบบขอส่งโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับแก้ไข"
                    ? "/gs13report"
                    : doc.documentType ===
                      "คคอ. บว. 14 แบบขอสอบความก้าวหน้าวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
                    ? "/gs14report"
                    : doc.documentType ===
                      "คคอ. บว. 15 คำร้องขอสอบป้องกันวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
                    ? "/gs15report"
                    : doc.documentType ===
                      "คคอ. บว. 16 แบบขอส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์"
                    ? "/gs16report"
                    : doc.documentType ===
                      "คคอ. บว. 17 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 1 แบบวิชาการ"
                    ? "/gs17report"
                    : doc.documentType === "คคอ. บว. 18 แบบขอสอบประมวลความรู้"
                    ? "/gs18report"
                    : doc.documentType ===
                      "คคอ. บว. 19 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 2 แบบวิชาชีพ"
                    ? "/gs19report"
                    : "/home"
                }
                style={{ marginRight: "10px" }}
              >
                ยื่นคำร้องใหม่
              </Button>
            )}

            {doc.documentStatus !==
              "ได้รับการอนุมัติจากคณบดีคณะครุศาสตร์อุตสาหกรรม" && (
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  handleViewDocument(doc.dataFormId, doc.documentType)
                }
              >
                ดูข้อมูล
              </Button>
            )}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <NavbarStudent />
      <div className="container mt-4">
        <h2 className="text-center mb-4">ติดตามสถานะการยื่นเอกสารคำร้อง</h2>
        <Table striped bordered hover responsive>
          <thead className="table-dark text-center">
            <tr>
              <th style={{ width: "5%" }}>รหัส</th>
              <th style={{ width: "20%" }}>ชื่อเอกสาร</th>
              <th style={{ width: "10%" }}>วันเวลาที่อนุมัติ</th>
              <th style={{ width: "20%" }}>สถานะ</th>
              <th style={{ width: "20%" }}>รายละเอียดเพิ่มเติม</th>
              <th style={{ width: "10%" }} className="text-center">
                ดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody>{renderTableRows(documents)}</tbody>
        </Table>
      </div>
      <DocumentDetailsModal
        show={showModal}
        handleClose={handleCloseDocModal}
        currentDoc={currentDoc}
        handleDownload={handleDownload}
        handleDownloadPDF={handleDownloadPDF}
      />

      <HistoryDocumentStudentEdit
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        editingDocument={editingDocument}
        setEditingDocument={setEditingDocument}
        handleEditSubmit={handleEditSubmit}
      />
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการลบเอกสาร</Modal.Title>
        </Modal.Header>
        <Modal.Body>คุณต้องการลบเอกสารนี้ใช่หรือไม่?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="danger" onClick={deleteDocument}>
            ลบ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HistoryDocumentStudent;
