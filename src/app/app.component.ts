import {Component, inject, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {InputTextModule} from "primeng/inputtext";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {ChipsModule} from "primeng/chips";
import {DOCUMENT, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {PanelModule} from "primeng/panel";
import {DataService} from "./data/data.service";
import {CardModule} from "primeng/card";
import {ChipModule} from "primeng/chip";
import {jsonData} from "./data/dummy.data";
import {TagModule} from "primeng/tag";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {TimelineModule} from "primeng/timeline";
import {CarouselModule} from "primeng/carousel";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button, ToolbarModule, SplitButtonModule, InputTextModule, OverlayPanelModule, InputGroupModule, InputGroupAddonModule, ChipsModule, NgIf, PanelModule, CardModule, NgForOf, KeyValuePipe, ChipModule, TagModule, InputSwitchModule, FormsModule, TimelineModule, CarouselModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bodrulamin';
  social = {
    title: '',
    value: '', canCopy: true,

    onClick: () => {
    }
  };
  severities = ["success", "secondary", "info", "warning", "danger", "contrast"];
  events = [
    {
      designation: 'Software Engineer',
      company: 'Millennium Information Solution Ltd.',
      date: 'Sep 2024 – Present',
      description: 'Working as a developer in an agile team, contributing to Ababil-NG, one of the top 3 Islamic Core Banking Solutions in Bangladesh.\n' +
        'Responsibilities include designing, coding, and delivering new modules, adding new features, optimizing performance, and fixing bugs.\n' +
        'Managing the Swift-Middleware project.\n' +
        'Reviewing code from junior developers and mentoring them on best practices.',
      image: null,
      color: '#007BFF',
      icon: 'pi pi-briefcase'
    },
    {
      designation: 'Assistant Software Engineer',
    company: 'Millennium Information Solution Ltd.',
      date: 'May 2022 – Aug 2024',
      description: 'Contributed to multiple microservice projects using Java Spring Boot, adding new features and improving performance.\n' +
        'Developed 4 new libraries for Ababil-NG using Angular, JavaScript, and Typescript while optimizing existing libraries.',
      image: null,
      color: '#28A745',
      icon: 'pi pi-code'
    },
    {
      designation: 'Junior Software Engineer',
      company: 'Al-Khwarizmi Software Lab',
      date: 'Dec 2020 – Apr 2022',
      description: 'Developed REST API-based web applications using Spring Boot.\n' +
        'Built the Shikkhon Android application, a mobile library app. 20k downloads in playstore',
      image: null,
      color: '#17A2B8',
      icon: 'pi pi-mobile'
    },
  ];

  severityMap = new Map();
  private socials: any;
  jsonData = jsonData;
  icons= new Map([['Java','fa-brands fa-java']]);

  constructor(private dataService: DataService) {
    this.socials = {
      'linkedin': {
        title: 'LinkedIn',
        value: 'https://linkedin.com/in/bodrulamin', canCopy: true,
        onClick: () => {
          window.open(this.social.value);
        }
      },
      'github': {
        title: 'Github',
        value: 'https://github.com/in/bodrulamin', canCopy: true,
        onClick: () => {
          window.open(this.social.value);
        }
      },
      'email': {
        title: 'Email',
        value: 'bodrulaminiu@gmail.com', canCopy: true,
        onClick: () => {
          window.open('mailto:' + this.social.value);
        }
      },
      'phone': {
        title: 'Phone Number',
        value: '+8801725717136', canCopy: true,
        onClick: () => {
          window.open('tel:' + this.social.value);
        }
      },


    }


    this.dataService.getJsonData().subscribe({
        next: data => {
          this.jsonData = data;
        },
        error: err => {
        },
        complete: () => {
        }
      }
    );

  }

  onSocialClicked(selectedSocial: string) {
    this.social = this.socials[selectedSocial];
    this.social.onClick();
  }

  copyValue() {

  }

  // Function to get a random severity
  private severityIndex: number = Math.floor(Math.random() * this.severities.length);
  getRandomSeverity(s:any): any {
    this.severityIndex = this.severities.length > this.severityIndex ? ++this.severityIndex: this.severityIndex = 0 ;
    if(this.severityMap.get(s)){
      this.severityMap.get(s)
    } else {
      this.severityMap.set(s,this.severities[this.severityIndex]) ;
          }
    return this.severityMap.get(s)
  }


  #document = inject(DOCUMENT);
  isDarkMode = true;
  portfolioProjects = [
    {
      title: 'Project 1',
      subtitle: 'Web Application',
      description: 'A web application built using Angular and Spring Boot.',
      image: 'https://via.placeholder.com/400x200',
      link: 'https://github.com/your-project-link'
    },
    {
      title: 'Project 2',
      subtitle: 'Mobile App',
      description: 'A mobile app developed with Flutter for seamless user experience.',
      image: 'https://via.placeholder.com/400x200',
      link: 'https://play.google.com/store/apps/details?id=your-app-link'
    },
    {
      title: 'Project 3',
      subtitle: 'E-commerce Platform',
      description: 'An e-commerce platform for managing online stores.',
      image: 'https://via.placeholder.com/400x200',
      link: 'https://your-ecommerce-project-link.com'
    }
  ];
  toggleDarkMode() {
    const linkElement = this.#document.getElementById(
      'app-theme',
    ) as HTMLLinkElement;
    if (linkElement.href.includes('light')) {
      linkElement.href = 'theme-dark.css';
      this.isDarkMode = true;
    } else {
      linkElement.href = 'theme-light.css';
      this.isDarkMode = false;
    }
  }
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit(contactForm: any) {
    if (contactForm.valid) {
      console.log('Form Submitted:', this.contactData);
      // You can integrate this data with a backend API to handle submissions
      alert('Message sent successfully!');
      contactForm.reset();
    }
  }

}
