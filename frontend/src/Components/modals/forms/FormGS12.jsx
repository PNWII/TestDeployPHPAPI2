import React from "react";

const FormGS12 = ({ currentDoc, handleDownload }) => {
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
                currentDoc.gs12status?.includes("ได้รับ")
                  ? "bg-success"
                  : currentDoc.gs12status?.includes("ปฏิเสธ")
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {currentDoc.gs12status || "ไม่พบข้อมูล"}
            </span>
          </div>

          <div className="mb-3">
            <strong>วันที่ส่ง: </strong>
            {currentDoc.gs12timeSubmit || "ไม่พบข้อมูล"}
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>
            รายละเอียดข้อมูลในเอกสาร <br />
            คคอ. บว. 12 แบบขอสอบหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
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
              value={currentDoc.gs12ReportDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>จัดทำโครงการประเภท</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs12projectType || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>จัดทำโครงการ เรื่อง (ภาษาไทย)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs12ProjectThai || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>จัดทำโครงการ เรื่อง (ภาษาอังกฤษ)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs12ProjectEng || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>มีความประสงค์ขอสอบหัวข้อในวันและเวลา ดังนี้</strong>
            </span>
            <span className="input-group-text bg-light text-dark">
              <strong>วันที่</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs12examRequestDate || "ไม่พบข้อมูล"} // แสดงแค่วันที่
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>เวลา</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs12examRequestTime || "ไม่พบข้อมูล"} // แสดงแค่เวลา
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>น.</strong>
            </span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>สถานที่ขอสอบหัวข้อ ณ ห้อง</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs12examRequestRoom || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>ชั้น</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs12examRequestFloor || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>อาคาร</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs12examRequestBuilding || "ไม่พบข้อมูล"}
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
              value={currentDoc.gs12advisorMainNew || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>อาจารย์ที่ปรึกษาร่วม</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs12advisorSecondNew || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>
                แนบเอกสารรายละเอียดโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ{" "}
                <br />
                ใช้ประกอบ (คคอ. บว. 20 แบบฟอร์มเสนอโครงการ)
              </strong>
            </label>
          </div>
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs12docProjectDetails || "ไม่พบข้อมูล"}
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
            {currentDoc.gs12signName || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gs12signature || ""}
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
              {currentDoc.gs12officenameGradOffice || "ไม่พบข้อมูล"})
            </strong>
          </div>
          <div className="mb-3">
            <strong>เรียน คณบดีคณะครุศาสตร์อุตสาหกรรม</strong>
          </div>
          <div className="mb-3">
            <strong>นักศึกษาได้รับอนุมัติโครงการ : </strong>
            {currentDoc.gs12projectType || "ไม่พบข้อมูล"}
            <span style={{ marginLeft: "15px" }}></span>
            <span>เมื่อวันที่</span>
            {currentDoc.gs12officeProjectApprovalDate ? (
              <>
                <span style={{ marginLeft: "5px" }}></span>
                {new Date(currentDoc.gs12officeProjectApprovalDate).getDate()}
                <span style={{ marginLeft: "5px" }}></span>
                <label>
                  <span>เดือน</span>
                  <span style={{ marginLeft: "5px" }}></span>
                  {new Date(
                    currentDoc.gs12officeProjectApprovalDate
                  ).toLocaleString("default", { month: "long" })}
                </label>
                <span style={{ marginLeft: "5px" }}></span>
                <label>
                  <span>ปี</span>
                  <span style={{ marginLeft: "5px" }}></span>

                  {new Date(
                    currentDoc.gs12officeProjectApprovalDate
                  ).getFullYear() + 543}
                </label>
              </>
            ) : (
              " ไม่พบข้อมูล"
            )}
            <div className="text-center" style={{ margin: 20 }}>
              <strong>ลายมือชื่อ : </strong>
              {currentDoc.gs12officenameGradOffice || "ไม่พบข้อมูล"}
            </div>
            <div className="input-group mt-3 d-flex justify-content-center">
              <img
                src={currentDoc.gs12officeSign || ""}
                alt="Signature"
                style={{ maxWidth: "300px", maxHeight: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGS12;
