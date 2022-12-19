import {Component, OnInit} from '@angular/core';
import {Student} from './shared/student.module';
import {StudentService} from './shared/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'Pvi Registration';
  students: Student[] = [];
  idNumber: string | undefined = '';
  firstName: string | undefined = ''
  lastName: string | undefined = ''
  email: string | undefined = ''
  phoneNumber: string | undefined = ''
  id: number = 0;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    console.log('HI How are you ');
    // this.getStudents();
    this.getAllStudents();
  }

  getAllStudents() {
    console.log('getAllStudents is called');

    this.studentService.getAllStudents().subscribe((result) => {
      console.log('Data: ', result);
      this.students = result;
    }, error => {
      console.log('Error Occured while Getting Students: ', error);
      alert('Error Occured while Getting Students')
    });
  }

  createStudent(): void {
    console.log("id number is ", this.idNumber)
    console.log("id number is ", this.firstName)
    console.log("id number is ", this.lastName)
    console.log("id number is ", this.email)
    console.log("id number is ", this.phoneNumber)

    let student: Student = new Student(this.firstName, this.lastName, this.email, this.phoneNumber, this.idNumber);
    student.id = null;

    this.studentService.createStudent(student).subscribe(res => {
      alert('Successfully Created student');
      this.getAllStudents();
    }, error => {
      alert('Failed to create student');
    });
  }

  populateStudent(student: Student): void {
    this.id = student.id;
    this.idNumber = student.idNumber;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.email = student.email;
    this.phoneNumber = student.phoneNumber;
  }

  updateStudent(): void {

    let student: Student = new Student(this.firstName, this.lastName, this.email, this.phoneNumber, this.idNumber, this.id);

    this.studentService.updateStudent(student).subscribe(res => {
      alert('Successfully updated student');
      this.getAllStudents();
    }, error => {
      alert('Failed to update student');
    });
  }

  deleteStudentById(id: number): void {

    this.studentService.deleteStudentById(id).subscribe((result) => {

      this.getAllStudents();
      alert('student deleted successfull');
    }, error => {
      console.log(error);
      this.getAllStudents();
      //  alert('the was an error ');
    })

  }

  // getStudents(): void {
  //   console.log('I am getStudents');

  //   this.students = [
  //     {
  //       id: 1,
  //       idNumber: 1455,
  //       phoneNumber: 1455,
  //       firstName: 'Sam',
  //       lastName: 'Ben',
  //       email: 'ben@gmail.com',
  //     },
  //     {
  //       id: 2,
  //       idNumber: 458,
  //       phoneNumber: 1455,
  //       firstName: 'Sa23',
  //       lastName: 'Ben2',
  //       email: 'ben2@gmail.com',
  //     },
  //     {
  //       id: 3,
  //       idNumber: 55,
  //       phoneNumber: 1455,
  //       firstName: 'Sa2333',
  //       lastName: 'Ben2',
  //       email: 'ben3@gmail.com',
  //     },
  //   ];
  // }
}
