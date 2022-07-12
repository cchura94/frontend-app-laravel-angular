import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ProductoService } from 'src/app/core/services/producto.service';

interface Product {
  id?: number,
  nombre: string,
  stock: number,
  precio: number,
  descripcion: string,
  categoria_id: number
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ProductoComponent implements OnInit {

  uploadedFiles: any[] = []

  totalRecords: number;
   loading: boolean;
   id_prod_img: number = 0;

    productDialog: boolean;
    displayModalImagen: boolean;

    products: Product[];

    product: Product;

    selectedProducts: Product[];
    categorias: any []

    submitted: boolean;

    statuses: any[];

  constructor(private productoService: ProductoService,
              private categoriaService: CategoriaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.listarProducto()

    this.categoriaService.indexCategoria().subscribe(
      (res: any) => {
        console.log(res)
        this.categorias = res
      }
    )
    
  }

  loadProductos(event: LazyLoadEvent) {
        this.loading = true;
        console.log(event)
        let page = (event.first/event.rows)+1
        this.listarProducto(page)
        /*setTimeout(() => {
            this.customerService.getCustomers({lazyEvent: JSON.stringify(event)}).then(res => {
                this.customers = res.customers;
                this.totalRecords = res.totalRecords;
                this.loading = false;
            })
        }, 1000);*/
    }

  listarProducto(page=1){
    this.loading = true;
    this.productoService.indexProducto(page).subscribe(
      (res: any) => {
        console.log(res)
        this.products = res.data
        this.totalRecords = res.total
        this.loading = false
      }
    )

  }


  openNew() {
        this.product = {nombre: '', precio: 0, stock: 0, descripcion: '', categoria_id:0};
        this.submitted = false;
        this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.selectedProducts = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

saveProduct() {
  this.submitted = true;

  if (this.product.nombre.trim()) {
      if (this.product.id) {
        this.productoService.updateProducto(this.product, this.product.id).subscribe(
          (res:any) => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Modificado', life: 3000});

          },
          (error: any) => {
            alert("error")
          }
        )
          //this.products[this.findIndexById(this.product.id)] = this.product;
      }
      else {
        this.productoService.storeProducto(this.product).subscribe(
          (res:any) => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Producto Creado', life: 3000});

          },
          (error: any) => {
            alert("error")
          }
        )
          
      }

      //listar producto
      this.listarProducto()
      this.productDialog = false;
      this.product = {nombre: '', precio: 0, stock: 0, descripcion: '', categoria_id:0};
  }
}

  editProduct(product: Product) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Está seguro de eliminar el producto ' + product.nombre + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.productoService.destroyProducto(product.id).subscribe(
                (res:any) => {
                  this.product = {nombre: '', precio: 0, stock: 0, descripcion: '', categoria_id:0};
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Eliminado', life: 3000});
                  this.listarProducto()
                }
              )
                // this.products = this.products.filter(val => val.id !== product.id);
            }
        });
    }

    showModalDialogImagen(producto: Product){
      this.id_prod_img = producto.id
      this.displayModalImagen = true
    }

    onBeforeUploadListener(event, uploader:any){
      console.log(uploader.files)
      this.uploadedFiles =uploader.files

      let formdata = new FormData;
      formdata.append("imagen", this.uploadedFiles[0]);

      this.productoService.subirImagen(formdata, this.id_prod_img).subscribe(
        (res: any) => {
          console.log(res)
          this.displayModalImagen = false
          this.listarProducto()
        }
      )

    }

}
