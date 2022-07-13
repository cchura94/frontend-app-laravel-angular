import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PedidoService } from 'src/app/core/services/pedido.service';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.component.html',
  styleUrls: ['./lista-pedido.component.scss']
})
export class ListaPedidoComponent implements OnInit {
  totalRecords: number;
  loading: boolean;
  id_prod_img: number = 0;

  displayModal: boolean;
  productDialog: boolean;
  displayModalImagen: boolean;

  pedidos: any[];

  pedido: any;

  selectedPedidos: any[];
  categorias: any[]

  submitted: boolean;

  constructor(private pedidoService: PedidoService,) {
    
   }

  ngOnInit(): void {
    this.listarPedidos()
  }

  loadPedidos(event: LazyLoadEvent) {
    this.loading = true;
    console.log(event)
    let page = (event.first / event.rows) + 1
    this.listarPedidos(page)
    /*setTimeout(() => {
        this.customerService.getCustomers({lazyEvent: JSON.stringify(event)}).then(res => {
            this.customers = res.customers;
            this.totalRecords = res.totalRecords;
            this.loading = false;
        })
    }, 1000);*/
  }

  listarPedidos(page = 1) {
    this.loading = true;
    this.pedidoService.indexPedido(page).subscribe(
      (res: any) => {
        console.log(res)
        this.pedidos = res.data
        this.totalRecords = res.total
        this.loading = false
      }
    )

  }

    showModalDialog(p) {
        this.displayModal = true;
this.pedido = p

    }

}
