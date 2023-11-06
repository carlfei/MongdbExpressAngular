import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent {
  form:FormGroup;
   
  constructor(private _fb:FormBuilder){
    this.form = this._fb.group({
      titular:        ['',[Validators.required,Validators.maxLength(40)]],
      numeroTarjeta:  ['',[Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]{16}$')]],
      fechaCaducidad: ['',[Validators.required, Validators.minLength(5),Validators.maxLength(5)]],
      cvv:            ['',[Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  }
  crearTarjeta(){
   // const variable:string='';
    console.log(this.form);
  }

}
