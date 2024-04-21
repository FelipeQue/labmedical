import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { ExamComponent } from './components/exam/exam.component';
import { RecordsComponent } from './components/records/records.component';
import { RecordsDetailComponent } from './components/records/records-detail/records-detail.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full",
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate: [authGuard],
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [loginGuard],
    },
    {
        path: "register-patient",
        component: PatientComponent,
        canActivate: [authGuard],
    },
    {
        path: "register-consultation",
        component: ConsultationComponent,
        canActivate: [authGuard],
    },
    {
        path: "register-exam",
        component: ExamComponent,
        canActivate: [authGuard],
    },
    {
        path: "medical-records",
        children: [
            { path: "",component: RecordsComponent },
            { path: ":id", component: RecordsDetailComponent },
        ],
        canActivate: [authGuard],
    },
    {
        path: "edit-patient",
        children: [
            { path: "",component: PatientComponent },
            { path: ":id", component: PatientComponent },
        ],
        canActivate: [authGuard],
    },
    {
        path: "edit-consultation",
        children: [
            { path: "",component: ConsultationComponent },
            { path: ":id", component: ConsultationComponent },
        ],
        canActivate: [authGuard],
    },
    {
        path: "edit-exam",
        children: [
            { path: "",component: ExamComponent },
            { path: ":id", component: ExamComponent },
        ],
        canActivate: [authGuard],
    },
];
