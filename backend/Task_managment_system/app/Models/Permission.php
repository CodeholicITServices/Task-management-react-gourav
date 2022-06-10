<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
   use HasFactory;

   protected $fillable = [
      'user_id',
      'permissions',
   ];
   /**
    * Handle an incoming request.
    * 
    * @return \app\model\Permission
    */
   public function get_all_permissions(){

      $data = static::select('id','user_id','permissions')->get();
      return $data;
   }
   /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Permission
    */

    public function store_permission($request){

      $data = [
      'user_id'=> $request->user_id,
      'permissions' => $request->permissions,
       ];
       // return $data;
      $value = static::create($data);
      return $value;
    }
    /**
    * Handle an incoming request.
    * @param  \Illuminate\Http\Request  $request
    * @return \app\model\Permission
    */
    public function update_permission($request){

      $data = static::where('id','=',$request->id)->first();
      $data->permissions  = $request->permissions;
      $data->update();
      return $data;
    }

}
