const FormGS16 = ({ currentDoc, handleDownload }) => {
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
                currentDoc.gs16status?.includes("ได้รับ")
                  ? "bg-success"
                  : currentDoc.gs16status?.includes("ปฏิเสธ")
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {currentDoc.gs16status || "ไม่พบข้อมูล"}
            </span>
          </div>

          <div className="mb-3">
            <strong>วันที่ส่ง: </strong>
            {currentDoc.gs16timeSubmit || "ไม่พบข้อมูล"}
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>
            รายละเอียดข้อมูลในเอกสาร คคอ. บว. 16
            แบบขอส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์
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
              value={currentDoc.gs16ReportDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>มีความประสงค์ ขอส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์</strong>
            </label>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                ได้ดำเนินการสอบป้องกันวิทยานิพนธ์แล้ว (เมื่อวันที่ / เดือน / ปี)
              </strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs16ProjectDefenseDate || "ไม่พบข้อมูล"}
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
              value={currentDoc.gs16ProjectDefenseResult || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ชื่อวิทยานิพนธ์ (ภาษาไทย)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs16ProjectThai || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ชื่อวิทยานิพนธ์ (ภาษาอังกฤษ)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs16ProjectEng || "ไม่พบข้อมูล"}
              disabled
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ชื่ออาจารย์ที่ปรึกษาวิทยานิพนธ์</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs16ThesisAdvisor || "ไม่พบข้อมูล"}
              disabled
            />
          </div>

          <div className="input-group mb-3">
            <label>
              <strong>
                บัดนี้ได้ปรับปรุงแก้ไขเล่มวิทยานิพนธ์ตามข้อเสนอแนะของคณะกรรมการสอบเรียบร้อยแล้ว
                และได้ส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์ พร้อม Flash drive (file .doc
                และ .pdf)
              </strong>
            </label>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>แนบไฟล์เล่มวิทยานิพนธ์ฉบับสมบูรณ์ (.doc)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs16ThesisDoc || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() =>
                handleDownload(currentDoc.id, currentDoc.name, "gs16ThesisDoc")
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>

          <div className="input-group mt-3">
            <span className="input-group-text bg-light text-dark">
              <strong>แนบไฟล์เล่มวิทยานิพนธ์ฉบับสมบูรณ์ (.pdf)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs16ThesisPDF || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() =>
                handleDownload(currentDoc.id, currentDoc.name, "gs16ThesisPDF")
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>
          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gs16signName || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gs16signature || ""}
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
              {currentDoc.gf16officeNameGradOffice || "ไม่พบข้อมูล"})
            </strong>
          </div>
          <div className="mb-3">
            <strong>เรียน คณบดีคณะครุศาสตร์อุตสาหกรรม</strong>
          </div>
          <div className="mb-3">
            เจ้าหน้าที่บัณฑิตศึกษาคณะครุศาสตร์อุตสาหกรรม
            ได้ตรวจสอบแล้วเห็นสมควรอนุมัติ <br />
            พร้อมนี้ได้แนบเอกสารมาเพื่อโปรดลงนาม
          </div>
          <div>
            <strong>แนบเอกสารใบรับรองวิทยานิพนธ์</strong>
          </div>
          <div className="input-group mt-2">
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gf16officeThesisCertificateDoc || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() =>
                handleDownload(
                  currentDoc.id,
                  currentDoc.name,
                  "gf16officeThesisCertificateDoc"
                )
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>
          <div className="mt-2">
            <strong>แนบเอกสารแบบรายงานการอนุมัติผลการสำเร็จการศึกษา</strong>
          </div>
          <div className="input-group mt-2">
            <input
              type="text"
              className="form-control bg-white"
              value={
                currentDoc.gf16officeGraduationApprovalReport || "ไม่พบข้อมูล"
              }
              disabled
            />
            <button
              onClick={() =>
                handleDownload(
                  currentDoc.id,
                  currentDoc.name,
                  "gf16officeGraduationApprovalReport"
                )
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>
          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gf16officeNameGradOffice || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gf16officeSign || ""}
              alt="Signature"
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGS16;
