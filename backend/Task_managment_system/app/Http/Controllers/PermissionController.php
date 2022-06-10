<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Permission;
use App\Models\PermissionCheck;

class PermissionController extends Controller
{
    public function index(){

        return view('permission');
    }

}



       