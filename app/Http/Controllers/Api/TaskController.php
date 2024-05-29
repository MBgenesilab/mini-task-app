<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;

class TaskController extends ApiController
{
    public function index()
    {
        $authUser = auth()->user();
        $parentTasks = Task::where('user_id', $authUser->id)->get();
        $tasks = Task::with('subTasksRecursive')
            ->where('user_id', $authUser->id)
            ->whereNull('parent_id')
            ->get();

        return $this->successResponse(
            [
                'tasks' => TaskResource::collection($tasks),
                'parentTasks' => TaskResource::collection($parentTasks)
            ]
        );
    }

    public function store(StoreTaskRequest $request)
    {
        $authUser = auth()->user();
        $taskDto = $request->all();
        $taskDto['user_id'] = $authUser->id;
        $task = Task::create($taskDto);
        return $this->successResponse(new TaskResource($task));
    }

    public function show($id)
    {
        return $this->successResponse(new TaskResource(Task::find($id)));
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        $task = Task::findOrFail($id);

        $task->update($request->all());

        return $this->successResponse(new TaskResource($task));
    }

    public function destroy($id)
    {
        // TODO: handle errors, try-catch
        $authUser = auth()->user();

        $task = Task::findOrFail($id);

        if ($task->user_id !== $authUser->id) {
            return $this->errorResponse('Not permited', 403);
        }

        Task::destroy($id);

        return  $this->successResponse([]);
    }
}
