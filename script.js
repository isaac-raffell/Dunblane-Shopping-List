//Global Variables
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

function addItem(e) {
    e.preventDefault();
    if (itemInput.value === '') {
        alert('Please add an item');
    }
    const newItem = itemInput.value;
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem))
    li.appendChild(createButton('remove-item btn-link text-red'))
    itemList.appendChild(li);
    
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    button.appendChild(createIcon('fa-solid fa-xmark'))
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes;
    return icon;
}





//Event Listeners
itemForm.addEventListener('submit', addItem);

