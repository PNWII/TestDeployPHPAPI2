import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import GS10Edit from "./EditDoc/GS10Edit";
import GS11Edit from "./EditDoc/GS11Edit";
import GS12Edit from "./EditDoc/GS12Edit";
import GS13Edit from "./EditDoc/GS13Edit";
import GS14Edit from "./EditDoc/GS14Edit";
import GS15Edit from "./EditDoc/GS15Edit";
import GS16Edit from "./EditDoc/GS16Edit";
import GS17Edit from "./EditDoc/GS17Edit";
import GS18Edit from "./EditDoc/GS18Edit";
import GS19Edit from "./EditDoc/GS19Edit";
import GS23Edit from "./EditDoc/GS23Edit";

const HistoryDocumentStudentEdit = ({
  show,
  onHide,
  editingDocument,
  setEditingDocument,
  handleEditSubmit,
}) => {
  const [advisors, setAdvisors] = useState([]);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await axios.get(
          "http://localhost/TestPHP-API2/backend/getAdvisors.php"
        );
        setAdvisors(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching advisors:", error);
        setAdvisors([]);
      }
    };
    fetchAdvisors();
  }, []);

  // ฟังก์ชันสำหรับตรวจสอบการเปลี่ยนแปลงข้อมูล
  const handleInputChange = (field, value) => {
    setEditingDocument({
      ...editingDocument,
      [field]: value,
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <h5>
          แก้ไขเอกสาร : <br />
          {editingDocument ? editingDocument.documentType : ""}
        </h5>
      </Modal.Header>
      <Modal.Body>
        {editingDocument ? (
          <Form>
            {editingDocument.documentType.includes(
              "คคอ. บว. 10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
            ) && (
              <GS10Edit
                editingDocument={editingDocument}
                handleInputChange={handleInputChange}
                advisors={advisors}
              />
            )}
            {editingDocument.documentType.includes(
              "คคอ. บว. 11 แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
            ) && (
              <GS11Edit
                editingDocument={editingDocument}
                handleInputChange={handleInputChange}
                advisors={advisors}
              />
            )}
            {editingDocument.documentType.includes(
              "คคอ. บว. 12 แบบขอสอบหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
            ) && (
              <GS12Edit
                editingDocument={editingDocument}
                handleInputChange={handleInputChange}
                advisors={advisors}
              />
            )}
            {editingDocument.documentType.includes(
              "คคอ. บว. 13 แบบขอส่งโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับแก้ไข"
            ) && (
              <GS13Edit
                editingDocument={editingDocument}
                handleInputChange={handleInputChange}
                advisors={advisors}
              />
            )}
            {editingDocument.documentType.includes(
              "คคอ. บว. 14 แบบขอสอบความก้าวหน้าวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
            ) && (
              <GS14Edit
                editingDocument={editingDocument}
                handleInputChange={handleInputChange}
                advisors={advisors}
              />
            )}
            {editingDocument.documentType.includes(
              "คคอ. บว. 15 คำร้องขอสอบป้องกันวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ"
            ) && (
              <GS15Edit
                editingDocument={editingDocument}
                handleInputChange={handleInputChange}
                advisors={advisors}
              />
            )}
            {editingDocument.documentType.includes(
              "คคอ. บว. 16 แบบขอส่งเล่มวิทยานิพนธ์ฉบับสมบูรณ์"
            ) && (
              <GS16Edit
                editingDocument={editingDocument}
                handleInputChange={handleInputChange}
                advisors={advisors}
              />
            )}
            {editingDocument.documentType.includes(
              "คคอ. บว. 17 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 1 แบบวิชาการ"
            ) && (
              <GS17Edit
                editingDocument={editingDocument}
                handleInputChange={handleInputChange}
                advisors={advisors}
              />
            )}
            {editingDocument.documentType.includes(
              "คคอ. บว. 18 แบบขอสอบประมวลความรู้"
            ) && (
              <GS18Edit
                editingDocument={editingDocument}
                handleInputChange={handleInputChange}
                advisors={advisors}
              />
            )}
            {editingDocument.documentType.includes(
              "คคอ. บว. 19 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 2 แบบวิชาชีพ"
            ) && (
              <GS19Edit
                editingDocument={editingDocument}
                handleInputChange={handleInputChange}
                advisors={advisors}
              />
            )}
            {editingDocument.documentType.includes(
              "คคอ. บว. 23 แบบขอส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์"
            ) && (
              <GS23Edit
                editingDocument={editingDocument}
                handleInputChange={handleInputChange}
                advisors={advisors}
              />
            )}
          </Form>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          ยกเลิก
        </Button>
        <Button
          variant="primary"
          onClick={handleEditSubmit}
          disabled={!editingDocument}
        >
          ยืนยันการแก้ไข
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HistoryDocumentStudentEdit;
