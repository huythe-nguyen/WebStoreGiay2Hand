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
  key='';
  confirmDeleteNew(confirmDialog: TemplateRef<any>, id: string, title: string){
    this.confirmMessage = `Bạn thật sự muốn xóa bai viet ${title}` ;
    this.deleteId =id;
    this.modalService.open(confirmDialog, {ariaDescribedBy: 'modal-basic-title'}).result.then((result)=>{
      this.deleteId='';
    },(err)=>{

    })
  }

  search(keys: string){
    if (keys!==''){
      this.key=keys;
      this.ngOnInit();
  }
}
  constructor(private rest:RestApiService,
    private data: DataService,
    private modalService: NgbModal) {
     }

  ngOnInit() {
    this.btnDisabled=true;
    if(this.key==''){
    this.rest.get(this.url).then(data=>{
        this.news =( data as {news: News[]}).news;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }else{
      this.rest.search(this.url,this.key).then(data=>{
        this.news =( data as {news: News[]}).news;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }
  }
  Search(){
    if(this.key==''){
      this.ngOnInit();
    }else{
      this.news = this.news.filter(res=>{
        return res.codeTitle.toLocaleLowerCase().match(this.key.toLocaleLowerCase())
      })
    }
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
