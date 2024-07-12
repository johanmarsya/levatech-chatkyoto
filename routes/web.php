<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfileIconController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\Chat\RoomsController;
use App\Http\Controllers\Chat\OnlinePeopleController;
use App\Http\Controllers\Chat\ChatController;
use App\Http\Controllers\Chat\NotificationsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('/dashboard', [ProfileIconController::class, 'insert'])->name('profile_icon.insert');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/subject-selection', [SubjectController::class, 'index'])->name('register_subjects');
    Route::post('/subject-selection', [SubjectController::class, 'store'])->name('subjects.selection');
    Route::post('/subject-delete', [SubjectController::class, 'delete'])->name('subjects.delete');
    Route::post('/subject-add', [SubjectController::class, 'add'])->name('subjects.add');
    
    Route::get('/rooms', [RoomsController::class, 'index'])->name('rooms.index');
    
    Route::get('/people', [OnlinePeopleController::class, 'index'])->name('people.index');
    
    Route::get('/chat/{conversation}', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/messages/{conversation}', [ChatController::class, 'fetchMessages'])->name('chat.fetch');
    Route::post('/messages/{conversation}', [ChatController::class, 'sendMessage'])->name('chat.store');
    Route::get('/users/{conversation}', [ChatController::class, 'getUsersInRoom'])->name('chat.users');
    
    Route::get('/notifications', [NotificationsController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/read/{id}', [NotificationsController::class, 'markAsRead'])->name('notifications.read');
});

require __DIR__.'/auth.php';
