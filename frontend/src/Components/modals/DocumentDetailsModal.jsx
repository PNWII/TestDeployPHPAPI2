import { Modal, Button } from "react-bootstrap";
import FormGS10 from "./forms/FormGS10";
import FormGS11 from "./forms/FormGS11";
import FormGS12 from "./forms/FormGS12";
import FormGS13 from "./forms/FormGS13";
import FormGS14 from "./forms/FormGS14";
import FormGS15 from "./forms/FormGS15";
import FormGS16 from "./forms/FormGS16";
import FormGS17 from "./forms/FormGS17";
import FormGS18 from "./forms/FormGS18";
import FormGS19 from "./forms/FormGS19";
import FormGS23 from "./forms/FormGS23";

const DocumentDetailsModal = ({
  show,
  handleClose,
  currentDoc,
  handleDownload,
  handleDownloadPDF,
}) => {
  const renderForm = () => {
    switch (currentDoc?.name) {
      case "คคอ. บว. 10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ":
        return (
          <FormGS10 currentDoc={currentDoc} handleDownload={handleDownload} />
        );
      case "คคอ. บว. 11 แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ":
        return (
          <FormGS11 currentDoc={currentDoc} handleDownload={handleDownload} />
        );
      case "คคอ. บว. 12 แบบขอสอบหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ":
        return (
          <FormGS12 currentDoc={currentDoc} handleDownload={handleDownload} />
        );
      case "คคอ. บว. 13 แบบขอส่งโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับแก้ไข":
        return (
          <FormGS13 currentDoc={currentDoc} handleDownload={handleDownload} />
        );
      case "คคอ. บว. 14 แบบขอสอบความก้าวหน้าวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ":
        return (
          <FormGS14 currentDoc={currentDoc} handleDownload={handleDownload} />
        );
      case "คคอ. บว. 15 คำร้องขอสอบป้องกันวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ":
        return (
          <FormGS15 currentDoc={currentDoc} handleDownload={handleDownload} />
        );
      case "คคอ. บว. 16 แบบขอส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์":
        return (
          <FormGS16 currentDoc={currentDoc} handleDownload={handleDownload} />
        );
      case "คคอ. บว. 17 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 1 แบบวิชาการ":
        return (
          <FormGS17 currentDoc={currentDoc} handleDownload={handleDownload} />
        );
      case "คคอ. บว. 18 แบบขอสอบประมวลความรู้":
        return (
          <FormGS18 currentDoc={currentDoc} handleDownload={handleDownload} />
        );
      case "คคอ. บว. 19 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 2 แบบวิชาชีพ":
        return (
          <FormGS19 currentDoc={currentDoc} handleDownload={handleDownload} />
        );
      case "คคอ. บว. 23 แบบขอส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์":
        return (
          <FormGS23 currentDoc={currentDoc} handleDownload={handleDownload} />
        );
      default:
        return <div>ไม่พบข้อมูลเอกสาร</div>;
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Body>{renderForm()}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          ปิด
        </Button>
        {currentDoc && (
          <Button
            variant="success"
            onClick={() => handleDownloadPDF(currentDoc.id, currentDoc.name)}
          >
            ดาวน์โหลดข้อมูลเป็น PDF
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentDetailsModal;
