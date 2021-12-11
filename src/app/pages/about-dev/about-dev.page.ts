import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-dev',
  templateUrl: './about-dev.page.html',
  styleUrls: ['./about-dev.page.scss'],
})
export class AboutDevPage implements OnInit {
  socialMedia = [
    {
      link: 'https://www.linkedin.com/in/sumeet-sharma-31901a12a/',
      icon: 'logo-linkedin'
    },
    {
      link: 'https://www.instagram.com/sumeet.sharma.3950/',
      icon: 'logo-instagram'
    },
    {
      link: 'https://github.com/sumeet1001',
      icon: 'logo-github'
    }
  ];
  constructor() { }

  ngOnInit() {
  }
  goto(link) {
    window.open(link, '_blank');
  }
}
