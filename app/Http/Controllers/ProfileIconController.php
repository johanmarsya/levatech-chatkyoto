<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileIconRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Cloudinary;

class ProfileIconController extends Controller
{
    
    public function insert(ProfileIconRequest $request)
    {
        
        
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        if ($file) {
            $image_url = Cloudinary::upload($file->getRealPath())->getSecurePath();
            $request->user()->icon_path = $image_url;
            $request->user()->save();
        } else {
            \Log::error('ファイルが見つかりません');
        }
    } else {
        \Log::error('リクエストにファイルが含まれていません');
    }

    
    }
}
