import { RouterOutlet } from '@angular/router';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickandmortyService } from '../app/services/rickandmorty.service'
import { Character, ApiResponse } from '../app/interfaces/character';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular18-rickandmorty-2';
  private rickMortyService = inject(RickandmortyService);
  
  characters = signal<Character[]>([]);
  currentPage = signal(1);
  totalPages = signal(0);
  totalItems = signal(0);
  loading = signal(false);

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading.set(true);
    this.rickMortyService.getCharacters(this.currentPage()).subscribe({
      next: (response: ApiResponse) => {
        this.characters.set(response.results);
        this.totalPages.set(response.info.pages);
        this.totalItems.set(response.info.count);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage.set(event.pageIndex + 1);
    this.loadCharacters();
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'accent';
      case 'dead':
        return 'warn';
      default:
        return 'primary';
    }
  }
}
