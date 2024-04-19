import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private httpClient: HttpClient) { }

  url: string = '/api/exams';

  getExam() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<any>(this.url, {headers: headers});
  };

  addExam(newExamData: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(this.url, newExamData, { headers: headers });
  };

  editExam(examId: string, editedExamData: any) {
    let updateUrl = `${this.url}/${examId}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(updateUrl, editedExamData, { headers: headers });
  };

  deleteExam(examId: string) {
    const url = `${this.url}/${examId}`;
    return this.httpClient.delete<any>(url);
  };

}
