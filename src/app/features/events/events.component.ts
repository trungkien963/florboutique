import { Component } from '@angular/core';
import { LanguageService } from '../../shared/services/language.service';

interface EventProject {
  title: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: false
})
export class EventsComponent {
  displayGallery = false;
  selectedEventTitle = '';
  galleryProjects: EventProject[] = [];

  constructor(public lang: LanguageService) {}

  openGallery(type: string) {
    if (type === 'wedding') {
      this.selectedEventTitle = 'Dự Án Đám Cưới & Đám Hỏi';
      this.galleryProjects = [
        { title: 'Backdrop Đỏ Rượu Trưng Bày Ảnh Cưới', image: 'assets/images/project-lux-1.png', price: 18000000 },
        { title: 'Trần Lụa Thả Phối Hoa Hồng Pastel', image: 'assets/images/project-lux-2.png', price: 55000000 },
        { title: 'Phông Nhum Đỏ Sang Trọng Nghệ Thuật', image: 'assets/images/project-lux-3.png', price: 25000000 },
        { title: 'Cổng Hoa Khổng Lồ Hồng Đào Rực Rỡ', image: 'assets/images/project-lux-4.png', price: 45000000 },
        { title: 'Cổng Hoa Tươi Red Burgundy', image: 'assets/images/project-wedding-1.png', price: 15000000 },
        { title: 'Trang Trí Backdrop Lễ Đường', image: 'assets/images/project-wedding-2.png', price: 25000000 }
      ];
    } else if (type === 'corporate') {
      this.selectedEventTitle = 'Sự Kiện Doanh Nghiệp';
      this.galleryProjects = [
        { title: 'Phông Nên Thương Hiệu Hoa Khổng Lồ', image: 'assets/images/project-corporate-1.png', price: 20000000 },
        { title: 'Trang Trí Backdrop Sang Trọng', image: 'assets/images/project-corporate-2.png', price: 18000000 }
      ];
    } else {
      this.selectedEventTitle = 'Sinh Nhật & Kỷ Niệm';
      this.galleryProjects = [
        { title: 'Sinh Nhật Tone Pastel Phong Cách Art', image: 'assets/images/project-birthday-1.png', price: 8000000 },
        { title: 'Bàn Tiệc Kỷ Niệm Hoa Rủ', image: 'assets/images/project-birthday-2.png', price: 10000000 }
      ];
    }
    
    this.displayGallery = true;
  }
}
