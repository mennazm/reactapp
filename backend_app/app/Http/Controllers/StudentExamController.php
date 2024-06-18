<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentExam;
use App\Models\Exam;

class StudentExamController extends Controller
{
   


    public function index()
    {
        $results = StudentExam::with(['student', 'exam'])->get();
        return response()->json($results);
    }

    public function store(Request $request, $examId)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
        ]);

        $exam = Exam::with('questions')->findOrFail($examId);
        $score = 0;

        foreach ($exam->questions as $question) {
            if (isset($validated['answers'][$question->id]) && $validated['answers'][$question->id] == $question->correct_answer) {
                $score++;
            }
        }

        $result = StudentExam::create([
            'student_id' => $request->user()->id,
            'exam_id' => $examId,
            'result' => $score,
        ]);

        return response()->json($result, 201);
    }
}


