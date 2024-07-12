<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Message extends Model
{
    use HasFactory;
    
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
    
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'message_user')->withPivot('is_read');;
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function reactions(): BelongsToMany
    {
        return $this->belongsToMany(Reaction::class, 'message_reaction')
                    ->withPivot('reaction_id');
    }
    
    protected $fillable = [
        'message', 
        'conversation_id',
        'user_id',
    ];
}
