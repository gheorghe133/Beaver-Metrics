import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../services/DataService/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../../LoaderComponent/loader/loader.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `
    @if(!loader){
    <div class="container-hero">
      <div class="hero-background"></div>
      <div class="hero">
        <div class="hero-body">
          <img
            class="user-image"
            [src]="userDetails?.user_image"
            [alt]="userDetails?.user_image"
          />

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
          placeholder="Search . . ."
          [(ngModel)]="searchText"
          (input)="searchBeaver()"
        />
      </div>
    </div>

    @if(this.userBeavers.length > 0 && !this.searchText && !this.loader){
    <div class="container-filters">
      <button
        class="filter-button"
        [ngClass]="{ 'active-filter': buttonStates.beaverNameAsc }"
        (click)="sortNameAscending()"
      >
        <span class="icon">
          <i class="fa-solid fa-arrow-down-a-z"></i>
        </span>
        <span>Name</span>
      </button>
      <button
        class="filter-button"
        [ngClass]="{ 'active-filter': buttonStates.beaverNameDesc }"
        (click)="sortNameDescending()"
      >
        <span class="icon">
          <i class="fa-solid fa-arrow-up-z-a"></i>
        </span>
        <span>Name</span>
      </button>
      <button
        class="filter-button"
        [ngClass]="{ 'active-filter': buttonStates.beaverLevelAsc }"
        (click)="sortValueAscending()"
      >
        <span class="icon">
          <i class="fa-solid fa-arrow-down-a-z"></i>
        </span>
        <span>Level</span>
      </button>
      <button
        class="filter-button"
        [ngClass]="{ 'active-filter': buttonStates.beaverLevelDesc }"
        (click)="sortValueDescending()"
      >
        <span class="icon">
          <i class="fa-solid fa-arrow-up-z-a"></i>
        </span>
        <span>Level</span>
      </button>
    </div>
    }
    <div class="container-beavers">
      @for (beaver of userBeavers; track $index) {
      <div class="beaver-card" [ngClass]="getRarityClass(beaver.rarity)">
        <div class="beaver-image">
          <img src="../../../assets/beaver-image.jpeg" alt="Beaver Image" />
        </div>
        <div class="beaver-information">
          <p>
            Name: <b>{{ beaver.name }}</b>
          </p>
          <p>
            Rarity: <b> {{ beaver.rarity }}</b>
          </p>
          <p>
            Type: <b>{{ beaver.type }}</b>
          </p>
          <p>
            Level: <b>{{ beaver.level }}</b>
          </p>
        </div>
      </div>
      } @empty {
      <div class="container-not-found">
        <h1>Beaver not found</h1>
      </div>
      }
    </div>

    @if(this.userBeavers.length > 11 && !this.searchText && !this.loader){
    <div class="container-pagination">
      @if(loadedItems < beavers.length){
      <button (click)="loadMore()">Load more</button>
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
        min-height: 35vh;
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

      .hero-body .user-image {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        user-select: none;
      }

      .title {
        font-size: 2.5rem;
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
        position: relative;
        z-index: 1;
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

      .container-beavers {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        grid-gap: 1em 1em;
        width: 100%;
        min-height: 155px;
        height: max-content;
        overflow-y: auto;
        z-index: 1;
        position: relative;
      }

      .container-beavers .beaver-card {
        display: flex;
        align-items: center;
        height: max-content;
        gap: 15px;
        color: #fff;
        border: 2px solid #808080;
        border-radius: 5px;
        padding: 10px;
        cursor: default;
      }

      .container-beavers .huynea-color {
        background: linear-gradient(0, #171717, transparent 66%);
      }

      .container-beavers .wood-color {
        background: linear-gradient(0, #0f172a, transparent 66%);
      }

      .container-beavers .iron-color {
        background: linear-gradient(0, #4b5563, transparent 66%);
      }

      .container-beavers .gold-color {
        background: linear-gradient(0, #ca8a04, transparent 66%);
      }

      .container-beavers .diamond-color {
        background: linear-gradient(0, #0e7490, transparent 66%);
      }

      .container-beavers .emerald-color {
        background: linear-gradient(0, #22c55e, transparent 66%);
      }

      .container-beavers .default-color {
        background: linear-gradient(0, transparent, transparent 66%);
      }

      .container-beavers .beaver-card:hover {
        background-color: #111;
      }

      .container-beavers .beaver-card .beaver-image {
        max-width: 45%;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 150px;
      }

      .container-beavers .beaver-card .beaver-image img {
        height: 100%;
        width: 100%;
        max-width: 160px;
        border-radius: 50%;
        user-select: none;
      }

      .container-beavers .beaver-card .beaver-information {
        line-height: 30px;
      }

      .container-beavers .beaver-card .beaver-information b {
        color: #db9769;
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
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        letter-spacing: 8px;
        color: #fff;
        position: absolute;
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
        padding: 10px;
        border-radius: 5px;
        border: 2px solid #db9769;
        color: #db9769;
        cursor: pointer;
        user-select: none;
        transition: transform 0.3s ease;
      }

      .container-pagination button:active {
        transform: scale(0.95);
      }

      .container-pagination button:hover {
        background-color: #111;
      }

      .loader-container {
        margin-top: 40vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @media (max-width: 500px) {
        .container-beavers {
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }

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
  imports: [ReactiveFormsModule, FormsModule, LoaderComponent, CommonModule],
})
export class UserComponent {
  searchText: string = '';
  name: string = '';
  userDetails: any;
  userBeavers: any[] = [];
  beavers: any[] = [];

  loadedItems: number = 12;

  loader: boolean = true;

  buttonStates = {
    beaverNameAsc: false,
    beaverNameDesc: false,
    beaverLevelAsc: false,
    beaverLevelDesc: false,
  };

  private userDataLoaded: boolean = false;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.name = params['name'];
      this.getUserDetails(this.name);

      this.titleService.setTitle('Beaver Metrics | ' + this.name);
    });

    // Subscribe to query parameter changes
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      const sortParam = queryParams['sort'];
      if (sortParam && this.userDataLoaded) {
        // Sort if user data is available
        this.setButtonStates(sortParam);
        this.sortUserBeavers();
      }
    });
  }

  private getUserDetails(name: string) {
    this.dataService.getUserData(name).subscribe((result) => {
      this.userDetails = result;
      this.beavers = result.beavers;

      this.sortUserBeavers(); // Initially, you can apply default sorting
      this.loader = false;
      this.userDataLoaded = true;

      // Check if sortParam is present in queryParams
      const sortParam = this.activatedRoute.snapshot.queryParams['sort'];
      if (sortParam) {
        this.setButtonStates(sortParam);
        this.sortUserBeavers();
        this.updateQueryParams(sortParam);
      }
    });
  }

  private updateQueryParams(sortParam?: string) {
    const queryParams: any = { sort: sortParam };

    // Use queryParamsHandling to merge with existing query parameters
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  private updateUserBeavers() {
    if (this.searchText) {
      this.userBeavers = this.beavers.filter((beaver) =>
        Object.values(beaver).some((value: any) =>
          value.toString().toLowerCase().includes(this.searchText.toLowerCase())
        )
      );
    } else {
      this.userBeavers = this.beavers.slice(0, this.loadedItems);
    }
  }

  public sortNameAscending() {
    this.toggleSorting('beaverNameAsc');
  }

  public sortNameDescending() {
    this.toggleSorting('beaverNameDesc');
  }

  public sortValueAscending() {
    this.toggleSorting('beaverLevelAsc');
  }

  public sortValueDescending() {
    this.toggleSorting('beaverLevelDesc');
  }

  private sortUserBeavers() {
    let sortedBeavers: any[]; // Variable to store sorted beavers

    switch (true) {
      case this.buttonStates.beaverNameAsc:
        sortedBeavers = this.userBeavers
          .slice()
          .sort(this.compareByBeaverNameAsc);
        break;
      case this.buttonStates.beaverNameDesc:
        sortedBeavers = this.userBeavers
          .slice()
          .sort(this.compareByBeaverNameDesc);
        break;
      case this.buttonStates.beaverLevelAsc:
        sortedBeavers = this.userBeavers
          .slice()
          .sort(this.compareByBeaverLevelAsc);
        break;
      case this.buttonStates.beaverLevelDesc:
        sortedBeavers = this.userBeavers
          .slice()
          .sort(this.compareByBeaverLevelDesc);
        break;
      default:
        sortedBeavers = this.beavers.slice(0, this.loadedItems); // Use the original loaded items if no sorting
        break;
    }

    // Now, update the userBeavers with the sorted beavers and maintain the loaded items
    this.userBeavers = sortedBeavers.slice(0, this.loadedItems);
  }

  private toggleSorting(
    sortParam: keyof typeof UserComponent.prototype.buttonStates
  ) {
    if (this.buttonStates[sortParam]) {
      // If the sorting is already active, clear it
      this.clearSorting();
    } else {
      // Set the sorting and apply it
      this.setButtonStates(sortParam);
      this.sortUserBeavers();

      // Update query parameters
      this.updateQueryParams(sortParam);
    }
  }

  private clearSorting() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { sort: null },
      queryParamsHandling: 'merge',
    });

    this.setButtonStates();
    this.updateUserBeavers();
  }

  private setButtonStates(
    sortParam?: keyof typeof UserComponent.prototype.buttonStates
  ) {
    // Implement setting button states logic
    // Set the specified sorting button to true, set others to false
    Object.keys(this.buttonStates).forEach((key) => {
      this.buttonStates[key as keyof typeof this.buttonStates] = false;
    });

    if (sortParam) {
      this.buttonStates[sortParam] = true;
    }
  }

  public searchBeaver() {
    this.updateUserBeavers();
  }

  public loadMore() {
    this.loadedItems += 10;
    this.updateUserBeavers();
  }

  private compareByBeaverNameAsc(a: any, b: any) {
    return a.name.localeCompare(b.name);
  }

  private compareByBeaverNameDesc(a: any, b: any) {
    return b.name.localeCompare(a.name);
  }

  private compareByBeaverLevelAsc(a: any, b: any) {
    return a.level - b.level; // Change 'value' to the actual property you want to sort by
  }

  private compareByBeaverLevelDesc(a: any, b: any) {
    return b.level - a.level; // Change 'value' to the actual property you want to sort by
  }

  // In your component class Huynea -> Wood -> Iron -> Gold -> Diamond -> Emerald
  public getRarityClass(rarity: string): string {
    switch (rarity.toLowerCase()) {
      case 'huynea':
        return 'huynea-color';
      case 'wood':
        return 'wood-color';
      case 'iron':
        return 'iron-color';
      case 'gold':
        return 'gold-color';
      case 'diamond':
        return 'diamond-color';
      case 'emerald':
        return 'emerald-color';
      default:
        return 'default-color';
    }
  }
}
