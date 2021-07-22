$( document ).ready(function() {
    $('#main-submit').on('click', function() {
		var mainInput = $('#main-input').val();
		mainInput = mainInput.replace(/,/g, '');
		console.log(mainInput);
		var arr = mainInput.split(' ');

		$.each(arr, function(index, value) {
			if(value.indexOf('авито') + 1 || value.indexOf('циан') + 1 || value.indexOf('баннер') + 1) {
				$('#canal').val(value);
			}
			else if(value.indexOf('+7') + 1 ) {
				$('#contact_phone').val(value);
			}
			else if(value.indexOf('сот') + 1 && value.length <= 6) {
			    $('#land_area').val(value);
			}
			else if(value.indexOf('квм') + 1) {
			    $('#area').val(value);
			}
			else if(value.indexOf('эт') + 1) {
				$('#floor').val(value);
			}
			else if(value.indexOf('риелтор') + 1) {
				$('#agent').val('риелтор');
			}
			else if(value.indexOf('инстаграм') + 1) {
			    $('#canal').val('instagram');
			}
			else if(value == 'дом' || value == 'участок' || value == 'дача') {
				$('#select option[value="2"]').prop('selected', true);
			}
			else if(value == 'помещение' || value == 'офис') {
				$('#select option[value="1"]').prop('selected', true);
			}
			else if(value == 'гараж') {
				$('#select option[value="3"]').prop('selected', true);
			}   
			else if(value == "жк") {
				var zhk = index + 1;
				$('#zhk').val(arr[zhk]);
			}
			else if(value.length <= 2 && value.indexOf('к') + 1 && value !== "жк") {
				$('#rooms').val(value);
			}
			else if(value.length >= 3 && value.length <= 5 && $.isNumeric(value)) {
				$('#price').val(value);
			}	
			else if(value[0] === value[0].toUpperCase() && !$.isNumeric(value) && value.length > 2) {
				$('#name').val(value);
			}
			else {
				if($.isNumeric(value) && value.length <= 4) {
					$('#house').val(value);
				}
				else {
					$('#address').val(value);
				}
			}	
		});

	/*var $tmp = $("<textarea>");
	$("body").append($tmp);
	$tmp.val($('#main-input').val()).select();
	document.execCommand("copy");
	$tmp.remove();*/
		
		
	});

	$('#get-property').on('click', function() {
		var address = $('#address').val();
		if(address.indexOf(', ул') + 1) {
		    var addressArr = address.split(', ');
		    addressArr[1] = addressArr[1].replace('ул ', '');
		    var newAddress = addressArr[1] + 'ул';
		    $('#address').val(newAddress);
		}
		else if(address.indexOf(', пр-кт') + 1) {
		    var addressArr = address.split(', ');
		    addressArr[1] = addressArr[1].replace('пр-кт ', '');
		    var newAddress = addressArr[1] + 'пр-кт';
		    $('#address').val(newAddress);
		}

		var price = $('#price').val();
		if(price.length <= 5 && price !== '') {
    		var newPrice = price + '000';
    		$('#price').val(newPrice);
		}
		
		var rooms = $('#rooms').val();
		if(rooms.indexOf('к') + 1) {
		    var newRooms = rooms.replace('к', '');
		    $('#rooms').val(newRooms);
		}
		
		var floor = $('#floor').val();
		if(floor.indexOf('эт') + 1) {
		    var newFloor = floor.replace('эт', '');
		    $('#floor').val(newFloor);
		}
		
		var area = $('#area').val();
		if(area.indexOf('квм') + 1) {
		    var newArea = area.replace('квм', '');
		    $('#area').val(newArea);
		}

		if($('#select option').filter(':selected').val() == "0") {
			$.post("https://kluch.me/lead_edit/example/edit/getStock.php", { price: $('#price').val(), street: $('#address').val(), zhk: $('#zhk').val() }, function(data) {
			  	$('.properties-info').empty().append(data);
			});
		}
		else if($('#select option').filter(':selected').val() == "1") {
			$.post("https://kluch.me/lead_edit/example/edit/getStock1.php", { price: $('#price').val(), street: $('#address').val() }, function(data) {
			  	$('.properties-info').empty().append(data);
			});
		}
		else if($('#select option').filter(':selected').val() == "2") {
			$.post("https://kluch.me/lead_edit/example/edit/getStock2.php", { price: $('#price').val(), street: $('#address').val() }, function(data) {
			  	$('.properties-info').empty().append(data);
			});
		}
		else {
			$.post("https://kluch.me/lead_edit/example/edit/getStock3.php", { price: $('#price').val(), street: $('#address').val() }, function(data) {
			  	$('.properties-info').empty().append(data);
			});
		}

		$('#send-form').removeClass('hidden');
		$('#send-form').text('Создать заявку');
		$('#send-form').prop('disabled', false);
	});

	$('#pr-line').on('change', function() {
		console.log('You clicked to property');
	});
	
	$('#send-form').on('click', function() {
	   $('#send-form').prop('disabled', true); 
	   $('#send-form').text('Заявка успешно создана');
	   var object = $('.properties-info p input[name="property"]').filter(':checked').val();
	   var objectArr = object.split(', ');
	   var objectId = objectArr[0];
	   var objectEmId = objectArr[1];
	   function clearInfo() {
	        $('.properties-info').empty();
	        $('.send-result').empty();
	        $('.send-result').removeClass('send-success');
	        $('#send-form').addClass('hidden');
	        $('.td-input input').val('');
	        $('#comment').val('');
	        $('.main-input').val('');
	   }
	   if($('#select option').filter(':selected').val() == "0") {
    	   $.post("https://kluch.me/lead_edit/example/edit/addRequest.php", { name: $('#name').val(), phone: $('#contact_phone').val(), employee_id: objectEmId, object_id: objectId, street: $('#address').val(), house: $('#house').val(), price: $('#price').val(), rooms: $('#rooms').val(), floor: $('#floor').val(), area: $('#area').val(), canal: $('#canal').val(), agent: $('#agent').val(), payform: $('#payform_input').val(), comment: $('#comment').val() }, function(data) {
    	      if(data == 'success') {
    	          $('.send-result').addClass('send-success');
    	          $('.send-result span').text('Заявка успешно создана!');
    	          setTimeout(clearInfo, 2000);
    	      }
    	      else {
    	          $('.send-result').addClass('send-error');
    	          $('.send-result span').text('Произошла ошибка! Попробуйте создать заявку вручную.');
    	          setTimeout(clearInfo, 2000);
    	      }
    	   });
	   }
	   else if($('#select option').filter(':selected').val() == "1") {
	      $.post("https://kluch.me/lead_edit/example/edit/addRequest1.php", { name: $('#name').val(), phone: $('#contact_phone').val(), employee_id: objectEmId, object_id: objectId, street: $('#address').val(), house: $('#house').val(), price: $('#price').val(), floor: $('#floor').val(), area: $('#area').val(), canal: $('#canal').val(), agent: $('#agent').val(), comment: $('#comment').val() }, function(data) {
    	      if(data == 'success') {
    	          $('.send-result').addClass('send-success');
    	          $('.send-result span').text('Заявка успешно создана!');
    	          setTimeout(clearInfo, 2000);
    	      }
    	      else {
    	          $('.send-result').addClass('send-error');
    	          $('.send-result span').text('Произошла ошибка! Попробуйте создать заявку вручную.');
    	          setTimeout(clearInfo, 2000);
    	      }
    	   }); 
	   }
	   else if($('#select option').filter(':selected').val() == "2") {
	      $.post("https://kluch.me/lead_edit/example/edit/addRequest2.php", { name: $('#name').val(), phone: $('#contact_phone').val(), employee_id: objectEmId, object_id: objectId, street: $('#address').val(), house: $('#house').val(), price: $('#price').val(), area: $('#area').val(), land_area: $('#land_area').val(), canal: $('#canal').val(), agent: $('#agent').val(), payform: $('#payform_input').val(), comment: $('#comment').val() }, function(data) {
    	      if(data == 'success') {
    	          $('.send-result').addClass('send-success');
    	          $('.send-result span').text('Заявка успешно создана!');
    	          setTimeout(clearInfo, 2000);
    	      }
    	      else {
    	          $('.send-result').addClass('send-error');
    	          $('.send-result span').text('Произошла ошибка! Попробуйте создать заявку вручную.');
    	          setTimeout(clearInfo, 2000);
    	      }
    	   }); 
	   }
	   else {
	      $.post("https://kluch.me/lead_edit/example/edit/addRequest3.php", { name: $('#name').val(), phone: $('#contact_phone').val(), employee_id: objectEmId, object_id: objectId, street: $('#address').val(), price: $('#price').val(), canal: $('#canal').val(), comment: $('#comment').val() }, function(data) {
    	      if(data == 'success') {
    	          $('.send-result').addClass('send-success');
    	          $('.send-result span').text('Заявка успешно создана!');
    	          setTimeout(clearInfo, 2000);
    	      }
    	      else {
    	          $('.send-result').addClass('send-error');
    	          $('.send-result span').text('Произошла ошибка! Попробуйте создать заявку вручную.');
    	          setTimeout(clearInfo, 2000);
    	      }
    	   }); 
	   }
	});
	
	$('#realtor').on('click', function() {
	    $('#agent').val('риелтор');
	});
	$('#payform-1').on('click', function() {
	    $('#payform_input').val('ипотека'); 
	});
	$('#payform-2').on('click', function() {
	    $('#payform_input').val('наличка'); 
	});
	$('#comment-tag-1').on('click', function() {
	    $('#comment').val('хочет посмотреть'); 
	});
	$('#comment-tag-2').on('click', function() {
	    $('#comment').val('интересует обмен'); 
	});
	
	
    var zhks = [
	'Аппарт-отель по ул. Пушкина, 26',
	'Город-парк «Новые горки»',
	'Дом Kalinina house (Калинина хаус)',
	'Дом «Kalinina house» (Калинина хаус)',
	'Дом «Rotterdam» (Роттердам)',
	'Дом «Гринвич»',
	'Дом «Красное Яблоко»',
	'Дом «Островский»',
	'Дом на Енисейской',
	'Дом по ул. Аделя Кутуя, 83',
	'Дом по ул. Академика Завойского, 21',
	'Дом по ул. Академика Лаврентьева, 11',
	'Дом по ул. Достоевского, 1',
	'Дом по ул. Дубравная, 38А',
	'Дом по ул. Зур Урам, 7А',
	'Дом по ул. Маршрутная',
	'Дом по ул. Минская, 61',
	'Дом по ул. Серова, 48',
	'Дом по ул. Сибгата Хакима',
	'Дом по ул. Тукая, 66',
	'Дома по ул. Аделя Кутуя',
	'Дома по ул. Аделя Кутуя, 83',
	'Дома по ул. Менделеева, 8-8а',
	'ЖД «Z House» (Дом Зэд)',
	'ЖД «Z House» (Дом ЗЭД)',
	'ЖД «Гвардеец»',
	'ЖД «Дом на Енисейской»',
	'ЖД «Легато»',
	'ЖД «Легато» (Legato)',
	'ЖД «Маркиз»',
	'ЖД «Соло»',
	'ЖД по ул. Баруди',
	'ЖД по ул. Маршрутная',
	'Жилой Дом «Авиатор»',
	'Жилой дом «Соло»',
	'Жилой квартал «Яркий»',
	'Жилой комплекс «Skyline» (Скайлайн)',
	'ЖК Twin House (Твин хаус)',
	'ЖК «Art City» (Город искусств)',
	'ЖК «Atlantis Deluxe» (Атлантис Делюкс)',
	'ЖК «Clover House» (Кловер Хаус)',
	'ЖК «Green City» (Грин Сити)',
	'ЖК «Green Hill» (Грин Хилл)',
	'ЖК «Green» (Грин)',
	'ЖК «IQ DOM» (Ай Кью Дом)',
	'ЖК «RICHMOND» (РИЧМОНД)',
	'ЖК «SAVIN house» (Савин хаус)',
	'ЖК «SAVIN house» (САВИН хаус)',
	'ЖК «SKYLINE» (СКАЙЛАЙН)',
	'ЖК «SREDA OF LIFE» («Среда оф лайф»,«Среда жизни»)',
	'ЖК «Twin House» (Твин хаус)',
	'ЖК «Август Астра»',
	'ЖК «Акварель»',
	'ЖК «Арена»',
	'ЖК «Арт Квартал Vincent» (Арт Квартал Винсент)',
	'ЖК «Арт Квартал Винсент»',
	'ЖК «Арт Квартал Винсент» («Арт Квартал Vincent»)',
	'ЖК «Архитектор»',
	'ЖК «Барселона»',
	'ЖК «Беседа»',
	'ЖК «Вербный»',
	'ЖК «Весна»',
	'ЖК «Веснушки»',
	'ЖК «Взлетная полоса»',
	'ЖК «Видный»',
	'ЖК «Возрождение»',
	'ЖК «Волжская гавань»',
	'ЖК «Времена года»',
	'ЖК «Гармония»',
	'ЖК «Генеральский»',
	'ЖК «Голливуд»',
	'ЖК «Гринландия»',
	'ЖК «Дом Волшебника»',
	'ЖК «Дом на Mинской»',
	'ЖК «Дом на Даурской»',
	'ЖК «Евразия»',
	'ЖК «Жардин»',
	'ЖК «Жемчужина»',
	'ЖК «Живи на Портовой»',
	'ЖК «Журавли»',
	'ЖК «Залесный сити»',
	'ЖК «Золотая подкова»',
	'ЖК «Золотая середина»',
	'ЖК «Изумрудный город»',
	'ЖК «Искра»',
	'ЖК «Казанское подворье»',
	'ЖК «Казансу»',
	'ЖК «Казань XXI век»',
	'ЖК «Капри»',
	'ЖК «Киндери»',
	'ЖК «КОМОС на Губкина»',
	'ЖК «Комсомолец»',
	'ЖК «Ладья»',
	'ЖК «Лазурные небеса»',
	'ЖК «Ласточкино гнездо»',
	'ЖК «Легенда»',
	'ЖК «Ленинградский»',
	'ЖК «Лесной городок»',
	'ЖК «Малиновка»',
	'ЖК «Манго»',
	'ЖК «Манхэттен»',
	'ЖК «Маяковского 27»',
	'ЖК «Мелодия»',
	'ЖК «Меркурий»',
	'ЖК «Мой Ритм»',
	'ЖК «Молодежный»',
	'ЖК «МЧС»',
	'ЖК «Нестеровский»',
	'ЖК «Нобелевский»',
	'ЖК «Новые Куюки»',
	'ЖК «Новые острова»',
	'ЖК «Новый Горизонт»',
	'ЖК «Норвежский»',
	'ЖК «Оазис-2»',
	'ЖК «Озерный»',
	'ЖК «Олимп»',
	'ЖК «Острова»',
	'ЖК «Отрадная»',
	'ЖК «Отражение»',
	'ЖК «Падишах»',
	'ЖК «Палитра»',
	'ЖК «Паруса»',
	'ЖК «Первомайский»',
	'ЖК «Перспектива»',
	'ЖК «Победа»',
	'ЖК «Поколение»',
	'ЖК «Привилегия»',
	'ЖК «Приволжский»',
	'ЖК «Пять звезд»',
	'ЖК «Родина»',
	'ЖК «Романтика»',
	'ЖК «Рябиновый»',
	'ЖК «Садовое кольцо»',
	'ЖК «Светлая долина»',
	'ЖК «Светлый»',
	'ЖК «Семь островов»',
	'ЖК «Симфония» (поз. 2,2)',
	'ЖК «Симфония» (поз. 5, 6)',
	'ЖК «Сказочный лес»',
	'ЖК «Славный»',
	'ЖК «Современник»',
	'ЖК «Созвездие»',
	'ЖК «Сокольники»',
	'ЖК «Солнечный город Супер»',
	'ЖК «Соло»',
	'ЖК «Соловьиная роща»',
	'ЖК «Станция Спортивная»',
	'ЖК «Столичный»',
	'ЖК «Толбухина»',
	'ЖК «Три богатыря»',
	'ЖК «Триумф»',
	'ЖК «Тулпар»',
	'ЖК «Царево Village» («Усадьба Царево»)',
	'ЖК «Экопарк «Дубрава»',
	'ЖК «Эталон»',
	'ЖК «Ямле»',
	'ЖК «Янтарный берег»',
	'ЖК «Яшма»',
	'ЖК «Яшьлек»',
	'ЖК Комос',
	'ЖК на Дубравной',
	'ЖК по ул. 2я Юго-Западная',
	'ЖК по ул. Зорге/Дубравная',
	'ЖК по ул. Серова',
	'ЖК по ул. Умырзая',
	'ЖК по ул. Фучика, 14В',
	'КД «Юнусовская усадьба»',
	'Клубный дом «Юнусовская усадьба»',
	'Комплекс апартаментов «Odette» (Одетт)',
	'Мкр. «Солнечный город»'
];
	//Autocomplete
    $('#zhk').autocomplete({
        lookup: zhks // Список вариантов для локального автозаполнения
    });
	
});

