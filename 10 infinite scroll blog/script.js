const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

const getPosts = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

  const data = await res.json()

  return data;
}

const addPostsToDOM = async () => {
  const posts = await getPosts();

  posts.forEach(item => {
    const postElement = document.createElement(`div`)
    postElement.classList.add(`post`)
    postElement.innerHTML = `
      <div class="number">${item.id}</div>
      <div class="post-info">
        <h2 class="post-title">${item.title}</h2>
        <p class="post-body">${item.body}</p>
      </div>
    `
    postsContainer.appendChild(postElement)
  })
}

addPostsToDOM()

const showLoading = () => {
  loading.classList.add(`show`)

  setTimeout(() => {
    loading.classList.remove(`show`)

    setTimeout(() => {
      page++

      addPostsToDOM()
    }, 300);

  }, 1000);
}

const filterPosts = (evt) => {
  const term = evt.target.value.toUpperCase();
  const posts = document.querySelectorAll(`.post`);

  posts.forEach(post => {
    const title = post.querySelector(`.post-title`).textContent.toUpperCase()
    const body = post.querySelector(`.post-body`).textContent.toUpperCase()

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = `flex`
    } else {
      post.style.display = `none`
    }
  })

}

window.addEventListener(`scroll`, () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading()
  }
})

filter.addEventListener(`input`, filterPosts)