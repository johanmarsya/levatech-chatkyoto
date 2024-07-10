<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Subject;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubjectController extends Controller
{   
    public function index()
    {
        $user = Auth::user();
        
        $registeredSubjectsIds = $user->subjects()->pluck('subjects.id')->toArray();
        $availableSubjects = Subject::whereNotIn('id', $registeredSubjectsIds)->get();
        $notavailableSubjects = Subject::whereIn('id', $registeredSubjectsIds)->get();
        
        return Inertia::render('ManegementSubjects/SubjectSelection', ['availableSubjects' => $availableSubjects, 'notavailableSubjects' => $notavailableSubjects]);
    }
    
    public function store(Request $request)
    {
        $user = Auth::user();
        $subjectIds = $request->input('subjects');
        
        foreach ($subjectIds as $subjectId) {
            
            $subject = Subject::find($subjectId);
        
            $user->subjects()->syncWithoutDetaching([$subject->id]);
        
            $conversation = Conversation::firstOrCreate(
                    ['subject_id' => $subject->id],
                    ['name' => $subject->subject_name . ' ' . $subject->start_time]
            );
        
            $user->conversations()->syncWithoutDetaching([$conversation->id]);
        
        }
        
        return redirect()->back()->with('success', 'Subjects and Conversations updated successfully.');
    }
    
    public function delete(Request $request)
    {
        $user = Auth::user();
        $subjectIds = $request->input('subjectsToRemove', []);

        foreach ($subjectIds as $subjectId) {
            
            $user->subjects()->detach($subjectId);

            
            $conversation = Conversation::where('subject_id', $subjectId)->first();
            if ($conversation) {
                $user->conversations()->detach($conversation->id);
            }
        }

        return redirect()->back()->with('success', 'Selected subjects have been removed.');
    }
    
    public function add(Request $request)
    {
        $request->validate([
           'subject_name' => 'required|string|max:255',
           'start_time' => 'required|string|max:255',
        ]);
        
        $existingSubject = Subject::where('subject_name', $request->input('subject_name'))
            ->where('start_time', $request->input('start_time'))->first();
        
        if ($existingSubject) {
            
            $message = "この教科は既に登録されています.一番上のリストから選択してください.";
            $user = Auth::user();
        
            $registeredSubjectsIds = $user->subjects()->pluck('subjects.id')->toArray();
            $availableSubjects = Subject::whereNotIn('id', $registeredSubjectsIds)->get();
            $notavailableSubjects = Subject::whereIn('id', $registeredSubjectsIds)->get();
        
            return Inertia::render('ManegementSubjects/SubjectSelection', 
            ['availableSubjects' => $availableSubjects, 'notavailableSubjects' => $notavailableSubjects, 'message' => $message]);
            
            
        } else {
            $subject = Subject::create([
                'subject_name' => $request->input('subject_name'),
                'start_time' => $request->input('start_time'),
            ]);
            
            $user = Auth::user();
            $user->subjects()->attach($subject->id);
            
            $conversation = Conversation::create([
                'subject_id' => $subject->id,
                'name' => $subject->subject_name . ' ' . $subject->start_time,
            ]);
            
            $user->conversations()->attach($conversation->id);
            
             return redirect()->route('dashboard');
        }
    }
}