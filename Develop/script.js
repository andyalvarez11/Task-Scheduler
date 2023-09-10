$(function () {
  // Displays the current date in the header
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  // Dynamically generates time blocks for standard business hours (9am to 5pm)
  for (let hour = 9; hour <= 20; hour++) {
    const blockId = `hour-${hour}`;
    const currentTime = dayjs().hour();
    let blockClass = 'future';
    if (hour < currentTime) {
      blockClass = 'past';
    } else if (hour === currentTime) {
      blockClass = 'present';
    }
    
  

    const timeBlockHtml = `
      <div id="${blockId}" class="row time-block ${blockClass}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `;

    $('.container-fluid').append(timeBlockHtml);
  }

  // Loads saved events from local storage
  $('.time-block').each(function () {
    const hour = $(this).attr('id');
    const savedEvent = localStorage.getItem(hour);

    if (savedEvent) {
      $(this).find('.description').val(savedEvent);
    }
  });

  // Saves event description to local storage when the save button is clicked
  $('.container-fluid').on('click', '.saveBtn', function () {
    const hour = $(this).parent().attr('id');
    const eventDescription = $(this).siblings('.description').val();

    if (eventDescription) {
      localStorage.setItem(hour, eventDescription);
    }
  });
});
