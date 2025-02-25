import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getUnidades } from '../../../api/unidades.service';
import { editUsuario } from '../../../api/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'expanded-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './expanded-component.component.html',


})
export class ExpandedComponentComponent {

  @Input() data: any = []
  Unidades: any = []
  formulario: FormGroup = new FormGroup({
      Id: new FormControl('', []),
      Rol: new FormControl('', []),
      Unidad: new FormControl('', []),
    })

    roles = [
        { rol: 'Administrador' },
        { rol: 'Usuario' },
    ]

    
     ngOnInit() {
        // Pon el valor por defecto de data.Rol en Rol del formulario
        // this.formulario.get('Rol')?.setValue(this.data.Rol)
        // Rellena con los campos originales
        this.formulario.get('Id')?.setValue(this.data.id)
        this.formulario.get('Rol')?.setValue(this.data.rol)
        this.formulario.get('Unidad')?.setValue(this.data.unidad)
    
        console.log(this.formulario.value)
    
        getUnidades().then((res) => {
          this.Unidades = res
        })
    
        
      }

      async editThisData() {
        Swal.fire({
          title: '¿Estás seguro de editar este usuario?',
          showCancelButton: true,
          confirmButtonText: `Editar`,
          cancelButtonText: `Cancelar`,
        }).then(async (result) => {
          if (result.isConfirmed) {
           await editUsuario(this.formulario.value)
            // this.editMode = true
          }
        })
    
      }
    

      onDelete(row: any) {
        console.log(row)
      }

      
}
