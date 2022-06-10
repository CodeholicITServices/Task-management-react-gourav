<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\PermissionController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/get_all_tasks',[TaskController::class,'get_tasks'])->name('view_tasks');
Route::get('/view_task',[TaskController::class,'view_task'])->name('view_task');
Route::get('/task',[TaskController::class,'view'])->name('view');
Route::get('/create_task',[TaskController::class,'create_task'])->name('create_task');
Route::post('/create_task',[TaskController::class,'create_task'])->name('create_task');


 // Route::put('/permission/$user_permission', function($user_permission) {

 // })->middleware('permission:Auth::user()->permission');



