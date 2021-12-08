const WeatherStation = require('../models/weatherStation');
const mailer = require('./mailer');

const getHours = () => new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true });

const getIntervalNotificationText = (user) => user.weatherStations.map((e) => `${e.name}\nTemperature: ${e.temperature} °C\nPressure: ${e.pressure} Pa\nHumidity: ${e.humidity} %\nAltitude: ${e.altitude} m`).join('\n\n');

const intervalNotificationsJob = async () => {
  const currentHour = new Date().getHours();
  const timeIntervals = [1, 2, 3, 4, 6, 8, 12];
  const queryTimeIntervals = timeIntervals.filter((interval) => currentHour % interval === 0);
  // eslint-disable-next-line no-console
  if (queryTimeIntervals.length > 0) {
    // eslint-disable-next-line no-console
    console.log(`${getHours()} | Notification Intervals: ${queryTimeIntervals}`);
    const users = await WeatherStation.getIntervalNotifications(queryTimeIntervals);
    const usersCount = users.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < usersCount; i++) {
      const user = users[i];
      const text = getIntervalNotificationText(user);
      // eslint-disable-next-line no-console
      console.log(`Email sent to ${user.email}, subscriptions: ${user.weatherStations.length}`);
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

const getAlarmNotificationText = (weatherStation, user) => {
  const {
    name, temperature, pressure, humidity, altitude,
  } = weatherStation;
  let text = `${name}\n`;
  if (user.lowTemperature === true) {
    text += `Low Temperature: ${temperature} < ${user.minTemperature} °C\n`;
  }
  if (user.highTemperature === true) {
    text += `High Temperature: ${temperature} > ${user.maxTemperature} °C\n`;
  }
  if (user.lowPressure === true) {
    text += `Low Pressure: ${pressure} < ${user.minPressure} Pa\n`;
  }
  if (user.highPressure === true) {
    text += `High Pressure: ${pressure} > ${user.maxPressure} Pa\n`;
  }
  if (user.lowHumidity === true) {
    text += `Low Humidity: ${humidity} < ${user.minHumidity} %\n`;
  }
  if (user.highHumidity === true) {
    text += `High Humidity: ${humidity} > ${user.maxHumidity} %\n`;
  }
  if (user.lowAltitude === true) {
    text += `Low Altitude: ${altitude} < ${user.minAltitude} m\n`;
  }
  if (user.highAltitude === true) {
    text += `High Altitude: ${altitude} > ${user.maxAltitude} m\n`;
  }
  return text;
};

const alarmNotificationsJob = async (key) => {
  const { weatherStation, users } = await WeatherStation.getAlarmNotifications(key);
  const usersCount = users.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < usersCount; i++) {
    const user = users[i];
    const text = getAlarmNotificationText(weatherStation, user);
    // eslint-disable-next-line no-console
    console.log(`Email sent to ${user.email}`);
    // eslint-disable-next-line no-await-in-loop
    await mailer.sendMail({
      to: user.email,
      subject: `Weather Monitoring System | Alarm Notification | ${weatherStation.name}`,
      text,
    });
  }
  // eslint-disable-next-line no-console
  console.log(`Alarm Notification emails sent: ${usersCount}`);
};

module.exports = {
  intervalNotificationsJob,
  alarmNotificationsJob,
};
