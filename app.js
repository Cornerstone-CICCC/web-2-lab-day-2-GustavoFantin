$(function() {
  
  
  let userId = 1

  $('header button:first-child').on('click', async () => {
  
  if(userId === 1 ) { // if else to dont go to 0
    userId = 30;
    } else {
      userId = userId - 1
    }
  const user = await fetchUserById(userId)
  const post = await fetchPostsById(userId)
  const todo = await fetchTodosById(userId)

  displayData(user,post, todo)

  }) // previous button


  $('header button:last-child').on('click', async ()=> {
  userId = userId + 1
  if(userId === 31 ) { // if else to dont go to 31
    userId = 1;
    }
  const user = await fetchUserById(userId)
  const post = await fetchPostsById(userId)
  const todo = await fetchTodosById(userId)
  displayData(user, post, todo)
  })  //next button
  
  
  const fetchUserById =  (id) => {
    let currUser
    return $.ajax({
      url: `https://dummyjson.com/users/${id}`,
      type: 'GET',
      success: function(response) {  
        currUser = response
      } // fetching the api and passing the ID number through const currUser
    })
    
  }

  const fetchTodosById =  (id) => {
    let todo
    return $.ajax({
      url: `https://dummyjson.com/users/${id}/todos`,
      type: 'GET',
      success: function(todoData) {  
        todo = todoData
        console.log(todo)
      } // fetching the api and passing the ID number through const currUser
    })
    
  }
  
  
  
  const fetchPostsById = (id) => {
    let dataPosts
    return $.ajax({
      url: `https://dummyjson.com/users/${id}/posts`,
      type: 'GET',
      success: function(postData) {
        console.log(postData, id)
        dataPosts = postData
      },
    })
  }



  const displayData = (currUser, dataPosts, todo) => {
    
    $('.info__image img').attr("src", "" )
    $('.info__content').html("")
    $('.posts h3').html("")
    $('.posts ul').html("")
    $('.posts ul').html("")

    $('.todos ul').html("")
    $('.todos h3').html("")


    console.log("data", dataPosts)

    $('.info__image img').attr("src", currUser.image )
    $('.info__content').append(`
      <h1>${currUser.firstName} ${currUser.lastName}</h1>
      <h3>Age: ${currUser.age}</h3>
      <h3>Email: ${currUser.email}</h3>
      <h3>Phone: ${currUser.phone}</h3>
    `)

    $('.posts h3').append(`${currUser.firstName}'s Posts`)

    if (dataPosts.posts.length === 0) {
      $('.posts ul').append(`<li>User has no posts</li>`)
    } else {
      dataPosts.posts.forEach(element => {
        // $('.posts ul').append(`<h4>${element.title}</h4>`)
        $('.posts ul').append(`<li><h4>${element.title}</h4>${element.body}</li>`)
      }) 
    }

    $('.todos h3').append(`${currUser.firstName}'s To Dos`)
    if(todo.todos.length === 0) {
      $('.todos ul').append(`<li>User has no to dos</li>`)
    } else {
      todo.todos.forEach(element => {
        $('.todos ul').append(`<li>${element.todo}</li>`)
      })  
    }
  } 



  const getData = async () => {
    
    const user = await fetchUserById(userId)
    const posts = await fetchPostsById(userId)
    const todo = await fetchTodosById(userId)
    displayData(user, posts, todo)
    console.log("here",posts);
  }

  getData()
  
  
  
  
})