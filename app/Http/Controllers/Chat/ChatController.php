<?php

namespace App\Http\Controllers\Chat;

use App\Models\Message;
use App\Models\User;
use App\Models\Conversation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Events\MessageSent;
use Inertia\Inertia;

class ChatController extends Controller
{
    
    public function index($conversation)
    {
        $conversationDetails = Conversation::find($conversation);
        return Inertia::render('Chat/Chats', [
            'conversationId' => $conversation,// conversation_idのこと
            'conversationName' => $conversationDetails->name,
        ]);
    }
    
    public function fetchMessages($conversation)
    {
       
        $messages = Message::with('user')
            ->where('conversation_id', $conversation)
            ->get();
        
        return response()->json($messages);
    }
    
    public function sendMessage(Request $request, $conversation)
    {
        $user = Auth::user();
        
        $message = Message::create([
            'message' => $request->message,
            'conversation_id' => $conversation,
            'user_id' => $user->id,
        ]);
        
        preg_match_all('/@([\w\x{00C0}-\x{017F}\x{4E00}-\x{9FFF}\x{3040}-\x{309F}\x{30A0}-\x{30FF}\x{FF00}-\x{FFEF}]+)/u', $request->message, $matches);
        $mentionedUsers = $matches[1];
        
        foreach ($mentionedUsers as $mentionendUsername) {
            $mentionedUser = User::where('user_name', $mentionendUsername)->first();
            if ($mentionedUser) {
                $message->users()->attach($mentionedUser->id);
                // broadcast(new NotificationSent($mentionedUser, $message))->toOthers();
            }
        }
        
        broadcast(new MessageSent($user, $message))->toOthers();
        
        return response()->json(['status' => 'Message Sent!']);
    }
    
    public function getUsersInRoom($conversation)
    {
        try {
            $users = User::whereHas('conversations', function ($query) use ($conversation) {
                $query->where('conversation_id', $conversation);
            })->get();
    
            return response()->json($users);
        } catch (\Exception $e) {
            \Log::error('Error fetching users in room: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching users in room'], 500);
        }
    }
}