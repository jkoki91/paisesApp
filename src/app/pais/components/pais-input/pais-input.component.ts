import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit{

  @Input( ) placeholder: string = '';
  
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  
  debouncer: Subject<string> = new Subject();
  
  termino: string = '';

  ngOnInit() {
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe( valor => {
        // console.log('debouncer:', valor)
        this.onDebounce.emit( valor )
      });
  }

  buscar() {
    this.onEnter.emit( this.termino );
  }

  // teclaPresionada(event: any) {   //Se puede hacer mandando el event también
  teclaPresionada() {
    // const valor = event.target.value;   //si se hace mandando el event
    // console.log(valor);     //si se hace mandando el event
    // console.log(this.termino);    //si se hace mandando el event

    this.debouncer.next( this.termino );

  }
}
