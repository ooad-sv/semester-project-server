const WeatherStation = require('../models/weatherStation');
const mailer = require('./mailer');

const getHours = () => new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true });

const intervalNotificationsJob = async () => {
  const currentHour = new Date().getHours();
  const timeIntervals = [1, 2, 3, 4, 6, 8, 12];
  const queryTimeIntervals = timeIntervals.filter((interval) => currentHour % interval === 0);
  // eslint-disable-next-line no-console
  if (queryTimeIntervals.length > 0) {
    console.log(`${getHours()} | Notification Intervals: ${queryTimeIntervals}`);
    const users = await WeatherStation.getIntervalNotifications(queryTimeIntervals);
    const usersCount = users.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < usersCount; i++) {
      const user = users[i];
      const text = user.weatherStations.map((e) => `${e.name}\nTemperature: ${e.temperature}\nPressure: ${e.pressure}\nHumidity: ${e.humidity}\nAltitude: ${e.altitude}`).join('\n\n');
      // eslint-disable-next-line no-await-in-loop
      await mailer.sendMail({
        to: user.email,
        subject: `Weather Monitoring System | Interval Notification | ${getHours()}`,
        text,
      });
    }
    // eslint-disable-next-line no-console
    console.log(`Interval Notification emails sent: ${usersCount}`);
  }
};

module.exports = {
  intervalNotificationsJob,
};
