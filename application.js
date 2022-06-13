// refresh JSON back-end Database
var refreshData = function () {
  // AJAX 'GET' response to retrieve JSON back-end data and display on front-end
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=355',
    dataType: 'json',
    success: function (response, textStatus) {

      // sort responses 
      var sortedResponse = response.tasks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      $('.itemList').html('');

      sortedResponse.forEach(function (item) {
        var taskItem = item.content;
        var taskID = item.id;
        var taskCompleted = item.completed;

        if (!taskCompleted) {
          $('.itemList').append('<div id="' + taskID + '" class="d-flex row">' +
          '<div class="d-flex my-2 col-xs-12">' +
          '<input class="form-check-input my-auto mx-3 itemCheckBox" type="checkbox" value="">' +
          '<h3 id="toDoItem" class="form-check-label my-auto"><span id="todoItem">' + taskItem  + '</span></h3>' +
          '<button class="btn btn-danger btn-sm ms-auto me-2 deleteButton">Remove Item</button>' +
          '</div>' +
          '</div>');
        } else {
          $('.itemList').append('<div id="' + taskID + '" class="d-flex row">' +
          '<div class="d-flex my-2 col-xs-12">' +
          '<input class="form-check-input my-auto mx-3 itemCheckBox" type="checkbox" value="" checked>' +
          '<h3 id="toDoItem" class="form-check-label my-auto"><span id="todoItem">' + taskItem  + '</span></h3>' +
          '<button class="btn btn-danger btn-sm ms-auto me-2 deleteButton">Remove Item</button>' +
          '</div>' +
          '</div>');
        }
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};



// add item input to item list via user input
$(document).on('click', '.btn.addItemButton', function (event) {
  
  var input = $('#addItemInput');

  if (input) {
    // AJAX 'POST' response
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=355',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: input.val()
        }
      }),

      success: function (response, textStatus) {
        // refresh JSON data and clears input field on successful deploy
        refreshData();
        input.val('');
      },

      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
});



// remove item from to do list
$(document).on('click', '.deleteButton', function () {
  var item = $(this).closest('.row');
  var ID = item.attr('id');

  // AJAX 'DELETE' response to remove item from JSON back-end database
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ ID +'?api_key=355',
    success: function (response, textStatus) {
      item.remove();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
});



// Mark items as active and/or completed
$(document).on('change', '.itemCheckBox', function () {
  var item = $(this).closest('.row');
  var ID = item.attr('id');
  var checkBox = $(this).closest('.itemCheckBox');
      
    if (checkBox.is(':checked')) {
      // AJAX 'PUT' response to add mark_complete
      $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ ID +'/mark_complete?api_key=355',
        contentType: 'application/json',
        dataType: 'json',

        success: function (response, textStatus) {
          refreshData();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });

    } else {
      // AJAX 'PUT' response to add mark_active
      $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ ID +'/mark_active?api_key=355',
        contentType: 'application/json',
        dataType: 'json',

        success: function (response, textStatus) {
          refreshData();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
  });



// Show All items with click of corresponding button
$(document).on('click', '.allButton', function () {
  refreshData();
});



// Show Active items with click of corresponding button
$(document).on('click', '.activeButton', function () {
  
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=355',
    dataType: 'json',
    success: function (response, textStatus) {

      // sort responses 
      var sortedResponse = response.tasks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      $('.itemList').html('');

      sortedResponse.forEach(function (item) {
        var taskItem = item.content;
        var taskID = item.id;
        var taskCompleted = item.completed;

        if (!taskCompleted) {
          $('.itemList').append('<div id="' + taskID + '" class="d-flex row">' +
          '<div class="d-flex my-2 col-xs-12">' +
          '<input class="form-check-input my-auto mx-3 itemCheckBox" type="checkbox" value="">' +
          '<h3 id="toDoItem" class="form-check-label my-auto"><span id="todoItem">' + taskItem  + '</span></h3>' +
          '<button class="btn btn-danger btn-sm ms-auto me-2 deleteButton">Remove Item</button>' +
          '</div>' +
          '</div>');
        } 
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
});



// Show Completed items with click of corresponding button
$(document).on('click', '.completedButton', function () {

  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=355',
    dataType: 'json',
    success: function (response, textStatus) {

      // sort responses 
      var sortedResponse = response.tasks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      $('.itemList').html('');

      sortedResponse.forEach(function (item) {
        var taskItem = item.content;
        var taskID = item.id;
        var taskCompleted = item.completed;

        if (taskCompleted) {
          $('.itemList').append('<div id="' + taskID + '" class="d-flex row">' +
          '<div class="d-flex my-2 col-xs-12">' +
          '<input class="form-check-input my-auto mx-3 itemCheckBox" type="checkbox" value="" checked>' +
          '<h3 id="toDoItem" class="form-check-label my-auto"><span id="todoItem">' + taskItem  + '</span></h3>' +
          '<button class="btn btn-danger btn-sm ms-auto me-2 deleteButton">Remove Item</button>' +
          '</div>' +
          '</div>');
        } 
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
});



// call function to refresh data
$(document).ready(function () {
  refreshData();
});











  