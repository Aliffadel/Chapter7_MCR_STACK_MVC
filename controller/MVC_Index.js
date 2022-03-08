const { Users} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const home = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.render("main", {
          pageTitle: "Traditional Games",
          id: "",
          user: "",
          role_id: "",
        });
      } else {
        res.render("main", {
          pageTitle: "Traditional Games",
          id: decodedToken.id,
          user: decodedToken.username,
          role_id: decodedToken.role_id,
        });
      }
    });
  } else {
    res.render("main", {
      pageTitle: "Traditional Games",
      id: "",
      user: "",
      role_id: "",
    });
  }
};

const RegisterAdmin = (req, res, next) => {
  const { success, error } = req.flash()
  res.render('register', {
    success,
    error
  })
}

const RegisterFunction = async (req, res, next) => {
  try {
    // check apakah password dan confirm passwordnya sama
    if (req.body.password1 !== req.body.password2) {
      req.flash('error', 'Password yang anda masukkan tidak cocok')
      res.redirect('/register')
    } else {
      // create new user
      const hashedPassword = await bcrypt.hash(req.body.password1, 10)
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      req.flash('success', 'User Registered Successfully')
      res.redirect('/login')
    }
  } catch (error) {
    req.flash('error', error.message)
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    res.redirect('/register')
  }

}

const LoginAdmin = (req, res, next) => {
  try {
    const { success, error } = req.flash()
    res.render('login', {
      success,
      error
    })
  } catch (error) {
    req.flash('error', error.message)
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    res.redirect('/')
  }

}

// untuk logout
const Logout = (req, res, next) => {
  req.logOut()
  res.redirect('/login')
}

module.exports = {
  home,
  RegisterAdmin,
  RegisterFunction,
  LoginAdmin,
  Logout

}