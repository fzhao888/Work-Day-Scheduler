
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  var saveBtn = $(".saveBtn");
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  saveBtn.on("click", function (event) {
    event.preventDefault();

    var time = $(this).parent().attr("id");//gets the time as "hour-x" 
    var description = $(this).siblings(".description").val(); //gets the text inside the description textarea

    localStorage.setItem(time, description);
  });



  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  var current = dayjs();

  function applyTimeState() {
    $(".time-block").each(function () {
      var currentHour = current.hour();
      var hour = parseInt($(this).children(".hour").attr("id"));

      if (hour < currentHour) {
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).removeClass("past");
        $(this).removeClass("future");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function init() {
    $(".time-block").each(function () {
      var time = $(this).attr("id");
      var text = localStorage.getItem(time);
      $(this).children(".description").val(text);
    });
  }
  // TODO: Add code to display the current date in the header of the page. 
  function displayCurrentTime() {
    var day = current.date();
    var currentHour = current.hour(); 

    if (day === 1 || day === 21 || day === 31) { 
      $("#currentDay").text(current.format("dddd, MMMM D[st]"));
    } else if (day === 2 || day === 22) {
      $("#currentDay").text(current.format("dddd, MMMM D[nd]"));
    } else if (day === 3 || day === 23) {
      $("#currentDay").text(current.format("dddd, MMMM D[rd]"));
    } else {
      $("#currentDay").text(current.format("dddd, MMMM D[th]"));
    }

    if (currentHour < 9 || currentHour > 17) {
      var text = $("#currentDay").text();
      window.alert(" Please come back during the 9am-5pm workday.");  
    }
  }

  displayCurrentTime();
  init();
  applyTimeState();
});
