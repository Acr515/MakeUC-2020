<?php

include "config.php";

header("Access-Control-Allow-Origin: *");

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
	die("Connection failed: " . $connection->connect_error);
}

?>