import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { News } from './../../models/news';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news!: News[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/admin/new'
  deleteId!:string;
  confirmMessage='';

  confirmDeleteNew(confirmDialog: TemplateRef<any>, id: string, title: string){
    this.confirmMessage = `Bạn thật sự muốn xóa bai viet ${title}` ;
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
        this.news =( data as {news: News[]}).news;
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
