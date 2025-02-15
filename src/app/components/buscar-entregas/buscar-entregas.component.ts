import { Component } from '@angular/core';
import { getUnidades } from '../../api/unidades.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { buscarEntrega, deleteEntrega } from '../../api/entregas.service';
import { TableComponent } from './table/table.component'
import { ColumnDef } from '@tanstack/angular-table';
import Swal from 'sweetalert2';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

type Unidad = {
  id: number,
  unidad: string,
}


// Definimos columnas por defecto

@Component({
  selector: 'app-buscar-entregas',
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './buscar-entregas.component.html',
})
export class BuscarEntregasComponent {

  
  defaultColumns: ColumnDef<any>[] = [
    {
      accessorKey: 'nroEntrega',
      header: () => 'NroEntrega',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'fecha',
      header: () => 'Fecha',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'unidad',
      header: () => 'Unidad',
      cell: info => info.getValue(),
  
    }
  ]

  
  unidades: Unidad[] = []
  listaEntregas:any = []
  
  buscarEntregasForm: FormGroup = new FormGroup({
    Unidad: new FormControl('0', [Validators.required]),
    Desde: new FormControl('', [Validators.required]),
    Hasta: new FormControl('', [Validators.required]),
  });

  fetchUnidades() {
    getUnidades().then((data) => {
      this.unidades = data
       // Agrega la opción listar todo
       this.unidades.unshift({id: 0, unidad: 'Listar todo'});
    })
  }

  ngOnInit() {
    this.fetchUnidades()
  }
  
  isEmpty = true


  async fetchEntregas() {
    try {
      this.listaEntregas = []
      this.isEmpty = true 

      const entrega = await buscarEntrega(this.buscarEntregasForm.value)
      this.listaEntregas = entrega
      this.isEmpty = false
    
    } catch (error) {
      console.error(error)
    }
  }
 
  deleteThisRow(row: any) {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEntrega(row.original.nroEntrega)
        Swal.fire({
          title: 'Eliminado!',
          text: 'La entrega ha sido eliminada.',
          icon: 'success',
          confirmButtonColor: '#0C4A6E',
        }).then(() => {
          this.fetchEntregas()
        }
          
        )
      }
    })

    
  }

  editThisRow(){
    console.log("Edit")
  }

  imprimir(){

    // @ts-ignore
    const transformedData = this.listaEntregas.flatMap(entrega =>
    // @ts-ignore
      entrega.renglonesEntregas.map(renglon => ({
          id: renglon.id,
          nroEntrega: entrega.nroEntrega,
          fecha: new Date(entrega.fecha).toLocaleDateString("es-AR"),
          unidad: entrega.unidad,
          ...renglon
      }))
  );
  
  
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Entregas');

  worksheet.mergeCells('A1:D1'); // Unir celdas
  worksheet.getCell('A1').value = 'JEFATURA DE POLICÍA';
  // worksheet.getCell('A1').alignment = { horizontal: 'center' };
  worksheet.getCell('A1').font = { bold: true, size: 10 };

  worksheet.mergeCells('A2:D2'); // Unir celdas
  worksheet.getCell('A2').value = 'DIRECCIÓN DE ADMINISTRACIÓN';
  // worksheet.getCell('A2').alignment = { horizontal: 'center' };
  worksheet.getCell('A2').font = { bold: true, size: 10 };

  worksheet.mergeCells('A3:D3'); // Unir celdas

  worksheet.getCell('A3').value = 'VERIFICACIÓN DEL AUTOMOTOR';
  // worksheet.getCell('A3').alignment = { horizontal: 'center' };
  worksheet.getCell('A3').font = { bold: true, size: 10 };

  worksheet.mergeCells('A4:G4'); // Unir celdas
  worksheet.getCell('A4').value = 'INFORME DE ENTREGAS';
  worksheet.getCell('A4').alignment = { horizontal: 'center' };
  worksheet.getCell('A4').font = { bold: true, size: 14 };
  worksheet.getRow(4).height = 20;


  worksheet.getCell('E1').value = `Fecha de impresión: ${new Date().toLocaleDateString("es-AR")}`;

  worksheet.mergeCells('A6:G6'); // Unir celdas
  worksheet.getCell('A6').value = `Periodo desde ${new Date(this.buscarEntregasForm.value.Desde).toLocaleDateString("es-AR")} hasta ${new Date(this.buscarEntregasForm.value.Hasta).toLocaleDateString("es-AR")}`;
  // worksheet.getCell('A4').alignment = { horizontal: 'center' };
  worksheet.getCell('A6').font = { bold: true, size: 10 };



    // Encabezados personalizados en la fila 8
    worksheet.getRow(8).values = [
      'ID', 'Fecha', 'Unidad', 'Tipo de Formulario', 'Desde', 'Hasta', 'Cantidad'
    ];
    worksheet.getRow(8).font = { bold: true };

    
    // Haz que desde A8 hasta J8 tenga un borde abajo sin hacerlo manualmente uno a uno, no directamente getRow(8) porque lo hace en todo le documento y solo quiero de la A a la J
    for (let col = 1; col <= 7; col++) { // 1 = A, 10 = J
      const cell4 = worksheet.getCell(4, col);

      const cell8 = worksheet.getCell(8, col);

      cell4.border = {
        bottom: { style: 'thick', color: { argb: '000000' }}
    }

      cell8.border = {
        bottom: { style: 'thin', color: { argb: '000000' } } // Color negro
      };
    }

    

// Establecer ancho de columnas manualmente
worksheet.getColumn(1).width = 10; // ID
worksheet.getColumn(2).width = 20; // Fecha
worksheet.getColumn(3).width = 20; // Unidad
worksheet.getColumn(4).width = 25; // Tipo de Formulario
worksheet.getColumn(5).width = 10; // Desde
worksheet.getColumn(6).width = 10; // Hasta
worksheet.getColumn(7).width = 10; // Cantidad

// Inserción de datos comenzando en la fila 9
transformedData.forEach((data: any, index:number) => {
  const rowIndex = 9 + index; // Empieza en la fila 9
  worksheet.getRow(rowIndex).values = [
    data.id,
    data.fecha,
    data.unidad,
    data.tipoFormulario,
    data.desde,
    data.hasta,
    data.cantidad
  ];
});


      // Agregar los datos
   //   worksheet.insertRows(9, transformedData);
  
      // Crear archivo Excel
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'Entregas.xlsx');
      });


    // listaEntregas viene con un NroEntrega y 
  }

}
