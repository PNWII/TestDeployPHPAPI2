import NavbarChairpersonCurriculum from "../../Components/NavbarChairpersonCurriculum";
import "./ContactPage.css";
function AboutPageChairpersonCurriculum() {
  return (
    <>
      <NavbarChairpersonCurriculum />
      <div className="contact-container">
        <div className="image-container">
          <div style={{ padding: 30 }} />
          <img
            src="../../img/img1.jpg" // ใส่ URL รูปภาพที่คุณต้องการ
            alt="Contact"
            className="contact-image"
          />
        </div>
        <div className="form-container">
          <h1 className="contact-title">
            คณะครุศาสตร์อุตสาหกรรม Faculty of Technical Education{" "}
          </h1>
          <div className="text-box"></div>
          <form className="contact-form">
            <h>อาคาร 19 ชั้น 3 สำนักงานคณบดีคณะครุศาสตร์อุตสาหกรรม</h>
            <label> มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น </label>
            <label>
              150 ถ.ศรีจันทร์ อ.เมือง จ.ขอนแก่น 40000เบอร์โทรศัพท์ 043-283703{" "}
            </label>
            <label>
              (งานบริหารงานทั่วไป) , 043-283704 (งานบริการการศึกษา) เบอร์โทรสาร
              043-234756
            </label>
            <label>
              เว็บไซต์ : www.fte.rmuti.ac.th E-mail : fte.pqa@gmail.com
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

export default AboutPageChairpersonCurriculum;
