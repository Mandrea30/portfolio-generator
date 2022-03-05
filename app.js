const inquirer = require('inquirer');
// const fs = require('fs');

// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);



//   fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log("Portfolio complete! Check out index.html to see the output!");
//   });

const promptUser = () => {
return inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?'
  },
  {
    type: 'input',
    name: 'github',
    message: "Enter your Github Username'"
  },
  {
    type: 'input',
    name: 'about',
    message: 'Provide some info about yourself:'
  }
]);
};

const promptProject = portfolioData  => {
  console.log(`
    =================
    Add a New Project
    =================
    `);
    //If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
      portfolioData.projects = [];
    }

    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'provide a description of the project (Required)'
      },
      {
        type: 'checkbox',
        name: 'languages',
        messsage: 'What did you build this project with? (Check all the choices that apply)',
        choices: ['javaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootsrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the Github link to your project. (Required)'
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'would you like to feature this project?',
        default: false  
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: true
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
    
};

promptUser()
.then(promptProject)
.then(portfolioData => {
  console.log(portfolioData);
});

// .then(projectAnswers => console.log(projectAnswers));