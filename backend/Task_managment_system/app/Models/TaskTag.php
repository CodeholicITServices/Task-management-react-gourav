<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskTag extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'tag_id',
    ];

    /**
    * Handle an incoming request.
    * 
    * @return \app\model\TaskTag
    */
    public  function get_all_tasks_tag(){

        $data = static::select('id','task_id','tag_id')->get();
        return $data;
    }

    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\TaskTag
    */
    public function store_task_tag($request){

        $data = [
            'task_id' => $request->task_id,
            'tag_id' => $request->tag_id,
        ];
        $value = static::create($data);
        return $value;
    }

    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\TaskTag
    */
    public function update_task_tag($request){

        $data = static::where('id','=',$request->id)->first();
        $data->task_id  = $request->task_id;
        $data->tag_id  = $request->tag_id;
        $data->update();
        return $data;
    }

    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\TaskTag
    */
    public function delete_task_tag($request){

        $data = static::where('id','=',$request->id)->first();
        $data->is_deleted = 1;
        $data->update();
    }

}
