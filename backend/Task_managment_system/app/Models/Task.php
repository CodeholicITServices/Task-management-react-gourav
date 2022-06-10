<?php

namespace App\Models;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\Tag;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_title',
        'user_id',
        'status_id',
        'file_name',
        'task_description',
        'task_id',
        'start_date',
        'end_date',
        'task_id',
        'tag_id',
    ];
    /**
    * Handle an incoming request.
    *
    * @return \app\model\Task
    */
     public function get_all_tasks(){

       $tasks = static::select('id','user_id','task_title','status_id','task_description','task_id','start_date','end_date','file_name')->get();
        return $tasks;
       }

       /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $id
    * @return \app\model\Task
    */
      public function get_task($id)
      {
        $task = static::select('id','user_id','task_title','status_id','task_description','task_id','start_date','end_date')->where('id','=',$id)->first();
        return $task;
      }

      /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Task
    */
      public function store_task($request)
    {
        if($request->file_name){
            $data = [
                'task_title' => $request->task_title,
                // 'user_id' => Auth::user()->id,
                'tag_id' => $request->tag_id,
                'status_id' => $request->status_id,
                'file_name' => rand(111,999).time().'.'.$request->file_name->extension(),
                'task_description' => $request->task_description,
                'task_id' => time(),
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'close_date' => $request->close_date,
        ];
        }else{

             $data = [
                'task_title' => $request->task_title,
                // 'user_id' => Auth::user()->id,
                'tag_id' => $request->tag_id,
                'status_id' => $request->status_id,
                'task_description' => $request->task_description,
                'task_id' => time(),
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'close_date' => $request->close_date,
        ];
        }
        
         // return $data;
        $value = static::create($data);
        return $value;
    }
    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Task
    */
    public function update_task($request)
    {
        if($request->file_name){
        // return $data;
        $data = static::where('id','=',$request->id)->first();
        $data->task_title  = $request->task_title;
        $data->task_description  = $request->task_description;
        $data->file_name = rand(111,999).time().'.'.$request->file_name->extension();
        $data->start_date  = $request->start_date;
        $data->end_date  = $request->end_date;
        $data->update();
        return $data;
    }else{
        $data = static::where('id','=',$request->id)->first();
        $data->task_title  = $request->task_title;
        $data->task_description  = $request->task_description;
        $data->start_date  = $request->start_date;
        $data->end_date  = $request->end_date;
        $data->update();
        return $data;
    }
    }

    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Task
    */

    public function delete_task($request){
   
        $data = static::where('id','=',$request->id)->first();
        $data->is_deleted = 1;
        $data->update();
    }

    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Task
    */
    public function assign_task($request){

        $data = static::where('id','=',$request->id)->first();
        $data->user_id = $request->user_id;//Auth::user()->id;
        $data->update();
        return $data;
    }
    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Task
    */
    public function assign_tag($request){
        $data = static::where('id','=',$request->task_id)->first();
        // $tags = Tag::select('id','tag_name')->get();
        $tag = Tag::select('id')->where('id','=',$request->tag_id)->first();
         // return $tag;
        // $value = $tag->id;
        // return $value;
        $data->tag_id = $tag->id;
        $data->update();
        return $data;
    }
}
