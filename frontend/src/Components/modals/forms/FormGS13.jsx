const FormGS13 = ({ currentDoc, handleDownload }) => {
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
                currentDoc.gs13status?.includes("ได้รับ")
                  ? "bg-success"
                  : currentDoc.gs13status?.includes("ปฏิเสธ")
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {currentDoc.gs13status || "ไม่พบข้อมูล"}
            </span>
          </div>

          <div className="mb-3">
            <strong>วันที่ส่ง: </strong>
            {currentDoc.gs13timeSubmit || "ไม่พบข้อมูล"}
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>
            รายละเอียดข้อมูลในเอกสาร <br />
            คคอ. บว. 13 แบบขอส่งโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
            ฉบับแก้ไข
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
              value={currentDoc.gs13ReportDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                มีความประสงค์ขอส่งโครงการ (ฉบับแก้ไข) ประเภทโครงการ
              </strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs13projectType || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>โครงการ เรื่อง (ภาษาไทย)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs13ProjectThai || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>โครงการ เรื่อง (ภาษาอังกฤษ)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs13ProjectEng || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                ได้ปรับปรุงแก้ไขตามข้อเสนอแนะของอาจารย์ที่ปรึกษาในการสอบโครงการ
                เมื่อวันที่
              </strong>
            </span>

            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs13revisionDateAdvisor || "ไม่พบข้อมูล"}
              disabled
            />
          </div>

          <div className="input-group mb-3">
            <label>
              <strong>
                รายชื่ออาจารย์ที่ปรึกษาโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
                มีรายชื่อดังนี้
              </strong>
            </label>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>อาจารย์ที่ปรึกษาหลัก</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs13advisorMainNew || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>อาจารย์ที่ปรึกษาร่วม</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs13advisorSecondNew || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>
                แนบเอกสารรายละเอียดโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ{" "}
                <br />
                ใช้ประกอบ (คคอ. บว. 21 แบบฟอร์มเสนอโครงการ)
              </strong>
            </label>
          </div>
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.docProjectdetailsGs21rp || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() =>
                handleDownload(
                  currentDoc.id,
                  currentDoc.name,
                  "docProjectdetailsGs21rp"
                )
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>
          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gs13signName || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gs13signature || ""}
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
              {currentDoc.gs13officenameGradOffice || "ไม่พบข้อมูล"})
            </strong>
          </div>
          <div className="mb-3">
            <strong>เรียน คณบดีคณะครุศาสตร์อุตสาหกรรม</strong>
          </div>
          <div className="mb-3">
            เจ้าหน้าที่บัณฑิตศึกษาคณะครุศาสตร์อุตสาหกรรม
            ได้ดำเนินการตรวจสอบเรียบร้อยแล้ว เห็นสมควรอนุมัติ
            พร้อมได้แนบประกาศอนุมัติหัวข้อและโครงการวิทยานิพนธ์และโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
            มาเพื่อโปรดพิจารณาลงชื่อ
          </div>
          <label>
            <strong>แนบเอกสารใบประกาศอนุมัติหัวข้อ</strong>
          </label>
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control bg-white"
              value={
                currentDoc.gs13officeProjectApprovalDocument || "ไม่พบข้อมูล"
              }
              disabled
            />
            <button
              onClick={() =>
                handleDownload(
                  currentDoc.id,
                  currentDoc.name,
                  "gs13officeProjectApprovalDocument"
                )
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>
          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gs13officenameGradOffice || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gs13officeSign || ""}
              alt="Signature"
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGS13;
