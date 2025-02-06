import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";

const ApprovalModal = ({
  show,
  handleClose,
  formData,
  setFormData,
  handleSignatureEnd,
  handleClearSignature,
  handleSubmitApproval,
  signature,
  sigCanvas,
  currentDoc,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>อนุมัติเอกสาร: {currentDoc?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>ลงชื่อ-นามสกุล</Form.Label>
            <Form.Control
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ความคิดเห็นเพิ่มเติม</Form.Label>
            <Form.Control
              as="textarea"
              name="comment"
              value={formData.comment || ""}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ลงลายมือชื่อ</Form.Label>
            <SignatureCanvas
              ref={sigCanvas}
              onEnd={handleSignatureEnd}
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
          variant="success"
          disabled={!signature || !formData.name || !formData.comment}
          onClick={handleSubmitApproval}
        >
          อนุมัติ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApprovalModal;
