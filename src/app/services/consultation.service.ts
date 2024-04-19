import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private httpClient: HttpClient) { }

  url: string = '/api/consultations'

  getConsultation() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<any>(this.url, {headers: headers});
  };

  addConsultation(newConsultationData: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(this.url, newConsultationData, { headers: headers });
  };

  editConsultation(consultationId: string, editedConsultationData: any) {
    let updateUrl = `${this.url}/${consultationId}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(updateUrl, editedConsultationData, { headers: headers });
  };

  deleteConsultation(consultationId: string) {
    const url = `${this.url}/${consultationId}`;
    return this.httpClient.delete<any>(url);
  };

}