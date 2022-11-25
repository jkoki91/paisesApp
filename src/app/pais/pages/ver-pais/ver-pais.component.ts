import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent {
  
  pais!: Country[];

  constructor ( 
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    // dos formas distintas de hacer el subscribe (la primera con rxjs)
      .pipe(
        // switchMap( (param) => this.paisService.getPaisPorAlpha( param.id ))
        switchMap( ({id}) => this.paisService.getPaisPorAlpha( id )),
        tap( console.log )
      )
      .subscribe( pais => {
        this.pais = pais
        console.log(this.pais[0].translations['ara'])
        // console.log(pais)
      })
    
    // this.activatedRoute.params
    //   .subscribe( ({ id }) => {
    //     console.log( id );

    //     this.paisService.getPaisPorAlpha( id )
    //       .subscribe( pais => {
    //         console.log(pais)
    //       })
    //   });
  }

}
