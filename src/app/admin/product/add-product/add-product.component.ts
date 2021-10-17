import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from './../../../models/product';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  saving=false;
  product: Product;
  url1='http://localhost:3000/api/v1/admin/product/add'

  brands!: Brand[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/admin/brand'

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService) {
      this.product= new Product;
     }

  ngOnInit() {
    this.btnDisabled=true;
    this.rest.get(this.url).then(data=>{
        this.brands =( data as {brands: Brand[]}).brands;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  save(){
    this.saving=true;

    this.rest.post(this.url1,this.product)
      .then(data =>{
        this.saving=false;
        this.data.success('Product is saved');
      }).catch(error =>{
        this.saving =false;
        this.data.error(error['lỗi'])
      });

  }

}
