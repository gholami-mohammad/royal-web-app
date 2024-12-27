import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() totalPages: number = 0; // Total number of pages
  @Input() currentPage: number = 1; // Current active page

  @Output() pageChanged = new EventEmitter<number>(); // Notify parent of page changes

  pages: number[] = []; // Array of page numbers to display

  ngOnChanges(changes: SimpleChanges): void {
    // Use bracket notation to access properties from SimpleChanges
    if (changes['totalPages'] || changes['currentPage']) {
      this.calculatePages();
    }
  }

  calculatePages() {
    this.pages = [];
    for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
      if (i > 0 && i <= this.totalPages) {
        this.pages.push(i);
      }
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }
}
