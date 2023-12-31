import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private myAppUrl = 'https://localhost:7282/';
  private myApiInsert = 'sale/insert/';
  private myApiUpdate = 'sale/update/';

  private myUrlGet = 'sale/getall/';
  private myUrlStateFail = 'sale/ModifyStateFail?idSale=';
  private myUrlTicket = 'sale/getticket?idStudent=';
  private myUrlId = 'sale/getbyid?id=';
  private myUrlIdStudent = 'sale/getbyidstudent?idStudent=';
  private myUrlDecrease = 'opening/decreaseQuantity';
  constructor(private http: HttpClient) { }

  saveSale(dtoSale: FormData): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiInsert, dtoSale);
  }
  updateSale(dtoSale: FormData): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUpdate, dtoSale);
  }
  getListSale(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGet);
  }
  getSaleId(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlId + id);
  }
  decreaseQuantity(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.myAppUrl + this.myUrlDecrease, data, { headers: headers });
  }
  getSaleModifyStateFail(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlStateFail + id);
  }
  getSaleGeyByIdStudent(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlIdStudent + id);
  }
  getTicket(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlTicket + id);
  }
}
