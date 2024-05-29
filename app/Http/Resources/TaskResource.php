<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'parent_id' => $this->parent_id,
            'createdAt' => Carbon::parse($this->created_at)->format('Y-m-d: h:i:s'),
            'subTasks' => TaskResource::collection($this->whenLoaded('subTasksRecursive')),
            'status' => $this->status
        ];
    }
}
