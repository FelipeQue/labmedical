import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private httpClient: HttpClient) { }

  getConsultation() {
    let url = '/api/consultations';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<any>(url, {headers: headers});
  };

  addConsultation(newConsultationData: any) {
    let url = '/api/consultations';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(url, newConsultationData, { headers: headers });
  }

}