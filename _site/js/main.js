const API_KEY = '7442545c-945a-4a2b-b3c7-e6a03a415f16';
const userID = 'test-user';
let imageID = '';
let favoriteID = '';

// functions ---------------------------------------------------------------------------------------

async function getRandomImage(selector) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const url = `https://api.thecatapi.com/v1/images/search`;

  const response = await fetch(url, requestOptions);
  const json = await response.json();
  selector.setAttribute('src', json[0].url);
  imageID = json[0].id;
}

async function getCatsImages(limit, page) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const url = `https://api.thecatapi.com/v1/images/search?size=full&order=RANDOM&limit=${limit}&page=${page}&format=json`;

  const response = await fetch(url, requestOptions);
  const json = await response.json();
}

async function searchForBreedsByName(name) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const url = `https://api.thecatapi.com/v1/breeds/search?q=${name}`;

  const response = await fetch(url, requestOptions);
  const json = await response.json();

  breedsWrapper.innerHTML = '';

  if (json.length === 0) {
    const warningText = document.createElement('p');
    warningText.textContent = 'No matching breeds found!';
    breedsWrapper.appendChild(warningText);
    return;
  }

  const breedName = document.createElement('p');
  breedName.classList.add('name');
  breedName.textContent = json[0].name;

  const breedDescription = document.createElement('p');
  breedDescription.classList.add('description');
  breedDescription.textContent = json[0].description;

  const breedOrigin = document.createElement('p');
  breedOrigin.classList.add('origin');
  breedOrigin.textContent = `Country: ${json[0].origin}`;

  const breedLifeSpan = document.createElement('p');
  breedLifeSpan.classList.add('lifespan');
  breedLifeSpan.textContent = json[0].lifespan;

  const breedTemperament = document.createElement('p');
  breedTemperament.classList.add('temperament');
  breedTemperament.textContent = `Temperament: ${json[0].temperament}`;

  const breedWeight = document.createElement('p');
  breedWeight.classList.add('weight');
  breedWeight.textContent = `Average weight: ${json[0].weight.metric}kg`;

  const breedLink = document.createElement('a');
  breedLink.classList.add('link');
  breedLink.textContent = `Check out a Wikipedia article!`;
  breedLink.setAttribute('href', json[0].wikipedia_url);

  breedsWrapper.appendChild(breedName);
  breedsWrapper.appendChild(breedDescription);
  breedsWrapper.appendChild(breedOrigin);
  breedsWrapper.appendChild(breedLifeSpan);
  breedsWrapper.appendChild(breedTemperament);
  breedsWrapper.appendChild(breedWeight);
  breedsWrapper.appendChild(breedLink);
}

async function getFavourites(userID, limit, page) {
  const headers = new Headers();
  headers.append('x-api-key', API_KEY);
  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };
  const url = `https://api.thecatapi.com/v1/favourites?sub_id=${userID}&limit=${limit}&page=${page}`;

  const json = await (await fetch(url, requestOptions)).json();

  json.forEach((el) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('cat-card');

    const img = document.createElement('img');
    img.setAttribute('src', el.image.url);
    img.addEventListener('click', openModal);

    const button = document.createElement('img');
    button.setAttribute('src', "/images/trash.svg");
    button.classList.add('trash-image');
    button.addEventListener('click', () => {
      deleteFromFavourites(el.id);
      wrapper.remove();
    });

    wrapper.appendChild(img);
    wrapper.appendChild(button);
    favouritesWrapper.appendChild(wrapper);
  });
}

async function addToFavourites(userID, imageID) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-api-key', API_KEY);

  const body = JSON.stringify({
    image_id: imageID,
    sub_id: userID,
  });

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow',
  };

  const url = `https://api.thecatapi.com/v1/favourites`;

  const json = await (await fetch(url, requestOptions)).json();

  if (json.message === 'SUCCESS') {
    favoriteID = json.id;
  }

  return json;
}

async function deleteFromFavourites(favouriteID) {
  const headers = new Headers();
  headers.append('x-api-key', API_KEY);

  const requestOptions = {
    method: 'DELETE',
    headers: headers,
    redirect: 'follow',
  };
  const url = `https://api.thecatapi.com/v1/favourites/${favouriteID}`;

  const json = await (await fetch(url, requestOptions)).json();
}

async function getImageById(imageID) {
  const url = `https://api.thecatapi.com/v1/images/${imageID}`;

  const headers = new Headers();
  headers.append('x-api-key', API_KEY);

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const json = await (await fetch(url, requestOptions)).json();
  return json;
}

async function createVote(imageID, userID, value) {
  const headers = new Headers();
  headers.append('x-api-key', API_KEY);
  headers.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    image_id: imageID,
    sub_id: userID,
    value: value,
  });

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow',
  };

  const url = `https://api.thecatapi.com/v1/votes`;

  const json = await (await fetch(url, requestOptions)).json();
}

async function getAllVotes(userID) {
  const headers = new Headers();
  headers.append('x-api-key', '7442545c-945a-4a2b-b3c7-e6a03a415f16');

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const url = `https://api.thecatapi.com/v1/votes?sub_id=${userID}&limit=20&page=0`;

  const json = await (await fetch(url, requestOptions)).json();
  console.log(json);
  return json;
}

function openModal(e) {
  let body = document.querySelector('body');
  let modal = document.createElement('div');
  let modalImg = document.createElement('img');

  if (window.innerWidth > 420) {
    body.style.overflow = 'hidden';
    modal.classList.add('modal');
    modal.style.top = `${window.scrollY}px`;
    modal.addEventListener('click', closeModal);
    modalImg.src = `${e.target.getAttribute('src')}`;

    modal.appendChild(modalImg);
    body.appendChild(modal);
  }
}

function closeModal(e) {
  if (e.target.nodeName == 'DIV' && window.innerWidth > 420) {
    document.querySelector('.modal').remove();
    document.querySelector('body').style.overflow = '';
  }
}