$(function () {
  // Displays the current date in the header
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  // Loads saved events from local storage
  $('.time-block').each(function () {
    const hour = $(this).attr('id');
    const savedEvent = localStorage.getItem(hour);

    if (savedEvent) {
      $(this).find('.description').val(savedEvent);
    }
  });

  // Saves event description to local storage when the save button is clicked
  $('.saveBtn').on('click', function () {
    const hour = $(this).parent().attr('id');
    const eventDescription = $(this).siblings('.description').val();

    if (eventDescription) {
      localStorage.setItem(hour, eventDescription);
    }
  });

  // Applies past, present, or future classes to time blocks
  $('.time-block').each(function () {
    const hour = parseInt($(this).attr('id').split('-')[1]);
    const currentHour = dayjs().hour();

    if (hour < currentHour) {
      $(this).addClass('past');
    } else if (hour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });
});
