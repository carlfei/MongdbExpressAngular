import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Tarjeta } from '../model/tarjeta';

@Injectable({
    providedIn: 'root'
})
export class TarjetaService {
private tarjeta$ = new Subject<Tarjeta>()

constructor(private _http:HttpClient) {}

create(tarjeta:any){
    this._http.post<{tarjetasCredito:any}>('http://localhost:3000/addcard',tarjeta).subscribe();
}

read():any{
    let cuentasBancarias:any [] = [];
    this._http.get<{cards:any[]}>('http://localhost:3000/cards').subscribe(
        (jsonData) => {
            jsonData.cards.forEach((ele)=>cuentasBancarias.push(ele));
            // cuentasBancarias = jsonData.cards;
        }
    )
    return cuentasBancarias;
}

update(tarjeta:Tarjeta): Observable <any>{
    return this._http.put('http://localhost:3000/update-entry/'+tarjeta,tarjeta)
}
delete(id:string): Observable<any>{
    return this._http.delete('http://localhost:3000/remove-card/'+id)
}

setTarjeta(tarjeta:Tarjeta){
    this.tarjeta$.next(tarjeta)
}

getTarjeta():Observable<Tarjeta>{
    return this.tarjeta$.asObservable()
}

}