const Person = require('./models/person');

class Utilities {
  static setTokenCookie(res, token) {
    const expiration = 7776000000; // 90 days = 90 * 24 * 60 * 60 * 1000 milliseconds
    res.cookie('token', token, {
      expires: new Date(Date.now() + expiration),
      secure: false,
      httpOnly: true,
    });
  }

  static clearTokenCookie(res) {
    res.clearCookie('token');
  }

  static authorize(req, res) {
    const { token } = req.cookies;
    if (!token) {
      return false;
    }
    try {
      req.person = Person.verifyToken(token);
    } catch {
      Utilities.clearTokenCookie(res);
      return false;
    }
    return true;
  }

  static isUnauthorized(req, res, next) {
    const authorization = Utilities.authorize(req, res);
    if (authorization) {
      return res.redirect('/dashboard');
    }
    return next();
  }

  static isAuthorized(req, res, next) {
    const authorization = Utilities.authorize(req, res);
    if (!authorization) {
      return res.redirect('/');
    }
    return next();
  }
}

module.exports = Utilities;
