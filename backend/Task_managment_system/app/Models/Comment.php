<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'comment',
        'parent_id',
        'file_name',
        'task_id',
        'user_id',
    ];
    /**
    * Handle an incoming request.
    * 
    * @return \app\model\Comment
    */

    public function get_comments(){

        $data = static::select('id','task_id','user_id','comment','file_name')->get();
        return $data;
    }
     /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Comment
    */
    public function store_comment($request){
        if($request->comment_id && $request->file_name){
            $data = [
                'task_id'=> $request->task_id,
                'user_id'=> $request->user_id,
                'comment' => $request->comment,
                'file_name' => rand(111,999).time().'.'.$request->file_name->extension(),
                'parent_id' => $request->comment_id,//comment_id
            ];
        }elseif($request->comment_id){
            $data = [
                'task_id'=> $request->task_id,
                'user_id'=> $request->user_id,
                'comment' => $request->comment,
                'parent_id' => $request->comment_id,//comment_id
            ];
         // return $data;
        }elseif($request->file_name){
            $data = [
                'task_id'=> $request->task_id,
                'user_id'=> $request->user_id,
                'comment' => $request->comment,
                'file_name' => rand(111,999).time().'.'.$request->file_name->extension(),
            ];
        }else{
            $data = [
                'task_id'=> $request->task_id,
                'user_id'=> $request->user_id,
                'comment' => $request->comment,
            ];
        }
        $value = static::create($data);
        return $value;
    }
     /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Comment
    */
    public function update_comment($request){
        if($request->file_name){
        $data = static::where('id','=',$request->id)->first();
        $data->comment  = $request->comment;
        $data->file_name = rand(111,999).time().'.'.$request->file_name->extension();
        $data->update();
        return $data;
    }else{
        $data = static::where('id','=',$request->id)->first();
        $data->comment  = $request->comment;
        $data->update();
        return $data;
    }
    }
     /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Comment
    */
    public function delete_comment($request){

        $data = static::where('id','=',$request->id)->first();
        $data->is_deleted = 1;
        $data->update();
    }

}
