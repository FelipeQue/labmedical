import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { ExamComponent } from './components/exam/exam.component';
import { RecordsComponent } from './components/records/records.component';
import { RecordsDetailComponent } from './components/records/records-detail/records-detail.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full",
    },
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "register-patient",
        component: PatientComponent
    },
    {
        path: "register-consultation",
        component: ConsultationComponent,
    },
    {
        path: "register-exam",
        component: ExamComponent,
    },
    {
        path: "medical-records",
        children: [
            { path: "",component: RecordsComponent },
            { path: ":id", component: RecordsDetailComponent },
        ],
    },
];
