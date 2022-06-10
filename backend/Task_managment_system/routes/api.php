<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TaskApiController;
// use App\Http\Controllers\API\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [App\Http\Controllers\API\AuthController::class, 'login'])->name('login');

Route::post('/register', [App\Http\Controllers\API\AuthController::class, 'register'])->name('register');

Route::get('/user', [App\Http\Controllers\API\AuthController::class, 'user'])->name('user')->middleware('auth:sanctum');

Route::post('/logout', [App\Http\Controllers\API\AuthController::class, 'logout'])->name('logout')->middleware('auth:sanctum');

// Route::get('/home', [HomeController::class, 'index'])->name('home');


//Task related routes
Route::get('/show_all_tasks', [TaskApiController::class, 'show_all_tasks'])->name('show_all_tasks');
Route::get('/show_task/{id}', [TaskApiController::class, 'show_task'])->name('show_task');
Route::post('/create_task', [TaskApiController::class, 'create_task'])->name('create_task');
Route::post('/update_task', [TaskApiController::class, 'update_task'])->name('update_task');
Route::post('/delete_task', [TaskApiController::class, 'destroy_task'])->name('delete_task');
Route::post('/task_assign',[TaskApiController::class,'assign_task'])->name('task_assign');
Route::post('/tag_assign',[TaskApiController::class,'assign_tag'])->name('assign_tag');


//Tag related routes
Route::get('/show_all_tags', [TaskApiController::class, 'show_all_tags'])->name('show_all_tags');
Route::post('/create_tag', [TaskApiController::class, 'create_tag'])->name('store_tag');
Route::post('/update_tag', [TaskApiController::class, 'update_tag'])->name('update_tag');
Route::post('/delete_tag', [TaskApiController::class, 'destroy_tag'])->name('destroy_tag');


//Tag task related routes
Route::get('show_all_tasks_tag',[TaskApiController::class,'show_all_tasks_tag'])->name('show_all_tasks_tag');
Route::post('create_task_tag',[TaskApiController::class,'create_task_tag'])->name('create_task_tag');
Route::post('update_task_tag',[TaskApiController::class,'update_task_tag'])->name('update_task_tag');
Route::post('delete_task_tag',[TaskApiController::class,'delete_task_tag'])->name('delete_task_tag');


//Task Attribute related routes
Route::get('/show_attributes',[TaskApiController::class,'show_attributes'])->name('show_attributes');
Route::post('/create_attribute',[TaskApiController::class,'create_attribute'])->name('create_attribute');
Route::post('/update_attribute',[TaskApiController::class,'update_attribute'])->name('update_attribute');
Route::post('/delete_attribute',[TaskApiController::class,'delete_attribute'])->name('delete_attribute');


//comment related routes
Route::get('show_comments',[TaskApiController::class,'show_comments'])->name('get_comments');
Route::get('show_single_comment',[TaskApiController::class,'show_comment'])->name('show_comment');
Route::post('create_comment',[TaskApiController::class,'create_comment'])->name('create_comment');
Route::post('update_comment',[TaskApiController::class,'update_comment'])->name('update_comment');
Route::post('delete_comment',[TaskApiController::class,'delete_comment'])->name('delete_comment');


//project related routes
Route::get('/show_projects/{id}',[TaskApiController::class,'show_projects'])->name('show_projects');
Route::post('create_project',[TaskApiController::class,'create_project'])->name('create_project');
Route::post('update_project',[TaskApiController::class,'update_project'])->name('update_project');
Route::post('delete_project',[TaskApiController::class,'delete_project'])->name('delete_project');


//custom column related routes
Route::get('show_all_columns',[TaskApiController::class,'show_all_columns'])->name('show_all_columns');
Route::post('create_column',[TaskApiController::class,'create_column'])->name('create_column');
Route::post('update_column',[TaskApiController::class,'update_column'])->name('update_column');
Route::post('delete_column',[TaskApiController::class,'delete_column'])->name('delete_column');


//permission related routes
Route::get('show_all_permissions',[TaskApiController::class,'show_all_permissions'])->name('show_all_permissions');
Route::post('create_permission',[TaskApiController::class,'create_permission'])->name('create_permission');
Route::post('update_permission',[TaskApiController::class,'update_permission'])->name('update_permission');


//column_attributes related routes
Route::get('show_all_column_attributes',[TaskApiController::class,'show_all_column_attributes'])->name('show_all_column_attributes');
Route::post('create_column_attributes',[TaskApiController::class,'create_column_attributes'])->name('create_column_attributes');
Route::post('update_column_attributes',[TaskApiController::class,'update_column_attributes'])->name('update_column_attributes');
Route::post('delete_column_attributes',[TaskApiController::class,'delete_column_attributes'])->name('delete_column_attributes');