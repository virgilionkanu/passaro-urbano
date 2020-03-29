import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs'

import { switchMap, debounceTime} from 'rxjs/operators'

import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .pipe(
        debounceTime(1000),
        switchMap((termo: string) => {
          console.log('requisição http para api')

         /*  if(termo.trim() === '') {
            return Observable.of()
          } */
          return this.ofertasService.pesquisaOfertas(termo)
        })
      )

    this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas))
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
  }

}
