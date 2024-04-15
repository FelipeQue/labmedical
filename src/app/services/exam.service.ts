import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private httpClient: HttpClient) { }

  getExam() {
    let url = '/api/exams';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<any>(url, {headers: headers});
  };

  addExam(newExamData: any) {
    let url = '/api/exams';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(url, newExamData, { headers: headers });
  }

}
