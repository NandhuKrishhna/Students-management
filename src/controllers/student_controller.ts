
import { Request, Response } from 'express';
import { StudentService } from '../services/student_service';

const studentService = new StudentService();

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudents();
    res.render('index', { students });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};



export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(200).json({ status: 'success', message: 'Student created successfully!' });
  } catch (error: any) {
    console.error(error);  

    if (error.message && error.message.includes('duplicate key value violates unique constraint "students_email_key"')) {
      res.status(400).json({ status: 'error', message: 'Email already exists. Please use a different email.' });
    } else {
      res.status(500).json({ status: 'error', message: 'An error occurred while creating the student.' });
    }
  }
};





export const updateStudent = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const id = parseInt(req.params.id);
    const student = await studentService.updateStudent(id, req.body);
    res.status(200).json({ status: 'success', message: 'Student updated successfully!' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};


export const deleteStudent = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const id = parseInt(req.params.id);
    await studentService.deleteStudent(id);
    res.status(200).json({ status: 'success', message: 'Student deleted successfully!' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
