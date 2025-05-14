<?php

namespace App\Http\Controllers;

use App\Models\UserProgress;
use Illuminate\Http\Request;

class UserProgressController extends Controller
{
    public function index(Request $request)
    {
        $progress = UserProgress::where('user_id', $request->user()->id)->with('game')->get();
        return response()->json($progress);
    }

    public function store(Request $request)
    {
        $request->validate([
            'game_id' => 'required|exists:games,id',
            'highest_level' => 'required|integer',
            'total_score' => 'required|integer',
            'average_accuracy' => 'required|numeric',
            'total_time_spent' => 'required|integer',
            'games_played' => 'required|integer',
            'achievements' => 'nullable|array',
        ]);

        $progress = UserProgress::updateOrCreate(
            ['user_id' => $request->user()->id, 'game_id' => $request->game_id],
            $request->except('user_id')
        );

        return response()->json($progress, 201);
    }
} 