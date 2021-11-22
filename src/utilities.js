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

  static isUnauthenticated(req, res, next) {
    Utilities.authenticate(req, res);
    if (req.data.isAuthenticated) {
      return res.redirect('/dashboard');
    }
    return next();
  }

  static isAuthenticated(req, res, next) {
    Utilities.authenticate(req, res);
    if (!req.data.isAuthenticated) {
      return res.redirect('/');
    }
    if (req.data.person.arePreferencesSet !== true && req.path !== '/preferences' && req.path !== '/logout') {
      return res.redirect('/preferences');
    }
    return next();
  }

  static isUser(req, res, next) {
    if (req.data.person.isAdmin === true) {
      return res.redirect('/');
    }
    return next();
  }

  static isAdmin(req, res, next) {
    if (req.data.person.isAdmin === false) {
      return res.redirect('/');
    }
    return next();
  }
}

module.exports = Utilities;
