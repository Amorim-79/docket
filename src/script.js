// Adiciona eventos aos elementos
document.querySelector('#scroll-left').addEventListener('click', () => scrollCarousel('left'));
document.querySelector('#scroll-right').addEventListener('click', () => scrollCarousel('right'));
document.querySelector('.form').addEventListener('submit', formSubmit);

window.onload = function () {
    setImages();
}

async function setImages() {
    const images = await loadImages();

    const carousel = document.querySelector('#carousel');

    images.forEach((image) => {
        const imageElement = document.createElement('img');
        imageElement.src = image.download_url;
        imageElement.title = image.author;
        imageElement.className = 'carousel-image';

        carousel.appendChild(imageElement);
    });
}

function loadImages() {
    return fetch('https://picsum.photos/v2/list', { method: 'GET' }).then((response) => response.json());
}

function scrollCarousel(direction) {
    const carousel = document.querySelector('#carousel');

    const currentLeft = Number(carousel.style.left.split('px')[0]);

    if (direction === 'right') {
        carousel.style.left = `${currentLeft - 100}px`;
    } else if (direction === 'left' && currentLeft < 0) {
        carousel.style.left = `${currentLeft + 100}px`;
    }
}

function formSubmit(event) {
    event.preventDefault();

    const inputs = document.querySelectorAll('input');

    // Percorre todos os inputs do form adicionando ao formData seus valores
    const formData = [];
    inputs.length && inputs.forEach((input) => formData.push(input.value || 'Não informado'));

    // lista no painél de detalhes as informações do form
    listFormData(formData);

    showToastr();
    // Oculta o Toastr após 2s
    setTimeout(hideToastr, 2000);

}

/**
 *  Lista no painél de detalhes as inforamções
 * @param {*} data dados retirados do form que será usado para popular o painél de detalhes
 */
function listFormData(data) {
    // Remove do template o texto informativo de preenchimento do form
    document.querySelector('.info-text').remove();

    const detailsDiv = document.querySelector('.details');

    // Limpa a div de detalhes antes de a popular novamente
    detailsDiv.innerHTML = '';

    // Nomes dos campos
    const titles = ['Nome Completo', 'Email', 'Telefone 1', 'Telefone 2'];
    
    // Atribui aos Detalhes cada campo e seu valor
    data.forEach((item, index) => {
        detailsDiv.appendChild(createElementOfTitle(titles[index]));
        detailsDiv.appendChild(createElementOfData(item));
    });
}

/**
 *  Cria um elemento HTML <span> de titulo
 * @param {*} titleText Texto do título 
 * @returns Elemento HTML <span> de titulo
 */
function createElementOfTitle(titleText) {
    const title = document.createElement('span');
    title.textContent = titleText;
    title.className = 'label-text';

    return title;
}

/**
 *  Cria um elemento HTML <p> de dado
 * @param {*} dataText Valor que será preechido 
 * @returns Elemento HTML <p> de dado
 */
function createElementOfData(dataText) {
    const data = document.createElement('p');
    data.textContent = dataText;
    data.className = 'text-details';

    if (dataText === 'Não informado') {
        data.className += ' info-text';
    }

    return data;
}

function showToastr() {
    const header = document.querySelector('header');

    const toastr = document.createElement('div');
    toastr.id = 'toastr';

    const toastrText = document.createElement('p');
    toastrText.textContent = 'Candidatura enviada com sucesso!';
    toastrText.className = 'toastr-text';

    toastr.appendChild(toastrText);
    header.appendChild(toastr);
}

function hideToastr() {
    document.querySelector('#toastr').remove();
}
