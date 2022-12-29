const elForm = document.querySelector('.js-form');
const elName = document.querySelector('.js-name');
const elSelect = document.querySelector('.js-select');
const elPhone = document.querySelector('.js-phone');
const elList = document.querySelector('.js-list');

const localData = JSON.parse(window.localStorage.getItem('contacts'));
let contacts = localData || [];
function render(array, node) {
  window.localStorage.setItem('contacts', JSON.stringify(contacts));
  node.innerHTML = '';
  array.forEach((item) => {
    let newItem = document.createElement('li');
    newItem.classList.add('list-group-item', 'list-item')

    let newContact = document.createElement('h3');
    newContact.classList.add('mb-2');
    newContact.textContent = item.name;

    let newRel = document.createElement('p');
    newRel.classList.add('mb-2');
    newRel.textContent = item.relationship;

    let newNumber = document.createElement('a');
    newNumber.setAttribute('href', `tel: ${item.phone}`);
    newNumber.classList.add('btn', 'bg-success', 'text-white', 'me-5');
    newNumber.textContent = item.phone;


    // btn-group=====================================
    let newBtnGroup = document.createElement('div');
    newBtnGroup.classList.add('mt-3');

    // ==================edit-btn====================
    let editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'bg-warning', 'text-white', 'me-2', 'js-editbtn');
    editBtn.textContent = 'Edit';
    editBtn.dataset.contactId = item.id;

    // ==================del-btn=======================
    let delBtn = document.createElement('button');
    delBtn.classList.add('btn', 'bg-danger', 'text-white', 'js-delbtn');
    delBtn.textContent = 'Delete';
    delBtn.dataset.contactId = item.id;
    // ==================================================

    newBtnGroup.appendChild(editBtn);
    newBtnGroup.appendChild(delBtn);



    newItem.appendChild(newContact);
    newItem.appendChild(newRel);
    newItem.appendChild(newNumber);
    newItem.appendChild(newBtnGroup);

    node.appendChild(newItem);
  });
};

render(contacts, elList)


elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const findedItem = contacts.findIndex((item) => item.phone == elPhone.value);

  if (findedItem >= 0) {
    alert('This phone number already exists');
  } else {
    let obj = {
      id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
      name: elName.value,
      relationship: elSelect.value,
      phone: elPhone.value
    };
    contacts.push(obj);
    render(contacts, elList);
    elName.value = '';
    elSelect.value = 0;
    elPhone.value = '';
  };



});

elList.addEventListener('click', function (evt) {
  if (evt.target.matches('.js-delbtn')) {
    const findedIndex = contacts.findIndex((item) => item.id == evt.target.dataset.contactId);
    contacts.splice(findedIndex, 1);
    render(contacts, elList);
  };
  if (evt.target.matches('.js-editbtn')) {
    const findedItem = contacts.find((item) => item.id == evt.target.dataset.contactId);
    const editName = prompt('Change name:', findedItem.name);
    const editRel = prompt('Change relatinship:', findedItem.relationship);
    const editPhone = prompt('Change phone number:', findedItem.phone);
    findedItem.name = editName;
    findedItem.relationship = editRel;
    findedItem.phone = editPhone;
    render(contacts, elList);
  };
});

const modeBtn = document.querySelector('.js-modebtn')
let theme = false;

modeBtn.addEventListener('click', function () {
  theme = !theme;
  const bg = theme ? 'dark' : 'light';
  window.localStorage.setItem('theme', bg);
  changeMode();
});

function changeMode() {
  if (window.localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
};

changeMode();