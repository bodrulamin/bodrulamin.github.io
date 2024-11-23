import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from "primeng/button";
import { ToolbarModule } from "primeng/toolbar";
import { SplitButtonModule } from "primeng/splitbutton";
import { InputTextModule } from "primeng/inputtext";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { ChipsModule } from "primeng/chips";
import { DOCUMENT, KeyValuePipe, NgForOf, NgIf } from "@angular/common";
import { PanelModule } from "primeng/panel";
import { DataService } from "./data/data.service";
import { CardModule } from "primeng/card";
import { ChipModule } from "primeng/chip";
import { TagModule } from "primeng/tag";
import { InputSwitchModule } from "primeng/inputswitch";
import { FormsModule } from "@angular/forms";
import { TimelineModule } from "primeng/timeline";
import { CarouselModule } from "primeng/carousel";
import { MenuModule } from "primeng/menu";
import { jsonData } from "./data/dummy.data";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button, ToolbarModule, SplitButtonModule, InputTextModule, OverlayPanelModule, InputGroupModule, InputGroupAddonModule, ChipsModule, NgIf, PanelModule, CardModule, NgForOf, KeyValuePipe, ChipModule, TagModule, InputSwitchModule, FormsModule, TimelineModule, CarouselModule, MenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isDarkMode = true;
  severities = ["success", "secondary", "info", "warning", "danger", "contrast"];
  menuItems: any[] = [];
  severityMap = new Map();
  jsonData = jsonData;
  cd=0;
  private severityIndex: number = Math.floor(Math.random() * this.severities.length);

  constructor(private dataService: DataService) {
    this.dataService.getJsonData().subscribe({
      next: data => this.jsonData = data,
    }
    );
    this.updateMenu();
  }

  onSocialClicked(selectedSocial: any) {
    window.open(selectedSocial.prefix + selectedSocial.value);
  }
get cardAnimation(): string {
  this.cd = this.cd + 100;
  return 'fadeindown animation-duration-1000 '+'animation-delay-'+this.cd;
}
  getRandomSeverity(s: any): any {
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
      { label: 'About', command: () => this.scrollToSection('aboutMe') },
      { label: 'Skills', command: () => this.scrollToSection('skill') },
      { label: 'Experience', command: () => this.scrollToSection('experience') },
      { label: 'Portfolio', command: () => this.scrollToSection('portfolio') },
      { label: 'Contact Me', command: () => this.scrollToSection('contactMe') },
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
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  protected readonly window = window;
}
