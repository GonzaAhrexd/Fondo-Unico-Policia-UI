import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { AgregarEntregaComponent } from '../../components/agregar-entrega/agregar-entrega.component';
import { BuscarEntregasComponent } from '../../components/buscar-entregas/buscar-entregas.component';
@Component({
  selector: 'app-entregas',
  standalone: true,
  imports: [SidebarComponent, CardActionsComponent, CommonModule, AgregarEntregaComponent, BuscarEntregasComponent],
  templateUrl: './entregas.component.html',
})
export class EntregasComponent {
  
  opcionesDatos = [
    { texto: "Búsqueda" },
    { texto: "Agregar entrega"},

  ]

  opcion:string = ""

  getClickedSection(text: any) {
    this.opcion = text
  }
}
