<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomColumnValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'custom_col_id',
    ];
    /**
    * Handle an incoming request.
    * 
    * @return \app\model\CustomColumnValue
    */
    public function get_all_columns(){

        $data = static::select('id','value','custom_col_id')->get();
        return $data;
    }
    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\CustomColumnValue
    */
    public function store_column($request){

       $data = [
        'value'=> $request->value,
        'custom_col_id' => time(),
        ];
         // return $data;
        $value = static::create($data);
        return $value;
    }
    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\CustomColumnValue
    */
    public function update_column($request){

        $data = static::where('id','=',$request->id)->first();
        $data->value  = $request->value;
        $data->update();
        return $data;
    }
    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\CustomColumnValue
    */
    public function delete_column($request){

        $data = static::where('id','=',$request->id)->first();
        $data->is_deleted = 1;
        $data->update();
    }

}
