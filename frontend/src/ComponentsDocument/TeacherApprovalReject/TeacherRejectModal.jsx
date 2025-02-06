import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";

const RejectModal = ({
  show,
  handleClose,
  rejectFormData,
  setRejectFormData,
  handleRejectSignatureEnd,
  handleClearSignature,
  handleSubmitReject,
  rejectSignature,
  sigCanvas,
  currentDoc,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>ปฏิเสธเอกสาร: {currentDoc?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formRejectName">
            <Form.Label>ลงชื่อ-นามสกุล</Form.Label>
            <Form.Control
              type="text"
              value={rejectFormData.name || ""}
              onChange={(e) =>
                setRejectFormData({ ...rejectFormData, name: e.target.value })
              }
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ความคิดเห็นเพิ่มเติม</Form.Label>
            <Form.Control
              as="textarea"
              name="comment"
              value={rejectFormData.comment || ""}
              onChange={(e) =>
                setRejectFormData({
                  ...rejectFormData,
                  comment: e.target.value,
                })
              }
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ลงลายมือชื่อ</Form.Label>
            <SignatureCanvas
              ref={sigCanvas}
              onEnd={handleRejectSignatureEnd}
              penColor="black"
              canvasProps={{
                width: 455,
                height: 150,
                className: "signature-canvas",
              }}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="secondary" onClick={handleClearSignature}>
              ลบลายมือชื่อ
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          ปิด
        </Button>
        <Button
          variant="danger"
          disabled={
            !rejectSignature || !rejectFormData.name || !rejectFormData.comment
          }
          onClick={handleSubmitReject}
        >
          ปฏิเสธ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RejectModal;
