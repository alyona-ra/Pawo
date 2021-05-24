const searchButton = document.querySelector('.input-wrapper button');
const input = document.querySelector('.input-wrapper input');
const breedsWrapper = document.querySelector('.content-wrapper');

searchButton.addEventListener('click', () => {
    searchForBreedsByName(input.value);
    input.value = '';
});

input.addEventListener('keypress', (e)  => {
    if (e.key === 'Enter') {
        searchForBreedsByName(input.value);
        input.value = '';
    }
});