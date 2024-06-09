<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    
    public function conversation()
    {
        return $this->hasOne(Conversation::class);
    }
    
    protected $fillable = [
        'subject_name',
        'start_time',
    ];
}
