const amountInput = document.querySelector('.amount');
const cardInput = document.querySelector('.card');
const dictionary = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

amountInput.addEventListener('input', (e) => {
    if (!dictionary.includes(e.data)) e.target.value = e.target.value.slice(0, -1);

    e.target.value = `$${e.target.value.substr(1, e.target.value.length)}`;
});

cardInput.addEventListener('input', (e) => {
    if (!dictionary.includes(e.data) || e.target.value.length > 12) e.target.value = e.target.value.slice(0, -1);
});