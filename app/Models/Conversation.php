<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    
    public function subject()
    {
        return $this->belogsTo(Subject::class);
    }
    
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
    
    protected $fillable = [
        'name', 
        'subject_id',
    ];
}
