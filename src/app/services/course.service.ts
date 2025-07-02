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
  private baseUrl: string = "http://localhost:8084/course";

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

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        timeout(3000),
        catchError(err => {
          console.log(" error delete ", err);
          throw new Error("Error al eliminar");
        })
      );
  }
}
