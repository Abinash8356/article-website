import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-articles',
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.scss']
})
export class AddArticlesComponent {
  articleForm: FormGroup

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(){
    this.article();
  }

  article() {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      authorName: ['', Validators.required],
      content: ['', Validators.required]
    })
  }
}
