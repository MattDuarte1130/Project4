# Schedule App
by Matt Duarte
https://group-schedule.herokuapp.com/

## Wireframe
![alt text](https://i.imgur.com/wvpcauh.png "Wireframe")

## Description

This web app is to allow users to create a group where they want to host an event, such as pick up games, boardgame night, or even meetings. The user will insert the time they want to host the event. The user will then be allowed to add as many other users to the group. Once all the members have been added, each user will update their schedule to instert what days they are avaliable to join the event. The group has a minimum and maximum amount of members they need to host the event. The group schedule will then compare all the member's schedules to see what days they can host the event. If the minimum amount of members are achieved that day will turn green and say how many members out of the maximum can attend and say avaliable next to it. If the maximum amount of members is reached the day will be golden and say Max Avaliable. This app is to help organize a group without having to reach out to each individual to see if they are avaliable. 

## User Story
1. The user Logs in or signs up on home page.
2. The user can then click my groups on the nav bar to see the group index page.
3. The My Groups index page allows you to view the groups you are added to or have created.
4. After clicking a Group it goes to the Group show page, that has the description of the group and the group's schedule as well as a members list. It allows you to edit or delete the group on the same page.
5. On the playlist show page clicking members list will take you to the members list show page.
6. The members list show page has a list of all the members in the group and allows you to add members if you are the owner of the group.
7. Clicking a members name will show that user's schedule. The owner has acess to edit all the members while if you are not the owner you can only edit your own page.
8. The current logged in user will have a green and bold name in the list, while the others will be blue.
9. All the data created is unique and only members in the members list can view the group.

## How the app works
1. The user can create as many groups as they want.
2. The user can then add as many members to whichever group they want.
3. The user can view all the members schedules as well as the combined group's schedule.
4. The user can edit and delete groups as well as members.
5. The user only has access to the groups create themselves, or have been added to when logged in.

## Struggles 
1. Making the group schema was a little difficult as I wanted it to link with the users schema.
2. It took me a while to figure out how to compare all the members schedules to display on the group's schedule.
3. I wanted to put a weather api into my app, but I was running out of time.
4. I made a profile page, but it doesn't really have a purpose yet.

## Wins
1. I really like how my app looks all together with bootstrap 3.
2. I was able to get the schedules and members list to work the way I wanted it to.
3. I really like how the app works all together right now and want to add more after this course.

## Some Functionality
1. I used a lot of for loops and if conditions to display and compare members schedules.
2. I used 3 sets of full CRUD to get this app working.
3. Bootstrap 3 really helped me design the webapp to look clean and easy to navigate.


## What I want to add
1. I really want add the weather api to my app.
2. I want to add a schedule api so you know the dates.
3. I also to make the user profile page have more purpose as well as link to the groups.
