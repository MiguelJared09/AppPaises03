import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino : string = '';
  hayError: boolean = false;
  paises:Country[]=[];
  paisesSugeridos:Country[]=[];

  mostrarSugerencias: boolean = false;
  
  constructor(private paisService:PaisService) {  }

  buscar( termino: string ){
    this.mostrarSugerencias = false;
    this.hayError=false;
    this.termino = termino;
    
    /* metodo depreciado pero sirve de observable */
    this.paisService.buscarPais(termino)
    .subscribe( (paises) => {
      console.log(paises);
      this.paises = paises;
    }, (err) =>{
      this.hayError = true;
      this.paises = [];
    });
  }

  sugerencias( termino:string){
    if(termino == ''){
      this.mostrarSugerencias = false;
      this.paises = [];
      return;  
    }
    this.hayError = false;
    this.termino = termino;

    this.mostrarSugerencias = true;
    // TODO: crear sugerencias

    this.paisService.buscarPais(termino).subscribe(
      paises => this.paisesSugeridos = paises.splice(0,4),
      (err) => this.paisesSugeridos = []
    );
  }

  buscarSugerido(termino:string){
    this.buscar(termino);
  }

}
