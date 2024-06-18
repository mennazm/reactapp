<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentExam extends Model
{
    use HasFactory;
    protected $fillable = [
        'student_id',
        'exam_id',
        'result',
    ];
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
    public function exam()
    {
        return $this->belongsTo(Exam::class, 'exam_id');
    }
}
