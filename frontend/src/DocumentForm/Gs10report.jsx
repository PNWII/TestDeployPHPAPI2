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

function Gs10report() {
  const [signature, setSignature] = useState(null); // เก็บลายเซ็นเป็นภาพ
  const sigCanvas = useRef(null); // อ้างอิงไปยัง SignatureCanvas
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
  const [projectType, setProjectType] = useState("");
  const [datepicker, setDatepicker] = useState("");
  const [projectThai, setProjectThai] = useState("");
  const [projectEng, setProjectEng] = useState("");
  const [advisorType, setAdvisorType] = useState("");
  const [advisorMainNew, setAdvisorMainNew] = useState("");
  const [advisorSecondNew, setAdvisorSecondNew] = useState("");
  const [advisorMainOld, setAdvisorMainOld] = useState("");
  const [advisorSecondOld, setAdvisorSecondOld] = useState("");
  const [advisors, setAdvisors] = useState([]);
  const [documentGs10rp, setDocumentGs10rp] = useState("");
  const [signName, setsingName] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const clearSignature = () => sigCanvas.current.clear();
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  // Fetch files
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        "http://localhost/TestPHP-API2/backend/getFiles.php"
      );
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };
  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await axios.get(
          "http://localhost/TestPHP-API2/backend/getAdvisors.php"
        );
        // Ensure advisors is always an array
        setAdvisors(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching advisors:", error);
        setAdvisors([]); // Set to empty array if there's an error
      }
    };
    fetchAdvisors();
  }, []);

  // ฟังก์ชันสำหรับรีเซ็ตฟอร์ม
  const handleReset = () => {
    setSignature(null);
    setDatepicker("");
    setProjectType("");
    setProjectThai("");
    setProjectEng("");
    setAdvisorType("");
    setAdvisorMainNew("");
    setAdvisorSecondNew("");
    setAdvisorMainOld("");
    setAdvisorSecondOld("");
    setDocumentGs10rp("");
    setsingName("");
    setSelectedFile(null);
    setFiles("");
    document.querySelector("form").reset();
  };

  const saveSignature = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setSignature(dataURL);
  };

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
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
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

    // Check if user ID is available
    if (!userIDStudent) {
      alert("ไม่พบ ID นักศึกษาในระบบ");
      return;
    }

    // Access the form element for validation
    const form = e.target;

    // Validate the form fields and check if the signature is present
    if (!signature || !form.checkValidity()) {
      form.classList.add("was-validated"); // Bootstrap validation styling
      setFormValid(false); // Mark form as invalid in state
      setShowMessageModal(true); // Show modal to alert the user
      return;
    }

    // แสดง Confirm Modal เพื่อยืนยันก่อนการบันทึกข้อมูล
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false); // ปิด Confirm Modal

    const userIDStudent = localStorage.getItem("id");
    let filePath = "";

    // Step 1: Check if a file is selected, if so upload it
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("idstd_student", userIDStudent); // Include student ID
      formData.append(
        "file_type",
        "คคอ. บว. 10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
      ); // Include branch ID

      try {
        const uploadResponse = await axios.post(
          "http://localhost/TestPHP-API2/backend/uploadFile.php",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (uploadResponse.data.success) {
          filePath = uploadResponse.data.filePath; // Path ไฟล์จาก Backend
          setDocumentGs10rp(filePath); // เก็บ Path ไฟล์ใน State
          //  alert("อัปโหลดไฟล์สำเร็จ");
        } else {
          alert(`เกิดข้อผิดพลาดในการอัปโหลดไฟล์: ${uploadResponse.data.error}`);
          return;
        }
      } catch (error) {
        console.error("Error during file upload:", error);
        alert(`เกิดข้อผิดพลาดในการอัปโหลดไฟล์: ${error.message}`);
        return;
      }
    }

    // Step 2: Submit the form with the uploaded file path or empty string if no file
    try {
      const submitResponse = await fetch(
        "http://localhost/TestPHP-API2/backend/submit_gs10report.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idstd_student: userIDStudent,
            projectType_gs10report: projectType,
            projectThai_gs10report: projectThai,
            projectEng_gs10report: projectEng,
            advisorType_gs10report: advisorType,
            date_gs10report: datepicker,
            advisorMainNew_gs10report: advisorMainNew,
            advisorSecondNew_gs10report: advisorSecondNew,
            advisorMainOld_gs10report: advisorMainOld,
            advisorSecondOld_gs10report: advisorSecondOld,
            document_gs10report: filePath, // Send the file path or an empty string if no file
            signature_gs10report: signature,
            signName_gs10report: signName,
          }),
        }
      );

      if (!submitResponse.ok) {
        const errorText = await submitResponse.text();
        console.error("Error from server:", errorText);
        throw new Error(`HTTP error! status: ${submitResponse.status}`);
      }

      const jsonResponse = await submitResponse.json();
      console.log("Server response:", jsonResponse);

      if (jsonResponse.status === "success") {
        setFormValid(true); // Form submission success
        setShowMessageModal(true); // Show success modal
        //alert("ส่งข้อมูลสำเร็จ!");
      } else {
        alert(`เกิดข้อผิดพลาด: ${jsonResponse.message}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert(`เกิดข้อผิดพลาดในการส่งข้อมูล: ${error.message}`);
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmModal(false); // ปิด Confirm Modal หากไม่ต้องการส่งข้อมูล
  };

  return (
    <>
      <NavbarStudent />
      <div className="container-gsReport">
        <h3 style={{ margin: 40 }}>
          คคอ. บว.10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์ /
          การศึกษาค้นคว้าอิสระ
        </h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group mb-3 d-flex align-items-center">
            <label htmlFor="date-picker" className="input-group-text mr-2">
              เลือกวันที่
            </label>
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
          <div className="input-group mb-3">
            <label className="input-group-text">จัดทำโครงการ</label>
            <select
              className="form-select col-3"
              required
              name="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value={""}>เลือกประเภทของโครงการ...</option>
              <option value={"วิทยานิพนธ์"}>วิทยานิพนธ์</option>
              <option value={"การศึกษาค้นคว้าอิสระ"}>
                การศึกษาค้นคว้าอิสระ
              </option>
            </select>
          </div>

          <div className="form-group">
            <div className="input-group mb-3">
              <label htmlFor="projectThai" className="input-group-text">
                จัดทำโครงการ เรื่อง (ภาษาไทย)
              </label>
              <input
                type="text"
                id="projectThai"
                name="projectThai"
                className="form-control"
                placeholder="ชื่อโครงการ (ภาษาไทย)"
                value={projectThai}
                onChange={(e) => setProjectThai(e.target.value)}
                required
              />
              <label htmlFor="projectEng" className="input-group-text">
                จัดทำโครงการ เรื่อง (ภาษาอังกฤษ)
              </label>
              <input
                type="text"
                id="projectEng"
                name="projectEng"
                value={projectEng}
                onChange={(e) => setProjectEng(e.target.value)}
                className="form-control"
                placeholder="ชื่อโครงการ (ภาษาอังกฤษ)"
                required
              />
            </div>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">
              มีความประสงค์ขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์ /
              การศึกษาค้นคว้าอิสระ ซึ่งเป็นการ
            </label>
            <select
              className="form-select col-3"
              name="advisorType"
              value={advisorType}
              onChange={(e) => setAdvisorType(e.target.value)}
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
                แต่งตั้งแทนอาจารย์ที่ปรึกษาวิทยานิพนธ์ / การศึกษาค้นคว้าอิสระ
              </option>
            </select>
          </div>
          <div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                ชุดเก่าที่ขอยกเลิก ดังมีรายชื่อต่อไปนี้
              </span>
              <span className="input-group-text">อาจารย์ที่ปรึกษาหลัก</span>
              <select
                className="form-select"
                value={advisorMainOld}
                required
                onChange={(e) => setAdvisorMainOld(e.target.value)}
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

              <span className="input-group-text">อาจารย์ที่ปรึกษาร่วม</span>
              <select
                className="form-select"
                value={advisorSecondOld}
                required
                onChange={(e) => setAdvisorSecondOld(e.target.value)}
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

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">
              อาจารย์ที่ปรึกษาชุดใหม่ ดังมีรายชื่อต่อไปนี้
            </span>
            <span className="input-group-text">อาจารย์ที่ปรึกษาหลัก</span>
            <select
              className="form-select"
              value={advisorMainNew}
              required
              onChange={(e) => setAdvisorMainNew(e.target.value)}
            >
              <option value="">เลือกอาจารย์ที่ปรึกษา...</option>
              {Array.isArray(advisors) && advisors.length > 0 ? (
                advisors.map((advisor) => (
                  <option key={advisor.id_teacher} value={advisor.name_teacher}>
                    {advisor.name_teacher}
                  </option>
                ))
              ) : (
                <option disabled>ไม่มีข้อมูลอาจารย์ที่ปรึกษา</option> // Fallback message when no data
              )}
            </select>

            <span className="input-group-text">อาจารย์ที่ปรึกษาร่วม</span>
            <select
              className="form-select"
              value={advisorSecondNew}
              required
              onChange={(e) => setAdvisorSecondNew(e.target.value)}
            >
              <option value="">เลือกอาจารย์ที่ปรึกษา...</option>
              {Array.isArray(advisors) && advisors.length > 0 ? (
                advisors.map((advisor) => (
                  <option key={advisor.id_teacher} value={advisor.name_teacher}>
                    {advisor.name_teacher}
                  </option>
                ))
              ) : (
                <option disabled>ไม่มีข้อมูลอาจารย์ที่ปรึกษา</option> // Fallback message when no data
              )}
            </select>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">แนบไฟล์เอกสาร (ถ้ามี)</label>
            <input
              type="file"
              className="form-control"
              name="documentGs10rp"
              style={{ width: "10%" }}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>
          <p style={{ textAlign: "left", fontWeight: "bold" }}>
            **กรณีอาจารย์บัณฑิตศึกษายังไม่เคยได้รับการแต่งตั้งหรือได้รับการแต่งตั้ง
            แต่ครบวาระ 3 ปีแล้ว ให้แนบประวัติอาจารย์ (คคอ. บว. 31)
          </p>
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
      {/* Modal for success/error message */}
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
                window.location.href = "/historydocumentstudent"; // นำทางไปหน้าที่กำหนด
              } else {
                setShowMessageModal(false); // แค่ปิด Modal
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
            1. นักศึกษาแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์ /
            การศึกษาค้นคว้าอิสระได้ 1-2 คน
            <br />
            2.
            กรณีอาจารย์บัณฑิตศึกษายังไม่เคยได้รับการแต่งตั้งหรือได้รับการแต่งตั้ง
            แต่ครบวาระ 3 ปีแล้ว ให้แนบประวัติอาจารย์ (คคอ. บว. 31)
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

export default Gs10report;
