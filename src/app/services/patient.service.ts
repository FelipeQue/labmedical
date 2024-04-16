import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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


  // Estou pensando em migrar o searchPatient para cá, mas fico encontrando um erro. Se der tempo, perguntarei à prof como corrigir. Eis a função:
  // searchPatient(input: string): Observable<any[]> {
  //   const nameOrId = input.trim();
  //     this.getPatient().subscribe((patients) => {
  //       const patientsList = patients;
  //       let resultsList = patientsList.filter((searchedPatient: { name: string, id: string }) => {
  //         const isNameMatch = searchedPatient.name && searchedPatient.name.toLowerCase().includes(nameOrId.toLowerCase());
  //         const isIdMatch = searchedPatient.id && searchedPatient.id.includes(nameOrId);
  //         return isNameMatch || isIdMatch;
  //       });
  //       return resultsList;
  //     });
  // };


}
