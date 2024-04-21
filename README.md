# LABMedical

## Overview :hospital:

LABMedical is a healthcare provider management system. It is designed to streamline the process of patient registration and management of exams and consultations records in a hospital setting. Its primary users are healthcare professionals such as doctors, nurses, and medical administrators. The present project focuses on the front end and makes use of localStorage for login and JSON server to mock the backend.

This project was developed as part of the Floripa Mais Tec fullstack programme, by LAB365/SENAI (Florianópolis, Brasil).

## Features :health_worker:

### Registration
- **Easy Registration**: On login screen, healthcare professionals can register themselves using a simple form.
- **Patient Registration**: Healthcare professionals can register patients using a form that captures all the required information. Form fields validate the input to check for adequacy.
- **Unique ID Generation**: Each patient is assigned a unique ID (with JSON server) for easy tracking and record management.

### Exam/Consultation Records
- **Record Management**: Healthcare professionals can easily create, view, and update consultation or exam records for each patient.
- **Search Functionality**: Records can be searched using either patient ID or name as parameters. Search results are in alphabetical order.
- **Record Visualization**: Patients records bring together exams and consultations, displaying them in chronological order.
- **System information**: On the home screen, the user can see the current system stats, with total number of patients, exams and consultations on record.

## Technologies 🛠️

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3. Thus, it's based on:

- **HTML**
- **SCSS**
- **Typescript**

## Extra libraries 📔

The following libraries were installed *and recruited* in the development of LABMedical:

- **FontAwesome**  
@fortawesome/angular-fontawesome@0.14.1  
@fortawesome/free-solid-svg-icons@6.5.2

- **NG Bootstrap**  
@ng-bootstrap/ng-bootstrap@16.0.0

- **NGX Mask**  
ngx-mask@17.0.7

- **NGX Toastr**  
ngx-toastr@18.0.0

- **JSON Server**  
json-server@1.0.0-alpha.23

## Development process :building_construction:

This project was developed using a Kanban board in Trello.  
https://trello.com/b/xZyCobjC/projeto-labmedical (in Portuguese)

## Angular tips

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further Angular help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
