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

module.exports = { weatherCodeToEmoji };
