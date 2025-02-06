import NavbarStudent from "../Components/NavbarStudent";
function AdvicePage() {
  return (
    <>
      <NavbarStudent />
      <div className="container" style={{ margin: 90, textAlign: "center" }}>
        <img
          src="../../img/img1AdvicePage.png"
          alt="Image 1"
          style={{
            display: "block",
            margin: "0 auto",
            maxWidth: "90%", // ปรับขนาดสูงสุดตามความต้องการ
            height: "auto",
          }}
        />
      </div>
      <div className="container" style={{ textAlign: "center" }}>
        <img
          src="../../img/img2AdvicePage.png"
          alt="Image 2"
          style={{
            display: "block",
            margin: "0 auto",
            maxWidth: "70%", // ปรับขนาดสูงสุดตามความต้องการ
            height: "auto",
          }}
        />
      </div>
    </>
  );
}

export default AdvicePage;
