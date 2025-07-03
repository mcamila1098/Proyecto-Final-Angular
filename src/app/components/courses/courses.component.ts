import { Component, inject,signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Course, CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  private service: CourseService = inject(CourseService);
  courses = signal<Course[]>([]);

  ngOnInit() {
    this.service.getCourses().subscribe({
      next: values => { this.courses.set(values)},
      error: err => {console.log(err)}
    })
  }

}