<?php

namespace App\Models;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'tag_name',
        'project_id',
        'tag_id',
        'task_id',
    ];
    /**
    * Handle an incoming request.
    *
    * @return \app\model\Tag
    */
    public function get_all_tags(){

       $tags = static::select('id','tag_name','project_id')->get();
        return $tags;
       }
       /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Tag
    */
     public function store_tag($req)
    {
        $data = [
            'tag_name' => $req->tag_name,
            'project_id' => $req->project_id,
        ];
         // return $data;
        $value = static::create($data);
        return $value;
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Tag
    */
    public function update_tag($request)
    {
         // return $data;
       $data = static::where('id','=',$request->id)->first();
       $data->tag_name  = $request->tag_name;
       $data->project_id  = $request->project_id;
       $data->update();
        return $data;
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Tag
    */
    public function delete_tag($request){
   
        $data = static::where('id','=',$request->id)->first()->delete();
    }

}
