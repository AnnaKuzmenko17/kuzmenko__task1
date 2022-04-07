import { icons } from './data.js';

import {
  changeStatusNote,
  deleteNote,
  getActive,
  getArchive,
  getStatistics,
  createNote,
  editNote,
} from './functions.js';

const notesTbody = document.querySelector('.notes__body');
const statisticsTbody = document.querySelector('.statistics__body');
const noteTemplate = document.querySelector('.note-template');
const categoryTemplate = document.querySelector('.category-template');
const addNoteButton = document.querySelector('.addNote');
const cancelButton = document.querySelector('.cancel');
const form = document.querySelector('.form');
const dialog = document.querySelector('.dialog');
const toggle = document.querySelector('.toggle');
const errorMessage = document.querySelector('.error-message');

const addNote = (note) => {
  const clone = noteTemplate.content.cloneNode(true);

  clone.querySelector('.logo .circle').innerHTML = icons[note.category];

  clone.querySelector('.name').textContent = note.name;
  clone.querySelector('.created').textContent = note.created;
  clone.querySelector('.category').textContent = note.category;
  clone.querySelector('.content').textContent = note.content;
  clone.querySelector('.dates').textContent = note.dates;

  clone.querySelector('.edit')
    .addEventListener('click', () => showDialog('edit', note), false);

  clone.querySelector('.archive')
    .addEventListener('click',() => {
      changeStatusNote(note.id);
      updateTables();
    },
    false
  );

  clone.querySelector('.archive')
    .innerHTML = notesTbody.dataset.status === 'active'
      ? '<i class="bi bi-box-arrow-in-down"></i>'
      : '<i class="bi bi-box-arrow-in-up"></i>';

  clone.querySelector('.delete')
    .addEventListener('click',() => {
      deleteNote(note.id);
      updateTables();
    },
    false
  );

  notesTbody.appendChild(clone);
};

const countCategory = (category) => {
  const clone = categoryTemplate.content.cloneNode(true);

  clone.querySelector('.logo .circle').innerHTML = icons[category.name];

  clone.querySelector('.category').textContent = category.name;
  clone.querySelector('.active-count').textContent = category.active;
  clone.querySelector('.archive-count').textContent = category.archived;

  statisticsTbody.appendChild(clone);
};

const clearTable = (table) => {
  table.innerHTML = '';
};

const fillTable = (table, tableContent) => {
  table === notesTbody
    ? tableContent.forEach((element) => addNote(element))
    : tableContent.forEach((element) => countCategory(element));
};

const showDialog = (mode = 'create', note) => {
  form.dataset.mode = mode;
  form.dataset.noteId = note?.id;

  if (note) {
    form.querySelector('#name').value = note.name;
    form.querySelector('#category').value = note.category;
    form.querySelector('#content').value = note.content;
  }

  dialog.showModal();

  cancelButton.addEventListener('click', () => {
    resetForm();
  });
};

const updateTables = () => {
  clearTable(notesTbody);
  clearTable(statisticsTbody);

  notesTbody.dataset.status === 'active'
    ? fillTable(notesTbody, getActive())
    : fillTable(notesTbody, getArchive());

  fillTable(statisticsTbody, getStatistics());
};

addNoteButton.addEventListener('click', () => showDialog(), false);

toggle.addEventListener(
  'click',
  () => {
    clearTable(notesTbody);

    if (notesTbody.dataset.status === 'active') {
      toggle.innerHTML =
        '<div><i class="bi bi-arrow-repeat"></i> Archive Notes </div>';
      notesTbody.dataset.status = 'archive';
      fillTable(notesTbody, getArchive());
    } else {
      toggle.innerHTML =
        '<div><i class="bi bi-arrow-repeat"></i> Active Notes </div>';
      notesTbody.dataset.status = 'active';
      fillTable(notesTbody, getActive());
    }
  },
  false
);

const resetForm = () => {
  errorMessage.textContent = '';
  form.reset();
  dialog.close();
};

form.addEventListener(
  'submit',
  (event) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target).entries());

    if (!formData.name.trim() || !formData.content.trim()) {
      errorMessage.textContent = 'Please fill the form.';
      return;
    }
    errorMessage.textContent = '';

    form.dataset.mode === 'edit'
      ? editNote(formData, form.dataset.noteId)
      : createNote(formData);

    resetForm();

    fillTable(notesTbody, getActive());
    fillTable(statisticsTbody, getStatistics());
    updateTables();
  },
  false
);

form.addEventListener('input', () => (errorMessage.textContent = ''));

fillTable(notesTbody, getActive());
fillTable(statisticsTbody, getStatistics());
