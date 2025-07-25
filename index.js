const posts = [
   {
      name: "Vincent van Gogh",
      username: "vincey1853",
      location: "Zundert, Netherlands",
      avatar: "images/avatar-vangogh.jpg",
      post: "images/post-vangogh.jpg",
      comment: "just took a few mushrooms lol",
      likes: 21
   },
   {
      name: "Gustave Courbet",
      username: "gus1819",
      location: "Ornans, France",
      avatar: "images/avatar-courbet.jpg",
      post: "images/post-courbet.jpg",
      comment: "i'm feelin a bit stressed tbh",
      likes: 4
   },
      {
      name: "Joseph Ducreux",
      username: "jd1735",
      location: "Paris, France",
      avatar: "images/avatar-ducreux.jpg",
      post: "images/post-ducreux.jpg",
      comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
      likes: 152
   }
]

const postsContainer = document.getElementById("posts-container")

////

function renderPosts() {
   let postsList = ""
   
   for (let i = 0; i < posts.length; i++) {
      postsList += `
         <section class="post">
            <div class="creator-tab">
               <a class="creator-profile-link" href="https://oldagram.com/user/${posts[i].username}">
                  <img class="avatar creator-avatar" src="${posts[i].avatar}" alt="${posts[i].name} avatar" >
               </a>
               <div class="creator-details">
                  <a class="creator-profile-link" href="https://oldagram.com/user/${posts[i].username}">
                     <h2 class="creator-name">${posts[i].name}</h2>
                  </a>
                  <address>${posts[i].location}</address>
               </div>
            </div>
            <img class="post-img" src="${posts[i].post}" alt="${posts[i].name} portrait painting" >
            <div class="extras-container">
               <ul class="buttons">
                  <li>
                     <button class="btn-icon like-btn">
                        <img class="icon like-icon" src="images/icon-heart.png" alt="Heart icon" >
                     </button>
                  </li>
                  <li>
                     <button class="btn-icon">
                        <img class="icon comment-icon" src="images/icon-comment.png" alt="Comment icon" >
                     </button>
                  </li>
                  <li>
                     <button class="btn-icon">
                        <img class="icon dm-icon" src="images/icon-dm.png" alt="DM icon" >
                     </button>
                  </li>
               </ul>
               <p class="likes-count">${posts[i].likes} likes</p>
               <p class="creator-caption"><span class="username">${posts[i].username}</span> ${posts[i].comment}</p>
            </div>
         </section>
      `    
   }
   postsContainer.innerHTML = postsList
}
renderPosts()

//// Increment like count
document.addEventListener("click", function(e) {
   if (e.target.classList.contains("like-icon")) {
      const btn = e.target.closest(".btn-icon")
      btn.blur()
      const post = e.target.closest(".post")
      const likesCounter = post.querySelector(".likes-count")
      const currentLikes = parseInt(likesCounter.textContent)
      likesCounter.textContent = `${currentLikes + 1} likes`
      
      e.target.src = "images/icon-heart-filled.png"
   }
})