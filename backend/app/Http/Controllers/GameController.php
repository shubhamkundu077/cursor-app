<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index()
    {
        $games = Game::with('questions')->get();
        return response()->json($games);
    }

    public function show(Game $game)
    {
        $game->load('questions');
        return response()->json($game);
    }
} 