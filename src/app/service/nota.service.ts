import { Injectable } from '@angular/core';
import { Nota } from '../model/nota';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private urlListar:string = 'http://localhost:8080/listarNotas';
  private urlGuardar:string = 'http://localhost:8080/guardarNota';
  private urlBorrar:string = 'http://localhost:8080/borrar'; 

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }


  getNotas(): Observable<Array<Nota>> {
    //Se hace un casteo ya que el observable devuelve un tipo any
    return this.http.get<Array<Nota>>(this.urlListar);
  }

  create(nota: Nota): Observable<Nota>{
    return this.http.post<Nota>(this.urlGuardar, nota, {headers: this.httpHeaders});
  }

  delate(id:number): Observable<Nota>{
    return this.http.delete<Nota>(`${this.urlBorrar}/${id}`, {headers: this.httpHeaders})
  }
}
