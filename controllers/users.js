const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

const isAuthenticated = (req, res, next) =>  {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}

// create
users.get('/new', isAuthenticated, (req, res) => {
  res.render('users/new.ejs', { currentUser: req.session.currentUser })
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/')
  })
})

// edit
users.get('/:id/edit', isAuthenticated,  (req, res) => {
User.findById(req.params.id, (err, data) => {
  res.render('users/edit.ejs', {
    idOfUserToEdit:data,
    idOfUser: req.params.id,
    currentUser: req.session.currentUser
    })
  })
})

//put edit
users.put('/:id', isAuthenticated,  (req, res, next) => {
  const updatedUser = {
   sunday: req.body.sunday,
   monday: req.body.monday,
   tuesday: req.body.tuesday,
   wednesday: req.body.wednesday,
   thursday: req.body.thursday,
   friday: req.body.friday,
   saturday: req.body.saturday,
 }
  User.findByIdAndUpdate(req.params.id, updatedUser, (err, data) => {
      if(updatedUser.sunday == "on"){
        updatedUser.sunday = true
      } else {
        updatedUser.sunday = false
      }
      if(updatedUser.monday == "on"){
        updatedUser.monday = true
      } else {
        updatedUser.monday = false
      }
      if(updatedUser.tuesday == "on"){
        updatedUser.tuesday = true
      } else {
        updatedUser.tuesday = false
      }
      if(updatedUser.wednesday == "on"){
        updatedUser.wednesday = true
      } else {
        updatedUser.wednesday = false
      }
      if(updatedUser.thursday == "on"){
        updatedUser.thursday = true
      } else {
        updatedUser.thursday = false
      }
      if(updatedUser.friday == "on"){
        updatedUser.friday = true
      } else {
        updatedUser.friday = false
      }
      if(updatedUser.saturday == "on"){
        updatedUser.saturday = true
        console.log(updatedUser)
      } else {
        updatedUser.saturday = false
        console.log(updatedUser)
      }
  })
  res.redirect('/')
})

// show page
users.get('/:id', isAuthenticated,(req, res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        res.render('users/show.ejs', {
            user:foundUser,
            currentUser: req.session.currentUser
        });
    });
});



module.exports = users
