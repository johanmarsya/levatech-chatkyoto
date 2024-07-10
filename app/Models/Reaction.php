<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Reaction extends Model
{
    use HasFactory;
    
    public function messages(): BelongsToMany
    {
        return $this->belongsToMany(Message::class, 'message_reaction');
    }
    
    protected $fillable = [
        'name', 
        'image_path',
    ];
}
