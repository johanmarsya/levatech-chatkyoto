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
        })->with('user', 'conversation')->get();

        return Inertia::render('Chat/Notifications', [
            'mentionedMessages' => $mentionedMessages,
        ]);
    }
}
