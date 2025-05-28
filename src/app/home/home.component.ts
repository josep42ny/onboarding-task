import { Component } from '@angular/core';
import { HeroListComponent } from '../components/hero-list/hero-list.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-home',
  imports: [HeroListComponent, NgxSkeletonLoaderModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
