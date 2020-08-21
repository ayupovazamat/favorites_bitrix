/* Favorites */
function addFavorite() {
  $('.favor').click(function () {
    var favorID = $(this).attr('data-item');
    var doAction = ($(this).hasClass('active')) ? 'delete' : 'add';

    favorite(favorID, doAction);

  })
}

function favorite(id, action) {

  var param = 'id=' + id + "&action=" + action;
  $.ajax({
    url: '/local/ajax/favorites.php', // URL отправки запроса
    type: "GET",
    dataType: "html",
    data: param,
    success: function (response) { // Если Данные отправлены успешно
      var result = $.parseJSON(response);

      if (result == 1) { // Если всё чётко, то выполняем действия, которые показывают, что данные отправлены
        $('.favor[data-item="' + id + '"]').addClass('active');
        var wishCount = parseInt($('#want .col').html()) + 1;
        $('#want .col').html(wishCount); // Визуально меняем количество у иконки
      }
      if (result == 2) {
        $('.favor[data-item="' + id + '"]').removeClass('active');
        var wishCount = parseInt($('#want .col').html()) - 1;
        $('#want .col').html(wishCount); // Визуально меняем количество у иконки
      }
    },
    error: function (jqXHR, textStatus, errorThrown) { // Ошибка
      console.log('Error: ' + errorThrown);
    }
  });
}

addFavorite();
