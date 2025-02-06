const FormGS17 = ({ currentDoc, handleDownload }) => {
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
                currentDoc.gs17status?.includes("ได้รับ")
                  ? "bg-success"
                  : currentDoc.gs17status?.includes("ปฏิเสธ")
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {currentDoc.gs17status || "ไม่พบข้อมูล"}
            </span>
          </div>

          <div className="mb-3">
            <strong>วันที่ส่ง: </strong>
            {currentDoc.gs17timeSubmit || "ไม่พบข้อมูล"}
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>
            รายละเอียดข้อมูลในเอกสาร <br />
            คคอ. บว. 17 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท
            <br />
            แผน 1 แบบวิชาการ
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
              value={currentDoc.gs17ReportDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>
                มีความประสงค์ ขออนุมัติผลการสำเร็จการศึกษานักศึกษาระดับปริญญาโท
                แผน 1 แบบวิชาการ
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
              value={currentDoc.gs17SemesterAt || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>ปีการศึกษา</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs17AcademicYear || "ไม่พบข้อมูล"}
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
              value={currentDoc.gs17CourseCredits || "ไม่พบข้อมูล"}
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
              value={currentDoc.gs17CumulativeGPA || "ไม่พบข้อมูล"}
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
              value={currentDoc.gs17ProjectDefenseDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div
            className="form-check mb-3"
            style={{
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              id="gs17DocCheck15"
              checked={currentDoc.gs17DocCheck15}
              readOnly
              style={{
                transform: "scale(0.9)",
                marginRight: "10px",
              }}
            />
            <label
              className="form-check-label"
              htmlFor="gs17DocCheck15"
              style={{
                fontSize: "1.05rem",
                fontWeight: "bold",
              }}
            >
              นักศึกษาได้ดำเนินการ ส่ง คคอ. บว. 50
              คำร้องขอส่งเอกสารผลงานที่ได้รับการตีพิมพ์หรือนำเสนอ
            </label>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>รายละเอียดเพิ่มเติม (เพิ่มเติม)</strong>
            </span>
            <textarea
              className="form-control bg-white"
              value={currentDoc.gs17AdditionalDetails ?? ""}
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
              value={currentDoc.gs17ThesisAdvisor || "ไม่พบข้อมูล"}
              disabled
            />
          </div>

          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gs17signName || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gs17signature || ""}
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
              {currentDoc.gf17officeNameGradOffice || "ไม่พบข้อมูล"})
            </strong>
          </div>
          <div className="mb-3">
            <strong>เรียน คณบดีคณะครุศาสตร์อุตสาหกรรม</strong>
          </div>
          <div className="mb-3">
            เจ้าหน้าที่บัณฑิตศึกษาคณะครุศาสตร์อุตสาหกรรม
            ได้ตรวจสอบแล้วเห็นสมควรอนุมัติ <br />
            พร้อมนี้ได้แนบแบบรายงานการอนุมัติผลการสำเร็จการศึกษา
            (สำหรับนักศึกษาปริญญาโท แผน 1 แบบวิชาการ) <br />
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
                currentDoc.gf17officeMasterPlanOneApprovalDoc || "ไม่พบข้อมูล"
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
            {currentDoc.gf17officeNameGradOffice || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gf17officeSign || ""}
              alt="Signature"
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGS17;
