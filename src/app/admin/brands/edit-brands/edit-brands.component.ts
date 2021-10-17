import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-brands',
  templateUrl: './edit-brands.component.html',
  styleUrls: ['./edit-brands.component.css']
})
export class EditBrandsComponent implements OnInit {

  doing=false;
  brand: Brand;
  url1='http://localhost:3000/api/v1/admin/brand'
  @Input("id")
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService) {
      this.brand= new Brand;
     }

  ngOnInit() {
    this.doing=true;

    this.rest.getOne(this.url1,this.editId)
      .then(data =>{
        this.doing=false;
        this.brand =(data as {brand: Brand}).brand;
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['lỗi'])
      });
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  update(){
    this.doing=true;

    this.rest.put(this.url1,this.editId,this.brand)
      .then(data =>{
        this.doing=false;
        this.updateFinished.emit('brand is update')
        this.modelService.dismissAll();
        this.brand = new Brand();
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });

  }

}
