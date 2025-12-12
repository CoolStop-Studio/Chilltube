document.addEventListener('DOMContentLoaded', function() {
  const search = document.getElementById('search');

  search.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      const term = search.value.trim();
      if (term !== '') {
        window.location.href = generateURL(term)
      }
    }
  });
});