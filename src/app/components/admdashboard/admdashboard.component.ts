import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Course, CourseService } from '../../services/course.service';
import { CoursedialogComponent } from '../coursedialog/coursedialog.component';

@Component({
  selector: 'app-admdashboard',
  templateUrl: './admdashboard.component.html',
  styleUrl: './admdashboard.component.css',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatDialogModule]
})
export class AdmdashboardComponent {
  private service = inject(CourseService);
  private dialog = inject(MatDialog);

  courses = signal<Course[]>([]);

  ngOnInit() {
    this.service.getCourses().subscribe({
      next: values => this.courses.set(values),
      error: err => console.log(err)
    });
  }

  createCourse() {
    const dialogRef = this.dialog.open(CoursedialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.insertCourse(result).subscribe({
          next: () => this.ngOnInit(),
          error: err => console.log(err)
        });
      }
    });
  }

  editCourse(course: Course) {
    const dialogRef = this.dialog.open(CoursedialogComponent, { data: course });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.updateCourse(result).subscribe({
          next: () => this.ngOnInit(),
          error: err => console.log(err)
        });
      }
    });
  }

  deleteCourse(id: number) {
    this.service.deleteCourse(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.log(err)
    });
  }
}
