import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';


interface Categoria {
  nombre: string,
  descripcion: string
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class CategoriaComponent implements OnInit {

  cargando: boolean = true
  lista_categorias: Categoria[]
  displayModalCategoria: boolean
  idEditar: Number = 0;
  obj_categoria: Categoria = { nombre: '', descripcion: '' };

  categoriaForm = new FormGroup({
    nombre: new FormControl(this.obj_categoria.nombre, [Validators.required]),
    descripcion: new FormControl(this.obj_categoria.descripcion)
  });

  constructor(private categoriaService: CategoriaService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.listarCategorias()
  }

  listarCategorias() {
    this.cargando = true
    this.categoriaService.indexCategoria().subscribe(
      (res: Categoria[]) => {
        this.lista_categorias = res
      }
    )
    this.cargando = false
  }

  guardarCategoria() {
    this.cargando = true

    if (this.idEditar == 0) {
      this.categoriaService.storeCategoria(this.categoriaForm.value).subscribe(
        (res: any) => {
          this.listarCategorias();

          this.displayModalCategoria = false
        },
        (error: any) => {
          console.log(error);
          
        }
      )

    } else {

      this.categoriaService.updateCategoria(this.categoriaForm.value, this.idEditar).subscribe(
        (res: any) => {
          this.listarCategorias();

          this.displayModalCategoria = false
        },
        (error: any) => {
          console.log(error);
        }
      )


    }

    this.cargando = false


  }

  showModalCategoriaDialog() {
    this.displayModalCategoria = true;
  }

  showModalEditCategoriaDialog(categoria) {
    this.idEditar = categoria.id
    this.obj_categoria = categoria

    this.prepararFormulario()

    this.showModalCategoriaDialog()
  }

  prepararFormulario() {
    this.categoriaForm = new FormGroup({
      nombre: new FormControl(this.obj_categoria.nombre, [Validators.required]),
      descripcion: new FormControl(this.obj_categoria.descripcion)
    });

  }

  confirmEliminacion(categoria){
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar la categoria?',
      header: 'Confirmar eliinación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cargando = true
        this.categoriaService.destroyCategoria(categoria.id).subscribe(
          (res: any) => {
            this.messageService.add({severity:'error', summary:'Eliminado', detail:'Categoria Eliminada'});
            this.listarCategorias()
            this.cargando = false
          },
          (error: any) => {
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:'Ocurrio un error al eliminar'});
          }
        )
         
      },
      reject: (type) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                this.messageService.add({severity:'info', summary:'Confirmed', detail:'Eliminando'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              break;
          }
      }
  });
  }



}
