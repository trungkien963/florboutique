import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-our-story',
  standalone: false,
  templateUrl: './our-story.component.html',
  styleUrl: './our-story.component.scss',
})
export class OurStoryComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(public lang: LanguageService, private el: ElementRef) {}

  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // trigger when 15% visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          // Remove if you want it to trigger again when scrolling back up/down
          entry.target.classList.remove('in-view'); 
        }
      });
    }, options);

    const animatedSections = this.el.nativeElement.querySelectorAll('.animate-section');
    animatedSections.forEach((section: Element) => {
      this.observer?.observe(section);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
