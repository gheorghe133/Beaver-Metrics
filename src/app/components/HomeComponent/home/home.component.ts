import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DataService } from '../../../services/DataService/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../LoaderComponent/loader/loader.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="container-hero">
      <div class="hero-background"></div>
      <div class="hero">
        <div class="hero-body">
          <p class="title">Beaver Metrics</p>
        </div>
      </div>
    </div>
    <div class="container-search">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search . . ."
          [(ngModel)]="searchText"
          (input)="searchUser()"
        />
      </div>
    </div>
    @if(this.usersDisplay.length > 0 && !this.searchText && !this.loader){
    <div class="container-filters">
      <button
        class="filter-button"
        [ngClass]="{ 'active-filter': buttonStates.titleAsc }"
        (click)="sortTitleAscending()"
      >
        <span class="icon">
          <i class="fa-solid fa-arrow-down-a-z"></i>
        </span>
        <span>Title</span>
      </button>
      <button
        class="filter-button"
        [ngClass]="{ 'active-filter': buttonStates.titleDesc }"
        (click)="sortTitleDescending()"
      >
        <span class="icon">
          <i class="fa-solid fa-arrow-up-z-a"></i>
        </span>
        <span>Title</span>
      </button>
      <button
        class="filter-button"
        [ngClass]="{ 'active-filter': buttonStates.beaverAsc }"
        (click)="sortBeaverAscending()"
      >
        <span class="icon">
          <i class="fa-solid fa-arrow-down-a-z"></i>
        </span>
        <span>Beavers</span>
      </button>
      <button
        class="filter-button"
        [ngClass]="{ 'active-filter': buttonStates.beaverDesc }"
        (click)="sortBeaverDescending()"
      >
        <span class="icon">
          <i class="fa-solid fa-arrow-up-z-a"></i>
        </span>
        <span>Beavers</span>
      </button>

      @if(this.showClearButton){
      <button class="filter-button clear-filter" (click)="clearSorting()">
        <span class="icon">
          <i class="fa-solid fa-x"></i>
        </span>
        <span>Clear</span>
      </button>
      }
    </div>
    }
    <div class="container-table" #target>
      @if(!loader){
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Best Beaver</th>
            <th>Total Beavers</th>
          </tr>
        </thead>
        <tbody>
          @for (user of usersDisplay; track $index) {
          <tr (click)="navigateToUserPage(user)">
            <td>
              <div class="user-image">
                <div>
                  <img [src]="user.user_image" [alt]="user.user_image" />
                </div>
                <h5>{{ user.username }}</h5>
              </div>
            </td>
            <td>
              {{ user.best_beaver?.name }} &#8226;
              {{ user.best_beaver?.rarity }} &#8226;
              {{ user.best_beaver?.type }} &#8226;
              {{ user.best_beaver?.level }}
            </td>
            <td>{{ user.total }}</td>
          </tr>
          } @empty {
          <tr>
            <td colspan="4">
              <div class="container-not-found">
                <h1>user not found</h1>
              </div>
            </td>
          </tr>
          }
        </tbody>
      </table>
      } @else{
      <div class="loader-container">
        <app-loader></app-loader>
      </div>
      }
    </div>
    @if(this.usersDisplay.length > 0 && !this.searchText && !this.loader){
    <div class="container-pagination">
      @if(canLoadPreviousPage()){
      <button (click)="prevPage(target)">Previous page</button>
      } @else {
      <button disabled>Previous page</button>
      }

      <div class="pagination-numbers">
        @for(pageNumber of getPaginationNumbers(); track $index ){
        @if(pageNumber !== -1){
        <button
          [class.active-page]="pageNumber === currentPage"
          (click)="goToPage(pageNumber, target)"
        >
          {{ pageNumber }}
        </button>
        } @else {
        <span class="ellipsis">...</span>
        } }
      </div>

      @if(canLoadNextPage()){
      <button (click)="nextPage(target)">Next page</button>
      } @else {
      <button disabled>Next page</button>
      }
    </div>
    }
  `,
  styles: [
    `
      .container-hero {
        width: 100%;
        min-height: 400px;
        border: 2px solid #808080;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 2rem;
        position: relative;
      }

      .hero-background {
        width: 100%;
        min-height: 45vh;
        background: linear-gradient(45deg, #3e204a, #91775a);
        filter: blur(1000px);
        position: absolute;
      }

      .hero {
        width: 100%;
        align-items: stretch;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: url('/assets/hero.gif');
        height: 100%;
        background-size: cover;
        background-position: center;
        position: absolute;
        border-radius: 5px;
        z-index: 1;
      }

      .hero-body {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        color: #fff;
      }

      .title {
        font-size: 3rem;
        font-weight: 600;
        line-height: 1.125;
        letter-spacing: 8px;
        font-weight: 400;
        word-break: break-word;
        text-align: center;
      }

      .container-filters {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
        gap: 10px;
      }

      .container-filters .filter-button {
        border: 2px solid #808080;
        border-radius: 5px;
        color: #fff;
        background-color: transparent;
        cursor: pointer;
        padding-bottom: calc(0.7em - 1px);
        padding-left: 1.5em;
        padding-right: 1.5em;
        padding-top: calc(0.7em - 1px);
        text-align: center;
        white-space: nowrap;
        transition: transform 0.3s ease;
      }

      .container-filters .filter-button .icon {
        margin-left: calc(-0.5em - 1px);
        margin-right: 0.25em;
        height: 1.5em;
        width: 1.5em;
        align-items: center;
        display: inline-flex;
        justify-content: center;
      }

      .container-filters .filter-button:active {
        transform: scale(0.95);
      }

      .container-filters .filter-button:hover {
        background-color: #111;
      }

      .container-filters .active-filter {
        border-color: #d1a34f !important;
        color: #d1a34f !important;
      }

      .container-filters .clear-filter {
        border-color: #b91c1c;
        color: #b91c1c;
      }

      .container-table {
        width: 100%;
        min-height: 682px;
        overflow-y: auto;
        z-index: 1;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;
        color: #fff;
      }

      th,
      td {
        padding: 0.5rem;
        text-align: left;
        border-bottom: 2px solid #808080;
        cursor: pointer;
      }

      th {
        text-transform: uppercase;
        font-size: 0.8rem;
        user-select: none;
      }

      tbody > tr:hover {
        background-color: #111;
      }

      .user-image {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        user-select: none;
      }

      .container-search {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 1.5rem;
        z-index: 1;
      }

      .search-box {
        position: relative;
        height: 45px;
        width: 100%;
      }

      .search-box input {
        position: absolute;
        border: 2px solid #808080;
        background-color: transparent;
        padding: 0 25px 0 45px;
        border-radius: 5px;
        height: 100%;
        width: 100%;
        color: #fff;
        font-size: 15px;
        font-weight: 400;
        outline: none;
      }

      .search-box input::placeholder {
        user-select: none;
        color: #fff;
      }

      .container-search .search-box i {
        position: absolute;
        left: 15px;
        font-size: 18px;
        z-index: 10;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
      }

      .container-not-found {
        width: 100%;
        min-height: 20vh;
        display: flex;
        justify-content: center;
        align-items: center;
        letter-spacing: 8px;
      }

      .container-pagination {
        width: 100%;
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }

      .container-pagination button {
        width: 100%;
        font-weight: 500;
        background: transparent;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        border: 2px solid #808080;
        cursor: pointer;
        user-select: none;
        transition: transform 0.3s ease;
      }

      .container-pagination .ellipsis {
        width: 100%;
        font-weight: 500;
        background: transparent;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        border: 2px solid #808080;
        text-align: center;
        cursor: dafault;
        user-select: none;
      }

      .container-pagination .pagination-numbers {
        width: 100%;
        display: flex;
        gap: 10px;
      }

      .container-pagination .pagination-numbers .active-page {
        border-color: #d1a34f;
        color: #d1a34f;
      }

      .container-pagination button:disabled {
        background-color: #111;
        color: #666;
        cursor: not-allowed;
      }

      .container-pagination button:active {
        transform: scale(0.95);
      }

      .container-pagination button:hover {
        background-color: #111;
      }

      .container-pagination .ellipsis:hover {
        background-color: #111;
      }

      .loader-container {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @media (max-width: 800px) {
        .container-pagination {
          display: block;
        }

        .container-pagination button {
          margin-bottom: 10px;
        }

        .container-pagination .ellipsis {
          margin-bottom: 10px;
        }
      }

      @media (max-width: 500px) {
        .hero-background {
          filter: blur(100px);
        }

        .title {
          font-size: 1.5rem;
          line-height: 1.7;
          font-weight: 700;
        }
      }
    `,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterOutlet,
    LoaderComponent,
  ],
})
export class HomeComponent implements OnInit {
  searchText: string = '';
  usersDisplay: any[] = [];
  users: any[] = [];

  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;

  loader: boolean = true;

  buttonStates = {
    titleAsc: false,
    titleDesc: false,
    beaverAsc: false,
    beaverDesc: false,
  };

  showClearButton: boolean | undefined;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentPage = params['page'] ? +params['page'] : 1;
      const sortParam = params['sort'];
      this.loadUsers(sortParam);

      if (sortParam) {
        this.setButtonStates(sortParam);
        this.showClearButton = true;
      }
    });

    this.titleService.setTitle('Beaver Metrics | Home');
  }

  private loadUsers(sortParam: string | null) {
    if (typeof sessionStorage !== 'undefined') {
      const storedData = sessionStorage.getItem('usersData');

      if (storedData) {
        this.users = JSON.parse(storedData);

        if (sortParam) {
          this.sortUsersByQueryParam(sortParam);
        } else {
          // Sortare implicită
          this.users.sort(this.compareByBeaverDesc);
        }

        this.totalItems = this.users.length;
        this.updateUsersDisplay();

        this.loader = false;
      } else {
        this.dataService.getData().subscribe((data) => {
          this.users = data;
          sessionStorage.setItem('usersData', JSON.stringify(data));

          if (sortParam) {
            this.sortUsersByQueryParam(sortParam);
          } else {
            // Sortare implicită
            this.users.sort(this.compareByBeaverDesc);
          }

          this.totalItems = this.users.length;
          this.updateUsersDisplay();
          this.loader = false;
        });
      }
    } else {
      console.log('sessionStorage is not available.');
    }
  }

  private sortUsersByQueryParam(param: string) {
    switch (param) {
      case 'titleAsc':
        this.users.sort(this.compareByTitleAsc);
        break;
      case 'titleDesc':
        this.users.sort(this.compareByTitleDesc);
        break;
      case 'beaverAsc':
        this.users.sort(this.compareByBeaverAsc);
        break;
      case 'beaverDesc':
        this.users.sort(this.compareByBeaverDesc);
        break;
      default:
        this.users.sort(this.compareByTitleAsc);
        break;
    }
  }

  private compareByTitleAsc(a: any, b: any) {
    return a.username.localeCompare(b.username);
  }

  private compareByTitleDesc(a: any, b: any) {
    return b.username.localeCompare(a.username);
  }

  private compareByBeaverAsc(a: any, b: any) {
    return a.total - b.total;
  }

  private compareByBeaverDesc(a: any, b: any) {
    return b.total - a.total;
  }

  private updateUsersDisplay() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.usersDisplay = this.users.slice(startIndex, endIndex);

    if (startIndex >= this.totalItems) {
      this.router.navigate(['/']);
    }
  }

  public clearSorting() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { sort: null },
      queryParamsHandling: 'merge',
    });

    this.buttonStates.titleAsc = false;
    this.buttonStates.titleDesc = false;
    this.buttonStates.beaverAsc = false;
    this.buttonStates.beaverDesc = false;

    this.showClearButton = false;

    this.loadUsers(null);
  }

  private setButtonStates(sortParam: string | null) {
    Object.keys(this.buttonStates).forEach((key) => {
      this.buttonStates[key as keyof typeof this.buttonStates] = false;
    });

    if (sortParam) {
      switch (sortParam) {
        case 'titleAsc':
          this.buttonStates.titleAsc = true;
          break;
        case 'titleDesc':
          this.buttonStates.titleDesc = true;
          break;
        case 'beaverAsc':
          this.buttonStates.beaverAsc = true;
          break;
        case 'beaverDesc':
          this.buttonStates.beaverDesc = true;
          break;
      }
    }
  }

  public sortTitleAscending() {
    this.setButtonStates('titleAsc');
    this.sortUsers('titleAsc');
  }

  public sortTitleDescending() {
    this.setButtonStates('titleDesc');
    this.sortUsers('titleDesc');
  }

  public sortBeaverAscending() {
    this.setButtonStates('beaverAsc');
    this.sortUsers('beaverAsc');
  }

  public sortBeaverDescending() {
    this.setButtonStates('beaverDesc');
    this.sortUsers('beaverDesc');
  }

  public nextPage(target: HTMLElement) {
    this.scrollToElement(target);
    this.currentPage = this.currentPage + 1;
    this.updateQueryParams();
  }

  public prevPage(target: HTMLElement) {
    this.scrollToElement(target);
    this.currentPage = this.currentPage - 1;
    this.updateQueryParams();
  }

  public goToPage(page: number, target: HTMLElement) {
    this.currentPage = page;
    this.scrollToElement(target);
    this.updateQueryParams();
  }

  public getPaginationNumbers(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    const visiblePages = 3;

    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftBound = Math.max(
      1,
      this.currentPage - Math.floor(visiblePages / 2)
    );
    const rightBound = Math.min(totalPages, leftBound + visiblePages - 1);

    const numbers: number[] = [];

    if (leftBound > 1) {
      numbers.push(1);
      if (leftBound > 2) {
        numbers.push(-1); // -1 will represent "..."
      }
    }

    for (let i = leftBound; i <= rightBound; i++) {
      numbers.push(i);
    }

    if (rightBound < totalPages) {
      if (rightBound < totalPages - 1) {
        numbers.push(-1); // -1 will represent "..."
      }
      numbers.push(totalPages);
    }

    return numbers;
  }

  private sortUsers(sortParam: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { sort: sortParam },
      queryParamsHandling: 'merge',
    });

    this.sortUsersByQueryParam(sortParam);
  }

  private updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });
    this.updateUsersDisplay();
  }

  public canLoadNextPage(): boolean {
    const startIndex = this.currentPage * this.pageSize;
    return startIndex < this.totalItems;
  }

  public canLoadPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  public searchUser() {
    if (this.searchText) {
      this.usersDisplay = this.users.filter((user) =>
        user.username.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.updateUsersDisplay();
    }
  }

  private scrollToElement(target: HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public navigateToUserPage(user: any) {
    this.router.navigate(['user/', user.username]);
  }
}
