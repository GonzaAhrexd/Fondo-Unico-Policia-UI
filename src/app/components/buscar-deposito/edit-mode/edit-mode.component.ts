import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { getUnidades } from '../../../api/unidades.service';
import { getBancos } from '../../../api/bancos.service'
import { editDeposito } from '../../../api/deposito.service';
import { deleteDepositos } from '../../../api/deposito.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'EditMode',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './edit-mode.component.html',
})
export class EditModeComponent {

  @Input() defaultData:any = {}
  unidades:any = []
  bancos:any = []

  form: FormGroup = new FormGroup({
    NroDeposito: new FormControl(''),
    Fecha: new FormControl('', [Validators.required]),
    Unidad: new FormControl('', [Validators.required]),
    Banco: new FormControl('', [Validators.required]),
    Cuenta: new FormControl('', [Validators.required]),
    Tipo: new FormControl('', [Validators.required]),
    Importe: new FormControl('', [Validators.required]), 
  });

  // Rellenar con los datos de defaultData

  ngOnInit() {

    this.fetchUnidades()
    this.fetchBancos()

    this.form.patchValue({
      NroDeposito: this.defaultData.nroDeposito,
      Fecha: this.formatDate(this.defaultData.fecha),
      Unidad: this.defaultData.unidad,
      Banco: this.defaultData.banco,
      Cuenta: this.defaultData.cuenta,
      Tipo: this.defaultData.tipo,
      Importe: this.defaultData.importe,
    });
    console.log(this.defaultData)
    console.log(this.form.value);
  }

    fetchUnidades() {
      getUnidades().then((data) => {
        this.unidades = data
        console.log(this.unidades)
      })
    }

    fetchBancos(){
      getBancos().then((data) => {
        this.bancos = data
      })
    }

    // Función para formatear la fecha
  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  
  tipoOpciones = [
    {value: "Depósito Efectivo"},
    {value: "Interdepósito"},
  ]

  preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }

  eliminarDeposito(nroDeposito: number){
    try{
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0C4A6E',
        cancelButtonColor: '#FF554C',
        confirmButtonText: 'Sí, enviar!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(this.form.value)
          deleteDepositos(nroDeposito).then((res) => {
            Swal.fire(
             {
              title: 'Depósito enviado',
              icon: 'success',
              confirmButtonColor: '#0C4A6E',
              confirmButtonText: 'Aceptar'
             }
            )
          })
        }
      })
    }catch(e){
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al enviar el depósito',
        icon: 'error',
        confirmButtonColor: '#0C4A6E',
        confirmButtonText: 'Aceptar'
      })
    }
  }
  updateDeposito(){
      try{
        Swal.fire({
          title: '¿Estás seguro?',
          text: "No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0C4A6E',
          cancelButtonColor: '#FF554C',
          confirmButtonText: 'Sí, enviar!'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(this.form.value)
            editDeposito(this.form.value).then((res) => {
              Swal.fire(
               {
                title: 'Depósito enviado',
                icon: 'success',
                confirmButtonColor: '#0C4A6E',
                confirmButtonText: 'Aceptar'
               }
              )
            })
          }
        })
      }catch(e){
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al enviar el depósito',
          icon: 'error',
          confirmButtonColor: '#0C4A6E',
          confirmButtonText: 'Aceptar'
        })
      }
    }
  


}