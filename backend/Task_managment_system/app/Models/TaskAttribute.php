<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//TaskAtribute
class TaskAttribute extends Model
{
    use HasFactory;
    protected $fillable = [
        
        'task_id',
        'key',
        'value',
    ];

    /**
    * Handle an incoming request.
    * 
    * @return \app\model\TaskAttribute
    */
    public function get_attributes(){

        $data = static::select('id','task_id','key','value')->get();
        return $data;
    }

    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\TaskAttribute
    */
    public function store_attribute($request){

        $data = [
        'task_id' => $request->task_id,
        'key' => $request->key,
        'value' => $request->value,
        ];
         // return $data;
        $value = static::create($data);
        return $value;
    }

    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\TaskAttribute
    */
    public function update_attribute($request){

        $data = static::where('id','=',$request->id)->first();
        $data->task_id  = $request->task_id;
        $data->key  = $request->key;
        $data->value  = $request->value;
        $data->update();
        return $data;
    }

    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\TaskAttribute
    */
    public function delete_attribute($request){
   
        $data = static::where('id','=',$request->id)->first();
        $data->is_deleted = 1;
        $data->update();
    }

}