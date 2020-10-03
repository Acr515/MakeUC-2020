<?php

include "establish_connection.php";

$response = "";

$json = json_decode(file_get_contents("php://input"), true);
$json['password'] = hash($hash_algorithm, $json['password']);

$safename = $json['username'];
$query = "SELECT * FROM users WHERE username='$safename'";

$query_result = $connection->query($query);

if ($query_result == true) {
	if ($query_result->num_rows > 0) {
		while($row = mysqli_fetch_assoc($query_result)) {
			// Go through each row (even though in this case there really only should be one row)
			if ($row['password'] === $json['password']) {
				// Login successful
				$response = '{"code": 200, "response": "Success", "username": "' . $json['username'] . '", "id": "' . $row['id'] . '"}';
				break;
			} else {
				// Login failed
				$response = '{"code": 400, "response": "Incorrect password"}';
			}
		}
	} else {
		// Response returned no results
		$response = '{"code": 400, "response": "No users with that username"}';
	}
} else {
	// Couldn't connect to the table
	$response = '{"code": 500, "response": "Couldn\'t reach table: ' . $connection->error . '"}';
}

echo json_encode($response);

$connection->close();

?>