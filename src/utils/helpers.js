const weatherCodeToEmoji = (weatherCode) => {
  switch (weatherCode) {
    case '01d':
    case '01n':
      return '☀️';

    case '02d':
    case '02n':
      return '⛅️';

    case '03d':
    case '03n':
      return '☁️';

    case '04d':
    case '04n':
      return '🌤️';

    case '09d':
    case '09n':
      return '🌦️';

    case '10d':
    case '10n':
      return '🌧️';

    case '11d':
    case '11n':
      return '⛈️';

    case '13d':
    case '13n':
      return '❄️';
    case '50d':
    case '50n':
      return '🌫️';
    default:
      throw Error('Incorrect weather code');
  }
};

const timestampToDayOfWeek = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const dayOfWeek = date.getDay();
  const weekday = new Array(7);
  weekday[0] = 'sunday';
  weekday[1] = 'monday';
  weekday[2] = 'tuesday';
  weekday[3] = 'wednesday';
  weekday[4] = 'thursday';
  weekday[5] = 'friday';
  weekday[6] = 'saturday';

  return weekday[dayOfWeek];
};

module.exports = { weatherCodeToEmoji, timestampToDayOfWeek };
