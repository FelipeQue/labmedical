import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) { }

  getPatient() {
    let url = '/api/patients';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<any>(url, {headers: headers});
  };

  addPatient(newPatientData: any) {
    let url = '/api/patients';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(url, newPatientData, { headers: headers });
  }

}
