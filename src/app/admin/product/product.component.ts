import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DialogExampleComponent } from 'src/app/dialog-example/dialog-example.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products!: Product[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/admin/product'
  deleteId!:string;
  confirmMessage='';

  confirmDeleteProduct(confirmDialog: TemplateRef<any>, id: string, productCode: string){
    this.confirmMessage = `Bạn thật sự muốn xóa sản phẩm này ${productCode}` ;
    this.deleteId =id;
    this.modalService.open(confirmDialog, {ariaDescribedBy: 'modal-basic-title'}).result.then((result)=>{
      this.deleteId='';
    },(err)=>{

    })
  }

  deleteProduct(){
    if (this.deleteId!==''){
      this.rest.delete(this.url,this.deleteId).then(data =>{
        this.modalService.dismissAll();
        this.ngOnInit();
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }
  }



  constructor(private rest:RestApiService,
    private data: DataService,
    private modalService: NgbModal) {
     }

  ngOnInit() {
    this.btnDisabled=true;
    this.rest.get(this.url).then(data=>{
        this.products =( data as {products: Product[]}).products;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
  }
  finishAndAlert( message: string){
    this.data.success(message);
    this.ngOnInit();
  }
}
