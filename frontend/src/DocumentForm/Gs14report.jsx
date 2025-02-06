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

function Gs14report() {
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
  const [projectType, setProjectType] = useState("");
  const [datepicker, setDatepicker] = useState("");
  const [projectThai, setProjectThai] = useState("");
  const [projectEng, setProjectEng] = useState("");
  const [projectApprovalDate, setProjectApprovalDate] = useState("");
  const [progressExamRequestDate, setProgressExamRequestDate] = useState("");
  const [progressExamRequestTime, setProgressExamRequestTime] = useState("");
  const [progressExamRequestRoom, setProgressExamRequestRoom] = useState("");
  const [progressExamRequestFloor, setProgressExamRequestFloor] = useState("");
  const [progressExamRequestBuilding, setProgressExamRequestBuilding] =
    useState("");
  const [advisorMain, setAdvisorMain] = useState("");
  const [advisorSecond, setAdvisorSecond] = useState("");
  const [advisors, setAdvisors] = useState([]);
  const [signName, setsingName] = useState("");
  const [docProjectdetailsGs22rp, setDocProjectdetailsGs22rp] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
    setProjectType("");
    setProjectThai("");
    setProjectEng("");
    setProjectApprovalDate("");
    setProgressExamRequestDate("");
    setProgressExamRequestTime("");
    setProgressExamRequestRoom("");
    setProgressExamRequestFloor("");
    setProgressExamRequestBuilding("");
    setAdvisorMain("");
    setAdvisorSecond("");
    setsingName("");
    setDocProjectdetailsGs22rp(null);
    setSelectedFile(null);
    setFiles("");
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userIDStudent = localStorage.getItem("id");
    if (!userIDStudent) {
      alert("ไม่พบ ID นักศึกษาในระบบ");
      return;
    }

    const form = e.target;

    if (!signature || !form.checkValidity()) {
      form.classList.add("was-validated");
      setFormValid(false);
      setShowMessageModal(true);
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);

    const userIDStudent = localStorage.getItem("id");
    if (!userIDStudent) {
      alert("ไม่พบรหัสนักเรียนในระบบ กรุณาลองใหม่");
      return;
    }

    let filePath = "";
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("idstd_student", userIDStudent);
      formData.append(
        "file_type",
        "คคอ. บว. 14 แบบขอสอบความก้าวหน้าวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
      );

      try {
        const uploadResponse = await axios.post(
          "http://localhost/TestPHP-API2/backend/uploadFile.php",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (uploadResponse.data.success) {
          filePath = uploadResponse.data.filePath;
          setDocProjectdetailsGs22rp(filePath);
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

    try {
      const submitResponse = await fetch(
        "http://localhost/TestPHP-API2/backend/submit_gs14report.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idstd_student: userIDStudent,
            projectType_gs14report: projectType,
            projectThai_gs14report: projectThai,
            projectEng_gs14report: projectEng,
            projectApprovalDate_gs14report: projectApprovalDate,
            progressExamRequestDate_gs14report: progressExamRequestDate,
            progressExamRequestTime_gs14report: progressExamRequestTime,
            progressExamRequestRoom_gs14report: progressExamRequestRoom,
            progressExamRequestFloor_gs14report: progressExamRequestFloor,
            progressExamRequestBuilding_gs14report: progressExamRequestBuilding,
            date_gs14report: datepicker,
            advisorMain_gs14report: advisorMain,
            advisorSecond_gs14report: advisorSecond,
            docProjectdetailsGs22rp_gs14report: filePath,
            signature_gs14report: signature,
            signName_gs14report: signName,
          }),
        }
      );

      // Read the response directly as JSON
      const jsonResponse = await submitResponse.json(); // Directly parse the response as JSON

      console.log("Server Response (JSON):", jsonResponse);

      if (jsonResponse.status === "success") {
        setFormValid(true); // Form submission success
        setShowMessageModal(true); // Show success modal
        //   alert("ส่งข้อมูลสำเร็จ!");
      } else {
        alert(`เกิดข้อผิดพลาด: ${jsonResponse.message}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert(`เกิดข้อผิดพลาดในการส่งข้อมูล: ${error.message}`);
    }
  };

  // Handle cancel submission
  const handleCancelSubmit = () => {
    setShowConfirmModal(false); // ปิด Confirm Modal หากไม่ต้องการส่งข้อมูล
  };

  return (
    <>
      <NavbarStudent />
      <div className="container-gsReport">
        <h3 style={{ margin: 40 }}>
          คคอ. บว. 14 แบบขอสอบความก้าวหน้าวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ{" "}
          <br />
          และ คคอ. บว. 22 แบบฟอร์มเสนอความก้าวหน้าโครงการ
        </h3>
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
              ได้รับอนุมัติหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ (เมื่อวันที่ /
              เดือน / ปี)
            </label>
            <input
              type="date"
              className="form-control"
              id="projectApprovalDate"
              value={projectApprovalDate}
              onChange={(e) => setProjectApprovalDate(e.target.value)}
              name="date"
              required
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">
              มีความประสงค์ขอสอบความก้าวหน้าโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระในวันและเวลา
              ดังนี้
            </label>
            <label className="input-group-text">วันที่</label>
            <input
              type="date"
              className="form-control"
              id="progressExamRequestDate"
              value={progressExamRequestDate}
              onChange={(e) => setProgressExamRequestDate(e.target.value)}
              name="date"
              required
            />
            <label className="input-group-text">เวลา</label>
            <input
              type="time"
              className="form-control"
              id="progressExamRequestTime"
              value={progressExamRequestTime}
              onChange={(e) => setProgressExamRequestTime(e.target.value)}
              name="date"
              required
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">
              สถานที่ขอสอบความก้าวหน้า ณ ห้อง
            </label>
            <input
              type="text"
              name="progressExamRequestRoom"
              className="form-control"
              placeholder="กรุณากรอกชื่อหรือหมายเลขห้อง"
              id="progressExamRequestRoom"
              value={progressExamRequestRoom}
              onChange={(e) => setProgressExamRequestRoom(e.target.value)}
              required
            />
            <label className="input-group-text">ชั้น</label>
            <input
              type="text"
              id="progressExamRequestFloor"
              name="progressExamRequestFloor"
              value={progressExamRequestFloor}
              onChange={(e) => setProgressExamRequestFloor(e.target.value)}
              className="form-control"
              placeholder="กรุณากรอกชั้นที่ขอสอบความก้าวหน้า"
              required
            />
            <label className="input-group-text">อาคาร</label>
            <input
              type="text"
              id="progressExamRequestBuilding"
              name="progressExamRequestBuilding"
              value={progressExamRequestBuilding}
              onChange={(e) => setProgressExamRequestBuilding(e.target.value)}
              className="form-control"
              placeholder="กรุณากรอกชื่ออาคาร"
              required
            />
          </div>
          <div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                ชื่ออาจารย์ที่ปรึกษาโครงการ
              </span>
              <span className="input-group-text">อาจารย์ที่ปรึกษาหลัก</span>
              <select
                className="form-select"
                value={advisorMain}
                required
                onChange={(e) => setAdvisorMain(e.target.value)}
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
                value={advisorSecond}
                required
                onChange={(e) => setAdvisorSecond(e.target.value)}
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
            <label className="input-group-text">
              แนบไฟล์เอกสารรายละเอียดโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
            </label>
            <input
              type="file"
              className="form-control"
              name="docProjectdetailsGs22rp"
              style={{ width: "10%" }}
              onChange={(e) => setSelectedFile(e.target.files[0])}
              required
            />
          </div>
          <p style={{ textAlign: "left" }}>
            <b>
              **รายละเอียดโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ประกอบด้วย
            </b>{" "}
            <br />
            1) ความเป็นมาและความสำคัญของปัญหา 2) วัตถุประสงค์ของการวิจัย 3)
            ขอบเขตของการวิจัย 4) วิธีการดำเนินการวิจัย 5)
            ประโยชน์ที่ได้จากการวิจัย 6) รายชื่อเอกสารอ้างอิง <br />
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
            การสอบความก้าวหน้าวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
            ต้องห่างจากวันที่ได้รับอนุมัติหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
            ไม่น้อยกว่า 60 วัน
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

export default Gs14report;
