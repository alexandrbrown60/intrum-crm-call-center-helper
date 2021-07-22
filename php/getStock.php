<?php
header('Content-Type: text/html; charset=utf-8');


require_once '../lilHelperUsage.php'; 


$price = $_POST['price'];
$floor = $_POST['floor'];
$rooms = $_POST['rooms'];
$street = $_POST['street'];
$zhk = $_POST['zhk'];

$typesData = $api->getStockTypes();


$types = array_map(function($item) {
    return $item['id'];
}, $typesData['data']);


$type = $types[0];

$fields = $api->getStockFields();


$myFields = $fields['data'][$type]['fields'];

$list = array();
$total = null;
$page = 1;

while (true) {
    $data = $api->getStockByFilter(array(
        'type'  => $type,
        'page'  => $page,
        'limit' => 500, 
        'fields' => array(
            array(
                'id' => 470,
                'value' => $price
                ),
            array(
                'id' => 1522,
                'value' => 'Наша база'
            ),
            array(
                'id' => 667,
                'value' => $street
            ),
            array(
                'id' => 446,
                'value' => $rooms
                ),
            array(
                'id' => 448,
                'value' => $floor
                ),
            array(
                'id' => 1464,
                'value' => $zhk
                )
        )
    ));
    
    $page ++;
    
    $list = array_merge($list, (array)$data['data']['list']);
    
    if($total === null){
        $total = $data['data']['count'];
    }
    
    if(!$data['data']['list'] || count($data['data']['list'])<500 || $page>200){
        break;
    }
}

foreach ($list as $key => $item) {
    foreach ($item['fields'] as $fieldKey => $field) {
        if ($field['type'] == 'file') {
            $list[$key]['fields'][$fieldKey]['value'] = $api->getStockUrlPhoto($field['value']);
        }
        $list[$key]['fields'][$fieldKey]['name'] = $fields['data'][$type]['fields'][$field['id']]['name'];

    }
    print_r('<p><input name="property" id="pr-line" value="'.$list[$key]['id'].', '.$list[$key]['author'].'" type="radio"> <a href="https://kluch.intrumnet.com/crm/tools/exec/stock/'.$list[$key]['id'].'#stock" target="_blank">'.$list[$key]['id'].'</a>, '.$list[$key]['name'].'</p>');
}

echo $total;
echo PHP_EOL;
//print_r($list[0]);

?>