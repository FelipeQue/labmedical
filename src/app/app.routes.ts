import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { ExamComponent } from './components/exam/exam.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register-patient",
        component: PatientComponent
    },
    {
        path: "register-consultation",
        component: ConsultationComponent
    },
    {
        path: "register-exam",
        component: ExamComponent
    },
];
