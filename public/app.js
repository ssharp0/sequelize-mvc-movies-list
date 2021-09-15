// axios as window
const { axios } = window

// when addMovie button is clicked post the movie and append to html section
document.getElementById('addMovie').addEventListener('click', event => {
  event.preventDefault()

  // post request
  axios.post('/api/movies', {
    text: document.getElementById('text').value,
    isWatched: false,
    comments: document.getElementById('comments').value
  })
    .then(({ data: movie }) => {
      const movieElem = document.createElement('div')
      movieElem.classList.add('movieCard')
      movieElem.classList.add('text-center')
      movieElem.innerHTML = `
        <p><strong>Movie:</strong> ${movie.text}</p>
        <p><strong>Comments:</strong> ${movie.comments}</p>
        <hr>
        <button class="isWatched" data-id="${movie.id}">${movie.isWatched ? 'Watched' : 'Not Watched'}</button>
        <button class="delete" data-id="${movie.id}">Delete</button>
      `
      document.getElementById('movies').append(movieElem)

      document.getElementById('text').value = ''
    })
    .catch(err => console.error(err))
})

// global event listener for when the delete button is clicked - delete the movie based on id (SQL)
document.addEventListener('click', event => {
  if (event.target.className === 'delete') {
    const id = event.target.dataset.id
    // delete request
    axios.delete(`/api/movies/${id}`)
      .then(() => event.target.parentNode.remove())
      .catch(err => console.error(err))
  }
})

// global event for when the isWatched button is clicked - toggle between watched and is watched
document.addEventListener('click', event => {
  if (event.target.className === 'isWatched') {
    const id = event.target.dataset.id

    // put/modify request
    axios.put(`/api/movies/${id}`, {
      isWatched: event.target.textContent !== 'Watched'
    })
      .then(() => {
        if (event.target.textContent === 'Watched') {
          event.target.textContent = 'Not Watched'
        } else {
          event.target.textContent = 'Watched'
        }
      })
      .catch(err => console.error(err))
  }
})

// get request to show movies and append to the html section
axios.get('/api/movies')
  .then(({ data: movies }) => {
    movies.forEach(movie => {
      const movieElem = document.createElement('div')
      movieElem.classList.add('movieCard')
      movieElem.classList.add('text-center')
      movieElem.innerHTML = `
        <p><strong>Movie:</strong> ${movie.text}</p>
        <p><strong>Comments:</strong> ${movie.comments}</p>
        <hr>
        <button class="isWatched" data-id="${movie.id}">${movie.isWatched ? 'Watched' : 'Not Watched'}</button>
        <button class="delete" data-id="${movie.id}">Delete</button>
      `
      document.getElementById('movies').append(movieElem)
    })
  })
  .catch(err => console.error(err))
