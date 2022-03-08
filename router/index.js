const express = require('express')
const router = express.Router()
const {

  Register,
  Login,
  CreateRoom,
  PlayGameRoom,
 
} = require('../controller/MCR_Index')

const {
  home,
  RegisterAdmin,
  RegisterFunction,
  LoginAdmin,
  Logout
} = require('../controller/MVC_Index')

// import passport untuk fungsi login 
const passport = require('passport')

const verifyToken = require('../middleware/verifyToken')

//Route User
// fungsi untuk register
router.post('/register', Register)
// untuk fungsi login
router.post('/login', Login)
// untuk create room baru
// panggil verifyToken Middleware untuk verifikasi token
// dan juga agar controller create room bisa mengakses data user yang login
// lewat req.user
router.post('/room/create', verifyToken, CreateRoom)
// route untuk main game
router.post('/room/play', verifyToken, PlayGameRoom)

//Route Admin

router.get('/', home)
router.get('/registerAdmin', RegisterAdmin)
// fungsi untuk login
router.post('/registerAdmin', RegisterFunction)
// render halaman login
router.get('/loginAdmin', LoginAdmin)
// untuk fungsi login
router.post('/loginAdmin', passport.authenticate('local', {
  // kalau berhasil arahkan ke root url
  successRedirect: '/',
  // kalau gagal arahkan ke halaman login
  failureRedirect: '/loginAdmin',
  failureFlash: true
}))
router.get('/logout', Logout)


module.exports = router