<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    const STATUS_TODO = 'todo';
    const STATUS_IN_PROGRESS = 'in progress';
    const STATUS_DONE = 'done';

    const STATUSES = [
        Task::STATUS_TODO, Task::STATUS_IN_PROGRESS, Task::STATUS_DONE
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'status',
        'user_id',
        'parent_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subTasks()
    {
        return $this->hasMany(Task::class, 'parent_id', 'id');
    }

    public function subTasksRecursive()
    {
        return $this->subTasks()->with('subTasksRecursive');
    }

    public function parent()
    {
        return $this->hasOne(Task::class, 'id', 'parent_id');
    }
}
