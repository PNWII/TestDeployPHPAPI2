function Validation(values, formType) {
  let error = {};

  // รายการฟิลด์ที่ต้องตรวจสอบตามประเภทของฟอร์ม
  const fields = {
    registerStudent: {
      idstdStudent: "กรุณาใส่รหัสนักศึกษา",
      prefixStudent: "กรุณาใส่คำนำหน้าชื่อผู้ลงทะเบียน ภาษาไทย",
      nameStudent: "กรุณาใส่ชื่อผู้ลงทะเบียน ภาษาไทย",
      prefixStudentEng: "กรุณาใส่คำนำหน้าชื่อผู้ลงทะเบียน ภาษาอังกฤษ",
      nameStudentEng: "กรุณาใส่ชื่อผู้ลงทะเบียน ภาษาอังกฤษ",
      studyplanStudent: "กรุณาใส่แผนการเรียน",
      majorStudent: "กรุณาใส่สาขาวิชา",
      branchStudent: "กรุณาใส่สาขา",
      abbreviateStudent: "กรุณาใส่อักษรย่อสาขาวิชา",
      addressStudent: "กรุณาใส่ที่อยู่",
      telStudent: "กรุณาใส่เบอร์โทรศัพท์",
      emailStudent: "กรุณาใส่อีเมล",
      passwordStudent: "กรุณาใส่รหัสผ่าน",
    },
    registerTeacher: {
      prefixTeacher: "กรุณาใส่คำนำหน้าชื่อผู้ลงทะเบียน",
      nameTeacher: "กรุณาใส่ชื่อผู้ลงทะเบียน",
      telTeacher: "กรุณาใส่เบอร์โทรศัพท์",
      emailTeacher: "กรุณาใส่อีเมล",
      passwordTeacher: "กรุณาใส่รหัสผ่าน",
      typeTeacher: "กรุณาเลือกตำแหน่งหน้าที่ส่วนงาน",
    },
    loginStudent: {
      idstdStudent: "กรุณาใส่รหัสนักศึกษา",
      emailStudent: "กรุณาใส่อีเมล",
      passwordStudent: "กรุณาใส่รหัสผ่าน",
    },
  };

  // ตรวจสอบว่ามีฟิลด์ของฟอร์มที่ตรงกับประเภทที่กำหนดหรือไม่
  if (!fields[formType]) {
    console.error(
      `Validation error: formType "${formType}" is not recognized.`
    );
    return { formType: "*Invalid form type" };
  }

  // เลือกรายการฟิลด์ที่ต้องตรวจสอบ
  const formFields = fields[formType];

  // ตรวจสอบว่า values เป็น object
  if (!values || typeof values !== "object") {
    console.error("Validation error: values must be an object", values);
    return { values: "*Invalid input values" };
  }

  // ตรวจสอบแต่ละฟิลด์ในฟอร์ม
  Object.keys(formFields).forEach((key) => {
    if (!values[key]) {
      error[key] = formFields[key];
    }
  });

  return error;
}

export default Validation;
