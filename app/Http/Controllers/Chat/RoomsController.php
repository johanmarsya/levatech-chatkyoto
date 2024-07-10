<?php

namespace App\Http\Controllers\Chat;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Conversation;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class RoomsController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $conversations = $user->conversations()->select('id', 'name')->get();
        
        return Inertia::render('Chat/Rooms', ['conversations' => $conversations]);
    }
}