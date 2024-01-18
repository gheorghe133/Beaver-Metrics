import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DataService } from '../../../services/DataService/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../LoaderComponent/loader/loader.component';

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
      } @if(canLoadNextPage()){
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

      .user-image {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      img {
        width: 40px;
        height: 40px;
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
      }

      .container-pagination button:disabled {
        background-color: #111;
        color: #666;
        cursor: not-allowed;
      }

      .loader-container {
        margin-top: 50px;
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

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentPage = params['page'] ? +params['page'] : 1;
      this.loadUsers();
    });
  }

  private loadUsers() {
    const storedData = sessionStorage.getItem('usersData');

    if (storedData) {
      this.users = JSON.parse(storedData);
      this.totalItems = this.users.length;
      this.updateUsersDisplay();
      this.loader = false;
    } else {
      this.dataService.getData().subscribe((data) => {
        this.users = data;

        sessionStorage.setItem('usersData', JSON.stringify(data));

        this.totalItems = this.users.length;
        this.updateUsersDisplay();
        this.loader = false;
      });
    }
  }

  private updateUsersDisplay() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.usersDisplay = this.users.slice(startIndex, endIndex);

    if (startIndex >= this.totalItems) {
      this.router.navigate(['/']);
    }
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
