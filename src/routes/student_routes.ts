// src/routes/student.routes.ts
import express from 'express';
import { getAllStudents, createStudent,updateStudent,deleteStudent } from '../controllers/student_controller';

const router = express.Router();

router.get('/', getAllStudents);
router.post('/create', createStudent);
router.post('/students/update/:id', updateStudent);
router.post('/students/delete/:id', deleteStudent);
export default router;
