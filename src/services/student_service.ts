// src/services/student.service.ts
import { pool } from '../config/database';
import { Student } from  '../models/student_model';

export class StudentService {
  async getAllStudents(): Promise<Student[]> {
    try {
      const result = await pool.query('SELECT * FROM students');
      return result.rows;
    } catch (error : any) {
      throw new Error(`Unable to fetch students: ${error.message}`);
    }
  }

  async getStudentById(id: number): Promise<Student | null> {
    try {
      const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error : any) {
      throw new Error(`Unable to fetch student: ${error.message}`);
    }
  }

  async createStudent(student: Student): Promise<Student> {
    const { name, age, email } = student;
    try {
      const result = await pool.query(
        'INSERT INTO students (name, age, email) VALUES ($1, $2, $3) RETURNING *',
        [name, age, email]
      );
      return result.rows[0];
    } catch (error : any) {
      throw new Error(`Unable to create student: ${error.message}`);
    }
  }

  async updateStudent(id: number, student: Student): Promise<Student> {
    const { name, age, email } = student;
    try {
      const result = await pool.query(
        'UPDATE students SET name = $1, age = $2, email = $3 WHERE id = $4 RETURNING *',
        [name, age, email, id]
      );
      return result.rows[0];
    } catch (error : any) {
      throw new Error(`Unable to update student: ${error.message}`);
    }
  }

  async deleteStudent(id: number): Promise<void> {
    try {
      await pool.query('DELETE FROM students WHERE id = $1', [id]);
    } catch (error : any) {
      throw new Error(`Unable to delete student: ${error.message}`);
    }
  }
}
