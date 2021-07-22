<?php
header("Content-type: text/html; charset=utf-8");
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

$name = $_POST['name'];
$phone = $_POST['phone'];
$employee_id = $_POST['employee_id'];
$street = $_POST['street'];
$house = $_POST['house'];
$price = $_POST['price'];
$area = $_POST['area'];
$land_area = $_POST['land_area'];
$canal = $_POST['canal'];
$object_id = $_POST['object_id'];
$agent = $_POST['agent'];
$payform = $_POST['payform'];
$comment = $_POST['comment'];

require_once '../lilHelperUsage.php';

//Список всех fields
$fileds = $api->getCustomerFields();
//print_r($fileds);

$res_id = $api->filterCustomers(array(
    'limit'  => 1,
    'search' => $phone
));

//Выборка всех страниц результата, аналогично example/customer/getAll.php
$id = $res_id['data']['list'][0]['id'];

if ($id > 0) {
	$res = $api->insertRequests(array(
    array(
    'request_type' => 18,
    'customers_id'  => $id,
	'employee_id' => $employee_id,
	'status' => 'unselected',
	'comment' => $comment,
	'fields' => array(
	        array(
	            'id' => 1581,
	            'value' => $street
	            ),
	        array(
	            'id' => 2133,
	            'value' => $house
	            ),
	        array(
	            'id' => 1582,
	            'value' => $price
	            ),
	        array(
	            'id' => 1584,
	            'value' => $area
	            ),
	        array(
	            'id' => 2134,
	            'value' => $land_area
	            ),
	        array(
	            'id' => 2131,
	            'value' => $canal
	            ),
	        array(
	            'id' => 2132,
	            'value' => $object_id
	            ),
	        array(
	            'id' => 2144,
	            'value' => $agent
	            ),
	        array(
	            'id' => 2145,
	            'value' => $payform
	            )
	    )
)));
}
else{
	$res = $api->addRequestAndCustomer(array(
		'name'    => $name,
		'phone' => array($phone),
		'marktype'   => 8
	),array(
		'request_type'   => 18,
		'employee_id' => $employee_id,
		'status' => 'unselected',
		'comment' => $comment,
		'fields'         => array(
		        array(
		            'id' => 1581,
		            'value' => $street
		            ),
		        array(
		            'id' => 2133,
		            'value' => $house
		            ),
		        array(
		            'id' => 1582,
		            'value' => $price
		            ),
		        array(
		            'id' => 1584,
		            'value' => $area
		            ),
		        array(
		            'id' => 2134,
		            'value' => $land_area
		            ),
		        array(
		            'id' => 2131,
		            'value' => $canal
		            ),
		        array(
		            'id' => 2132,
		            'value' => $object_id
		            ),
		        array(
		            'id' => 2144,
		            'value' => $agent
		            ),
		        array(
		            'id' => 2145,
		            'value' => $payform
		            )
		    )
	));
}
print_r($res['status']);
?>