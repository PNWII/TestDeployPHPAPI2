<?php
// รวมไฟล์เชื่อมต่อฐานข้อมูล
include 'backend/db_connection.php'; // หรือ path ที่เหมาะสมตามโครงสร้างโปรเจกต์

// ทดสอบการเชื่อมต่อ
$conn = getDatabaseConnection();
if ($conn) {
    echo "Connected successfully to the database!";
} else {
    echo "Database connection failed!";
}
