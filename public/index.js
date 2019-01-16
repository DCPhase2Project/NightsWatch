document.getElementById('submit-button').addEventListener('click', function () {
    const userSearch = document.getElementById('search-bar').value

  $.ajax({
      type: "POST",
      url: '/send/data',
      data: {
          searchData: userSearch
      }
  })//ajax
  .then(function(result) {
      console.log(result)
  })
  .catch(function(error) {
      console.log(error)
  })
})
