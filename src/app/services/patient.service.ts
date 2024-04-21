import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) { }

  url: string = '/api/patients';

  getPatient() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<any>(this.url, {headers: headers});
  };

  addPatient(newPatientData: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(this.url, newPatientData, { headers: headers });
  };

  editPatient(patientId: string, editedPatientData: any) {
    let updateUrl = `${this.url}/${patientId}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(updateUrl, editedPatientData, { headers: headers });
  };

  deletePatient(patientId: string) {
    const url = `${this.url}/${patientId}`;
    return this.httpClient.delete<any>(url);
  };


}
