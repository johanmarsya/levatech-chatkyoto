<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    
    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }
    
    public function subjects(): BelongsToMany
    {
        return $this->belongsToMany(Subject::class, 'subject_user');
    }
    
    public function conversations(): BelongsToMany
    {
        return $this->belongsToMany(Conversation::class, 'conversation_user');
    }
    
    public function messageUsers(): BelongsToMany 
    {
        return $this->belongsToMany(Message::class, 'message_user');
    }
    
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
    

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_name',
        'email',
        'password',
        'grade',
        'icon_path',
        'department_id',
        'faculty_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
