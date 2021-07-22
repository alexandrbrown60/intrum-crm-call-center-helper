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
$floor = $_POST['floor'];
$area = $_POST['area'];
$canal = $_POST['canal'];
$comment = $_POST['comment'];
$agent = $_POST['agent'];
$object_id = $_POST['object_id'];

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

if ($id > 0){$res = $api->insertRequests(array(
    array(
       'request_type'  => 17,
       'customers_id'  => $id,
       'employee_id'    => $employee_id,
		'status' => 'unselected',
		'comment' => $comment,
       'fields'         => array(
		        array(
		            'id' => 1575,
		            'value' => $street
		            ),
		        array(
		            'id' => 2128,
		            'value' => $house
		            ),
		        array(
		            'id' => 1576,
		            'value' => $price
		            ),
		        array(
		            'id' => 1578,
		            'value' => $floor
		            ),
		        array(
		            'id' => 1577,
		            'value' => $area
		            ),
		        array(
		            'id' => 2129,
		            'value' => $canal
		            ),
		        array(
		            'id' => 2130,
		            'value' => $object_id
		            ),
		        array(
		            'id' => 2143,
		            'value' => $agent
		            )     
		    )
    )
));
}
else{
	$res = $api->addRequestAndCustomer(array(
		'name'    => $name,
		'phone' => array($phone),
		'marktype'   => 8
	),array(
		'request_type'   => 17,
		'employee_id'    => $employee_id,
		'status' => 'unselected',
		'comment' => $comment,
		'fields'         => array(
		        array(
		            'id' => 1575,
		            'value' => $street
		            ),
		        array(
		            'id' => 2128,
		            'value' => $house
		            ),
		        array(
		            'id' => 1576,
		            'value' => $price
		            ),
		        array(
		            'id' => 1578,
		            'value' => $floor
		            ),
		        array(
		            'id' => 1577,
		            'value' => $area
		            ),
		        array(
		            'id' => 2129,
		            'value' => $canal
		            ),
		        array(
		            'id' => 2130,
		            'value' => $object_id
		            ),
		        array(
		            'id' => 2143,
		            'value' => $agent
		            )     
		    )
	));
}
print_r($res['status']);
?>