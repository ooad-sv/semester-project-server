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
}

module.exports = WeatherStation;
