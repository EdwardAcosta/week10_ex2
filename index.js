// reference: http://jsonplaceholder.typicode.com/

let submitButton = $("#submit-button")
let usernameInput = $("#username")
let form = $(".form")

let fakeComments = [
  {
    postId: 23,
    id: 111,
    name: "possimus facilis deleniti nemo atque voluptate",
    email: "Stefan.Crist@duane.ca",
    body: "ullam autem et accusantium quod sequi similique soluta explicabo ipsa eius ratione quisquam sed et excepturi occaecati pariatur molestiae ut reiciendis eum voluptatem sed"
    },
    {
    postId: 23,
    id: 112,
    name: "dolore aut aspernatur est voluptate quia ipsam",
    email: "Aniyah.Ortiz@monte.me",
    body: "ut tempora deleniti quo molestiae eveniet provident earum occaecati est nesciunt ut pariatur ipsa voluptas voluptatem aperiam qui deleniti quibusdam voluptas molestiae facilis id iusto similique tempora aut qui"
    },
    {
    postId: 23,
    id: 113,
    name: "sint quo debitis deleniti repellat",
    email: "Laverna@rico.biz",
    body: "voluptatem sint quia modi accusantium alias recusandae rerum voluptatem aut sit et ut magnam voluptas rerum odio quo labore voluptatem facere consequuntur ut sit voluptatum hic distinctio"
    },
    {
    postId: 23,
    id: 114,
    name: "optio et sunt non",
    email: "Derek@hildegard.net",
    body: "nihil labore qui quis dolor eveniet iste numquam porro velit incidunt laboriosam asperiores aliquam facilis in et voluptas eveniet quasi"
    },
    {
    postId: 23,
    id: 115,
    name: "occaecati dolorem eum in veniam quia quo reiciendis",
    email: "Tyrell@abdullah.ca",
    body: "laudantium tempore aut maiores laborum fugit qui suscipit hic sint officiis corrupti officiis eum optio cumque fuga sed voluptatibus similique sit consequuntur rerum commodi"
    }
]

submitButton.on('click', function(event) {
  let userInput = usernameInput.val()
  let url = 'http://jsonplaceholder.typicode.com/users?name=' + userInput

  $.get(url, function(response) {
    if (response.length > 0) {
      displayProfile(response)
    } else {
      let error = $(".error-message")
      error.text("Sorry - but no users were found by name: " + userInput)
    }
  })
})
function displayProfile(response) {
  let user = response[0]
  let name = user.name
  let profile = $(".user-profile")
  profile.append('<h2>' + name + '</h2>')
  // let profile2 = $(".album-profile")
  // profile2.append('<h2>' + name + '</h2>')
  appendPosts(user, profile)
  appendAlbums(user, profile)
}

function appendPosts(user, profile) {
  let url = 'http://jsonplaceholder.typicode.com/posts?userId=' + user.id

  $.get(url, function(response) {
    let posts = response
    profile.append("<h3>Post's from " + user.name + "</h3>")
    for (let index = 0; index < posts.length; index++) {
      let title = posts[index].title
      profile.append('<h6 class="post-title" id="post-'+posts[index].id+'">' + title + '</h6>')
    }

    let htmlPosts = $(".post-title")
    htmlPosts.on('click', function(event) {
      alert("check this out");
      let id = this.id.slice(5);
      console.log(id)
      let url = 'http://jsonplaceholder.typicode.com/posts/' + id

      $.get(url, function(post) {
        profile.hide()
        form.hide()
        $(".post-details").append("<a href='#' id='go-home'>Back to Home page</a>")
        $(".post-details").append("<h3>" + post.title + "</h3>")
        $(".post-details").append("<p>" + post.body + "</p>")
        $(".post-details").append("<ul id='comments-list'></ul>")

        $("#go-home").on('click', function(event) {
          profile.show()
          form.show()
          
          $(".post-details").hide()
        })

        let commentsUrl = "http://jsonplaceholder.typicode.com/posts/" + post.id + "/comments"
        $.get(commentsUrl, function(response) {
          for (let index = 0; index < response.length; index++) {
            $('#comments-list').append("<li>"+ response[index].body +"</li>")
          }
        })
      })
    })
   })
}

function appendAlbums(user, profile) {
  let albumsUrl = 'http://jsonplaceholder.typicode.com/albums?userId=' + user.id
  
    $.get(albumsUrl, function(response) {
    let albums = response
    profile.append("<h3>Album's from " + user.name + "</h3>")
    for (let index = 0; index < albums.length; index++) {
      let title = albums[index].title
      profile.append('<h6 class = "album-title" id= "title'+ albums[index].id +'">' + title + '</h6>')
    }


      let htmlAlbum = $(".album-title")
      // console.log(htmlAlbum)
      htmlAlbum.on('click', function(event) {
      // alert("check this out");

        let id = this.id.slice(5);
      let url = 'http://jsonplaceholder.typicode.com/photos/' + id
     //let url = 'http://jsonplaceholder.typicode.com/users/' + id + "/" + "photos"
      console.log(url)
      $.get(url, function(album) {
        profile.hide()
        form.hide()
        $(".albums-details").append("<a href='#' id='go-home'>Back to Home page</a>")
        $(".albums-details").append("<h3>" + album.title + "</h3>")
        $(".albums-details").append("<img src=" + album.thumbnailUrl + ">")
        $(".albums-details").append("<ul id='comments-list'></ul>")

        $("#go-home").on('click', function(event) {
          profile.show()
          form.show()
          
          $(".albums-details").hide()
        })

      //  let commentsUrl = "http://jsonplaceholder.typicode.com/photos" + albums.id + "/comments"
      //  $.get(commentsUrl, function(response) {
      //    for (let index = 0; index < response.length; index++) {
      //      $('#comments-list').append("<li>"+ response[index].body +"</li>")
      //     }
      //   })
      })
    })
  })
}