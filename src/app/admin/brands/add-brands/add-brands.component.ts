import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.css']
})
export class AddBrandsComponent implements OnInit {
  saving=false;
  brand: Brand;
  url1='http://localhost:3000/api/v1/admin/brand/add'
  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService) {
      this.brand= new Brand;
     }

  ngOnInit() {
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  save(){
    this.saving=true;

    this.rest.post(this.url1,this.brand)
      .then(data =>{
        this.saving=false;
        this.data.success('Brand is saved');
      }).catch(error =>{
        this.saving =false;
        this.data.error(error['message'])
      });

  }

}
