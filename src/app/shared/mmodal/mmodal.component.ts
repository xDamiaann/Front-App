import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mmodal',
  templateUrl: './mmodal.component.html',
  styleUrls: ['./mmodal.component.css']
})
export class MmodalComponent {
  @Input() tipo = -1;
  @Input() idModal:string = '';
  @Input() title='';
  @Input() icono: string = '';
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() distribuidores: any[] = [];
  
  @Output() selectDistr: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalPublicar') modalPublicar!: ElementRef;

  message: string = '';
  api = '';

  constructor(
    ) {
    }
  async ngOnInit() {
   
  }

  abrir() {
    this.modalPublicar.nativeElement.click();
  }

  cerrar() {
    this.modalPublicar.nativeElement.cerrar();
  }


  Selectdistribuidor(distribuidor: any) {
    this.selectDistr.emit(distribuidor);
  }

}
