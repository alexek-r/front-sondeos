import { Component, OnInit } from '@angular/core';
import { Nota } from '../../model/nota';
import { NotaService } from '../../service/nota.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private notaService: NotaService) { }

  listaNotas: Array<Nota>;
  nota: Nota = new Nota();

  notaVacia: boolean = false;


  ngOnInit(): void {

    this.cargarLista();

  }

  create(): void {

    if (this.nota.description != null && this.nota.description != '') {

      this.notaService.create(this.nota).subscribe(response => {
        this.cargarLista();
      });
      Swal.fire('Nota agregada con exito!')
      this.notaVacia = false;
    } else {
      this.notaVacia = true;
    }

  }

  delete(nota: Nota): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas Seguro?',
      text: "¡Estas por eliminar una nota!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.notaService.delate(nota.id).subscribe(response => {

          this.listaNotas = this.listaNotas.filter(notaFiltrada => notaFiltrada !== nota);

          swalWithBootstrapButtons.fire(
            '¡Eliminado!',
            'Nota eliminada con exito.',
            'success'
          )

        })
      }
    })

  }


  cargarLista() {
    this.notaService.getNotas().subscribe(
      (listaNotas) => {
        this.listaNotas = listaNotas;
      });
  }

}
