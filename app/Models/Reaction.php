<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    use HasFactory;
    
    public function messages()
    {
        return $this->belongsToMany(Message::class);
    }
    
    protected $fillable = [
        'name', 
        'image_path',
    ];
}
