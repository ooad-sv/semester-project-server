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

  static authenticate(req, res) {
    req.data = {};
    const { token } = req.cookies;
    let isAuthenticated = true;
    if (!token) {
      isAuthenticated = false;
    }
    try {
      req.data.person = Person.verifyToken(token);
    } catch {
      Utilities.clearTokenCookie(res);
      isAuthenticated = false;
    }
    req.data.isAuthenticated = isAuthenticated;
  }

  static unauthenticated(req, res, next) {
    Utilities.authenticate(req, res);
    if (req.data.isAuthenticated) {
      return res.redirect('/dashboard');
    }
    return next();
  }

  static authenticated(req, res, next) {
    Utilities.authenticate(req, res);
    if (!req.data.isAuthenticated) {
      return res.redirect('/');
    }
    return next();
  }
}

module.exports = Utilities;
