import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../services/DataService/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../../LoaderComponent/loader/loader.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `
    @if(!loader){
    <div class="container-hero">
      <div class="hero-background"></div>
      <div class="hero">
        <div class="hero-body">
          <div class="user-avatar">
            <img
              [src]="userDetails?.user_image"
              [alt]="userDetails?.user_image"
            />
          </div>
          <div class="user-information">
            <p class="title">{{ userDetails?.username }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-search">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search..."
          [(ngModel)]="searchText"
          (input)="searchBeaver()"
        />
      </div>
    </div>
    <div class="container-table" #target>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rarity</th>
            <th>Type</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          @for (beaver of userBeavers; track $index) {
          <tr>
            <td>{{ beaver.name }}</td>
            <td>{{ beaver.rarity }}</td>
            <td>{{ beaver.type }}</td>
            <td>{{ beaver.level }}</td>
          </tr>
          } @empty {
          <tr>
            <td colspan="4">
              <div class="container-not-found">
                <h1>Beaver not found</h1>
              </div>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
    @if(this.userBeavers.length > 0 && !this.searchText && !this.loader){
    <div class="container-pagination">
      @if(canLoadPreviousPage()){
      <button (click)="prevPage(target)">Previous page</button>
      } @else {
      <button disabled>Previous page</button>
      } @if(canLoadNextPage()){
      <button (click)="nextPage(target)">Next page</button>
      } @else {
      <button disabled>Next page</button>
      }
    </div>
    } } @else {
    <div class="loader-container">
      <app-loader></app-loader>
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
        justify-content: center;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 15px;
        flex-grow: 1;
        flex-shrink: 0;
        color: #fff;
      }

      .title {
        font-size: 2.5rem;
        line-height: 1.125;
        letter-spacing: 8px;
        font-weight: 400;
        word-break: break-word;
        text-align: center;
      }

      .container-table {
        width: 100%;
        min-height: 150px;
        overflow-y: auto;
        z-index: 1;
      }

      table {
        width: 100%;
        border-collapse: collapse;
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
      }

      tbody > tr:hover {
        background-color: #111;
      }

      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }

      .container-search {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 2rem;
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
      }

      .container-pagination button:disabled {
        background-color: #111;
        color: #666;
        cursor: not-allowed;
      }

      .loader-container {
        margin-top: 40vh;
        display: flex;
        justify-content: center;
        align-items: center;
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
  imports: [ReactiveFormsModule, FormsModule, LoaderComponent],
})
export class UserComponent {
  searchText: string = '';
  name: string = '';
  userDetails: any;
  userBeavers: any[] = [];
  userAllBeavers: any[] = [];

  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;

  loader: boolean = true;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
    ]).subscribe(([params, queryParams]) => {
      this.currentPage = queryParams['page'] ? +queryParams['page'] : 1;
      this.name = params['name'];
      this.getUserDetails(this.name);
    });
  }

  private getUserDetails(name: string) {
    this.dataService.getUserData(name).subscribe((result) => {
      this.userDetails = result;
      this.userBeavers = result.beavers;
      this.userAllBeavers = result.beavers;

      this.loader = false;

      this.totalItems = this.userBeavers.length;

      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      this.userBeavers = result.beavers.slice(startIndex, endIndex);

      if (startIndex >= this.totalItems) {
        this.router.navigate(['/']);
      }
    });
  }

  public nextPage(target: HTMLElement) {
    this.scrollToElement(target);
    this.currentPage = this.currentPage + 1;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });
  }

  public prevPage(target: HTMLElement) {
    this.scrollToElement(target);
    this.currentPage = this.currentPage - 1;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });
  }

  public canLoadNextPage(): boolean {
    const startIndex = this.currentPage * this.pageSize;
    return startIndex < this.totalItems;
  }

  public canLoadPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  public searchBeaver() {
    if (this.searchText) {
      this.userBeavers = this.userAllBeavers.filter((beaver) =>
        beaver.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.userBeavers = this.userAllBeavers.slice(startIndex, endIndex);
    }
  }

  private scrollToElement(target: HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
