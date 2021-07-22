<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

$name = $_POST['name'];
$phone = $_POST['phone'];
$employee_id = $_POST['employee_id'];
$street = $_POST['street'];
$price = $_POST['price'];
$canal = $_POST['canal'];
$object_id = $_POST['object_id'];

require_once '../lilHelperUsage.php';

$res = $api->addRequestAndCustomer(array(
	'name'    => $name,
	'phone' => array($phone),
	'marktype'   => 8
),array(
	'request_type'   => 19,
	'employee_id'    => $employee_id,
	'status' => 'unselected',
	'fields'         => array(
	        array(
	            'id' => 1586,
	            'value' => $street
	            ),
	        array(
	            'id' => 1587,
	            'value' => $price
	            ),
	        array(
	            'id' => 2135,
	            'value' => $canal
	            ),
	        array(
	            'id' => 2136,
	            'value' => $object_id
	            )
	    )
));

print_r($res['status']);
?>