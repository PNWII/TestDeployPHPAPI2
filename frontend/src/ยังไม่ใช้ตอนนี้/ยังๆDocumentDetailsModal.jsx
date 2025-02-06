import React from "react";
import { Modal, Button, Card } from "react-bootstrap";

const DocumentDetailsModal = ({
  show,
  handleClose,
  currentDoc,
  handleDownload,
  handleDownloadPDF,
}) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Body>
        {currentDoc &&
        currentDoc.name ===
          "คคอ. บว. 10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ" ? (
          <div>
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h5>
                  รายละเอียดข้อมูลในเอกสาร คคอ. บว. 10
                  แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/
                  การศึกษาค้นคว้าอิสระ
                </h5>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light text-dark">
                    <strong>จัดทำโครงการประเภท</strong>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-white"
                    value={currentDoc.projectType || "ไม่พบข้อมูล"}
                    disabled
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light text-dark">
                    <strong>ชื่อโครงการ (ภาษาไทย)</strong>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-white"
                    value={currentDoc.projectThai || "ไม่พบข้อมูล"}
                    disabled
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light text-dark">
                    <strong>ชื่อโครงการ (ภาษาอังกฤษ)</strong>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-white"
                    value={currentDoc.projectEng || "ไม่พบข้อมูล"}
                    disabled
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light text-dark">
                    <strong>
                      มีความประสงค์ขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาซึ่งเป็นการ
                    </strong>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-white"
                    value={currentDoc.advisorType || "ไม่พบข้อมูล"}
                    disabled
                  />
                </div>
                {/* Add other inputs as per original code */}
                <div className="input-group mt-3">
                  <span className="input-group-text bg-light text-dark">
                    <strong>เอกสารที่แนบมา (ถ้ามี)</strong>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-white"
                    value={currentDoc.gs10document || "ไม่มีข้อมูล"}
                    disabled
                  />
                  <button
                    onClick={() =>
                      handleDownload(currentDoc.id, currentDoc.name)
                    }
                    className="btn btn-primary"
                  >
                    ดาวน์โหลดเอกสาร
                  </button>
                </div>
                <div className="text-center" style={{ margin: 20 }}>
                  <strong>ลายมือชื่อ : </strong>
                  {currentDoc.gs10signName || "ไม่มีข้อมูล"}
                </div>
                <div className="input-group mt-3 d-flex justify-content-center">
                  <img
                    src={currentDoc.gs10signature || ""}
                    alt="Signature"
                    style={{ maxWidth: "300px", maxHeight: "200px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : currentDoc &&
          currentDoc.name ===
            "คคอ. บว. 11 แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ" ? (
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h5>
                รายละเอียดข้อมูลในเอกสาร คคอ. บว. 11
                แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ
              </h5>
            </Card.Header>
            <Card.Body>
              {/* Add your content inside the Card.Body as needed */}
            </Card.Body>
          </Card>
        ) : (
          <div>ไม่พบข้อมูลเอกสาร</div>
        )}
      </Modal.Body>
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

//การเลือกใช้ใน mainหลัก
// import DocumentDetailsModal from "./DocumentDetailsModal";

// const MainComponent = () => {
//   const [showModal, setShowModal] = React.useState(false);
//   const [currentDoc, setCurrentDoc] = React.useState(null);

//   const handleCloseDocModal = () => setShowModal(false);
//   const handleShowDocModal = (doc) => {
//     setCurrentDoc(doc);
//     setShowModal(true);
//   };

//   const handleDownload = (id, name) => {
//     // Implement download logic
//   };

//   const handleDownloadPDF = (id, name) => {
//     // Implement download as PDF logic
//   };

//   return (
//     <>
//       {/* Example usage */}
//       <button onClick={() => handleShowDocModal(sampleDoc)}>
//         แสดงเอกสาร
//       </button>

//       <DocumentDetailsModal
//         show={showModal}
//         handleClose={handleCloseDocModal}
//         currentDoc={currentDoc}
//         handleDownload={handleDownload}
//         handleDownloadPDF={handleDownloadPDF}
//       />
//     </>
//   );
// };
