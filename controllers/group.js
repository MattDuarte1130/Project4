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
		members: req.session.currentUser.username,
		userId: req.session.currentUser._id,
	}
	console.log(data)
  Group.create(data, (error, createdGroup)=>{
		if (error){
			console.log(error)
		}
    res.redirect('/group');
  });
})

// // index

router.get('/', isAuthenticated, (req, res)=>{

    Group.find({$or:[{members: req.session.currentUser.username}, {userId: req.session.currentUser.userId}]}, (error, allGroups)=>{
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
    res.redirect('/group');
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
	 minMembers: req.body.minMembers,
	 maxMembers: req.body.maxMembers,
	 startTime: req.body.startTime,
	 endTime: req.body.endTime,
 }
  Group.findByIdAndUpdate(req.params.id, updatedGroup, (err, data) => {
      if (err) {
        console.log("error")
        next(err)
      } else {
        console.log('updated')
      }
  })
  res.redirect('/group')
})

// members show page
router.get('/:id/members', isAuthenticated, (req, res, next) => {
  Group.findById(req.params.id, (err, foundMembers)=>{
      res.render('group/members.ejs', {
          group:foundMembers,
          currentUser: req.session.currentUser,
      });
  });
});

// add members page
router.get('/:id/members/add', isAuthenticated, (req, res) => {
Group.findById(req.params.id, (err, data) => {
  res.render('group/addMember.ejs', {
    idOfGroupToEdit:data,
    idForGroup: req.params.id,
    currentUser: req.session.currentUser,
    })
  })
})


// add member
router.put('/:id/members', isAuthenticated, (req, res, next) => {
	let membersData = {
		group: {
			groupId: req.params.id,
			memberId: req.params.indexOfMember
		}
	}
	Group.findById(req.params.id, (err, data) => {
    data.members.push(req.body.members)
    data.save(function(err, updatedData) {
        console.log(updatedData)
    })
  })
  res.redirect(`/group/${membersData.group.groupId}/members`)
})


// member profile page
router.get('/:id/members/:indexOfMember', isAuthenticated,(req, res)=>{
	let membersData = {
		group: {
			groupId: req.params.id,
			memberId: req.params.indexOfMember
		}
	}
    Group.findById(req.params.id, (err, foundMember)=>{
        res.render('group/memberShow.ejs', {
            group:foundMember,
						memberId: membersData.group.memberId,
            currentUser: req.session.currentUser
        });
    });
});

// edit members

router.get('/:id/members/:indexOfMember/edit', isAuthenticated, (req, res) => {
	let membersData = {
		group: {
			groupId: req.params.id,
			memberId: req.params.indexOfMember
		}
	}
Group.findById(req.params.id, (err, data) => {
  res.render('group/editMember.ejs', {
    idOfGroupToEdit:data,
    idForGroup: req.params.id,
		memberId: membersData.group.memberId,
    currentUser: req.session.currentUser,

    })
  })
})

// put edit
router.put('/:id/members/:indexOfMember', isAuthenticated, (req, res, next) => {
	let membersData = {
		group: {
			groupId: req.params.id,
			memberId: req.params.indexOfMember
		}
	}
	if(req.body.sunday == "on"){
 	 req.body.sunday = true
  } else {
 	 req.body.sunday = false
  }
  if(req.body.monday == "on"){
 	 req.body.monday = true
  } else {
 	 req.body.monday = false
  }
  if(req.body.tuesday == "on"){
 	 req.body.tuesday = true
  } else {
 	 req.body.tuesday = false
  }
  if(req.body.wednesday == "on"){
 	 req.body.wednesday = true
  } else {
 	 req.body.wednesday = false
  }
  if(req.body.thursday == "on"){
 	 req.body.thursday = true
  } else {
 	 req.body.thursday = false
  }
  if(req.body.friday == "on"){
 	 req.body.friday = true
  } else {
 	 req.body.friday = false
  }
  if(req.body.saturday == "on"){
 	 req.body.saturday = true
 } else {
	 req.body.saturday = false
	 }
	Group.findById(req.params.id, (err, data) => {
    data.members.splice(membersData.group.memberId, 1, req.body.members)
		data.sunday.splice(membersData.group.memberId, 1, req.body.sunday)
		data.monday.splice(membersData.group.memberId, 1, req.body.monday)
		data.tuesday.splice(membersData.group.memberId, 1, req.body.tuesday)
		data.wednesday.splice(membersData.group.memberId, 1, req.body.wednesday)
		data.thursday.splice(membersData.group.memberId, 1, req.body.thursday)
		data.friday.splice(membersData.group.memberId, 1, req.body.friday)
		data.saturday.splice(membersData.group.memberId, 1, req.body.saturday)
		data.save(function(err, updatedData) {
        console.log(updatedData)
    })
  })
  res.redirect(`/group/${membersData.group.groupId}`)
})

// delete Member

router.get('/:id/members/:indexOfMember/delete', isAuthenticated, (req, res) => {
	let membersData = {
		group: {
			groupId: req.params.id,
			memberId: req.params.indexOfMember
		}
	}
Group.findById(req.params.id, (err, data) => {
  res.render('group/deleteMember.ejs', {
    idOfGroupToEdit:data,
    idForGroup: req.params.id,
		memberId: membersData.group.memberId,
    currentUser: req.session.currentUser,

    })
  })
})

// put delete
router.put('/:id/members/:indexOfMember', isAuthenticated, (req, res, next) => {
	let membersData = {
		group: {
			groupId: req.params.id,
			memberId: req.params.indexOfMember
		}
	}
	Group.findById(req.params.id, (err, data) => {
    data.members.splice(membersData.group.memberId, 1)
    data.save(function(err, updatedData) {
        console.log(updatedData)
    })
  })
  res.redirect(`/group/${membersData.group.groupId}/members`)
})







module.exports = router
