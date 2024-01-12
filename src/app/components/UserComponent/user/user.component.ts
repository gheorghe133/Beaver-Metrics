import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../services/DataService/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  template: ` <section class="section">
    <div class="container-hero">
      <div class="hero-background"></div>
      <div class="hero">
        <div class="hero-body">
          <div class="user-avatar">
            <img
              [src]="userDetails.user_image"
              [alt]="userDetails.user_image"
            />
          </div>
          <div class="user-information">
            <p class="title">{{ userDetails.user_name }}</p>
            <p class="subtitle">Beavers {{ userDetails.total_beavers }}</p>
          </div>
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
        />
      </div>
    </div>
    <div class="container-beaver">
      @for(beaver of userBeavers; track $index) {
      <div class="card">
        <p class="beaver-name">Name: {{ beaver.name }}</p>
        <p class="beaver-rarity">Rarity: {{ beaver.rarity }}</p>
        <p class="beaver-type">Type: {{ beaver.type }}</p>
        <p class="beaver-level">Level: {{ beaver.level }}</p>
      </div>
      }
    </div>
  </section>`,
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
        display: flex;
        align-items: center;
        gap: 15px;
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

      .container-beaver {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 1em 1em;
      }

      .card {
        height: max-content;
        border-radius: 5px;
        border: 2px solid #808080;
        padding: 20px;
        color: #fff;
        line-height: 2;
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
export class UserComponent {
  searchText: string = '';
  name: string | undefined;
  userDetails: any;
  filteredBeavers: any[] = [];
  userBeavers: any[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.name = params['name'];

      this.getUserDetails();
    });
  }

  private getUserDetails() {
    this.dataService.getUserData().subscribe((result) => {
      this.userDetails = result;
      this.userBeavers = result.user_beavers;
    });
  }
}
