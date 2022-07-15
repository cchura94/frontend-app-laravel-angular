import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PedidoService } from 'src/app/core/services/pedido.service';

@Component({
  selector: 'app-reporte-pdf',
  templateUrl: './reporte-pdf.component.html',
  styleUrls: ['./reporte-pdf.component.scss']
})
export class ReportePdfComponent implements OnInit {

  constructor(private pedidoService:PedidoService) { }

  pdfSrc = "http://localhost:8000/api/pdf";

  ngOnInit(): void {
    
  }

  generarReporte(){
    alert("PDF")
    this.pedidoService.reportePDF().pipe(map((res:Blob) => {
      const blob = new Blob([res], {type: 'application/pdf'});
      console.log(blob)
      const blobUrl =  window.URL.createObjectURL(blob)
      console.log(blob)
      window.open(blobUrl);
    }))
    
    /*this.pedidoService.reportePDF().subscribe(
      (res:Blob) => {
        const blob = new Blob([res], {type: 'application/pdf'});
        const blobUrl =  window.URL.createObjectURL(blob)
        console.log(blobUrl)
       // window.open(blobUrl); 
      }     
    )  */
  }



}
