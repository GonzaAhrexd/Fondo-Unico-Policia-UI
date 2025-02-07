import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'CardActions',
  standalone: true,
  imports: [],
  template: `
    <div class="cursor-pointer z-10 rounded-lg md:h-32 lg:h-24 xl:h-20 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-sky-900 hover:bg-sky-950 transform transition-transform duration-300 ease-in-out hover:scale-105" (click)="clicked(texto)">
      <div class="flex flex-row md:flex-col md:items-center lg:flex-row lg:items-start justify-between">
        <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-50">
          {{texto}}
        </h5>
      </div>
    </div>
    
  `,
})
export class CardActionsComponent {
  @Input() texto: string = "";
  @Output() opcion = new EventEmitter<string>();
  clicked(text: any){ 
    this.opcion.emit(text);
  }
  
}
