import NavbarStudent from "../Components/NavbarStudent";
import "./Gsreport.css";
import SignatureCanvas from "react-signature-canvas";
import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import { HiQuestionMarkCircle } from "react-icons/hi";
import axios from "axios";

function Gs18report() {
  const [signature, setSignature] = useState(null);
  const sigCanvas = useRef(null);
  const [nameStudent, setNameStudent] = useState("");
  const [prefixStudent, setPrefixStudent] = useState("");
  const [idstdStudent, setIdstdStudent] = useState("");
  const [studyplanStudent, setStudyplanStudent] = useState("");
  const [majorStudent, setMajorStudent] = useState("");
  const [branchStudent, setBranchStudent] = useState("");
  const [abbreviateStudent, setAbbreviateStudent] = useState("");
  const [addressStudent, setAddressStudent] = useState("");
  const [emailStudent, setEmailStudent] = useState("");
  const [telStudent, setTelStudent] = useState("");
  const [datepicker, setDatepicker] = useState("");
  const [advisors, setAdvisors] = useState([]);
  const [semesterAt, setSemesterAt] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [examRoundProject, setExamRoundProject] = useState("");
  const [courseCredits, setCourseCredits] = useState("");
  const [cumulativeGPA, setCumulativeGPA] = useState("");
  const [docGs41rp, setDocGs41rp] = useState(null);
  const [thesisAdvisor, setThesisAdvisor] = useState("");
  const [signName, setsingName] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Fetch Advisors
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

  // Clear signature
  const clearSignature = () => sigCanvas.current.clear();

  // Handle form reset
  const handleReset = () => {
    setSignature(null);
    setDatepicker("");
    setSemesterAt("");
    setAcademicYear("");
    setExamRoundProject("");
    setCourseCredits("");
    setCumulativeGPA("");
    setDocGs41rp(null);
    setThesisAdvisor("");
    setsingName("");
    document.querySelector("form").reset();
  };

  // Save signature to state
  const saveSignature = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setSignature(dataURL);
  };

  // Fetch student data
  useEffect(() => {
    const userIDStudent = localStorage.getItem("id");
    if (!userIDStudent) {
      console.error("ID is missing from localStorage.");
      return;
    }

    fetch("http://localhost/TestPHP-API2/backend/get_student.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userIDStudent }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setNameStudent(data.data.name_student);
          setPrefixStudent(data.data.prefix_student);
          setIdstdStudent(data.data.idstd_student);
          setStudyplanStudent(data.data.name_studyplan);
          setMajorStudent(data.data.major_student);
          setBranchStudent(data.data.branch_student);
          setAbbreviateStudent(data.data.abbreviate_student);
          setAddressStudent(data.data.address_student);
          setEmailStudent(data.data.email_student);
          setTelStudent(data.data.tel_student);
        } else {
          console.error("Error in data:", data.message);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userIDStudent = localStorage.getItem("id");

    // ตรวจสอบว่ามี ID นักศึกษาหรือไม่
    if (!userIDStudent) {
      alert("ไม่พบ ID นักศึกษาในระบบ");
      return;
    }

    // ตรวจสอบความถูกต้องของฟอร์มและลายเซ็น
    const form = e.target;
    if (!signature || !form.checkValidity()) {
      form.classList.add("was-validated"); // Bootstrap validation styling
      setFormValid(false); // ฟอร์มไม่สมบูรณ์
      setShowMessageModal(true); // แสดงข้อความแจ้งเตือน
      return;
    }

    // แสดง Confirm Modal เพื่อยืนยันก่อนส่งข้อมูล
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmModal(false);

    const userIDStudent = localStorage.getItem("id");
    if (!userIDStudent) {
      alert("ไม่พบ ID นักศึกษาในระบบ");
      return;
    }

    const formData = new FormData();
    formData.append("idstd_student", userIDStudent);

    // ตรวจสอบไฟล์ก่อนเพิ่มใน FormData
    let filePaths = [];
    if (docGs41rp) {
      formData.append("files[]", docGs41rp);
      filePaths.push(docGs41rp.name);
    } else {
      console.warn("docGs41rp is missing");
    }

    // ตรวจสอบว่ามีไฟล์อย่างน้อย 1 ไฟล์หรือไม่
    if (filePaths.length === 0) {
      alert("กรุณาเลือกไฟล์ก่อนส่ง");
      return;
    }

    console.log("File Names to be uploaded:", filePaths);

    try {
      // อัปโหลดไฟล์ไปยัง backend
      const uploadResponse = await axios.post(
        "http://localhost/TestPHP-API2/backend/uploadFile11.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Upload Response:", uploadResponse.data);

      if (
        uploadResponse.data.success &&
        Array.isArray(uploadResponse.data.uploadedFiles)
      ) {
        const uploadedFiles = uploadResponse.data.uploadedFiles;

        // ตรวจสอบว่าจำนวนไฟล์ที่อัปโหลดตรงกับที่ส่งไปหรือไม่
        if (uploadedFiles.length >= 1) {
          setDocGs41rp(uploadedFiles[0]);
        } else {
          alert("เกิดข้อผิดพลาด: ไม่สามารถดึงข้อมูลไฟล์ที่อัปโหลดได้");
          return;
        }

        console.log("Uploaded Files from backend:", uploadedFiles);

        // ส่งข้อมูลไฟล์ที่อัปโหลดไปยัง API อื่น
        const requestData = {
          idstd_student: userIDStudent,
          date_gs18report: datepicker,
          signature_gs18report: signature,
          signName_gs18report: signName,
          thesisAdvisor_gs18report: thesisAdvisor,
          semesterAt_gs18report: semesterAt,
          academicYear_gs18report: academicYear,
          examRoundProject_gs18report: examRoundProject,
          courseCredits_gs18report: courseCredits,
          cumulativeGPA_gs18report: cumulativeGPA,
          docGs41rp_gs18report: uploadedFiles[0], // Path ของไฟล์
        };

        console.log("Request Data for Submission:", requestData);

        const response = await fetch(
          "http://localhost/TestPHP-API2/backend/submit_gs18report.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        // Get the raw response text first
        const responseText = await response.text();

        // Now parse it as JSON
        let responseData;
        try {
          responseData = JSON.parse(responseText);
          console.log("Response from submit_gs18report:", responseData);
          setFormValid(true); // แสดงสถานะสำเร็จ
          setShowMessageModal(true); // เปิด modal
        } catch (error) {
          console.error("Invalid JSON response:", responseText);
          alert("เกิดข้อผิดพลาดจากเซิร์ฟเวอร์: " + responseText);
        }
      } else {
        console.error("Invalid file upload response:", uploadResponse.data);
        alert("เกิดข้อผิดพลาดในการอัปโหลดไฟล์");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert(`เกิดข้อผิดพลาดในการอัปโหลดไฟล์: ${error.message}`);
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmModal(false);
  };
  const currentYear = new Date().getFullYear() + 543; // แปลงเป็นพุทธศักราช
  const years = Array.from({ length: 8 }, (_, i) => currentYear - 4 + i); // 4 ปีย้อนหลัง + ปีปัจจุบัน + 3 ปีข้างหน้า

  return (
    <>
      <NavbarStudent />
      <div className="container-gsReport">
        <h3 style={{ margin: 40 }}>คคอ. บว. 18 แบบขอสอบประมวลความรู้</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group mb-3 d-flex align-items-center">
            <label className="input-group-text mr-2">เลือกวันที่</label>
            <input
              placeholder="เลือกวันที่"
              type="date"
              className="form-control"
              id="datepicker"
              name="datepicker"
              value={datepicker}
              onChange={(e) => setDatepicker(e.target.value)}
              required
              style={{ width: "150px" }}
            />
          </div>
          <div className="form-group">
            <div className="input-group mb-3">
              <label htmlFor="nameStudent" className="input-group-text">
                ข้าพเจ้า ({prefixStudent})
              </label>
              <input
                type="text"
                defaultValue={nameStudent}
                name="nameStudent"
                className="form-control"
                placeholder="ชื่อ-นามสกุล"
                required
                disabled
              />

              <label htmlFor="idstdStudent" className="input-group-text">
                รหัสนักศึกษา
              </label>
              <input
                type="text"
                id="idstdStudent"
                name="idstdStudent"
                className="form-control"
                placeholder="รหัสนักศึกษา"
                defaultValue={idstdStudent}
                disabled
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group mb-3">
              <label htmlFor="studyplanStudent" className="input-group-text">
                นักศึกษาระดับปริญญาโท
              </label>
              <input
                type="text"
                id="studyplanStudent"
                name="studyplanStudent"
                className="form-control"
                placeholder="แผนการเรียน"
                defaultValue={studyplanStudent}
                disabled
                required
              />
              <label htmlFor="majorStudent" className="input-group-text">
                สาขาวิชา
              </label>
              <input
                type="text"
                id="majorStudent"
                name="majorStudent"
                className="form-control col-4"
                placeholder="ชื่อสาขาวิชา"
                defaultValue={majorStudent}
                disabled
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group mb-3">
              <label htmlFor="branchStudent" className="input-group-text">
                สาขา
              </label>
              <input
                type="text"
                id="branchStudent"
                name="branchStudent"
                className="form-control"
                placeholder="สาขา"
                defaultValue={branchStudent}
                disabled
                required
              />
              <label htmlFor="abbreviateStudent" className="input-group-text">
                อักษรย่อสาขา
              </label>
              <input
                type="text"
                id="abbreviateStudent"
                name="abbreviateStudent"
                className="form-control col-4"
                placeholder="ตัวอักษรย่อสาขาวิชา"
                defaultValue={abbreviateStudent}
                disabled
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group mb-3">
              <label htmlFor="addressStudent" className="input-group-text">
                ที่อยู่ที่ติดต่อได้โดยสะดวก
              </label>
              <input
                type="text"
                id="addressStudent"
                name="addressStudent"
                className="form-control"
                placeholder="ที่อยู่"
                defaultValue={addressStudent}
                disabled
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group mb-3">
              <label htmlFor="emailStudent" className="input-group-text">
                E-mail
              </label>
              <input
                type="text"
                id="emailStudent"
                name="emailStudent"
                className="form-control"
                placeholder="E-mail"
                defaultValue={emailStudent}
                disabled
                required
              />
              <label htmlFor="telStudent" className="input-group-text">
                หมายเลขโทรศัพท์ มือถือ
              </label>
              <input
                type="text"
                id="telStudent"
                name="telStudent"
                className="form-control col-4"
                placeholder="เบอร์โทรศัพท์"
                defaultValue={telStudent}
                disabled
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group mb-3">
              <label className="input-group-text">
                มีความประสงค์ขอสอบประมวลความรู้ในภาคการศึกษาที่
              </label>
              <input
                type="text"
                id="semesterAt"
                name="semesterAt"
                className="form-control"
                placeholder="ภาคการศึกษา"
                value={semesterAt}
                onChange={(e) => setSemesterAt(e.target.value)}
                required
              />
              <label className="input-group-text">ปีการศึกษา</label>
              <select
                id="academicYear"
                className="form-select"
                name="academicYear"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                required
              >
                <option value="">เลือกปีการศึกษา...</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <label className="input-group-text">ครั้งที่</label>
              <select
                id="examRoundProject"
                className="form-select"
                name="examRoundProject"
                value={examRoundProject}
                onChange={(e) => setExamRoundProject(e.target.value)}
                required
              >
                <option value={""}>เลือกรอบสอบ...</option>
                <option value={"ครั้งที่ 1"}>ครั้งที่ 1</option>
                <option value={"ครั้งที่ 2"}>ครั้งที่ 2</option>
              </select>
            </div>
          </div>
          <p style={{ textAlign: "left" }}>
            <b>
              ข้าพเจ้าได้ดำเนินการตามข้อบังคับฯ มหาวิทยาลัย
              ว่าด้วยการศึกษาระดับบัณฑิตศึกษา หมวดที่ 6
              การวัดผลและประเมินผลการศึกษา แล้วคือ
            </b>
          </p>
          <div className="form-group">
            <div className="input-group mb-3">
              <label className="input-group-text">
                1. ศึกษารายวิชาครบตามที่กำหนดในหลักสูตร (จำนวน)
              </label>
              <input
                type="text"
                id="courseCredits"
                name="courseCredits"
                className="form-control"
                placeholder="กรุณากรอกจำนวนหน่วยกิต"
                value={courseCredits}
                onChange={(e) => setCourseCredits(e.target.value)}
                required
              />
              <label className="input-group-text">หน่วยกิต </label>
              <label className="input-group-text">ได้คะแนนเฉลี่ยสะสม</label>
              <input
                type="text"
                id="cumulativeGPA"
                name="cumulativeGPA"
                className="form-control"
                placeholder="กรุณากรอกคะแนนเฉลี่ยสะสม"
                value={cumulativeGPA}
                onChange={(e) => setCumulativeGPA(e.target.value)}
                required
              />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text">
                2. แนบไฟล์แผนการเรียน แผน 2 แบบวิชาชีพ (คคอ. บว. 41) จำนวน 1 ชุด
              </label>
              <input
                type="file"
                className="form-control"
                name="docGs41rp"
                style={{ width: "10%" }}
                onChange={(e) => setDocGs41rp(e.target.files[0])} // เก็บไฟล์เดียว
                // ตรวจสอบไฟล์
                required
              />
            </div>
          </div>

          <div>
            <div className="input-group mb-3">
              <span className="input-group-text">ชื่ออาจารย์ที่ปรึกษา</span>
              <select
                className="form-select"
                value={thesisAdvisor}
                required
                onChange={(e) => setThesisAdvisor(e.target.value)}
              >
                <option value="">เลือกอาจารย์ที่ปรึกษา...</option>
                {Array.isArray(advisors) && advisors.length > 0 ? (
                  advisors.map((advisor) => (
                    <option
                      key={advisor.id_teacher}
                      value={advisor.name_teacher}
                    >
                      {advisor.name_teacher}
                    </option>
                  ))
                ) : (
                  <option disabled>ไม่มีข้อมูลอาจารย์ที่ปรึกษา</option> // Fallback message when no data
                )}
              </select>
            </div>
          </div>

          {/* ปุ่มเปิด Modal สำหรับเซ็นลายเซ็น */}
          <div className="form-group">
            <label>ลายเซ็น:</label>
            <div>
              {signature ? (
                <img
                  src={signature}
                  alt="ลายเซ็น"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                    width: "300px",
                  }}
                />
              ) : (
                <div>
                  <p style={{ fontStyle: "italic", color: "gray" }}>
                    ยังไม่ได้เซ็นลายเซ็น
                  </p>
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    กรุณาเซ็นลายเซ็นก่อนส่ง
                  </p>
                </div>
              )}
            </div>{" "}
            <Button
              variant="primary"
              onClick={() => setShowSignatureModal(true)}
              style={{ margin: "10px" }}
              required
            >
              เซ็นลายเซ็น
            </Button>
            <center>
              <div className="col-4">
                <div className="input-group">
                  <span className="input-group-text" id="addon-wrapping">
                    ลงชื่อ
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="ลงชื่อ-นามสกุล"
                    name="signName"
                    value={signName}
                    onChange={(e) => setsingName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </center>
          </div>

          <button
            type="reset"
            className="btn btn-secondary mt-5"
            style={{ margin: 10 }}
            onClick={handleReset}
          >
            รีเซ็ตฟอร์ม
          </button>
          <button
            type="submit"
            className="btn btn-success mt-5"
            style={{ margin: 10 }}
          >
            ส่งฟอร์ม
          </button>
        </form>
      </div>
      <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formValid ? (
              <>
                <FaCircleCheck
                  style={{ color: "green", fontSize: "30px", marginRight: 10 }}
                />
                บันทึกข้อมูลสำเร็จ
              </>
            ) : (
              <>
                <FaCircleXmark
                  style={{ color: "red", fontSize: "30px", marginRight: 10 }}
                />
                กรุณากรอกข้อมูลให้ครบถ้วน
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {formValid
              ? "ข้อมูลของคุณได้รับการบันทึกเรียบร้อยแล้ว"
              : signature
              ? "กรุณาตรวจสอบข้อมูลให้ครบถ้วน ก่อนที่จะส่งฟอร์ม"
              : "กรุณากรอกข้อมูลในฟอร์มให้ครบถ้วน"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              if (formValid) {
                window.location.href = "/historydocumentstudent";
              } else {
                setShowMessageModal(false);
              }
            }}
          >
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for signature */}
      <Modal
        show={showSignatureModal}
        onHide={() => setShowSignatureModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>เซ็นลายเซ็น</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 470,
              height: 200,
              className: "sigCanvas",
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSignatureModal(false)}
          >
            ยกเลิก
          </Button>
          <Button variant="danger" onClick={clearSignature}>
            ล้างลายเซ็น
          </Button>
          <Button variant="success" onClick={saveSignature}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <HiQuestionMarkCircle
              style={{ color: "black", fontSize: "30px", marginRight: 10 }}
            />
            ยืนยันการบันทึกข้อมูล
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>คุณต้องการบันทึกข้อมูลนี้ใช่หรือไม่?</h5>
          <span style={{ color: "red" }}>หมายเหตุ : </span>
          <p>
            1.
            นักศึกษาต้องศึกษารายวิชาครบตามที่กำหนดในหลักสูตรและได้คะแนนเฉลี่ยสะสมไม่ต่ำกว่า
            3.00 <br />
            2. นักศึกษาผู้ที่สอบไม่ผ่านครั้งที่ 1 มีสิทธิ์สอบแก้ตัวได้อีก 1
            ครั้ง ภายในเวลา 1 ปี แต่ไม่เร็วกว่า 60 วันนับจากวันสอบครั้งแรก
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelSubmit}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={handleConfirmSubmit}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Gs18report;
