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

function Gs11report() {
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
  const [subjects, setSubjects] = useState("");
  const [gpa, setGpa] = useState("");
  const [subjectsProject, setSubjectsProject] = useState("");
  const [projectThai, setProjectThai] = useState("");
  const [projectEng, setProjectEng] = useState("");
  const [advisorMain, setAdvisorMain] = useState("");
  const [advisorSecond, setAdvisorSecond] = useState("");
  const [advisors, setAdvisors] = useState([]);
  const [docGs10rp, setDocGs10rp] = useState(null);
  const [docProjectdetails, setDocProjectdetails] = useState(null);
  const [signName, setsingName] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const clearSignature = () => sigCanvas.current.clear();

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
    setSubjects("");
    setGpa("");
    setSubjectsProject("");
    setProjectType("");
    setProjectThai("");
    setProjectEng("");
    setAdvisorMain("");
    setAdvisorSecond("");
    setDocGs10rp("");
    setDocProjectdetails("");
    setsingName("");
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

    // เพิ่มไฟล์ และดึงแค่ชื่อไฟล์
    let filePaths = []; // เก็บ path ของไฟล์ที่เลือก
    if (docGs10rp) {
      formData.append("files[]", docGs10rp);
      filePaths.push(docGs10rp.name); // เก็บชื่อไฟล์เท่านั้น
    }
    if (docProjectdetails) {
      formData.append("files[]", docProjectdetails);
      filePaths.push(docProjectdetails.name); // เก็บชื่อไฟล์เท่านั้น
    }

    // แสดงชื่อไฟล์ใน console
    console.log("File Names to be uploaded:", filePaths);

    try {
      const uploadResponse = await axios.post(
        "http://localhost/TestPHP-API2/backend/uploadFile11.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (uploadResponse.data.success) {
        const uploadedFiles = uploadResponse.data.uploadedFiles; // ประกาศตัวแปร `uploadedFiles` ที่นี่

        // ตรวจสอบว่าไฟล์ที่อัปโหลดสำเร็จแล้ว
        if (uploadedFiles && uploadedFiles.length >= 2) {
          // เก็บ filePath จาก backend
          setDocGs10rp(uploadedFiles[0]); // ใช้ path ที่ได้จาก backend
          setDocProjectdetails(uploadedFiles[1]); // ใช้ path ที่ได้จาก backend
        } else {
          alert("เกิดข้อผิดพลาด: ไม่สามารถดึงข้อมูลไฟล์ที่อัปโหลดได้");
          return;
        }
        console.log("Uploaded files:", uploadedFiles);

        // ส่งข้อมูลไปยัง API รวมถึง path ของไฟล์ที่อัปโหลด
        const requestData = {
          idstd_student: userIDStudent,
          projectType_gs11report: projectType,
          projectThai_gs11report: projectThai,
          projectEng_gs11report: projectEng,
          date_gs11report: datepicker,
          subjects_gs11report: subjects,
          gpa_gs11report: gpa,
          subjectsProject_gs11report: subjectsProject,
          advisorMain_gs11report: advisorMain,
          advisorSecond_gs11report: advisorSecond,
          docGs10rp_gs11report: uploadedFiles[0], // ใช้ path จาก backend
          docProjectdetails_gs11report: uploadedFiles[1], // ใช้ path จาก backend
          signature_gs11report: signature,
          signName_gs11report: signName,
        };

        console.log("Request Data:", requestData);

        // ส่งข้อมูลไปยัง API
        const response = await fetch(
          "http://localhost/TestPHP-API2/backend/submit_gs11report.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        const responseData = await response.json(); // แปลงผลลัพธ์เป็น JSON
        console.log("Response Data:", responseData);
        setFormValid(true); // Form submission success
        setShowMessageModal(true); // Show success modal
        //alert("ส่งข้อมูลสำเร็จ!");
      } else {
        alert(`เกิดข้อผิดพลาดในการอัปโหลดไฟล์: ${uploadResponse.data.error}`);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert(`เกิดข้อผิดพลาดในการอัปโหลดไฟล์: ${error.message}`);
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmModal(false); // ปิด Confirm Modal หากยกเลิกการส่งข้อมูล
  };
  return (
    <>
      <NavbarStudent />
      <div className="container-gsReport">
        <h3 style={{ margin: 40 }}>
          คคอ. บว.11 แบบขอเสนอโครงการวิทยานิพนธ์ / การศึกษาค้นคว้าอิสระ <br />
          และ คคอ. บว. 20 แบบฟอร์มเสนอโครงการ
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
              <label className="input-group-text">
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
              <label className="input-group-text">รหัสนักศึกษา</label>
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
              <label className="input-group-text">นักศึกษาระดับปริญญาโท</label>
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
              <label className="input-group-text">สาขาวิชา</label>
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
              <label className="input-group-text">สาขา</label>
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
              <label className="input-group-text">อักษรย่อสาขา</label>
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
              <label className="input-group-text">
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
              <label className="input-group-text">E-mail</label>
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
              <label className="input-group-text">หมายเลขโทรศัพท์ มือถือ</label>
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
            <label className="input-group-text">ประเภทโครงการ</label>
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
              <label className="input-group-text">
                ขอเสนอโครงการ เรื่อง (ภาษาไทย)
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
            </div>
          </div>
          <div className="form-group">
            <div className="input-group mb-3">
              <label className="input-group-text">
                ขอเสนอโครงการ เรื่อง (ภาษาอังกฤษ)
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
              ได้ลงทะเบียนรายวิชามาแล้ว (จำนวน)
            </label>
            <input
              type="text"
              id="subjects"
              name="subjects"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              className="form-control"
              placeholder="จำนวนหน่วยกิต"
              required
            />
            <label className="input-group-text">หน่วยกิต</label>

            <label className="input-group-text">มีคะแนนเฉลี่ยสะสม</label>
            <input
              type="text"
              id="gpa"
              name="gpa"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              className="form-control"
              placeholder="เกรดเฉลี่ยสะสมของนักศึกษา"
              required
            />
          </div>
          <div className="form-group">
            <div className="input-group mb-3">
              <label className="input-group-text">
                ในภาคเรียนการศึกษานี้ได้ลงทะเบียนวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
                (จำนวน)
              </label>
              <input
                type="text"
                id="subjectsProject"
                name="subjectsProject"
                value={subjectsProject}
                onChange={(e) => setSubjectsProject(e.target.value)}
                className="form-control"
                placeholder="จำนวนหน่วยกิจของวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
                required
              />
              <label className="input-group-text">หน่วยกิต</label>
            </div>
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
                onChange={(e) => setAdvisorMain(e.target.value)}
                required
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
                onChange={(e) => setAdvisorSecond(e.target.value)}
                required
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
              แนบไฟล์เอกสารคำร้องขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษา (คคอ. บว. 10)
            </label>
            <input
              type="file"
              className="form-control"
              name="docGs10rp"
              style={{ width: "10%" }}
              onChange={(e) => {
                setDocGs10rp(e.target.files[0]);
              }}
              required
            />
          </div>

          <div className="input-group mb-3">
            <label className="input-group-text">
              แนบไฟล์เอกสารรายละเอียดโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
            </label>
            <input
              type="file"
              className="form-control"
              name="docProjectdetails"
              style={{ width: "10%" }}
              onChange={(e) => setDocProjectdetails(e.target.files[0])} // เก็บไฟล์เดียว
              // ตรวจสอบไฟล์
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
            // onClick={() => setShowMessageModal(true)}
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
              setShowMessageModal(false);
              if (formValid) {
                window.location.href = "/historydocumentstudent";
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
            1. นักศึกษาต้องได้คะแนนเฉลี่ยสะสมไม่ต่ำกว่า 3.00
            และต้องลงทะเบียนวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ไม่ต่ำกว่า 3
            หน่วยกิต
            <br />
            2.
            นักศึกษาต้องยื่นคำร้องเพื่อขอสอบหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
            (คคอ.บว.12) ภายใน 30 วัน
            นับจากวันที่ได้รับอนุมัติโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
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

export default Gs11report;
