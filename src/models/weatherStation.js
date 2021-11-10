const db = require('../db');

class WeatherStation {
  static async getCount() {
    return 4;
  }

  static async updateData(data) {
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
}

module.exports = WeatherStation;
