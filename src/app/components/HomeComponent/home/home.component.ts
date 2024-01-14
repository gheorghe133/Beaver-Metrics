import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { DataService } from '../../../services/DataService/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterOutlet],
  template: `
    <section class="section">
      <div class="container-hero">
        <div class="hero-background"></div>
        <div class="hero">
          <div class="hero-body">
            <p class="title">Beaver FrontEnd</p>
            <p class="subtitle">Users metrics</p>
          </div>
        </div>
      </div>
      <div class="container-search">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search here..."
            [(ngModel)]="searchText"
            (input)="filterUsers()"
          />
        </div>
      </div>
      <div class="container-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Best Beaver</th>
              <th>Rare Beavers</th>
              <th>Total Beavers</th>
            </tr>
          </thead>
          <tbody>
            @for (user of filteredUsers; track $index) {
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
      </div>
    </section>
  `,
  styles: [
    `
      .section {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        padding: 30px;
      }

      .container-hero {
        width: 100%;
        min-height: 35vh;
        border: 2px solid #808080;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 2rem;
      }

      .hero-background {
        width: 100%;
        min-height: 35vh;
        background: linear-gradient(45deg, #6b21a8, #9d174d);
        filter: blur(100px);
      }

      .hero {
        width: 100%;
        align-items: stretch;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
      }

      .hero-body {
        flex-grow: 1;
        flex-shrink: 0;
        padding: 9rem 4.5rem;
        color: #fff;
      }

      .title {
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.125;
        word-break: break-word;
      }

      .subtitle {
        font-size: 1.25rem;
        font-weight: 400;
        line-height: 1.25;
        margin-top: 0.5rem;
      }

      .container-table {
        width: 100%;
        overflow-y: auto;
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
        font-size: 0.75rem;
      }

      tr:hover {
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
    `,
  ],
})
export class HomeComponent {
  searchText: string = '';
  usersDisplay: any[] = [];
  filteredUsers: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.usersDisplay = this.filteredUsers = data;
      console.log(this.usersDisplay);
    });
  }

  public filterUsers(): void {
    this.filteredUsers = this.usersDisplay.filter((user: any) =>
      user.username.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  public navigateToUserPage(user: any) {
    this.router.navigate(['user/', user.username]);
  }
}
