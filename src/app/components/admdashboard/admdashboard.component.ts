import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Course, CourseService } from '../../services/course.service';

@Component({
  selector: 'app-admdashboard',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './admdashboard.component.html',
  styleUrl: './admdashboard.component.css'
})
export class AdmdashboardComponent {
  private service: CourseService = inject(CourseService);
  courses = signal<Course[]>([]);

  ngOnInit() {
    this.service.getCourses().subscribe({
      next: values => { this.courses.set(values) },
      error: err => { console.log(err) }
    })
  }

  deleteCourse(id: number) {
    this.service.deleteCourse(id).subscribe({
      error: err => { console.log(err) }
    })
  }

}
