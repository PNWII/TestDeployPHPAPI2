const FormGS18 = ({ currentDoc, handleDownload }) => {
  return (
    <div>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>ข้อมูลการส่งเอกสาร</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>รหัสเอกสาร: </strong>
            {currentDoc.id || "ไม่พบข้อมูล"}
          </div>
          <div className="mb-3">
            <strong>ประเภทเอกสาร: </strong>
            {currentDoc.name || "ไม่พบข้อมูล"}
          </div>
          <div className="mb-3">
            <strong>รหัสนักศึกษา: </strong>
            {currentDoc.idstd_student || "ไม่พบข้อมูล"}
          </div>
          <div className="mb-3">
            <strong>ชื่อ-นามสกุล ภาษาไทย: </strong>
            {currentDoc.name_student || "ไม่พบข้อมูล"}
            <span style={{ marginLeft: "20px" }}></span>
            <strong>ชื่อ-นามสกุล ภาษาอังกฤษ: </strong>
            {currentDoc.prefix_studentEng || "ไม่พบข้อมูล"}{" "}
            {currentDoc.name_studentEng || "ไม่พบข้อมูล"}
          </div>
          <div className="mb-3">
            <label>
              <strong>แผนการเรียน: </strong>
              {currentDoc.Namestudyplan || "ไม่พบข้อมูล"}
            </label>
            <span style={{ marginLeft: "20px" }}></span>
            <label>
              <strong>สาขาวิชา: </strong>
              {currentDoc.branch_student || "ไม่พบข้อมูล"}
            </label>
            <span style={{ marginLeft: "20px" }}></span>
            <label>
              <strong>อักษรย่อสาขาวิชา: </strong>
              {currentDoc.abbreviate_student || "ไม่พบข้อมูล"}
            </label>
          </div>
          <div className="mb-3">
            <strong>ที่อยู่: </strong>
            {currentDoc.address_student || "ไม่พบข้อมูล"}
          </div>
          <div className="mb-3">
            <label>
              <strong>อีเมล: </strong>
              {currentDoc.email_student || "ไม่พบข้อมูล"}
            </label>
            <span style={{ marginLeft: "20px" }}></span>
            <label>
              <strong>เบอร์โทรศัพท์: </strong>
              {currentDoc.tel_student || "ไม่พบข้อมูล"}
            </label>
          </div>
          <div className="mb-3">
            <strong>สถานะ: </strong>
            <span
              className={`badge ${
                currentDoc.gs18status?.includes("ได้รับ")
                  ? "bg-success"
                  : currentDoc.gs18status?.includes("ปฏิเสธ")
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {currentDoc.gs18status || "ไม่พบข้อมูล"}
            </span>
          </div>

          <div className="mb-3">
            <strong>วันที่ส่ง: </strong>
            {currentDoc.gs18timeSubmit || "ไม่พบข้อมูล"}
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>รายละเอียดข้อมูลในเอกสาร คคอ. บว. 18 แบบขอสอบประมวลความรู้</h5>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>วันที่ / เดือน / ปี</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs18ReportDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>มีความประสงค์ขอสอบประมวลความรู้</strong>
            </label>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ในภาคการศึกษาที่</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs18SemesterAt || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>ปีการศึกษา</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs18AcademicYear || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>ซึ่งเป็นการสอบ</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs18ExamRoundProject || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>
                ข้าพเจ้าได้ดำเนินการตามข้อบังคับฯ มหาวิทยาลัย
                ว่าด้วยการศึกษาระดับบัณฑิตศึกษา หมวดที่ 6
                การวัดผลและประเมินผลการศึกษา แล้วคือ
              </strong>
            </label>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ศึกษารายวิชาครบตามที่กำหนดในหลักสูตร (จำนวน)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs18CourseCredits || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>หน่วยกิต</strong>
            </span>
            <span className="input-group-text bg-light text-dark">
              <strong>มีคะแนนเฉลี่ย</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs18CumulativeGPA || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-2">
            <label>
              <strong>
                แนบไฟล์แผนการเรียน แผน 2 แบบวิชาชีพ (คคอ. บว. 41) จำนวน 1 ชุด
              </strong>
            </label>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs18DocGs41rp || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() => handleDownload(currentDoc.id, currentDoc.name)}
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ชื่ออาจารย์ที่ปรึกษา</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs18ThesisAdvisor || "ไม่พบข้อมูล"}
              disabled
            />
          </div>

          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gs18signName || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gs18signature || ""}
              alt="Signature"
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGS18;
