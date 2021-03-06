<?php
header('Content-Type: text/html; charset=utf-8');
// выборка объектов базы данных (продуктов) с фильтром по определенному полю
// например, все объекты с ценой больше 30 000

require_once '../lilHelperUsage.php'; //настройте данный конфигурационный файл

//Обрабатываем данные с AJAX запроса
$price = $_POST['price'];
$street = $_POST['street'];

$typesData = $api->getStockTypes();

//Массив id всех типов
$types = array_map(function($item) {
    return $item['id'];
}, $typesData['data']);

//Получить список типов
$type = $types[3]; //Выьираем четвертый тип
//Выборка всех существующих полей
$fields = $api->getStockFields();

//Поля объектов
$myFields = $fields['data'][$type]['fields'];

$list = array();
$total = null;
$page = 1;

while (true) {
    $data = $api->getStockByFilter(array(
        'type'  => $type,
        'page'  => $page,
        'limit' => 500, //Максимальный,
        'fields' => array(
            //Объекты с ценой больше 30000
            array(
                'id' => 562,
                'value' => $price
                ),
            array(
                'id' => 673,
                'value' => $street
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

//$list - Формат
    /*
    array(
        array(
            [id] => 32916
            [stock_type] => 20
            [parent] => 8208
            [name] => Test iPhone11
            [date_add] => 2017-04-18 16:51:09
            [author] => 79
            [additional_author] => Array
                (
                )
            [last_modify] => 2017-07-13 11:02:07
            [customer_relation] => 
            [stock_activity_type] => edit
            [stock_activity_date] => 2017-07-13 11:02:07
            [publish] => 1
            [fields] => Array
                (
                    [0] => Array
                        (
                            [id] => 395
                            [type] => text
                            [value] => 1111
                            [name] => Артикул
                        )
                    [1] => Array
                        (
                            [id] => 396
                            [type] => price
                            [value] => 1000000.00
                            [name] => Цена
                        )
                    [5] => Array
                        (
                            [id] => 398
                            [type] => file
                            [value] => http://intrum.local/files/crm/product/595dd820cfe6a.jpg
                            [name] => Фото
                        )
                    [6] => Array
                        (
                            [id] => 398
                            [type] => file
                            [value] => http://intrum.local/files/crm/product/595dd828b030f.jpg
                            [name] => Фото
                        )
                )
        )
    )
    */
?>