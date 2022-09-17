import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pageSize!: number;
  @Input() totalCount!: number;
  @Input() currentPage!: number;
  @Output() pageChange = new EventEmitter();
  public noOfPages: any;
  constructor() {}

  ngOnInit(): void {
    // this.noOfPages = new Array(Math.ceil(this.totalCount/this.pageSize));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPageChangeValue();
  }

  getPageChangeValue = () => {
    this.noOfPages = Array.from(
      Array(Math.ceil(this.totalCount / this.pageSize)).keys()
    );
  };

  changePage(index: number) {
    this.pageChange.emit(index);
  }

  getNext() {
    if (this.noOfPages.length !== this.currentPage) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  getPrev() {
    if (1 < this.currentPage) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }
}
