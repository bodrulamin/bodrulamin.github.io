import {Component, ElementRef, inject, OnInit, viewChild, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {InputTextModule} from "primeng/inputtext";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {ChipsModule} from "primeng/chips";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {PanelModule} from "primeng/panel";
import {DataService} from "./data/data.service";
import {CardModule} from "primeng/card";
import {ChipModule} from "primeng/chip";
import {TagModule} from "primeng/tag";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {TimelineModule} from "primeng/timeline";
import {CarouselModule} from "primeng/carousel";
import {MenuModule} from "primeng/menu";
import {jsonData} from "./data/dummy.data";
import {AnimateModule} from 'primeng/animate';
import {AnimateOnScrollModule} from "primeng/animateonscroll";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button, ToolbarModule, SplitButtonModule, InputTextModule, OverlayPanelModule, InputGroupModule, InputGroupAddonModule, ChipsModule, NgIf, PanelModule, CardModule, NgForOf, KeyValuePipe, ChipModule, TagModule, InputSwitchModule, FormsModule, TimelineModule, CarouselModule, MenuModule, AnimateModule, AnimateOnScrollModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1000ms ease-in', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({opacity: 0}))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('1000ms ease-out', style({transform: 'translateX(0)'}))
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('scaleUp', [
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate('1000ms ease-in', style({transform: 'scale(1)'}))
      ]),
      transition(':leave', [
        animate('1000ms ease-out', style({transform: 'scale(0)'}))
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        style({transform: 'rotate(-360deg)', opacity: 0}),
        animate('1000ms ease-in-out', style({transform: 'rotate(0)', opacity: 1}))
      ]),
      transition(':leave', [
        animate('1000ms ease-in-out', style({transform: 'rotate(360deg)', opacity: 0}))
      ])
    ]),
    trigger('zoomInOut', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),
        animate('1000ms ease-in', style({transform: 'scale(1)', opacity: 1}))
      ]),
      transition(':leave', [
        animate('1000ms ease-out', style({transform: 'scale(0.5)', opacity: 0}))
      ])
    ]),
    trigger('bounce', [
      transition(':enter', [
        animate(
          '1000ms ease-in',
          keyframes([
            style({transform: 'translateY(0)', offset: 0}),
            style({transform: 'translateY(-30px)', offset: 0.3}),
            style({transform: 'translateY(0)', offset: 0.5}),
            style({transform: 'translateY(-15px)', offset: 0.7}),
            style({transform: 'translateY(0)', offset: 1})
          ])
        )
      ]),
      transition(':leave', [
        animate(
          '1000ms ease-out',
          keyframes([
            style({transform: 'translateY(0)', offset: 0}),
            style({transform: 'translateY(30px)', offset: 0.3}),
            style({transform: 'translateY(0)', offset: 1})
          ])
        )
      ])
    ])
  ]

})
export class AppComponent implements OnInit {
  isDarkMode = true;
  severities = ["success", "secondary", "info", "warning", "danger", "contrast"];
  menuItems: any[] = [];
  severityMap = new Map();
  jsonData = jsonData;
  enterClass = "flip";
  private severityIndex: number = Math.floor(Math.random() * this.severities.length);
  visitorCount: number = 0;
  aboutMeHeader = 'About Me';


  constructor(private dataService: DataService) {
    this.fetchData();
    this.updateMenu();
    this.updateVisitorCount();

  }

  ngOnInit(): void {

  }

  onSocialClicked(link: any) {
    window.open(link);
  }

  getSeverity(s: any): any {
    this.severityIndex = this.severities.length > this.severityIndex ? ++this.severityIndex : this.severityIndex = 0;
    if (this.severityMap.get(s)) {
      this.severityMap.get(s)
    } else {
      this.severityMap.set(s, this.severities[this.severityIndex]);
    }
    return this.severityMap.get(s)
  }

  toggleDarkMode() {
    const link = document.getElementById('app-theme',) as HTMLLinkElement;

    if (link.href.includes('light')) {
      link.href = 'theme-dark.css';
      this.isDarkMode = true;
      this.updateMenu();
    } else {
      link.href = 'theme-light.css';
      this.isDarkMode = false;
      this.updateMenu();
    }
  }

  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  portfolioResponsiveOptions = [
    {
      breakpoint: '1024px', // For devices with screen width <= 1024px
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px', // For devices with screen width <= 768px
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '560px', // For devices with screen width <= 560px
      numVisible: 1,
      numScroll: 1,
    },
  ];

  onSubmit(contactForm: any) {
    if (contactForm.valid) {
      console.log('Form Submitted:', this.contactData);
      // You can integrate this data with a backend API to handle submissions
      alert('Message sent successfully!');
      contactForm.reset();
    }
  }

  private updateMenu() {
    this.menuItems = [
      {label: 'About', command: () => this.scrollToSection('aboutMe')},
      {label: 'Skills', command: () => this.scrollToSection('skill')},
      {label: 'Experience', command: () => this.scrollToSection('experience')},
      {label: 'Portfolio', command: () => this.scrollToSection('portfolio')},
      {label: 'Contact Me', command: () => this.scrollToSection('contactMe')},
      {
        label: this.isDarkMode ? 'Light Mode' : 'Dark Mode',
        id: 'theme',
        icon: this.isDarkMode ? 'pi pi-sun' : 'pi pi-moon',
        command: () => this.toggleDarkMode()
      },
    ];
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({behavior: 'smooth'});
      let targetDiv = section.querySelector('.p-card-title.ng-star-inserted');
      this.animateInnerHtml(targetDiv);

    }


  }


  protected readonly window = window;

  private updateVisitorCount() {
    this.dataService.visitorCount().subscribe({
        next: data => this.visitorCount = data.value,
      }
    );
  }

  private fetchData() {
    this.dataService.getJsonData().subscribe({
        next: data => this.jsonData = data,
      }
    );
  }


  nameClick() {

  }

  private animateInnerHtml(targetDiv: Element) {

    let upper: any = targetDiv.innerHTML;
    let original: string = upper + '';
    let time = 0;

    for (let index = 0; index < upper.length; index++) {
      time += 200; // Increment delay for each letter
      let invCase = upper[index] === upper[index].toUpperCase()
        ? upper[index].toLowerCase()
        : upper[index].toUpperCase();

      let first = original.substring(0, index);
      let last = original.substring(index + 1);

      setTimeout(() => {
        let updatedText = first + invCase + last;
        targetDiv.innerHTML = updatedText;
      }, time);
    }

  }
}
