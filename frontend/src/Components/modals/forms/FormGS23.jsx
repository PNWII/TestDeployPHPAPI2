const FormGS23 = ({ currentDoc, handleDownload }) => {
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
                currentDoc.gs23status?.includes("ได้รับ")
                  ? "bg-success"
                  : currentDoc.gs23status?.includes("ปฏิเสธ")
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {currentDoc.gs23status || "ไม่พบข้อมูล"}
            </span>
          </div>

          <div className="mb-3">
            <strong>วันที่ส่ง: </strong>
            {currentDoc.gs23timeSubmit || "ไม่พบข้อมูล"}
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>
            รายละเอียดข้อมูลในเอกสาร <br />
            คคอ. บว. 23 แบบขอส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์
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
              value={currentDoc.gs23ReportDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>
                มีความประสงค์ ขอส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์
              </strong>
            </label>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                ได้ดำเนินการสอบป้องกันการศึกษาค้นคว้าอิสระแล้ว (เมื่อวันที่ /
                เดือน / ปี)
              </strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs23ProjectDefenseDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ผลการสอบ</strong>
            </span>

            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs23ProjectDefenseResult || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ชื่อการศึกษาค้นคว้าอิสระ (ภาษาไทย)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs23ProjectThai || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ชื่อการศึกษาค้นคว้าอิสระ (ภาษาอังกฤษ)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs23ProjectEng || "ไม่พบข้อมูล"}
              disabled
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ชื่ออาจารย์ที่ปรึกษาการศึกษาค้นคว้าอิสระ</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs23IndependentStudyAdvisor || "ไม่พบข้อมูล"}
              disabled
            />
          </div>

          <div className="input-group mb-3">
            <label>
              <strong>
                บัดนี้ได้ปรับปรุงแก้ไขเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ตามข้อเสนอแนะของคณะกรรมการสอบเรียบร้อยแล้ว
                และได้ส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ พร้อม Flash drive
                (file .doc และ .pdf)
              </strong>
            </label>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>แนบไฟล์เล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ (.doc)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs23IndependentStudyDoc || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() =>
                handleDownload(
                  currentDoc.id,
                  currentDoc.name,
                  "gs23IndependentStudyDoc"
                )
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>

          <div className="input-group mt-3">
            <span className="input-group-text bg-light text-dark">
              <strong>แนบไฟล์เล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ (.pdf)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs23IndependentStudyPDF || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() =>
                handleDownload(
                  currentDoc.id,
                  currentDoc.name,
                  "gs23IndependentStudyPDF"
                )
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>
          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gs23signName || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gs23signature || ""}
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
              {currentDoc.gf23officeNameGradOffice || "ไม่พบข้อมูล"})
            </strong>
          </div>
          <div className="mb-3">
            <strong>เรียน คณบดีคณะครุศาสตร์อุตสาหกรรม</strong>
          </div>
          <div className="mb-3">
            เจ้าหน้าที่บัณฑิตศึกษาคณะครุศาสตร์อุตสาหกรรม
            ได้รับเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์ พร้อม Flash drive (file
            .doc และ .pdf) จำนวน 1 อัน{" "}
            <strong>
              วันที่ {currentDoc.gf23officeThesisDocDate || "ไม่พบข้อมูล"}
            </strong>{" "}
            และได้ตรวจสอบคุณสมบัติของนักศึกษาแล้ว ดังนี้
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
              id="gf23officeCumulativeGPAStudent"
              checked={!!currentDoc.gf23officeCumulativeGPAStudent} // ใช้ !! เพื่อตรวจสอบว่ามีข้อมูลหรือไม่
              readOnly
              style={{
                transform: "scale(0.8)",
                marginRight: "10px",
              }}
            />
            <label
              className="form-check-label"
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              ศึกษารายวิชาครบตามที่กำหนดในหลักสูตร มีคะแนนเฉลี่ยสะสม{" "}
              {currentDoc.gf23officeCumulativeGPAStudent || "ไม่พบข้อมูล"}
            </label>
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
              id="gf23officeKnowledgeExamPass"
              checked={currentDoc.gf23officeKnowledgeExamPass === 1} // ตรวจสอบว่าเป็น 1 หรือไม่
              readOnly
              style={{
                transform: "scale(0.8)",
                marginRight: "10px",
              }}
            />
            <label
              className="form-check-label"
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              สอบผ่านการสอบประมวลความรู้
            </label>
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
              id="gf23officeStatus"
              checked={
                currentDoc.gf23officeStatus ===
                "ได้รับการอนุมัติจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว"
              }
              readOnly
              style={{
                transform: "scale(0.8)",
                marginRight: "10px",
              }}
            />
            <label
              className="form-check-label"
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              เห็นสมควรอนุมัติผลการสำเร็จการศึกษา
            </label>
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
              id="gf23officeStatus"
              checked={
                currentDoc.gf23officeStatus ===
                "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว"
              }
              readOnly
              style={{
                transform: "scale(0.8)",
                marginRight: "10px",
              }}
            />
            <label
              className="form-check-label"
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              ยังไม่สามารถอนุมัติผลการสำเร็จการศึกษาได้ เนื่องจาก{" "}
              {currentDoc.gf23officeStatus ===
                "ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว" && (
                <span className="text-danger">
                  {currentDoc.gf23officeDescription || "ไม่พบข้อมูล"}
                </span>
              )}
            </label>
          </div>
          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gf23officeNameGradOffice || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gf23officeSign || ""}
              alt="Signature"
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGS23;
