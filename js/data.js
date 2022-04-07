const icons = {
  Task: '<i class="bi bi-basket"></i>',
  'Random Thought': '<i class="bi bi-puzzle"></i>',
  Idea: '<i class="bi bi-lightbulb"></i>',
  Quote: '<i class="bi bi-chat-quote"></i>',
};

const data = [
  {
    id: '2536718638502',
    name: 'Shopping list',
    created: 'April 01, 2022',
    category: 'Task',
    content:
      'Tomatoes, floor, cucumbers',
    dates: '',
    archived: true,
  },
  {
    id: '2536718937254',
    name: 'Dentist',
    created: 'April 01, 2022',
    category: 'Task',
    content:
      "I'm gonna have a dentist appointment on the 3/5/2022, I moved it from 5/5/2022",
    dates: '  3/5/2022, 5/5/2022',
    archived: false,
  },
  {
    id: '2536718937254',
    name: 'Hyppocrates',
    created: 'April 02, 2022',
    category: 'Quote',
    content:
      'Sed dapibus, nulla vitae consequat volutpat, libero velit pellentesque sapien, vel consectetur elit tellus blandit neque.',
    dates: '',
    archived: false,
  },
  {
    id: '2536718936284',
    name: 'Radency',
    created: 'April 03, 2022',
    category: 'Task',
    content:
      'Hometask #1 should be done by 7/4/2022',
    dates: '  7/4/2022',
    archived: false,
  },
  {
    id: '2536718937465',
    name: 'Dream',
    created: 'April 04, 2022',
    category: 'Idea',
    content:
      'It will be so cool when I finish this task',
    dates: '',
    archived: false,
  },
  {
    id: '2536718046382',
    name: 'Boiler',
    created: 'April 04, 2022',
    category: 'Random Thought',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus elit erat 28/9/2022, a vestibulum velit cursus sit amet. Fusce porttitor scelerisque mattis.',
    dates: '28/9/2022',
    archived: true,
  },
  {
    id: '2536718947382',
    name: 'Cinema',
    created: 'April 05, 2022',
    category: 'Idea',
    content:
      'I want to go to cinema next week',
    dates: '',
    archived: false,
  },
];
export { data, icons };
