import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import { PedidoService } from 'src/app/core/services/pedido.service';


interface Product {
  id?: number,
  nombre: string,
  stock: number,
  precio: number,
  descripcion: string,
  categoria_id: number
}

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class NuevoPedidoComponent implements OnInit {

  fecha: any;

  totalRecords: number;
  loading: boolean;
  id_prod_img: number = 0;

  displayModal: boolean;
  productDialog: boolean;
  displayModalImagen: boolean;

  products: Product[];

  product: Product;

  selectedProducts: Product[];
  categorias: any[]

  submitted: boolean;

  statuses: any[];

  carrito: any[] = [];
  buscar: string;
  clientes: any[] = [];
  clie: any = { nombre_completo: '', ci_nit: '', direccion: '', telefono: '' };
  cliente_seleccionado: any = null;

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.listarProducto()
    this.getFechaPedido()
  }

  getFechaPedido() {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    this.fecha = today
  }

  loadProductos(event: LazyLoadEvent) {
    this.loading = true;
    console.log(event)
    let page = (event.first / event.rows) + 1
    this.listarProducto(page)
    /*setTimeout(() => {
        this.customerService.getCustomers({lazyEvent: JSON.stringify(event)}).then(res => {
            this.customers = res.customers;
            this.totalRecords = res.totalRecords;
            this.loading = false;
        })
    }, 1000);*/
  }

  listarProducto(page = 1) {
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

  agregarCarrito(producto) {
    let p = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    }
    this.carrito.push(p);

  }

  buscarCliente() {
    this.clienteService.indexCliente(1, this.buscar).subscribe(
      (res: any) => {
        this.clientes = res.data
      }
    )
  }

  showModalDialog() {
    this.displayModal = true;
  }

  guardarCliente() {
    this.clienteService.storeCliente(this.clie).subscribe(
      (res: any) => {
        this.cliente_seleccionado = res.data
      },
      (error: any) => {

      }
    )

  }

  seleccionCliente(c){
    this.cliente_seleccionado = c
  }

  guardarPedido(){
    let ped = {
      cliente_id: this.cliente_seleccionado.id,
      productos: []
    }

    for (let i = 0; i < this.carrito.length; i++) {
      const prod = this.carrito[i];
      ped.productos.push({id: prod.id, cantidad: prod.cantidad})
      
    }

    console.log(ped)
    
    this.pedidoService.storePedido(ped).subscribe(
      (res: any) => {
        alert("Pedido Registrado")
      },
      (error: any) => {
        alert("Error al registrar")
      }
    )

  }

}
