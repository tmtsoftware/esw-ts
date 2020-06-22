import inquirer, { QuestionCollection } from 'inquirer'

const questions: QuestionCollection = [
  {
    type: "input",
    name: "project-name",
    message: "name of the project?",
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true; // instead name validation using validate-npm-package-name-typed
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
  {
    type: "confirm",
    name: "add-library",
    message: "would you like to include esw-ts as a dependency?",
  },
  {
    type: "confirm",
    name: "add-aas",
    message: "would you like to include Auth as well?",
    when:(answers) => answers['add-library']
  }
];

inquirer.prompt(questions).then((answers) => {
  console.log(JSON.stringify(answers, null, "  "));
  //based on the answers
  // 1 set up package.json
  // 2 copy files and write from templates folder
  // 3 npm install
});

