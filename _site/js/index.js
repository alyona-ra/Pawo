const newCatButton = document.querySelector('.generate-cat');
const catImage = document.querySelector('.cat-image');
const addToFavouritesButon = document.querySelector('.favourite-wrapper svg');
const likeButton = document.querySelector('.like');
const dislikeButton = document.querySelector('.dislike');

newCatButton.addEventListener('click', () => {
    addToFavouritesButon.classList.remove('liked');
    getRandomImage(catImage);
});

addToFavouritesButon.addEventListener('click', async () => {
    const response = await addToFavourites(userID, imageID);

    if (response.message === 'SUCCESS') addToFavouritesButon.classList.add('liked');
    else {
        addToFavouritesButon.classList.remove('liked');
        deleteFromFavourites(favoriteID);
    }
});

likeButton.addEventListener('click', () => {
    createVote(imageID, userID, 0);
});

dislikeButton.addEventListener('click', () => {
    alert('test');
});

getRandomImage(catImage);