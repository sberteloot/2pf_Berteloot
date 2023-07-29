import { Component } from '@angular/core';
import { IStudent } from '../../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../students.service';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent {

  student: IStudent | undefined = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentsService: StudentsService,
    private notifier : NotifierService
  ) {
    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'students']);
      this.notifier.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido`);
    } else {
      this.getStudent(Number(this.activatedRoute.snapshot.params['id']));
    }
  }

  getStudent(id : number) : void{
    this.studentsService.loadStudents();    
    this.studentsService.getStudentById(id).subscribe({
      next: (student) => {
        this.student = student
      }
    })
  }

}
