import React from "react";

const FormGS15 = ({ currentDoc, handleDownload }) => {
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
                currentDoc.gs15status?.includes("ได้รับ")
                  ? "bg-success"
                  : currentDoc.gs15status?.includes("ปฏิเสธ")
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {currentDoc.gs15status || "ไม่พบข้อมูล"}
            </span>
          </div>

          <div className="mb-3">
            <strong>วันที่ส่ง: </strong>
            {currentDoc.gs15timeSubmit || "ไม่พบข้อมูล"}
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>
            รายละเอียดข้อมูลในเอกสาร <br />
            คคอ. บว. 15 คำร้องขอสอบป้องกันวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
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
              value={currentDoc.gs15ReportDate || "ไม่พบข้อมูล"}
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
              value={currentDoc.gs15projectType || "ไม่พบข้อมูล"}
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
              value={currentDoc.gs15ProjectThai || "ไม่พบข้อมูล"}
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
              value={currentDoc.gs15ProjectEng || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                ได้รับอนุมัติหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ (เมื่อวันที่
                / เดือน / ปี)
              </strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15projectApprovalDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                สอบความก้าวหน้าวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ (เมื่อวันที่ /
                เดือน / ปี)
              </strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15projectProgressDate || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>
                มีความประสงค์ขอสอบป้องกันโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระในวันและเวลา
                ดังนี้
              </strong>
            </label>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>วันที่</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15defenseRequestDate || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>เวลา</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15defenseRequestTime || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>น.</strong>
            </span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>สถานที่ขอสอบความก้าวหน้า ณ ห้อง</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15defenseRequestRoom || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>ชั้น</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15defenseRequestFloor || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>อาคาร</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15defenseRequestBuilding || "ไม่พบข้อมูล"}
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
              value={currentDoc.gs15advisorMainNew || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>อาจารย์ที่ปรึกษาร่วม</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15advisorSecondNew || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <label>
              <strong>
                ข้าพเจ้าได้ดำเนินการตามข้อบังคับฯ มหาวิทยาลัย
                ว่าด้วยการศึกาาระดับบัณฑิตศึกษา หมวดที่ 9 <br />
                การสำเร็จการศึกษาฯ แล้วคือ
              </strong>
            </label>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>จำนวนรายวิชาในหลักสูตรที่เรียนไปแล้ว</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15courseCredits || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>หน่วยกิต</strong>
            </span>
            <span className="input-group-text bg-light text-dark">
              <strong>ได้คะแนนเฉลี่ยสะสม</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15cumulativeGPA || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                และได้รับการประเมินวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ (จำนวน)
              </strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15thesisCredits || "ไม่พบข้อมูล"}
              disabled
            />
            <span className="input-group-text bg-light text-dark">
              <strong>หน่วยกิต</strong>
            </span>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                เอกสารวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับสอบ สำหรับคณะกรรมการ
                (ชุด)
              </strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15thesisDefenseDoc || "ไม่พบข้อมูล"}
              disabled
            />
          </div>
          <div className="input-group mt-3">
            <span className="input-group-text bg-light text-dark">
              <strong>เอกสารแผนการเรียน (คคอ. บว. 40/41)</strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15docGs40rpGs41rp || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() =>
                handleDownload(
                  currentDoc.id,
                  currentDoc.name,
                  "gs15docGs40rpGs41rp"
                )
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>

          <div className="input-group mt-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                เอกสารขอส่งผลงานที่ได้นำเสนอ/ตีพิมพ์ (คคอ. บว. 50)
              </strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15docGs50rp || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() =>
                handleDownload(currentDoc.id, currentDoc.name, "gs15docGs50rp")
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>

          <div className="input-group mt-3">
            <span className="input-group-text bg-light text-dark">
              <strong>
                เอกสารโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับสอบ{" "}
              </strong>
            </span>
            <input
              type="text"
              className="form-control bg-white"
              value={currentDoc.gs15docThesisExamCopy || "ไม่พบข้อมูล"}
              disabled
            />
            <button
              onClick={() =>
                handleDownload(
                  currentDoc.id,
                  currentDoc.name,
                  "gs15docThesisExamCopy"
                )
              }
              className="btn btn-primary"
            >
              ดาวน์โหลดเอกสาร
            </button>
          </div>
          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gs15signName || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gs15signature || ""}
              alt="Signature"
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>บันทึกความเห็นของประธานคณะกรรมการบริหารหลักสูตร</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>
              จาก ประธานคณะกรรมการบริหารหลักสูตร (
              {currentDoc.gs15ccnameChairpersonCurriculum || "ไม่พบข้อมูล"})
            </strong>
          </div>
          <div className="mb-3">
            <strong>เรียน คณบดีคณะครุศาสตร์อุตสาหกรรม</strong>
          </div>
          <div className="mb-3">
            ประธานคณะกรรมการบริหารหลักสูตร ได้พิจารณาคุณสมบัติแล้ว
            พร้อมขอเสนอชื่อคณะกรรมการสอบป้องกันโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
            ดังนี้
          </div>
          <div className="mb-1">
            <strong>1. ประธานกรรมการสอบ</strong>
          </div>
          <div className="row">
            <div className="col">
              <p>
                ชื่อ - นามสกุล: {currentDoc.gs15ccexamChair || "ไม่พบข้อมูล"}
              </p>
            </div>
            <div className="col">
              <p>
                ตำแหน่ง (บริหาร/วิชาการ):{" "}
                {currentDoc.gs15ccexamChairPosition || "ไม่พบข้อมูล"}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                สถานที่ทำงาน:{" "}
                {currentDoc.gs15ccexamChairWorkplace || "ไม่พบข้อมูล"}
              </p>
            </div>
            <div className="col">
              <p>
                เบอร์โทรศัพท์: {currentDoc.gs15ccexamChairTel || "ไม่พบข้อมูล"}
              </p>
            </div>
          </div>

          <div className="mb-1">
            <strong>2. กรรมการสอบ (อาจารย์ที่ปรึกษาหลัก)</strong>
          </div>
          <div className="row">
            <div className="col">
              <p>
                ชื่อ - นามสกุล:{" "}
                {currentDoc.gs15ccexamAdvisorMain || "ไม่พบข้อมูล"}
              </p>
            </div>
            <div className="col">
              <p>
                ตำแหน่ง (บริหาร/วิชาการ):{" "}
                {currentDoc.gs15ccexamAdvisorMainPosition || "ไม่พบข้อมูล"}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                สถานที่ทำงาน:{" "}
                {currentDoc.gs15ccexamAdvisorMainWorkplace || "ไม่พบข้อมูล"}
              </p>
            </div>
            <div className="col">
              <p>
                เบอร์โทรศัพท์:{" "}
                {currentDoc.gs15ccexamAdvisorMainTel || "ไม่พบข้อมูล"}
              </p>
            </div>
          </div>
          <div className="mb-1">
            <strong>3. กรรมการสอบ (อาจารย์ที่ปรึกษาร่วม)</strong>
          </div>
          <div className="row">
            <div className="col">
              <p>
                ชื่อ - นามสกุล:{" "}
                {currentDoc.gs15ccexamAdvisorSecond || "ไม่พบข้อมูล"}
              </p>
            </div>
            <div className="col">
              <p>
                ตำแหน่ง (บริหาร/วิชาการ):{" "}
                {currentDoc.gs15ccexamAdvisorSecondPosition || "ไม่พบข้อมูล"}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                สถานที่ทำงาน:{" "}
                {currentDoc.gs15ccexamAdvisorSecondWorkplace || "ไม่พบข้อมูล"}
              </p>
            </div>
            <div className="col">
              <p>
                เบอร์โทรศัพท์:{" "}
                {currentDoc.gs15ccexamAdvisorSecondTel || "ไม่พบข้อมูล"}
              </p>
            </div>
          </div>

          <div className="mb-1">
            <strong>4. กรรมการสอบ (อาจารย์กรรมการประจำหลักสูตร)</strong>
          </div>
          <div className="row">
            <div className="col">
              <p>
                ชื่อ - นามสกุล:{" "}
                {currentDoc.gs15ccexamCurriculum || "ไม่พบข้อมูล"}
              </p>
            </div>
            <div className="col">
              <p>
                ตำแหน่ง (บริหาร/วิชาการ):{" "}
                {currentDoc.gs15ccexamCurriculumPosition || "ไม่พบข้อมูล"}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                สถานที่ทำงาน:{" "}
                {currentDoc.gs15ccexamCurriculumWorkplace || "ไม่พบข้อมูล"}
              </p>
            </div>
            <div className="col">
              <p>
                เบอร์โทรศัพท์:{" "}
                {currentDoc.gs15ccexamCurriculumTel || "ไม่พบข้อมูล"}
              </p>
            </div>
          </div>
          <label>
            <strong className="text-danger">
              โปรดลงนามในคำสั่ง หนังสือเชิญคณะกรรมการสอบและหนังสือแจ้งต้นสังกัด
            </strong>
          </label>
          <div className="text-center" style={{ margin: 20 }}>
            <strong>ลายมือชื่อ : </strong>
            {currentDoc.gs15ccnameChairpersonCurriculum || "ไม่พบข้อมูล"}
          </div>
          <div className="input-group mt-3 d-flex justify-content-center">
            <img
              src={currentDoc.gs15ccsign || ""}
              alt="Signature"
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGS15;
