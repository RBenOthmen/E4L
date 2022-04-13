import { Component, Input, OnInit } from '@angular/core';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'src/app/exceptions/not-found-error';
import { Teacher } from 'src/app/interfaces/Teacher';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-teachers-list',
  templateUrl: './admin-teachers-list.component.html',
  styleUrls: ['./admin-teachers-list.component.css'],
})
export class AdminTeachersListComponent implements OnInit {
  teachers!: Teacher[];
  @Input('teacher') teacher!: Teacher;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getTeachers().subscribe({
      next: (result) => (this.teachers = result),
      error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err);
        }
      },
    });
  }

  deleteTeacher(teacher: Teacher) {
    // this.authService.getCurrentTeacherInfo().subscribe((response) => { //getTeacher mel authService or adminService
    //   this.teacher.first_name = response.first_name;
    //   this.teacher.last_name = response.last_name;
    //   this.teacher.email = response.email;
    //   this.teacher.birth_date = response.birth_date;
    //   this.teacher.phone = response.phone;
    //   this.teacher.linkedin = response.linkedin;
    // });
    this.adminService.deleteTeacher(teacher).subscribe({
      next: (response) => {
        console.log('Teacher deleted successfully');
      },
      error: (err: AppError) => {
        console.log(err);
      },
    });
  }

  updateTeacher(teacher: Teacher) {
    this.adminService.updateTeacher(teacher).subscribe({
      next: (response) => {
        console.log('Teacher updated successfully');
      },
      error: (err: AppError) => {
        console.log(err);
      },
    });
  }
}
