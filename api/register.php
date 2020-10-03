<?php

include "establish_connection.php";

$message = "";

$json = json_decode(file_get_contents("php://input"), true);
$json['password'] = hash($hash_algorithm, $json['password']);
$id = rand(10000000, 99999999);

$query = "INSERT INTO users(username, id, password, email) values('$json[username]', '$id', '$json[password]', '$json[email]')";

$query_result = mysqli_query($connection, $query);

if ($query_result === true) {
	$message = '{"code": 200, "response": "Success", "username": "' . $json['username'] . '", "id": "' . $id . '"}';
} else {
	$message = '{"code": 500, "response": "Failed to register"}';
}

echo json_encode($message);

$connection->close();

?>