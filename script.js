//Global Variables
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');
const formBtn = itemForm.querySelector ('button');
let isEditMode = false;


function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDom(item));
    checkUI();
}


function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    // Check for edit mode

    if(isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if(checkIfItemExists(newItem)) {
            alert('That item already exists');
            return;
        }
    }

    addItemToDom(newItem);
    addItemToStorage(newItem);
    checkUI();

    itemInput.value = '';
}


function addItemToDom(item) {
        //Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item))
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


function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage()

    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    
    return itemsFromStorage 
}


function onClickItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function checkIfItemExists (item) {
    const itemsFromStorage = getItemsFromStorage();
    if (itemsFromStorage.includes(item)) {
        return true;
    }   else {
        return false;
    }
}


function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
    formBtn.style.backgroundColor = '#228b22'
    itemInput.value = item.textContent;
}


//Remove item from list
function removeItem(item) {
    if(confirm('Are You Sure')) {
        //remove item from DOM
        item.remove();

        //Remove item from storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // reset local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


//Clear button functionality
function clearItems(){
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // Clear from local storage
    localStorage.removeItem('items');
    checkUI();
}


function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text)!= -1) {
            item.style.display = 'flex';
        } else { item.style.display = 'none';
            
        }
    });  
    
}


function checkUI() {
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
}

// Initialise App

function init() {
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', onClickItem);
clearButton.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
checkUI();
}

init();





