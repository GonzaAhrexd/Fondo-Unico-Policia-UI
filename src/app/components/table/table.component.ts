
// Importamos cosas de Angular
import { ChangeDetectionStrategy, Component, Input, input, signal } from '@angular/core'

// Importamos cosas de Angular Table de TanStack
import {
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/angular-table'

import { deleteMarcas, getMarcas, editMarca } from '../../api/marcas.service'
import Swal from 'sweetalert2'
import { FormControl, FormGroup, Validators } from '@angular/forms'
// Definimos el tipo de dato Marca

type Marca = {
  id: number
  marca: string
  descripcion: string
}



@Component({
  selector: 'TableComponent',
  standalone: true,
  imports: [FlexRenderDirective],
  templateUrl: './table.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TableComponent {

  @Input() defaultColumns: ColumnDef<any>[] = []
  @Input() data = signal<any>([])
  @Input() onDelete: Function = () => {}; // Función de eliminación
  @Input() onEdit: Function = () => {}; // Función de edición
  // @Input() onShow: Function = () => {}; // Función para mostrar detalles o alertas

  public readonly sizesPages = signal<number[]>([5, 10, 25, 50, 100])
  public readonly paginationState = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,

  })




  table = createAngularTable(() => ({
    data: this.data(),
    columns: this.defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: this.paginationState(),
    },
    onPaginationChange: (valueOrFunction) => {

      typeof valueOrFunction === 'function'
        ? this.paginationState.update(valueOrFunction)
        : this.paginationState.set(valueOrFunction)


    }
  }));
}