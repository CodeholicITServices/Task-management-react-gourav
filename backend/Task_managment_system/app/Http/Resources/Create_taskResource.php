<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Create_taskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [

            'id' => $this->id,
            'task_title' => $this->task_title,
            'user_id' => $this->user_id,
            'tag_id' => $this->tag_id,
            'status_id' => $this->status_id,
            'file_name' => $this->file_name,
            'task_description' => $this->task_description,
            'task_id' => $this->task_id,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'close_date' => $this->close_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}
