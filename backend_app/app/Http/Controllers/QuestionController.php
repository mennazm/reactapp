<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuestionRequest;
use App\Models\Choice;
use App\Models\Exam;
use App\Models\Question;
use Dotenv\Validator;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function store(StoreQuestionRequest $request, string $id)
    {
        $exam = Exam::find($id);

        $question = new Question([
            'mark' => $request->mark,
            'question' => $request->question,
        ]);

        $exam->questions()->save($question);

        foreach ($request->choices as $choiceData) {
            $choice = new Choice([
                'choice' => $choiceData['choice'],
                'correctness' => $choiceData['correctness'],
            ]);
            $question->choices()->save($choice);
        }

        return response()->json($question->toArray(), 201);
    }


    public function destroy(string $id)
    {
        $question=Question::find($id);
        $question->delete();
        return response()->json(['message' => 'Question deleted successfully'], 200);   
    }
}
