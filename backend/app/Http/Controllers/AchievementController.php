<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AchievementController extends Controller
{
    public function myAchievements(Request $request)
    {
        $achievements = $request->user()->achievements()->get();
        return response()->json($achievements);
    }
}
