<?php

namespace App\Http\Controllers\Chat;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use  App\Http\Controllers\Controller;

class NotificationsController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $mentionedMessages = Message::whereHas('users', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->with(['user', 'conversation', 'users' => function ($query) use ($user) {
            $query->where('user_id', $user->id);
        }])->get();

        return Inertia::render('Chat/Notifications', [
            'mentionedMessages' => $mentionedMessages,
        ]);
    }
    
    public function markAsRead(Request $request, $id)
    {
        $user = Auth::user();
        $message = Message::findOrFail($id);
        
        $message->users()->updateExistingPivot($user->id, ['is_read' => true]);
        
        return redirect()->back();
    }
}