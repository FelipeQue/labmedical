import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  getAddress(cep: any) {
    let url = 'https://viacep.com.br/ws';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(`${url}/${cep}/json`, {headers: headers});
  };

}
