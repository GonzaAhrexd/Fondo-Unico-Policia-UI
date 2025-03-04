import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from './table/table.component'
import { ColumnDef } from '@tanstack/angular-table';
import { getMarcasAutos } from '../../../../api/marcasAutos.service'

type Marca = {
  id: number,
  marca: string,
}


// Definimos columnas por defecto

@Component({
  selector: 'AutoTable',
  standalone: true,
  imports: [ TableComponent],
  template: `
   @if(!isLoading){
     <TableComponent 
     [defaultColumns]="defaultColumns" 
     [data]="listaMarcasAutos" 
     [onDelete]="deleteThisRow" 
     [onEdit]="editThisRow" />
    }@else {
      <p>Cargando...</p>
    }
    `
})

export class AutosTableComponent {
    defaultColumns: ColumnDef<Marca>[] = [
    {
      accessorKey: 'id',
      header: () => 'ID',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'marca',
      header: () => 'Marca',
      cell: info => info.getValue(),
    },
  ]
  isLoading = true
  listaMarcasAutos = []

  ngOnInit() {
    getMarcasAutos().then((data) => {
      this.listaMarcasAutos = data
      this.isLoading = false
      console.log(this.listaMarcasAutos)
    })
  }

  deleteThisRow = (row: any) => {
    console.log('Deleting row', row)
  }
  editThisRow = (row: any) => {
    console.log('Editing row', row)
  }


}