import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, timeout } from 'rxjs';

export interface Course {
  id: number,
  name: string,
  description: string,
  duration: string,
  level: string,
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = "/api/course";

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl)
      .pipe(
        timeout(3000),
        catchError(err => {
          console.log("error courses", err);
          throw new Error("Error al conseguir cursos");
        })
      );
  }

  insertCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, course)
      .pipe(
        timeout(3000),
        catchError(err => {
          console.log("error create course", err);
          throw new Error("Error al crear curso");
        })
      );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(this.baseUrl, course)
      .pipe(
        timeout(3000),
        catchError(err => {
          console.log("error update course", err);
          throw new Error("Error al actualizar curso");
        })
      );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        timeout(3000),
        catchError(err => {
          console.log(" error delete ", err);
          throw new Error("Error al eliminar curso");
        })
      );
  }
}
