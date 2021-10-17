import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { News } from 'src/app/models/news';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  saving=false;
  news: News;
  url1='http://localhost:3000/api/v1/admin/new/add'
  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService) {
      this.news= new News;
     }

  ngOnInit() {
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  save(){
    this.saving=true;

    this.rest.post(this.url1,this.news)
      .then(data =>{
        this.saving=false;
        this.data.success('new is saved');
      }).catch(error =>{
        this.saving =false;
        this.data.error(error['message'])
      });

  }

}
