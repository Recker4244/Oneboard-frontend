const getISOString = (dateStr, timeStr) => {
  const [day, month, year] = dateStr.split('/');
  const [hour, minute] = timeStr.split(':');
  const dateTime = new Date(year, month - 1, day, hour, minute);

  const iso8601 = dateTime.toISOString();
  return iso8601;
};

function compareDatesOnly(eventDate, today) {
  const d1 = new Date(eventDate);
  const d2 = new Date(today);

  const y1 = d1.getUTCFullYear();
  const m1 = d1.getUTCMonth();
  const day1 = d1.getUTCDate();

  const y2 = d2.getUTCFullYear();
  const m2 = d2.getUTCMonth();
  const day2 = d2.getUTCDate();

  const dateOnly1 = new Date(Date.UTC(y1, m1, day1, 0, 0, 0));
  const dateOnly2 = new Date(Date.UTC(y2, m2, day2, 0, 0, 0));
  return dateOnly1 >= dateOnly2;
}

const incrementDate = (dateInput, increment) => {
  const date = new Date(dateInput);
  const increasedDate = new Date(date.getTime() + (increment * 86400000));
  return increasedDate.toISOString().slice(0, 10);
};

const getRemainingDaysString = (dateInput) => {
  const date = new Date(dateInput);
  const today = new Date();
  const remainingDays = Math.floor((date - today) / (1000 * 60 * 60 * 24)) + 1;
  switch (remainingDays) {
    case 0:
      return 'today';
    case 1:
      return 'tomorrow';
    default:
      return `in ${remainingDays} days`;
  }
};

const filterAndSortEvents = (events) => {
  const filteredEvents = events.filter((event) => {
    const today = new Date();
    const eventDate = new Date(event.start_date);
    return compareDatesOnly(eventDate, today);
  });

  const sortedEvents = filteredEvents.sort((a, b) => {
    const aDate = new Date(a.start_date);
    const bDate = new Date(b.start_date);
    return aDate - bDate;
  });

  return sortedEvents;
};

const validateLeave = (start, end) => {
  if (start && end) {
    const startDate = new Date(start.split('/').reverse().join('-'));
    const endDate = new Date(end.split('/').reverse().join('-'));

    const today = new Date();
    if (startDate < today) {
      return [false, 'Start date cannot be in the past'];
    }
    if (endDate < today) {
      return [false, 'End date cannot be in the past'];
    }
    if (startDate > endDate) {
      return [false, 'Start date cannot be greater than end date'];
    }
  }
  return [true];
};

const formatDate = (date) => {
  const dateParts = date.split('/');
  const year = dateParts[2];
  const month = dateParts[1].length === 1 ? `0${dateParts[1]}` : dateParts[1];
  const day = dateParts[0].length === 1 ? `0${dateParts[0]}` : dateParts[0];
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export {
  getISOString, incrementDate, getRemainingDaysString, filterAndSortEvents, validateLeave,
  formatDate
};
