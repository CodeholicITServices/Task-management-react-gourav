
@foreach($tasks as $task)

User Id: {{$task->user_id}}
Title: {{$task->task_title}}
Status Id: {{$task->status_id}}
Description: {{$task->task_description}}
Start Date: {{$task->start_date}}
End Date: {{$task->end_date}}<br>

@endforeach
