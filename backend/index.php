<?php
include('db_connection.php');

$conn = getDatabaseConnection();
echo json_encode(["status" => "success", "message" => "Connected"]);
