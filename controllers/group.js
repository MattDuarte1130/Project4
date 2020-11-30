const express = require('express')
const router = express.Router()
const Group = require('../models/group.js')



const isAuthenticated = (req, res, next) =>  {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}


// new

router.get('/new', isAuthenticated, (req, res) => {
  res.render('group/new.ejs', {currentUser: req.session.currentUser})
})

// create

router.post('/', isAuthenticated, (req,res) => {
	const data = {
		...req.body,
		userId: req.session.currentUser._id
	}
	console.log(data)
  Group.create(data, (error, createdGroup)=>{
		if (error){
			console.log(error)
		}
    res.redirect('/');
  });
})

// // index

router.get('/', isAuthenticated, (req, res)=>{

    Group.find({userId: req.session.currentUser._id}, (error, allGroups)=>{
        res.render('group/index.ejs', {
            group: allGroups,
            currentUser: req.session.currentUser
        });
    });
});

// //show

router.get('/:id', isAuthenticated,(req, res)=>{
    Group.findById(req.params.id, (err, foundGroup)=>{
        res.render('group/show.ejs', {
            group:foundGroup,
            currentUser: req.session.currentUser
        });
    });
});

// // delete
router.delete('/:id', isAuthenticated, (req,res) => {
  Group.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/');
    console.log('deleted Group')
  })
})

// edit

router.get('/:id/edit', isAuthenticated, (req, res) => {
Group.findById(req.params.id, (err, data) => {
  res.render('group/edit.ejs', {
    idOfGroupToEdit:data,
    idForGroup: req.params.id,
    currentUser: req.session.currentUser
    })
  })
})

// Put

router.put('/:id', isAuthenticated, (req, res, next) => {
  const updatedGroup = {
   title: req.body.title,
   description: req.body.description,
   img: req.body.img,
 }
  Group.findByIdAndUpdate(req.params.id, updatedGroup, (err, data) => {
      if (err) {
        console.log("error")
        next(err)
      } else {
        console.log('updated')
      }
  })
  res.redirect('/')
})








module.exports = router
