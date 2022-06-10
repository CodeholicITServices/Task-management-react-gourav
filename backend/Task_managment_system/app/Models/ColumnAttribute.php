<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColumnAttribute extends Model
{
    use HasFactory;
     protected $fillable = [
        'user_id',
        'attribute_name',
        'date',
        'unique_random_id',
        'is_deleted',
    ];
    /**
    * Handle an incoming request.
    * 
    * @return \app\model\ColumnAttribute
    */

    public function get_all_column_attributes(){

        $data = static::select('id','user_id','attribute_name','date','unique_random_id')->get();
        return $data;
    }
     /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\ColumnAttribute
    */

    public function store_column_attributes($request){

       $data = [
        'user_id'=> $request->user_id,
        'attribute_name'=> $request->attribute_name,
        'date'=> $request->date,
        'unique_random_id'=> time(),
        ];
         // return $data;
        $value = static::create($data);
        return $value;
    }
     /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\ColumnAttribute
    */

    public function update_column_attributes($request){

        $data = static::where('id','=',$request->id)->first();
        $data->attribute_name  = $request->attribute_name;
        $data->update();
        return $data;
    }
     /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\ColumnAttribute
    */

    public function delete_column_attributes($request){

        $data = static::where('id','=',$request->id)->first();
        $data->is_deleted = 1;
        $data->update();
    }
}
