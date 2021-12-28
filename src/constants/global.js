export const CITY_OPTIONS = [
  { value: 1, label: "None" },
  { value: 2, label: "Da Nang" },
  { value: 3, label: "Ho Chi Minh" },
  { value: 4, label: "Hai Phong" },
  { value: 5, label: "Ha Noi" },
  { value: 6, label: "Hai Duong" },
];

export const JOB_TYPE_OPTIONS = [
  { value: 1, label: "Web Developer" },
  { value: 2, label: "Quality Assurance Tester" },
  { value: 3, label: "Systems Analyst" },
  { value: 4, label: "Network Engineer" },
  { value: 5, label: "Software Engineer" },
];

export const JOB_CATEGORY_OPTIONS = [
  { value: 1, label: "Designer" },
  { value: 2, label: "Developer" },
  { value: 3, label: "Software Engineer" },
  { value: 4, label: "Manager" },
  { value: 5, label: "Support" },
];

export const GENDER = [
  { value: "", label: "All" },
  { value: 0, label: "Male" },
  { value: 1, label: "Female" },
];

export const skill = [
  { Skill_ID: 1, Skill_Name: "Java" },
  { Skill_ID: 2, Skill_Name: "ReactJS" },
  { Skill_ID: 3, Skill_Name: "Photoshop" },
  { Skill_ID: 4, Skill_Name: "ASP .Net" },
  { Skill_ID: 5, Skill_Name: "Javascript" },
];

export const SORT_OPTIONS = [
  { value: "", label: "Default" },

  { value: "date", label: "Newest Date" },
  { value: "-date", label: " Lastest Date" },
  { value: "name", label: "Name A-Z" },
  { value: "-name", label: "Name Z-A" },
  { value: "salary", label: "Salary Increase" },
  { value: "-salary", label: "Salary Decrease" },
];

export const SORT_OPTIONS_CANDIDATE = [
  { value: "", label: "Default" },

  { value: "date", label: "Newest Date" },
  { value: "-date", label: " Lastest Date" },
  { value: "name", label: "Name A-Z" },
  { value: "-name", label: "Name Z-A" },
];

export function getUnique(arr, comp) {
  const unique = arr
    .map((e) => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter((e) => arr[e])
    .map((e) => arr[e]);

  return unique;
}

export const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' }
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: 'Normal', style: 'unstyled' },
    { label: 'Heading Large', style: 'header-one' },
    { label: 'Heading Medium', style: 'header-two' },
    { label: 'Heading Small', style: 'header-three' }
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' }
  ]
};
