<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
    
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    
    public function reactions()
    {
        return $this->belongsToMany(Reaction::class);
    }
}
