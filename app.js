const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template.js');


const promptUser = () => {
return inquirer.prompt([
  //User Name
  {
    type: 'input',
    name: 'name',
    message: 'What is your name? (Required)',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your name!');
        return false;
      }
    }
  },
  //Github Username
  {
    type: 'input',
    name: 'github',
    message: 'Enter your Github Username. (Required)',
    validate: nameInput => {
      if (nameInput){
        return true;
      } else {
        console.log('Please enter your user name!');
        return false;
      }
    }
  },
  //About Me Confirm
  {
    type: 'confirm',
    name: 'confirmAbout',
    message: 'Would you like to enter some info about yourself for an "About Me" section?',
    default: true 
  },

  {
    type: 'input',
    name: 'about',
    message: 'Provide some info about yourself:',
    when: ({ confirmAbout }) => {
      if (confirmAbout) {
        return true;
      } else {
        return false;
      }
    }
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
      //Project Description
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'name',
        message: 'provide a description of the project (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please describe your project!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        messsage: 'What did you build this project with? (Check all the choices that apply)',
        choices: ['javaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootsrap', 'Node']
      },
      //Project Github Link
      {
        type: 'input',
        name: 'link',
        message: 'Enter the Github link to your project. (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please provide a link!');
            return false;
          }
        }
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
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });

// .then(projectAnswers => console.log(projectAnswers));