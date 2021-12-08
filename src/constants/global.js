export const CITY_OPTIONS = [
  { value: 1, label: "Da Nang" },
  { value: 2, label: "Ho Chi Minh" },
  { value: 3, label: "Hai Phong" },
  { value: 4, label: "Ha Noi" },
  { value: 5, label: "Hai Duong" },
];

export const PHOTO_CATEGORY_OPTIONS = [
  { value: 1, label: "Technology" },
  { value: 2, label: "Education" },
  { value: 3, label: "Nature" },
  { value: 4, label: "Animals" },
  { value: 5, label: "Styles" },
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
