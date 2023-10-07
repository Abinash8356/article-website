import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleList } from 'src/app/constants/constant';
import { ArticlesService } from '../services/articles/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  articleArray: ArticleList[];

  constructor(
    private articleService: ArticlesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllArticles();
  }

  getAllArticles() {
    this.articleService.getAllArticle().subscribe({
      next: (res) => {
        this.articleArray = res.data;
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

  onDelete(articleId: string) {
    console.log(articleId)
    this.articleService.deleteArticle(articleId).subscribe({
      next: (res) => {
        const successMsg = res['message'];
        this.getAllArticles();
        this.snackBar.open(successMsg, '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
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
