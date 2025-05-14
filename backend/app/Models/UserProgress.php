<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProgress extends Model
{
    use HasFactory;

    protected $table = 'user_progress';

    protected $fillable = [
        'user_id',
        'game_id',
        'highest_level',
        'total_score',
        'average_accuracy',
        'total_time_spent',
        'games_played',
        'achievements',
    ];

    protected $casts = [
        'highest_level' => 'integer',
        'total_score' => 'integer',
        'average_accuracy' => 'float',
        'total_time_spent' => 'integer',
        'games_played' => 'integer',
        'achievements' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
}
