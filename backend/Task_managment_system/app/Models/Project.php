<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'project_name',
        'project_id',
        'user_id',
        'project_description',
    ];
    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $id
    * @return \app\model\Project
    */

    public function get_projects($id){
        $data = static::select('id','project_name','project_description','project_id','user_id')->where('id','=',$id)->first();
        return $data;
    }
    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\project
    */
    public function store_project($request){

       $data = [
        'project_name'=> $request->project_name,
        'project_description' => $request->project_description,
        'project_id'=> time(),
        'user_id' => $request->user_id,
        
        ];
         // return $data;
        $value = static::create($data);
        return $value;
    }
    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\project
    */
    public function update_project($request){

        $data = static::where('id','=',$request->id)->first();
        $data->project_name  = $request->project_name;
        $data->project_description  = $request->project_description;
        $data->update();
        return $data;
    }
    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\project
    */
    public function delete_project($request){

        $data = static::where('id','=',$request->id)->first();
        $data->is_deleted = 1;
        $data->update();
    }

}

