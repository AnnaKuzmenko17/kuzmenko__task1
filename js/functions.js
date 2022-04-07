import { data } from './data.js';

const store = {
  data,
};

export const editNote = (formData, id) => {
  const note = store.data.find((item) => item.id === id);

  note.name = formData.name;
  note.category = formData.category;
  note.content = formData.content;
  note.dates = getDates(formData.content);
};

export const changeStatusNote = (id) => {
  const note = store.data.find((note) => note.id === id);
  note.archived = !note.archived;
};

export const deleteNote = (id) => {
  store.data = store.data.filter((note) => note.id !== id);
};

export const createNote = (formStore) => {
  const note = {
    id: Date.now().toString(),
    name: formStore.name,
    created: getCreatedDate(),
    category: formStore.category,
    content: formStore.content,
    dates: getDates(formStore.content),
    archived: false,
  };
  store.data = [...store.data, note];
};

export const getActive = () => store.data.filter((item) => !item.archived);

export const getArchive = () => store.data.filter((item) => item.archived);

export const getStatistics = () =>
  store.data.reduce((acc, note) => {
    const category = acc.find((cat) => cat.name === note.category);

    if (!category) {
      return [
        ...acc,
        {
          name: note.category,
          active: note.archived ? 0 : 1,
          archived: note.archived ? 1 : 0,
        },
      ];
    }

    note.archived ? category.archived++ : category.active++;
    return acc;
  }, []);

export const getCreatedDate = () =>
  `${new Date().toLocaleString('en', {
    month: 'long',
    day: '2-digit',
  })}, ${new Date().getFullYear()} `;

export const getDates = (content) =>
  [
    ...new Set(
      content?.match(/([1-9]|[12]\d|3[01])\/([1-9]|1[0-2])\/[12]\d{3}/g)
    )
  ]?.join(', ');
