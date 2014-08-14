(function(){
  'use strict';

  $(document).ready(function(){
    $('#hide').click(hide);
    $('#show').click(show);
    $('form').submit(addRecipe);
    $('#recipes').on('click', '.delete', delRecipe);
    $('#categories a').click(filterCategory);
    $('#recipes').on('click', '.ingredients a', filterIngredient);
  });

 function filterIngredient(e){
    var ingredient = $(this).text();
    $('.recipe a:not(:contains('+ingredient+'))').closest('.recipe').hide();
    $('.recipe a:contains('+ingredient+')').closest('.recipe').show();
    e.preventDefault();
  } 

  function filterCategory(e){
    var category = $(this).text();
    if(category !== 'All'){
      $('.recipe .category:contains('+category+')').closest('.recipe').fadeIn();
      $('.recipe .category:not(:contains('+category+'))').closest('.recipe').fadeOut();
    }else{
      $('.recipe').show();  
    }
      e.preventDefault();
  }

  function delRecipe(){
    var id = $(this).closest('.recipe').attr('data-recipe-id'),
        type = 'delete',
        url = '/recipes/' + id;
    
    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      console.log(data);
      $('.recipe[data-recipe-id='+ data.id+']').remove();
    }});
  }

  function hide(){
    $('form').fadeOut();
  }
  function show(){
    $('form').fadeIn();
  }
  function addRecipe(e){
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url = $('form').attr('action');

    $('input', 'textarea').val('');

    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
      var $recipe = $(html);
      $recipe.css('display', 'none');
      $('#recipes').prepend($recipe);
      $recipe.fadeIn(2000);
    }});
    e.preventDefault();
  }

})();

