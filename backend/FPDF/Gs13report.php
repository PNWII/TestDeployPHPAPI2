<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require('fpdf.php');
include('../db_connection.php');

if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(["error" => "Missing or empty 'id' query parameter."]);
    exit;
}


$docId = $_GET['id'];
function fetchDocumentById($docId)
{
    global $conn;

    $stmt = $conn->prepare("
    SELECT 
        s.name_student,
        s.major_student,
        s.branch_student,
        s.prefix_student,
        s.id_studyplan,
        sp.name_studyplan,
        s.abbreviate_student,
        s.address_student,
        s.email_student,
        s.tel_student,
        s.idstd_student,
        gs13.id_gs13report,
        gs13.name_gs13report,
        gs13.projectType_gs13report,
        gs13.projectThai_gs13report,
        gs13.projectEng_gs13report,
        gs13.advisorMain_gs13report,
        gs13.advisorSecond_gs13report,
        gs13.revisionDateAdvisor_gs13report,
        gs13.status_gs13report,
        gs13.at_gs13report,
        gs13.signature_gs13report,
        gs13.date_gs13report,
        gs13.signName_gs13report
    FROM 
        gs13report gs13
    LEFT JOIN 
        student s ON gs13.idstd_student = s.idstd_student
    LEFT JOIN 
        studyplan sp ON s.id_studyplan = sp.id_studyplan
    WHERE 
        gs13.id_gs13report = ?
");

    $stmt->bind_param("s", $docId);
    $stmt->execute();
    $result = $stmt->get_result();

    return $result->fetch_assoc();
}
// ฟังก์ชันดึงข้อมูลจากตาราง teachersigna
function fetchTeacherSignaturesByDocId($docId)
{
    global $conn;

    $stmt = $conn->prepare("
    SELECT 
        teachersign_IdDocs,
        teachersign_nameTeacher,
        teachersign_sign
    FROM 
        teachersigna
    WHERE 
        teachersign_IdDocs = ?
    ");

    $stmt->bind_param("s", $docId);
    $stmt->execute();
    $result = $stmt->get_result();

    $teacherSignatures = [];
    while ($row = $result->fetch_assoc()) {
        $teacherSignatures[] = $row;  // เก็บข้อมูลลายเซ็นครูในอาร์เรย์
    }

    return $teacherSignatures;
}
function fetchChairpersonCurriculumSignaturesByDocId($docId)
{
    global $conn;

    $stmt = $conn->prepare("
    SELECT 
        ccurrsigna_IdDocs,
        ccurrsigna_nameDocs,
        ccurrsigna_nameChairpersonCurriculum,
        ccurrsigna_description,
        ccurrsigna_sign,
        ccurrsigna_status,
        ccurrsigna_at
    FROM 
        ccurrsigna
    WHERE 
        ccurrsigna_IdDocs = ?
    ");

    $stmt->bind_param("s", $docId);
    $stmt->execute();
    $result = $stmt->get_result();

    $chairpersoncurriculumSignatures = [];
    while ($row = $result->fetch_assoc()) {
        // แปลงวันที่ timestamp เป็นรูปแบบวันที่ไทย
        $timestamp = strtotime($row['ccurrsigna_at']); // แปลง timestamp
        $thai_months = [
            "01" => "มกราคม",
            "02" => "กุมภาพันธ์",
            "03" => "มีนาคม",
            "04" => "เมษายน",
            "05" => "พฤษภาคม",
            "06" => "มิถุนายน",
            "07" => "กรกฎาคม",
            "08" => "สิงหาคม",
            "09" => "กันยายน",
            "10" => "ตุลาคม",
            "11" => "พฤศจิกายน",
            "12" => "ธันวาคม"
        ];

        $thai_day = date('d', $timestamp);
        $thai_month = $thai_months[date('m', $timestamp)];
        $thai_year = date('Y', $timestamp) + 543; // เพิ่ม 543 เพื่อให้เป็นปีไทย

        $thai_date_formattedchairpersoncurriculum = "วันที่ $thai_day เดือน $thai_month พ.ศ. $thai_year"; // วันที่ในรูปแบบไทย

        // เพิ่มข้อมูลลายเซ็นและวันที่ที่แปลงแล้ว
        $row['thai_date_formattedchairpersoncurriculum'] = $thai_date_formattedchairpersoncurriculum;

        // แปลง Base64 เป็นไฟล์ PNG
        $signatureDatachairpersoncurriculum = $row['ccurrsigna_sign'];  // ถ้าคุณใช้ชื่อ 'ccurrsigna_sign' สำหรับลายเซ็น
        $signatureImagechairpersoncurriculum = 'signature_chairpersoncurriculum.png';
        if (strpos($signatureDatachairpersoncurriculum, 'data:image/png;base64,') === 0) {
            $signatureData = str_replace('data:image/png;base64,', '', $signatureDatachairpersoncurriculum);
            file_put_contents($signatureImagechairpersoncurriculum, base64_decode($signatureData));  // บันทึกไฟล์ PNG
        }

        // เพิ่มข้อมูลลงในอาร์เรย์
        $chairpersoncurriculumSignatures[] = $row;
    }

    return $chairpersoncurriculumSignatures;
}

function fetchGraduateOfficerSignaturesByDocId($docId)
{
    global $conn;

    // Check if the connection is valid
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("
    SELECT 
        gradofficersignGs13_IdDocs,
        gradofficersignGs13_nameDocs,
        gradofficersignGs13_nameGradOffice,
        gradofficersignGs13_description,
        gradofficersignGs13_sign,
        gradofficersignGs13_status,
        gradofficersignGs13_at
    FROM 
        gradofficersigngs13
    WHERE 
        gradofficersignGs13_IdDocs = ?
    ");

    if (!$stmt) {
        die("SQL prepare failed: " . $conn->error);
    }

    $stmt->bind_param("s", $docId);
    $stmt->execute();
    $result = $stmt->get_result();

    $GraduateOfficerSignatures = [];

    while ($row = $result->fetch_assoc()) {
        $thai_months = [
            "01" => "มกราคม",
            "02" => "กุมภาพันธ์",
            "03" => "มีนาคม",
            "04" => "เมษายน",
            "05" => "พฤษภาคม",
            "06" => "มิถุนายน",
            "07" => "กรกฎาคม",
            "08" => "สิงหาคม",
            "09" => "กันยายน",
            "10" => "ตุลาคม",
            "11" => "พฤศจิกายน",
            "12" => "ธันวาคม"
        ];

        // แปลงวันที่ใน gradofficersignGs13_at
        $timestamp_at = strtotime($row['gradofficersignGs13_at']);
        $thai_day_at = date('d', $timestamp_at);
        $thai_month_at = $thai_months[date('m', $timestamp_at)];
        $thai_year_at = date('Y', $timestamp_at) + 543;

        $thai_date_formattedGraduateOfficer = "วันที่ $thai_day_at เดือน $thai_month_at พ.ศ. $thai_year_at";
        $row['thai_date_formattedGraduateOfficer'] = $thai_date_formattedGraduateOfficer;

        // จัดการข้อมูลลายเซ็น
        $signatureDataGraduateOfficer = $row['gradofficersignGs13_sign'];
        if (strpos($signatureDataGraduateOfficer, 'data:image/png;base64,') === 0) {
            $signatureData = str_replace('data:image/png;base64,', '', $signatureDataGraduateOfficer);
            $uniqueFileName = 'signature_GraduateOfficer_' . uniqid() . '.png';
            file_put_contents($uniqueFileName, base64_decode($signatureData));
            $row['signature_file_path'] = $uniqueFileName;
        }

        $GraduateOfficerSignatures[] = $row;
    }

    return $GraduateOfficerSignatures;
}



function fetchAcademicResearchAssociateDeanSignaturesByDocId($docId)
{
    global $conn;

    $stmt = $conn->prepare("
    SELECT 
        vdAcrsign_IdDocs,
        vdAcrsign_nameDocs,
        vdAcrsign_nameViceDeanAcademicResearch,
        vdAcrsign_description,
        vdAcrsign_sign,
        vdAcrsign_status,
        vdAcrsign_at
    FROM 
        vdacrsign
    WHERE 
        vdAcrsign_IdDocs = ?
    ");

    $stmt->bind_param("s", $docId);
    $stmt->execute();
    $result = $stmt->get_result();

    $AcademicResearchAssociateDeanSignatures = [];

    while ($row = $result->fetch_assoc()) {
        // แปลงวันที่ timestamp เป็นรูปแบบวันที่ไทย
        $timestamp = strtotime($row['vdAcrsign_at']);
        $thai_months = [
            "01" => "มกราคม",
            "02" => "กุมภาพันธ์",
            "03" => "มีนาคม",
            "04" => "เมษายน",
            "05" => "พฤษภาคม",
            "06" => "มิถุนายน",
            "07" => "กรกฎาคม",
            "08" => "สิงหาคม",
            "09" => "กันยายน",
            "10" => "ตุลาคม",
            "11" => "พฤศจิกายน",
            "12" => "ธันวาคม"
        ];

        $thai_day = date('d', $timestamp);
        $thai_month = $thai_months[date('m', $timestamp)];
        $thai_year = date('Y', $timestamp) + 543;

        $thai_date_formattedAcademicResearchAssociateDean = "วันที่ $thai_day เดือน $thai_month พ.ศ. $thai_year";

        $row['thai_date_formattedAcademicResearchAssociateDean'] = $thai_date_formattedAcademicResearchAssociateDean;

        // แปลง Base64 เป็นไฟล์ PNG และสร้างชื่อไฟล์แบบไดนามิก
        $signatureDataAcademicResearchAssociateDean = $row['vdAcrsign_sign'];
        if (strpos($signatureDataAcademicResearchAssociateDean, 'data:image/png;base64,') === 0) {
            $signatureData = str_replace('data:image/png;base64,', '', $signatureDataAcademicResearchAssociateDean);
            $uniqueFileName = 'signature_AcademicResearchAssociateDean_' . uniqid() . '.png';
            file_put_contents($uniqueFileName, base64_decode($signatureData));
            $row['signature_file_path'] = $uniqueFileName; // เก็บชื่อไฟล์ในข้อมูล
        }

        $AcademicResearchAssociateDeanSignatures[] = $row;
    }

    return $AcademicResearchAssociateDeanSignatures;
}
function fetchIndustrialEducationDeanSignaturesByDocId($docId)
{
    global $conn;

    $stmt = $conn->prepare("
    SELECT 
        deanfiesign_IdDocs,
        deanfiesign_nameDocs,
        deanfiesign_nameDeanIndEdu,
        deanfiesign_description,
        deanfiesign_sign,
        deanfiesign_status,
        deanfiesign_at
    FROM 
        deanfiesign
    WHERE 
        deanfiesign_IdDocs = ?
    ");

    $stmt->bind_param("s", $docId);
    $stmt->execute();
    $result = $stmt->get_result();

    $IndustrialEducationDeanSignatures = [];

    while ($row = $result->fetch_assoc()) {
        // แปลงวันที่ timestamp เป็นรูปแบบวันที่ไทย
        $timestamp = strtotime($row['deanfiesign_at']);
        $thai_months = [
            "01" => "มกราคม",
            "02" => "กุมภาพันธ์",
            "03" => "มีนาคม",
            "04" => "เมษายน",
            "05" => "พฤษภาคม",
            "06" => "มิถุนายน",
            "07" => "กรกฎาคม",
            "08" => "สิงหาคม",
            "09" => "กันยายน",
            "10" => "ตุลาคม",
            "11" => "พฤศจิกายน",
            "12" => "ธันวาคม"
        ];

        $thai_day = date('d', $timestamp);
        $thai_month = $thai_months[date('m', $timestamp)];
        $thai_year = date('Y', $timestamp) + 543;

        $thai_date_formattedIndustrialEducationDean = "วันที่ $thai_day เดือน $thai_month พ.ศ. $thai_year";

        $row['thai_date_formattedIndustrialEducationDean'] = $thai_date_formattedIndustrialEducationDean;

        // แปลง Base64 เป็นไฟล์ PNG และสร้างชื่อไฟล์แบบไดนามิก
        $signatureDataIndustrialEducationDean = $row['deanfiesign_sign'];
        if (strpos($signatureDataIndustrialEducationDean, 'data:image/png;base64,') === 0) {
            $signatureData = str_replace('data:image/png;base64,', '', $signatureDataIndustrialEducationDean);
            $uniqueFileName = 'signature_IndustrialEducationDean_' . uniqid() . '.png';
            file_put_contents($uniqueFileName, base64_decode($signatureData));
            $row['signature_file_path'] = $uniqueFileName; // เก็บชื่อไฟล์ในข้อมูล
        }

        $IndustrialEducationDeanSignatures[] = $row;
    }

    return $IndustrialEducationDeanSignatures;
}

//ดึงข้อมูลลายเซ็นจากคณบดีครุศาสตร์
$IndustrialEducationDeanSignatures = fetchIndustrialEducationDeanSignaturesByDocId($docId);

//ดึงข้อมูลลายเซ็นรองคณบดี
$AcademicResearchAssociateDeanSignatures = fetchAcademicResearchAssociateDeanSignaturesByDocId($docId);

//ดึงข้อมูลลายเซ็นเจ้าหน้าบัณฑิต
$graduateOfficerSignatures = fetchGraduateOfficerSignaturesByDocId($docId);

//ดึงข้อมูลลายเซ็นประธานหลักสูตร
$chairpersoncurriculumSignatures = fetchChairpersonCurriculumSignaturesByDocId($docId);
//print_r($chairpersoncurriculumSignatures);

// ดึงข้อมูลลายเซ็นครู
$teacherSignatures = fetchTeacherSignaturesByDocId($docId);

// Fetch the document data
$document = fetchDocumentById($docId);

if ($document) {
    function convertToThaiDate($original_date)
    {
        if (!$original_date) {
            return '';
        }

        $timestamp = strtotime($original_date);
        $thai_months = [
            "01" => "มกราคม",
            "02" => "กุมภาพันธ์",
            "03" => "มีนาคม",
            "04" => "เมษายน",
            "05" => "พฤษภาคม",
            "06" => "มิถุนายน",
            "07" => "กรกฎาคม",
            "08" => "สิงหาคม",
            "09" => "กันยายน",
            "10" => "ตุลาคม",
            "11" => "พฤศจิกายน",
            "12" => "ธันวาคม"
        ];

        $thai_day = date('d', $timestamp);
        $thai_month = $thai_months[date('m', $timestamp)];
        $thai_year = date('Y', $timestamp) + 543;

        return "วันที่ $thai_day เดือน $thai_month พ.ศ. $thai_year";
    }

    // แปลงวันที่ทั้งสอง
    $date1_thai = convertToThaiDate($document['date_gs13report'] ?? '');
    $date2_thai = convertToThaiDate($document['revisionDateAdvisor_gs13report'] ?? '');

    /// แปลง Base64 เป็นไฟล์ PNG
    $signatureData = $document['signature_gs13report'];
    $signatureImage = 'signature_temp.png';
    if (strpos($signatureData, 'data:image/png;base64,') === 0) {
        $signatureData = str_replace('data:image/png;base64,', '', $signatureData);
    }
    file_put_contents($signatureImage, base64_decode($signatureData));

    class PDF extends FPDF
    {
        function CheckBox($x, $y, $size = 4)
        {
            $this->Rect($x, $y, $size, $size);
        }

        function checkboxMark($checked = TRUE, $checkbox_size = 5, $ori_font_family = 'Arial', $ori_font_size = 10, $ori_font_style = '')
        {
            if ($checked == TRUE)
                $check = chr(51); // Use character 51 from ZapfDingbats for check mark
            else
                $check = "";

            $this->SetFont('ZapfDingbats', '', $ori_font_size);
            $this->Cell($checkbox_size, $checkbox_size, $check, 1, 0);
            $this->SetFont($ori_font_family, $ori_font_style, $ori_font_size);
        }
    }
    $pdf = new FPDF();
    $pdf = new PDF();

    // Add Thai font 
    $pdf->AddFont('THSarabunNew', '', 'THSarabunNew.php');
    $pdf->AddFont('THSarabunNew', 'B', 'THSarabunNew_b.php');
    $pdf->AddPage('P', 'A4');

    $pdf->SetFillColor(192);
    $pdf->Image('img/logo.png', 15, 5, 15, 0);



    $pdf->SetXY(170, 15);
    $pdf->SetFont('THSarabunNew', 'B', 14);
    $pdf->Cell(10, 10, iconv('UTF-8', 'cp874', 'คคอ. บว. 13'));
    $pdf->SetXY(150, 8);
    $pdf->SetFont('THSarabunNew', '', 12);
    $pdf->Cell(0, 37, iconv('UTF-8', 'cp874', 'คณะครุศาสตร์อุตสาหกรรม มทร.อีสาน'));
    $pdf->SetXY(50, 42);
    $pdf->SetFont('THSarabunNew', 'B', 18);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', 'แบบขอส่งโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับแก้ไข'));

    $pdf->SetXY(190, 51.5);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $date1_thai), 0, 1, 'R');

    $pdf->SetXY(20, 62);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', 'เรื่อง'));
    $pdf->SetXY(35, 57);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(0, 10, iconv('UTF-8', 'cp874', 'ขอส่งโครงการ'));

    $pdf->SetXY(60, 60);
    $pdf->checkboxMark($document['projectType_gs13report'] == 'วิทยานิพนธ์', 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  วิทยานิพนธ์'), 0, 1, 'L');

    $pdf->SetXY(90, 60);
    $pdf->checkboxMark($document['projectType_gs13report'] == 'การศึกษาค้นคว้าอิสระ', 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  การศึกษาค้นคว้าอิสระ '), 0, 1, 'L');

    $pdf->SetXY(133, 57);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(0, 10, iconv('UTF-8', 'cp874', 'ฉบับแก้ไข'));

    $pdf->SetXY(20, 64);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(15, 10, iconv('UTF-8', 'cp874', 'เรียน'));
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'คณบดีคณะครุศาสตร์อุตสาหกรรม'));

    $pdf->SetXY(20, 77);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', 'สิ่งที่ส่งมาด้วย'));
    $pdf->SetXY(48, 72);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(0, 10, iconv('UTF-8', 'cp874', 'โครงการ'));

    $pdf->SetXY(66, 75);
    $pdf->checkboxMark(false, 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  วิทยานิพนธ์'), 0, 1, 'L');

    $pdf->SetXY(95, 75);
    $pdf->checkboxMark(false, 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  การศึกษาค้นคว้าอิสระ (คคอ. บว. 21)'), 0, 1, 'L');

    $pdf->SetXY(x: 80, y: 91.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['name_student']));
    $pdf->SetXY(x: 155, y: 91.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['idstd_student']));
    $pdf->SetXY(32, 87);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', "ข้าพเจ้า (" . $document['prefix_student'] . ")............................................................................รหัสประจำตัว................................................"));

    $pdf->SetXY(20, 94);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(10, 10, iconv('UTF-8', 'cp874', 'นักศึกษาระดับปริญญาโท         แผน 1 แบบวิชาการ'));

    $pdf->SetXY(102, 97);
    $pdf->checkboxMark($document['name_studyplan'] == 'แผนที่ 1 แบบวิชาการ ภาคปกติ', 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  ภาคปกติ'), 0, 1, 'L');

    $pdf->SetXY(125, 97);
    $pdf->checkboxMark($document['name_studyplan'] == 'แผนที่ 1 แบบวิชาการ ภาคสมทบ', 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  ภาคสมทบ'), 0, 1, 'L');

    $pdf->SetXY(68.5, 101);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(10, 10, iconv('UTF-8', 'cp874', 'แผน 2 แบบวิชาชีพ'));

    $pdf->SetXY(102, 104);
    $pdf->checkboxMark($document['name_studyplan'] == 'แผนที่ 2 แบบวิชาชีพ ภาคปกติ', 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  ภาคปกติ'), 0, 1, 'L');

    $pdf->SetXY(125, 104);
    $pdf->checkboxMark($document['name_studyplan'] == 'แผนที่ 2 แบบวิชาชีพ ภาคสมทบ', 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  ภาคสมทบ'), 0, 1, 'L');

    $pdf->SetXY(x: 38, y: 112.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['major_student']));
    $pdf->SetXY(x: 95, y: 112.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874',  $document['branch_student']));
    $pdf->SetXY(x: 178, y: 112.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['abbreviate_student']));
    $pdf->SetXY(20, 108);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'สาขาวิชา......................................................สาขา................................................................อักษรย่อสาขาวิชา.................'));

    $pdf->SetXY(x: 60, y: 119.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['address_student']));
    $pdf->SetXY(20, 115);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'ที่อยู่ที่ติดต่อได้โดยสะดวก...................................................................................................................................................'));
    $pdf->SetXY(x: 35, y: 126.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['email_student']));
    $pdf->SetXY(x: 150, y: 126.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874',  $document['tel_student']));
    $pdf->SetXY(20, 122);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'E-mail:......................................................................................หมายเลขโทรศัพท์ มือถือ..................................................'));

    $pdf->SetXY(20, 137);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(10, 10, iconv('UTF-8', 'cp874', 'มีความประสงค์ขอส่งโครงงาน'));

    $pdf->SetXY(68, 140);
    $pdf->checkboxMark($document['projectType_gs13report'] == 'วิทยานิพนธ์', 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  วิทยานิพนธ์'), 0, 1, 'L');

    $pdf->SetXY(97, 140);
    $pdf->checkboxMark($document['projectType_gs13report'] == 'การศึกษาค้นคว้าอิสระ', 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  การศึกษาค้นคว้าอิสระ'), 0, 1, 'L');

    $pdf->SetXY(139, 137);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(10, 10, iconv('UTF-8', 'cp874', 'ฉบับแก้ไข'));
    $pdf->SetXY(158, 137);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(10, 10, iconv('UTF-8', 'cp874', 'ซึ่งได้แก้ไขปรับปรุงตาม'));

    // $pdf->SetXY(x:117, y:148.5); $pdf->SetFont('THSarabunNew','',16); $pdf->Cell(2,0, iconv('UTF-8', 'cp874', '28'));
    // $pdf->SetXY(x:140, y:148.5); $pdf->SetFont('THSarabunNew','',16); $pdf->Cell(2,0, iconv('UTF-8', 'cp874', 'มกราคม'));
    $pdf->SetXY(x: 105.5, y: 149);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $date2_thai));
    $pdf->SetXY(20, 144);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'ข้อเสนอแนะของอาจารย์ที่ปรึกษาในการสอบโครงการ เมื่อ '));

    $pdf->SetXY(45, 154);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(10, 10, iconv('UTF-8', 'cp874', 'อาจารย์ที่ปรึกษา'));

    $pdf->SetXY(75, 157);
    $pdf->checkboxMark($document['projectType_gs13report'] == 'วิทยานิพนธ์', 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  วิทยานิพนธ์'), 0, 1, 'L');

    $pdf->SetXY(103, 157);
    $pdf->checkboxMark($document['projectType_gs13report'] == 'การศึกษาค้นคว้าอิสระ', 4, 'THSarabunNew', 16);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  การศึกษาค้นคว้าอิสระ ลงชื่อให้ความเห็นชอบ'), 0, 1, 'L');

    $pdf->SetXY(x: 37, y: 167.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['advisorMain_gs13report']));
    foreach ($teacherSignatures as $index => $teacherSignature) {
        $teacherSignatureData = $teacherSignature['teachersign_sign'];
        if (strpos($teacherSignatureData, 'data:image/png;base64,') === 0) {
            $teacherSignatureData = str_replace('data:image/png;base64,', '', $teacherSignatureData);
        }
        $teacherImage = 'signature_temp_teacher' . ($index + 1) . '.png';
        file_put_contents($teacherImage, base64_decode($teacherSignatureData));

        if (getimagesize($teacherImage) === false) {
            unlink($teacherImage);
            die("Error: Not a valid PNG file for teacher " . $teacherSignature['teachersign_nameTeacher']);
        }

        if ($teacherSignature['teachersign_nameTeacher'] === $document['advisorMain_gs13report']) {
            if (file_exists($teacherImage)) {
                $pdf->Image($teacherImage, 145, 163, 30, 0, 'PNG');
            } else {
                $pdf->Cell(0, 10, iconv('UTF-8', 'cp874', 'ไม่พบลายเซ็นของอาจารย์ ' . $teacherSignature['teachersign_nameTeacher']), 0, 1, 'C');
            }
        }

        if (file_exists($teacherImage)) {
            unlink($teacherImage);
        }
    }
    $pdf->SetXY(30, 163);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '1. ..........................................................................อาจารย์ที่ปรึกษาหลัก ลงชื่อ......................................................'));
    $pdf->SetXY(x: 37, y: 174.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['advisorSecond_gs13report']));
    foreach ($teacherSignatures as $index => $teacherSignature) {
        $teacherSignatureData = $teacherSignature['teachersign_sign'];
        if (strpos($teacherSignatureData, 'data:image/png;base64,') === 0) {
            $teacherSignatureData = str_replace('data:image/png;base64,', '', $teacherSignatureData);
        }
        $teacherImage = 'signature_temp_teacher' . ($index + 1) . '.png';
        file_put_contents($teacherImage, base64_decode($teacherSignatureData));

        if (getimagesize($teacherImage) === false) {
            unlink($teacherImage);
            die("Error: Not a valid PNG file for teacher " . $teacherSignature['teachersign_nameTeacher']);
        }

        if ($teacherSignature['teachersign_nameTeacher'] === $document['advisorSecond_gs13report']) {
            if (file_exists($teacherImage)) {
                $pdf->Image($teacherImage, 145, 167, 30, 0, 'PNG');
            } else {
                $pdf->Cell(0, 10, iconv('UTF-8', 'cp874', 'ไม่พบลายเซ็นของอาจารย์ ' . $teacherSignature['teachersign_nameTeacher']), 0, 1, 'C');
            }
        }

        if (file_exists($teacherImage)) {
            unlink($teacherImage);
        }
    }
    $pdf->SetXY(30, 170);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '2. .........................................................................อาจารย์ที่ปรึกษาร่วม  ลงชื่อ.......................................................'));

    $pdf->SetXY(33, 183);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'จึงเรียนมาเพื่อโปรดพิจารณา'));
    if (file_exists($signatureImage)) {
        $pdf->Image($signatureImage, 130, 200, 30, 0, 'PNG');
    } else {
        $pdf->Cell(0, 10, iconv('UTF-8', 'cp874', 'ไม่พบลายเซ็น'), 0, 1, 'C');
    }

    $pdf->SetXY(110, 207);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'ลงชื่อ.................................................................'));
    $pdf->SetXY(x: 130, y: 217.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['name_student']));
    $pdf->SetXY(118, 213);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '(.............................................................)'));

    $pdf->SetXY(20, 207);
    $pdf->SetFont('THSarabunNew', 'b', 12);
    $pdf->Cell(-85, 45, iconv('UTF-8', 'cp874', 'หมายเหตุ'));

    $pdf->SetXY(35, 207);
    $pdf->SetFont('THSarabunNew', '', 12);
    $pdf->Cell(-85, 45, iconv('UTF-8', 'cp874', '1. ให้อาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ลงนามบนปกหน้าของเอกสารโครงการวิทยานิพนธ์ (คคอ. บว. 13)'));
    $pdf->SetXY(35, 212);
    $pdf->SetFont('THSarabunNew', '', 12);
    $pdf->Cell(-85, 45, iconv('UTF-8', 'cp874', '    ฉบับแก้ไขด้วย'));

    $pdf->SetXY(35, 217);
    $pdf->SetFont('THSarabunNew', '', 12);
    $pdf->Cell(-85, 45, iconv('UTF-8', 'cp874', '2. โครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับแก้ไขต้องดำเนินการให้แล้วเสร็จภายใน 30 วัน นับจากวันสอบหัวข้อ'));
    $pdf->SetXY(35, 222);
    $pdf->SetFont('THSarabunNew', '', 12);
    $pdf->Cell(-85, 45, iconv('UTF-8', 'cp874', '    วิทยานิพนธ์/การศึกษาค้นคว้าอิสระ'));

    $pdf->SetXY(165, 231);
    $pdf->SetFont('THSarabunNew', '', 12);
    $pdf->Cell(-85, 45, iconv('UTF-8', 'cp874', '/...ความเห็นประธาน...'));

    ///////---------------------------- Page 2
    $pdf->AddPage();
    $pdf->SetXY(20, 30);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', 'ความเห็นของประธานคณะกรรมการบริหารหลักสูตร'));

    $pdf->SetXY(25, 37);
    $pdf->checkboxMark(
        isset($chairpersoncurriculumSignatures[0]['ccurrsigna_status']) &&
            $chairpersoncurriculumSignatures[0]['ccurrsigna_status'] == 'ได้รับการอนุมัติจากประธานคณะกรรมการบริหารหลักสูตรแล้ว',
        4,
        'THSarabunNew',
        16
    );
    $pdf->SetXY(30, 39);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', 'เห็นสมควรอนุมัติให้ดำเนินการต่อไปได้'));

    if (
        isset($chairpersoncurriculumSignatures[0]['ccurrsigna_status']) &&
        $chairpersoncurriculumSignatures[0]['ccurrsigna_status'] == 'ถูกปฏิเสธจากประธานคณะกรรมการบริหารหลักสูตรแล้ว'
    ) {
        $pdf->SetXY(25, 45);
        $pdf->checkboxMark(true, 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  อื่น ๆ.....................................................................................................................................................................'), 0, 1, 'L');

        $description = isset($chairpersoncurriculumSignatures[0]['ccurrsigna_description']) ? $chairpersoncurriculumSignatures[0]['ccurrsigna_description'] : '';
        $pdf->SetXY(x: 45, y: 46.5);
        $pdf->SetFont('THSarabunNew', '', 16);
        $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $description));
    } else {
        $pdf->SetXY(25, 45);
        $pdf->checkboxMark(false, 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  อื่น ๆ.....................................................................................................................................................................'), 0, 1, 'L');
    }
    $pdf->SetXY(20, 51);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  ........................................................................................................................................................................................'), 0, 1, 'L');

    foreach ($chairpersoncurriculumSignatures as $signature) {
        $signatureImagechairpersoncurriculum = 'signature_chairpersoncurriculum.png';
        $pdf->Image($signatureImagechairpersoncurriculum, 126, 52, 40);
    }
    $pdf->SetXY(110, 55);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'ลงชื่อ..............................................................................'));
    $chairpersonName = isset($chairpersoncurriculumSignatures[0]['ccurrsigna_nameChairpersonCurriculum']) ? $chairpersoncurriculumSignatures[0]['ccurrsigna_nameChairpersonCurriculum'] : '';
    $pdf->SetXY(x: 130, y: 65.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $chairpersonName));
    $pdf->SetXY(118, 61);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '(............................................................................)'));
    $pdf->SetXY(123, 73);
    $pdf->SetFont('THSarabunNew', '', 16);
    foreach ($chairpersoncurriculumSignatures as $signature) {
        $thai_date_formattedchairpersoncurriculum = $signature['thai_date_formattedchairpersoncurriculum'];
        $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $thai_date_formattedchairpersoncurriculum), 0, 1, 'L');
    }

    $pdf->SetXY(20, 80);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', 'บันทึกเจ้าหน้าที่บัณฑิตศึกษาคณะฯ'));
    $pdf->SetXY(20, 88);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', 'เรียน คณบดีคณะครุศาสตร์อุตสาหกรรม'));
    if (
        isset($graduateOfficerSignatures[0]['gradofficersignGs13_status']) &&
        $graduateOfficerSignatures[0]['gradofficersignGs13_status'] == 'ได้รับการอนุมัติจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว'
    ) {


        $pdf->SetXY(25, 95);
        $pdf->checkboxMark(true, 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  ได้ดำเนินการตรวจสอบเรียบร้อยแล้ว เห็นสมควรอนุมัติ พร้อมนี้ได้แนบประกาศอนุมัติหัวข้อและ'), 0, 1, 'L');
        $pdf->SetXY(29, 102);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  โครงการ'), 0, 1, 'L');

        $pdf->SetXY(50, 102);
        $pdf->checkboxMark($document['projectType_gs13report'] == 'วิทยานิพนธ์', 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  วิทยานิพนธ์'), 0, 1, 'L');
        $pdf->SetXY(80, 102);
        $pdf->checkboxMark($document['projectType_gs13report'] == 'การศึกษาค้นคว้าอิสระ', 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  การศึกษาค้นคว้าอิสระ    มาเพื่อโปรดพิจารณาลงชื่อ'), 0, 1, 'L');
        $pdf->SetXY(25, 109);
        $pdf->checkboxMark(false, 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  อื่น ๆ.....................................................................................................................................................................'), 0, 1, 'L');
    }
    if (
        isset($graduateOfficerSignatures[0]['gradofficersignGs13_status']) &&
        $graduateOfficerSignatures[0]['gradofficersignGs13_status'] == 'ถูกปฏิเสธจากเจ้าหน้าที่บัณฑิตศึกษาแล้ว'
    ) {
        $pdf->SetXY(25, 95);
        $pdf->checkboxMark(false, 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  ได้ดำเนินการตรวจสอบเรียบร้อยแล้ว เห็นสมควรอนุมัติ พร้อมนี้ได้แนบประกาศอนุมัติหัวข้อและ'), 0, 1, 'L');
        $pdf->SetXY(29, 102);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  โครงการ'), 0, 1, 'L');
        $pdf->SetXY(50, 102);
        $pdf->checkboxMark(false, 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  วิทยานิพนธ์'), 0, 1, 'L');
        $pdf->SetXY(80, 102);
        $pdf->checkboxMark(false, 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  การศึกษาค้นคว้าอิสระ    มาเพื่อโปรดพิจารณาลงชื่อ'), 0, 1, 'L');
        $pdf->SetXY(25, 109);
        $pdf->checkboxMark(true, 4, 'THSarabunNew', 16);
        $gradofficersignGs13Description = isset($graduateOfficerSignatures[0]['gradofficersignGs13_description']) ? $graduateOfficerSignatures[0]['gradofficersignGs13_description'] : '';
        $pdf->SetXY(x: 45, y: 110.5);
        $pdf->SetFont('THSarabunNew', '', 16);
        $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $gradofficersignGs13Description));
        $pdf->SetXY(29, 109);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  อื่น ๆ.....................................................................................................................................................................'), 0, 1, 'L');
    }
    $pdf->SetXY(20, 116);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  ........................................................................................................................................................................................'), 0, 1, 'L');


    // $pdf->SetXY(x:130, y:124.5); $pdf->SetFont('THSarabunNew','',16); $pdf->Cell(2,0, iconv('UTF-8', 'cp874', 'hdbdhkj@gmail.com'));
    if (is_array($graduateOfficerSignatures) || is_object($graduateOfficerSignatures)) {
        foreach ($graduateOfficerSignatures as $signature) {
            if (!empty($signature['signature_file_path']) && file_exists($signature['signature_file_path'])) {
                // แสดงรูปภาพลายเซ็นใน PDF
                $pdf->Image($signature['signature_file_path'], 127, 115, 40);

                // ลบไฟล์หลังจากแสดงผล
                unlink($signature['signature_file_path']);
            } else {
                error_log('Signature file does not exist: ' . $signature['signature_file_path']);
            }
        }
    } else {
        error_log('graduateOfficerSignatures is null or not valid.');
    }
    $pdf->SetXY(110, 120);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'ลงชื่อ..............................................................................'));
    $GradOfficeName = isset($graduateOfficerSignatures[0]['gradofficersignGs13_nameGradOffice'])
        ? $graduateOfficerSignatures[0]['gradofficersignGs13_nameGradOffice'] : '';
    $pdf->SetXY(x: 130, y: 131.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $GradOfficeName));
    $pdf->SetXY(118, 127);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '(............................................................................)'));
    $pdf->SetXY(123, 139);
    $pdf->SetFont('THSarabunNew', '', 16);
    if (is_array($graduateOfficerSignatures) || is_object($graduateOfficerSignatures)) {
        foreach ($graduateOfficerSignatures as $signature) {
            $thai_date_formattedGraduateOfficer = $signature['thai_date_formattedGraduateOfficer'];


            $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $thai_date_formattedGraduateOfficer));
        }
    } else {
        error_log('graduateOfficerSignatures is null or not valid. Please check the data source.');
    }
    $pdf->SetXY(20, 151);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', 'ความเห็นของรองคณบดีฝ่ายวิชาการและวิจัย'));
    $pdf->SetXY(25, 156);
    $pdf->checkboxMark(
        isset($AcademicResearchAssociateDeanSignatures[0]['vdAcrsign_status']) &&
            $AcademicResearchAssociateDeanSignatures[0]['vdAcrsign_status'] == 'ได้รับการอนุมัติจากรองคณบดีฝ่ายวิชาการและวิจัยแล้ว',
        4,
        'THSarabunNew',
        16
    );
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  เห็นควรอนุมัติ'), 0, 1, 'L');

    if (
        isset($AcademicResearchAssociateDeanSignatures[0]['vdAcrsign_status']) &&
        $AcademicResearchAssociateDeanSignatures[0]['vdAcrsign_status'] == 'ถูกปฏิเสธจากรองคณบดีฝ่ายวิชาการและวิจัยแล้ว'
    ) {

        // $pdf->SetXY(25, 162);
        // $pdf->checkboxMark(true, 4, 'THSarabunNew', 16);

        $AcademicResearchAssociateDeanDescription = isset($AcademicResearchAssociateDeanSignatures[0]['vdAcrsign_description']) ? $AcademicResearchAssociateDeanSignatures[0]['vdAcrsign_description'] : '';
        $pdf->SetXY(x: 45, y: 163.5);
        $pdf->SetFont('THSarabunNew', '', 16);
        $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $AcademicResearchAssociateDeanDescription));
        $pdf->SetXY(25, 162);
        $pdf->checkboxMark(true, 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  อื่น ๆ.....................................................................................................................................................................'), 0, 1, 'L');
    } else {
        $pdf->SetXY(25, 162);
        $pdf->checkboxMark(false, 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  อื่น ๆ.....................................................................................................................................................................'), 0, 1, 'L');
    }
    // $pdf->SetXY(x:45, y:163.5); $pdf->SetFont('THSarabunNew','',16); $pdf->Cell(2,0, iconv('UTF-8', 'cp874', 'hdbdhkj@gmail.com'));    

    // $pdf->SetXY(x:30, y:169.5); $pdf->SetFont('THSarabunNew','',16); $pdf->Cell(2,0, iconv('UTF-8', 'cp874', 'hdbdhkj@gmail.com'));    
    $pdf->SetXY(20, 170);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', '..........................................................................................................................................................................................'));

    // $pdf->SetXY(x:130, y:176.5); $pdf->SetFont('THSarabunNew','',16); $pdf->Cell(2,0, iconv('UTF-8', 'cp874', 'hdbdhkj@gmail.com'));
    if (is_array($AcademicResearchAssociateDeanSignatures) || is_object($AcademicResearchAssociateDeanSignatures)) {
        foreach ($AcademicResearchAssociateDeanSignatures as $signature) {
            if (!empty($signature['signature_file_path']) && file_exists($signature['signature_file_path'])) {
                // แสดงรูปภาพลายเซ็นใน PDF
                $pdf->Image($signature['signature_file_path'], 130, 172, 40);

                // ลบไฟล์ทันทีหลังจากแสดงผล
                unlink($signature['signature_file_path']);
            } else {
                error_log('Signature file does not exist: ' . $signature['signature_file_path']);
            }
        }
    } else {
        error_log('AcademicResearchAssociateDeanSignatures is not an array or object.');
    }
    $pdf->SetXY(110, 172);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'ลงชื่อ....................................................................'));
    $pdf->SetXY(118, 178);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '(ผู้ช่วยศาสตราจารย์ ดร.เฉลิมพล บุญทศ)'));
    $pdf->SetXY(125, 185);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'รองคณบดีฝ่ายวิชาการและวิจัย'));
    $pdf->SetXY(123, 197);
    $pdf->SetFont('THSarabunNew', '', 16);
    if (is_array($AcademicResearchAssociateDeanSignatures) || is_object($AcademicResearchAssociateDeanSignatures)) {
        foreach ($AcademicResearchAssociateDeanSignatures as $signature) {
            $thai_date_formattedAcademicResearchAssociateDean = $signature['thai_date_formattedAcademicResearchAssociateDean'];
            $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $thai_date_formattedAcademicResearchAssociateDean), 0, 1, 'L');
        }
    } else {
        error_log('AcademicResearchAssociateDeanSignatures is null or not valid. Please check the data source.');
    }

    $pdf->SetXY(20, 206);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', 'ความเห็นของคณบดีคณะครุศาสตร์อุตสาหกรรม'));
    $pdf->SetXY(25, 211);
    $pdf->checkboxMark(
        isset($IndustrialEducationDeanSignatures[0]['deanfiesign_status']) &&
            $IndustrialEducationDeanSignatures[0]['deanfiesign_status'] == 'ได้รับการอนุมัติจากคณบดีคณะครุศาสตร์อุตสาหกรรมแล้ว',
        4,
        'THSarabunNew',
        16
    );
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  อนุมัติ'), 0, 1, 'L');
    if (
        isset($IndustrialEducationDeanSignatures[0]['deanfiesign_status']) &&
        $IndustrialEducationDeanSignatures[0]['deanfiesign_status'] == 'ถูกปฏิเสธจากคณบดีคณะครุศาสตร์อุตสาหกรรมแล้ว'
    ) {

        $IndustrialEducationDeanDescription = isset($IndustrialEducationDeanSignatures[0]['deanfiesign_description']) ?
            $IndustrialEducationDeanSignatures[0]['deanfiesign_description'] : '';
        $pdf->SetXY(x: 45, y: 218.5);
        $pdf->SetFont('THSarabunNew', '', 16);
        $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $IndustrialEducationDeanDescription));

        $pdf->SetXY(25, 217);
        $pdf->checkboxMark(true, 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  อื่น ๆ.....................................................................................................................................................................'), 0, 1, 'L');
    } else {
        $pdf->SetXY(25, 217);
        $pdf->checkboxMark(false, 4, 'THSarabunNew', 16);
        $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  อื่น ๆ.....................................................................................................................................................................'), 0, 1, 'L');
    }

    $pdf->SetXY(20, 225);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', '..........................................................................................................................................................................................'));

    // $pdf->SetXY(x:130, y:231.5); $pdf->SetFont('THSarabunNew','',16); $pdf->Cell(2,0, iconv('UTF-8', 'cp874', 'hdbdhkj@gmail.com'));  
    if (is_array($IndustrialEducationDeanSignatures) || is_object($IndustrialEducationDeanSignatures)) {
        foreach ($IndustrialEducationDeanSignatures as $signature) {
            if (!empty($signature['signature_file_path']) && file_exists($signature['signature_file_path'])) {
                // แสดงรูปภาพลายเซ็นใน PDF
                $pdf->Image($signature['signature_file_path'], 128, 224, 40);

                // ลบไฟล์ทันทีหลังจากแสดงผล
                unlink($signature['signature_file_path']);
            } else {
                error_log('Signature file does not exist: ' . $signature['signature_file_path']);
            }
        }
    } else {
        error_log('IndustrialEducationDeanSignatures is not an array or object.');
    }
    $pdf->SetXY(110, 227);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'ลงชื่อ....................................................................'));
    $pdf->SetXY(121, 233);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '(ผู้ช่วยศาสตราจารย์ประพันธ์  ยาวระ)'));
    $pdf->SetXY(124, 240);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'คณบดีคณะครุศาสตร์อุตสาหกรรม'));
    $pdf->SetXY(123, 252);
    $pdf->SetFont('THSarabunNew', '', 16);
    if (is_array($IndustrialEducationDeanSignatures) || is_object($IndustrialEducationDeanSignatures)) {
        foreach ($IndustrialEducationDeanSignatures as $signature) {
            $thai_date_formattedIndustrialEducationDean = $signature['thai_date_formattedIndustrialEducationDean'];
            $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $thai_date_formattedIndustrialEducationDean), 0, 1, 'L');
        }
    } else {
        error_log('IndustrialEducationDeanSignatures is null or not valid. Please check the data source.');
    }


    //----------------------------------page 3 -------------------------------------------------------------------///
    $pdf->AddPage();
    $pdf->SetFillColor(192);
    $pdf->Image('img/logo.png', 15, 5, 15, 0);


    $pdf->SetXY(170, 15);
    $pdf->SetFont('THSarabunNew', 'B', 14);
    $pdf->Cell(10, 10, iconv('UTF-8', 'cp874', 'คคอ. บว. 21'));
    $pdf->SetXY(150, 8);
    $pdf->SetFont('THSarabunNew', '', 12);
    $pdf->Cell(0, 37, iconv('UTF-8', 'cp874', 'คณะครุศาสตร์อุตสาหกรรม มทร.อีสาน'));
    $pdf->SetXY(85, 50);
    $pdf->SetFont('THSarabunNew', 'B', 18);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', 'แบบฟอร์มเสนอโครงการ'));
    $pdf->SetXY(50, 57);
    $pdf->checkboxMark($document['projectType_gs13report'] == 'วิทยานิพนธ์', 4, 'THSarabunNew', 18);
    $pdf->SetFont('THSarabunNew', 'B', 18);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  วิทยานิพนธ์'), 0, 1, 'L');
    $pdf->SetXY(85, 57);
    $pdf->checkboxMark($document['projectType_gs13report'] == 'การศึกษาค้นคว้าอิสระ', 4, 'THSarabunNew', 18);
    $pdf->SetFont('THSarabunNew', 'B', 18);
    $pdf->Cell(0, 4, iconv('UTF-8', 'cp874', '  การศึกษาค้นคว้าอิสระ ฉบับแก้ไข'), 0, 1, 'L');
    $pdf->SetXY(30, 68);
    $pdf->SetFont('THSarabunNew', 'B', 18);
    $pdf->Cell(0, 0, iconv('UTF-8', 'cp874', 'คณะครุศาสตร์อุตสาหกรรม มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น'));

    $pdf->SetXY(20, 80);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'ชื่อเรื่อง (ภาษาไทย)'));
    $pdf->SetXY(60, 85);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['projectThai_gs13report']));
    $pdf->SetXY(50, 80.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '.......................................................................................................................................................'));
    // $pdf->SetXY(x:30, y:93.5); $pdf->SetFont('THSarabunNew','',16); $pdf->Cell(2,0, iconv('UTF-8', 'cp874', '่ไม่ขอออกความเห็น'));
    $pdf->SetXY(20, 89);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '.........................................................................................................................................................................................'));
    // $pdf->SetXY(x:30, y:101.5); $pdf->SetFont('THSarabunNew','',16); $pdf->Cell(2,0, iconv('UTF-8', 'cp874', '่ไม่ขอออกความเห็น'));
    $pdf->SetXY(20, 97);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '.........................................................................................................................................................................................'));

    $pdf->SetXY(20, 112);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'ชื่อเรื่อง (ภาษาอังกฤษ)'));

    $pdf->SetXY(x: 60, y: 117);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['projectEng_gs13report']));
    $pdf->SetXY(55, 112.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '.................................................................................................................................................'));
    // $pdf->SetXY(x:30, y:125.5); $pdf->SetFont('THSarabunNew','',16); $pdf->Cell(2,0, iconv('UTF-8', 'cp874', '่ไม่ขอออกความเห็น'));
    $pdf->SetXY(20, 121);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '.........................................................................................................................................................................................'));

    // $pdf->SetXY(x:30, y:133.5); $pdf->SetFont('THSarabunNew','',16); $pdf->Cell(2,0, iconv('UTF-8', 'cp874', '่ไม่ขอออกความเห็น'));
    $pdf->SetXY(20, 129);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '.........................................................................................................................................................................................'));

    $pdf->SetXY(x: 90, y: 179.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['name_student']));
    $pdf->SetXY(105, 167);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'ผู้เสนอ'));
    $pdf->SetXY(80, 175);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '..................................................................................'));

    $pdf->SetXY(x: 110, y: 187.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['idstd_student']));
    $pdf->SetXY(80, 183);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'รหัสประจำตัว'));
    $pdf->SetXY(101, 183);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '  ........................................................'));

    $pdf->SetXY(x: 110, y: 195.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['major_student']));
    $pdf->SetXY(80, 191);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'สาขาวิชา'));
    $pdf->SetXY(103, 191);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '.........................................................'));


    $pdf->SetXY(x: 120, y: 244.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['advisorMain_gs13report']));
    $pdf->SetXY(x: 120, y: 252.5);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(2, 0, iconv('UTF-8', 'cp874', $document['advisorSecond_gs13report']));
    $pdf->SetXY(80, 240);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'อาจารย์ที่ปรึกษาหลัก....................................................................................'));
    $pdf->SetXY(80, 248);
    $pdf->SetFont('THSarabunNew', 'B', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', 'อาจารย์ที่ปรึกษาร่วม......................................................................................'));
    $pdf->SetXY(155, 266);
    $pdf->SetFont('THSarabunNew', '', 16);
    $pdf->Cell(20, 10, iconv('UTF-8', 'cp874', '/ ...รายละเอียด...'));



    $pdf->Output();

    unlink($signatureImage);
    unlink($signatureImagechairpersoncurriculum);
    unlink($signatureImageAcademicResearchAssociateDean);
} else {
    echo json_encode(["error" => "Document not found."]);
}
