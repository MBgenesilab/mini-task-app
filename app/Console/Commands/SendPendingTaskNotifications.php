<?php

namespace App\Console\Commands;

use App\Models\Task;
use App\Notifications\PendingTaskNotification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

class SendPendingTaskNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:in_progress-tasks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send notification for in progress tasks';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $pendingTasks = Task::with('user')
            ->where('status', Task::STATUS_IN_PROGRESS)
            ->get();

        foreach ($pendingTasks as $task) {
            $user = $task->user;
            if ($user) {
                Notification::send($user, new PendingTaskNotification($task));
            }
        }

        $this->info('Notifications for in progress tasks have been sent.');

        return 0;
    }
}
