<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Subject extends Model
{
    use HasFactory;
    
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'subject_user');
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
