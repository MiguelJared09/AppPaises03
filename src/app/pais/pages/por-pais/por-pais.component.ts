import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino : string = '';
  hayError: boolean = false;
  paises:Country[]=[];
  
  constructor(private paisService:PaisService) { }

  buscar( termino: string ){
    this.hayError=false;
    this.termino = termino;
    console.log(this.termino);
    
    /* metodo depreciado pero sirve de observable */
    this.paisService.buscarPais(termino)
    .subscribe( (paises) => {
      console.log(paises);
      this.paises = paises;
    }, (err) =>{
      this.hayError = true;
      this.paises = []
    });
    /* of(this.paisService.buscarPais(this.termino))
    .subscribe({
      next: (paises) =>{
        paises.subscribe({
          next: (pais) => {
            if(pais.status === 404){
              this.hayError = true
            } else{
              console.log('pais');
            }
          }
        })
      }
    }) */
  }

  sugerencias( termino:string){
    this.hayError = false;
    // TODO: crear sugerencias 
  }

}
