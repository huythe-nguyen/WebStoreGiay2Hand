import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Brand } from './../../models/brand';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands!: Brand[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/admin/brand'

  deleteId!:string;
  confirmMessage='';

  confirmDeleteBrand(confirmDialog: TemplateRef<any>, id: string, nameBrand: string){
    this.confirmMessage = `Bạn thật sự muốn xóa thương hiệu ${nameBrand}` ;
    this.deleteId =id;
    this.modalService.open(confirmDialog, {ariaDescribedBy: 'modal-basic-title'}).result.then((result)=>{
      this.deleteId='';
    },(err)=>{

    })
  }


  constructor(private rest:RestApiService,
    private data: DataService,
    private modalService: NgbModal) {
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
  delete(){
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

  finishAndAlert( message: string){
    this.data.success(message);
    this.ngOnInit();
  }

}
