const format = require('pg-format');
const db = require('../services/db');

class WeatherStation {
  static async getCount() {
    return 4;
  }

  static async updateData(data) {
  /*
 MVC pattern: WeatherStation Model interacts with WeatherStation table in the database
 */
    const {
      key, temperature, pressure, humidity, altitude,
    } = data;
    const { rowCount } = await db.query(
      `UPDATE "WeatherStation" 
      SET "temperature" = $2, "pressure" = $3, "humidity" = $4, "altitude" = $5
      WHERE "key" = $1;`,
      [key, temperature, pressure, humidity, altitude],
    );
    return rowCount;
  }

  static async toggleState(id) {
    await db.query(
      `UPDATE "WeatherStation" 
      SET "enabledState" = NOT "enabledState"
      WHERE "id" = $1;`,
      [id],
    );
  }

  static async getIntervalNotifications(queryTimeIntervals) {
    const query = format(`SELECT "firstName", "email", "name", "temperature", "pressure", "humidity", "altitude"
    FROM "Subscription" S
    JOIN "WeatherStation" W ON W."id" = S."weatherStationId"
    JOIN "Person" P ON P."id" = S."personId" 
    WHERE W."enabledState" = true 
      AND P."intervalNotificationsEnabled" = true AND P."arePreferencesSet" = true
      AND "timeInterval" in (%L)
    ORDER BY "email", S."id";`, queryTimeIntervals);
    const { rows } = await db.query(query);
    const users = {};
    rows.forEach((row) => {
      if (!(row.email in users)) {
        users[row.email] = {
          email: row.email,
          firstName: row.firstName,
          weatherStations: [],
        };
      }
      users[row.email].weatherStations.push((({
        name, temperature, pressure, humidity, altitude,
      }) => ({
        name, temperature, pressure, humidity, altitude,
      }))(row));
    });
    return Object.values(users);
  }

  static async getAlarmNotifications(key) {
    const { rows } = await db.query(
      `SELECT "firstName", "email", "name", 
    "temperature", "minTemperature", "maxTemperature", "temperature" < "minTemperature" AS "lowTemperature", "temperature" > "maxTemperature" AS "highTemperature",
    "pressure", "minPressure", "maxPressure", "pressure" < "minPressure" AS "lowPressure", "pressure" > "maxPressure" AS "highPressure",
    "humidity", "minHumidity", "maxHumidity", "humidity" < "minHumidity" AS "lowHumidity", "humidity" > "maxHumidity" AS "highHumidity",
    "altitude", "minAltitude", "maxAltitude", "altitude" < "minAltitude" AS "lowAltitude", "altitude" > "maxAltitude" AS "highAltitude"
    FROM "Subscription" S
    JOIN "WeatherStation" W ON W."id" = S."weatherStationId"
    JOIN "Person" P ON P."id" = S."personId" 
    WHERE W."enabledState" = true AND W."key" = $1
      AND P."alarmNotificationsEnabled" = true AND P."arePreferencesSet" = true
    AND (
      "temperature" < "minTemperature" OR "temperature" > "maxTemperature" OR
      "pressure" < "minPressure" OR "pressure" > "maxPressure" OR
      "humidity" < "minHumidity" OR "humidity" > "maxHumidity" OR
      "altitude" < "minAltitude" OR "altitude" > "maxAltitude"
    )
    ORDER BY "email", S."id";`,
      [key],
    );
    const result = { weatherStation: {}, users: [] };
    if (rows.length > 0) {
      const {
        name, temperature, pressure, humidity, altitude,
      } = rows[0];
      result.weatherStation = {
        name, temperature, pressure, humidity, altitude,
      };
      rows.forEach((row) => {
        const {
          // eslint-disable-next-line no-shadow
          temperature, pressure, humidity, altitude, ...user
        } = row;
        result.users.push(user);
      });
    }
    return result;
  }
}

module.exports = WeatherStation;
