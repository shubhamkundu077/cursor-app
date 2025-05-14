<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserProgressController;
use App\Http\Controllers\GameSessionController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\AchievementController;
use Illuminate\Support\Facades\Route;

// Authentication routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Game routes
Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{game}', [GameController::class, 'show']);

// User progress routes
Route::get('/user/progress', [UserProgressController::class, 'index'])->middleware('auth:sanctum');
Route::post('/user/progress', [UserProgressController::class, 'store'])->middleware('auth:sanctum');

// Game session routes
Route::post('/games/{game}/start', [GameSessionController::class, 'start'])->middleware('auth:sanctum');
Route::post('/game-sessions/{session}/submit', [GameSessionController::class, 'submitAnswer'])->middleware('auth:sanctum');
Route::post('/game-sessions/{session}/end', [GameSessionController::class, 'end'])->middleware('auth:sanctum');

// Leaderboard route
Route::get('/leaderboard/{game}', [LeaderboardController::class, 'show']);

// Achievements route
Route::get('/achievements/my', [AchievementController::class, 'myAchievements'])->middleware('auth:sanctum'); 