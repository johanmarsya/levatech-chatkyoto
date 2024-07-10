<?php

namespace App\Http\Controllers\Chat;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class OnlinePeopleController extends Controller
{
    public function index()
    {
        $users = User::with(['department', 'faculty'])->get();
        
        return Inertia::render('Chat/People', [
            'users' => $users,
        ]);
    }
}