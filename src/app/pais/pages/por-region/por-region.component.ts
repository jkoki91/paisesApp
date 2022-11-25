import { Component } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css'],
  styles: [`
    button {
      margin-right: 5px
    }
  `]
})
export class PorRegionComponent {
  
  // regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania']; //antigua API
  regiones: string[] = ['EU','EFTA','CARICOM','PA','AU','USAN','EEU','AL','ASEAN','CAIS','CEFTA','NAFTA','SAARC']; 
  regionActiva: string = '';
  paises: Country[] = [];

  constructor(private regionService: PaisService) {}

  getClaseCss( region: string): string {
    return (( region === this.regionActiva ) ? 'btn btn-primary mt-1' : 'btn btn-outline-primary mt-1') 
  }

  activarRegion( region: string ){

    if ( region === this.regionActiva ) { return; }

    this.paises = [];
    this.regionActiva = region;

    this.regionService.getPaisPorregion( region )
      .subscribe( (paises) => this.paises = paises );
  }
  
}
