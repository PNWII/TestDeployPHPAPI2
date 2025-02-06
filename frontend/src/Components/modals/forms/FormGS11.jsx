import React from "react";

const FormGS11 = ({ currentDoc, handleDownload }) => {
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
                currentDoc.gs11status?.includes("ได้รับ")
                  ? "bg-success"
                  : currentDoc.gs11status?.includes("ปฏิเสธ")
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {currentDoc.gs11status || "ไม่พบข้อมูล"}
            </span>
          </div>

          <div className="mb-3">
            <strong>วันที่ส่ง: </strong>
            {currentDoc.gs11timeSubmit || "ไม่พบข้อมูล"}
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>
            รายละเอียดข้อมูลในเอกสาร <br />
            คคอ. บว. 11 แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
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
              value={currentDoc.gs11ReportDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ขอเสนอโครงการประเภท</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs11projectType || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ขอเสนอโครงการ เรื่อง (ภาษาไทย)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs11ProjectThai || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ขอเสนอโครงการ เรื่อง (ภาษาอังกฤษ)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs11ProjectEng || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>ได้ลงทะเบียนรายวิชามาแล้ว (จำนวน)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs11subjects || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>หน่วยกิต</strong>
            </span>
            <span className="input-group-text bg-light text-dark">
              <strong>มีคะแนนเฉลี่ยสะสม</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs11gpa || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                ในภาคเรียนการศึกษานี้ได้ลงทะเบียนวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
                (จำนวน)
              </strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs11subjectsProject || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>หน่วยกิต</strong>
            </span>
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
              value={currentDoc.gs11advisorMainNew || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>อาจารย์ที่ปรึกษาร่วม</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs11advisorSecondNew || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>
                เอกสารแนบคำร้องขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษา (คคอ. บว. 10)
              </strong>
            </label>
          </div>
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs11docGs10rp || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() =>
                handleDownload(currentDoc.id, currentDoc.name, "gs11docGs10rp")
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>
          <div className="input-group mt-3">
            <label>
              <strong>
                เอกสารรายละเอียดโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
              </strong>
            </label>
          </div>
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs11docProjectdetails || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() =>
                handleDownload(
                  currentDoc.id,
                  currentDoc.name,
                  "gs11docProjectdetails"
                )
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>
          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gs11signName || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gs11signature || ""}
              alt="Signature"
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGS11;
