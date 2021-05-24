const votesContainer = document.querySelector('.votes-wrapper');

generateVotes();

async function generateVotes() {
  const votes = await getAllVotes(userID);
  
  for (let i = 0; i < votes.length; i++) {
    const img = document.createElement('img');
    const imageObject = await getImageById(votes[i].image_id);
    img.setAttribute('src', imageObject.url);
    img.addEventListener('click', openModal);

    const voteCard = document.createElement('div');
    voteCard.classList.add('vote-card');

    const voteValue = document.createElement('p');
    voteValue.classList.add('vote-value');
    if (votes[i].value === 0) {
      voteValue.textContent = 'Liked!';
    } else voteValue.textContent = 'Disliked!';

    voteCard.appendChild(img);
    voteCard.appendChild(voteValue);
    votesContainer.appendChild(voteCard);
  }
}
