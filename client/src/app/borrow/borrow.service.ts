import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Borrow } from './model/Borrow';
import { BorrowPage } from './model/BorrowPage';
import { BORROW_DATA } from './model/mock_borrow';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/borrow';

  getBorrows(pageable: Pageable, gameId?: number,customerId?: number,date?: Date): Observable<BorrowPage> {
    return this.http.post<BorrowPage>(this.composeFindUrl(gameId,customerId, date), {pageable: pageable});
  }
  getBorrow(gameId?: number, customerId?: number, date?: Date){
    return this.http.get<Borrow[]>(this.composeFindUrl(gameId, customerId, date));
  }

  saveBorrow(borrow: Borrow): Observable<void>{
    let url = 'http://localhost:8080/borrow';
    if(borrow.id != null) url += '/'+borrow.id;
    return this.http.put<void>(url, borrow);
  }

  deleteBorrow(idBorrow: number): Observable<void>{
    return this.http.delete<void>('http://localhost:8080/borrow/'+idBorrow);
  }

  private composeFindUrl(gameId?: number, customerId?: number, date?: Date){
    const params = new URLSearchParams();
    if (gameId) {
      params.set('gameId', gameId.toString());
    }
    if (customerId) {
      params.set('customerId', customerId.toString())
    }
    if (date) {
      params.set('date', this.fomatDate(date))
    }
    const queryString = params.toString();
    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
  }

  fomatDate(date: Date) : string { 
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }


}
