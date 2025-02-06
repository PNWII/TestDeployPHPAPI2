<?php
// ใช้ค่าตัวแปรที่กำหนด
$servername = getenv('Mbtx8be4rqctutdome5rx-mysql.services.clever-cloud.com');
$port = getenv('3306');
$username = getenv('uhvt3d4lzrhcitsk');
$password = getenv('0ix8b3go8Jqts6WruEH6');
$dbname = getenv('btx8be4rqctutdome5rx');

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    error_log("Database connection failed: " . $conn->connect_error);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]);
    exit();
}

// หากเชื่อมต่อสำเร็จ
echo json_encode([
    "status" => "success",
    "message" => "Database connected successfully"
]);
