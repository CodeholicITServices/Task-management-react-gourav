<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function get_tasks(){
        $tasks = Tasks::get_all_tasks();
        return $tasks;
        return view('get_all_tasks')->with('tasks',$tasks);
    }

    

   





}
