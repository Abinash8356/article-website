import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ArticlesService } from '../services/articles/articles.service';

@Component({
  selector: 'app-add-articles',
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.scss'],
})
export class AddArticlesComponent {
  articleForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticlesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.article();
  }

  article() {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      authorName: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  addArticle() {
    const payload = {
      ...this.articleForm.value,
    };

    if (this.articleForm.valid) {
      this.articleService.addArticle(payload).subscribe({
        next: (res) => {
          this.router.navigate(['/articles']);
        },
        error: (error) => {
          const errMsg = error.error.message;
          this.snackBar.open(errMsg, '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        },
      });
    }
  }
}
