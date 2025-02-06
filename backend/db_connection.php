<?php
function getDatabaseConnection()
{
    $servername = "btx8be4rqctutdome5rx-mysql.services.clever-cloud.com";
    $port = 3306;
    $username = "uhvt3d4lzrhcitsk";
    $password = "0ix8b3go8Jqts6WruEH6";
    $dbname = "btx8be4rqctutdome5rx";

    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    if ($conn->connect_error) {
        die(json_encode([
            "status" => "error",
            "message" => "Database connection failed: " . $conn->connect_error
        ]));
    }
    return $conn;
}
