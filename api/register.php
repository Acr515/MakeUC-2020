<?php

include "config.php";

header("Access-Control-Allow-Origin: *");

$message = "";

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
	die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents("php://input"), true);

$query = "INSERT INTO users(username, password, email) values('$json[username]', '$json[password]', '$json[email]')";

$query_result = $connection->query($query);

if ($query_result === true) {
	$message = '{"response": "Success"}';
} else {
	$message = "Nah shit broke, try that again";
}

echo json_encode($message);

$connection->close();

?>