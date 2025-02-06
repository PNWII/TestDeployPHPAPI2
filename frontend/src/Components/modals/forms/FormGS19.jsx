const FormGS19 = ({ currentDoc, handleDownload }) => {
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
                currentDoc.gs19status?.includes("ได้รับ")
                  ? "bg-success"
                  : currentDoc.gs19status?.includes("ปฏิเสธ")
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {currentDoc.gs19status || "ไม่พบข้อมูล"}
            </span>
          </div>

          <div className="mb-3">
            <strong>วันที่ส่ง: </strong>
            {currentDoc.gs19timeSubmit || "ไม่พบข้อมูล"}
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>
            รายละเอียดข้อมูลในเอกสาร <br />
            คคอ. บว. 19 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท
            <br />
            แผน 2 แบบวิชาชีพ
          </h5>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>วันที่ / เดือน / ปี</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs19ReportDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>
                มีความประสงค์ ขออนุมัติผลการสำเร็จการศึกษานักศึกษาระดับปริญญาโท
                แผน 2 แบบวิชาชีพ
                ทั้งนี้ได้ปฏิบัติตามเงื่อนไขเพื่อขออนุมัติผลการสำเร็จการศึกษา
              </strong>
            </label>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ในภาคการศึกษาที่</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs19SemesterAt || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>ปีการศึกษา</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs19AcademicYear || "ไม่พบข้อมูล"}
              disabled
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ศึกษารายวิชาครบตามที่กำหนดในหลักสูตร (จำนวน)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs19CourseCredits || "ไม่พบข้อมูล"}
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
              value={currentDoc.gs19CumulativeGPA || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                สอบผ่านการสอบประมวลความรู้ (เมื่อวันที่ / เดือน / ปี)
              </strong>
            </span>

            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs19ProjectKnowledgeExamDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                สอบป้องกันวิทยานิพนธ์ผ่านแล้ว (เมื่อวันที่ / เดือน / ปี)
              </strong>
            </span>

            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs19ProjectDefenseDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>รายละเอียดเพิ่มเติม (เพิ่มเติม)</strong>
            </span>
            <textarea
              className="form-control bg-white"
              value={currentDoc.gs19AdditionalDetails ?? ""}
              rows={2} // กำหนดจำนวนแถวของ textarea
              style={{ resize: "none" }} // ปิดการปรับขนาด textarea ด้วยเมาส์
              disabled
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ชื่ออาจารย์ที่ปรึกษา</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs19ThesisAdvisor || "ไม่พบข้อมูล"}
              disabled
            />
          </div>

          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gs19signName || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gs19signature || ""}
              alt="Signature"
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5>บันทึกเจ้าหน้าที่บัณฑิตศึกษาคณะครุศาสตร์อุตสาหกรรม</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>
              จาก เจ้าหน้าที่บัณฑิตศึกษาคณะครุศาสตร์อุตสาหกรรม (
              {currentDoc.gf19officeNameGradOffice || "ไม่พบข้อมูล"})
            </strong>
          </div>
          <div className="mb-3">
            <strong>เรียน คณบดีคณะครุศาสตร์อุตสาหกรรม</strong>
          </div>
          <div className="mb-3">
            เจ้าหน้าที่บัณฑิตศึกษาคณะครุศาสตร์อุตสาหกรรม
            ได้ตรวจสอบแล้วเห็นสมควรอนุมัติ <br />
            พร้อมนี้ได้แนบแบบรายงานการอนุมัติผลการสำเร็จการศึกษา
            (สำหรับนักศึกษาปริญญาโท แผน 2 แบบวิชาชีพ) <br />
            เพื่อโปรดลงนาม
          </div>
          <div>
            <strong>แนบแบบรายงานการอนุมัติผลการสำเร็จการศึกษา</strong>
          </div>
          <div className="input-group mt-2">
            <input
              type="text"
              className="form-control bg-white"
              value={
                currentDoc.gf19officeMasterPlanTwoApprovalDoc || "ไม่พบข้อมูล"
              }
              disabled
            />
            <button
              onClick={() => handleDownload(currentDoc.id, currentDoc.name)}
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>

          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gf19officeNameGradOffice || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gf19officeSign || ""}
              alt="Signature"
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGS19;
