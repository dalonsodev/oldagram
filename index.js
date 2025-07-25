import postsData from "./postsData.js"

const postsContainer = document.getElementById("posts-container")

// MEMORY CACHE - Undefined on purpose!
let userDataCache = undefined

// INITIALIZE LOCAL STORAGE
function initStorage() {
   // check if there's previous user data on storage
   if (!localStorage.getItem("oldaUserData")) {
      userDataCache = { posts: postsData }

      persistToStorage()
   }
   const storedData = JSON.parse(localStorage.getItem("oldaUserData"))
   userDataCache = { posts: storedData.posts || postsData }

   persistToStorage()
}
initStorage()

// PERSIST TO LOCALSTORAGE
function persistToStorage() {
   localStorage.setItem('oldaUserData', JSON.stringify(userDataCache))
}

function renderPosts() {
   let postsList = ""
   
   userDataCache.posts.forEach(post => {
      postsList += `
         <section class="post" data-id="${post.id}">
            <div class="creator-tab">
               <a class="creator-profile-link" href="https://oldagram.com/user/${post.username}">
                  <img class="avatar creator-avatar" src="${post.avatar}" alt="${post.name} avatar" >
               </a>
               <div class="creator-details">
                  <a class="creator-profile-link" href="https://oldagram.com/user/${post.username}">
                     <h2 class="creator-name">${post.name}</h2>
                  </a>
                  <address>${post.location}</address>
               </div>
            </div>
            <img class="post-img" src="${post.post}" alt="${post.name} portrait painting" >
            <div class="extras-container">
               <ul class="buttons">
                  <li>
                     <button class="btn-icon like-btn">
                        <img class="icon like-icon" src="${post.isLiked ? 'images/icon-heart-filled.png' : 'images/icon-heart.png'}" alt="Heart icon" >
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
               <p class="likes-count">${post.likes} likes</p>
               <p class="creator-caption"><span class="username">${post.username}</span> ${post.comment}</p>
            </div>
         </section>
      `    
   })
   postsContainer.innerHTML = postsList
}
renderPosts()

// HELPER FUNCTION TO TOGGLE LIKES
function toggleLike(post, likesCounter, likeIcon) {
   post.isLiked = !post.isLiked
   post.likes += post.isLiked ? 1 : - 1
   post.likes = Math.max(0, post.likes) // evitar likes negativos
   likeIcon.src = post.isLiked ? "images/icon-heart-filled.png" : "images/icon-heart.png"
   likesCounter.textContent = `${post.likes} likes`
   
   persistToStorage()
}

// LIKE BTN HANDLER
document.addEventListener("click", function(e) {
   if (e.target.classList.contains("like-icon")) {
      const likeBtn = e.target.closest(".btn-icon")
      likeBtn.blur() // remove focus from btn
      const likedPost = e.target.closest(".post")
      const postId = likedPost.dataset.id
      const likesCounter = likedPost.querySelector(".likes-count")

      // look for specific post (e.target)
      const post = userDataCache.posts.find(p => p.id === postId)

      if (post) {
         toggleLike(post, likesCounter, e.target)
      }
      else {
         console.error("Couldn't find post with id:", postId)
      }
   }
})
