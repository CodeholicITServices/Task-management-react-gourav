<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Tag;
use App\Models\TaskAttribute;
use App\Models\TaskTag;
use App\Models\Comment;
use App\Models\Project;
use App\Models\Permission;
use App\Models\CustomColumnValue;
use App\Models\ColumnAttribute;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;

class TaskApiController extends Controller
{
/**
    * Handle an incoming request.
    *
    * 
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */

    //Task related functions
    public function show_all_tasks()
    {
        $tasks = Task::get_all_tasks();
        return response()->json(['All Tasks fetched.',$tasks]);
    }

    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $id
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function show_task($id)
    {
        $task = Task::get_task($id);
        return response()->json(['Task fetched.',$task]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function create_task(Request $request)
    {
        $data = Task::store_task($request);
        return response()->json(['Task created successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function update_task(Request $request)
    {
        $data = Task::update_task($request);
        return response()->json(['Task update successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function destroy_task(Request $request)
    {
        $date = Task::delete_task($request);
        return response()->json(['Task delete successfully']);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request 
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
     public function assign_task(Request $request)
    {
        $data = Task::assign_task($request);
        return response()->json(['Task assign successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
     public function assign_tag(Request $request)
    {
        $data = Task::assign_tag($request);
        return response()->json(['Tag assign successfully.',$data]);
    }

    /**
    * Handle an incoming request.
    *
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    //Tag related functions
    public function show_all_tags()
    {
        $tags = Tag::get_all_tags();
        return response()->json(['All Tags fetched.',$tags]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function create_tag(Request $request)
    {
        $data = Tag::store_tag($request);
        return response()->json(['Tag created successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function update_tag(Request $request)
    {
        $data = Tag::update_tag($request);
        return response()->json(['Tag update successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function destroy_tag(Request $request)
    {
        $date = Tag::delete_tag($request);
        return response()->json(['Tag delete successfully']);
    }

    /**
    * Handle an incoming request.
    *
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    //Task tag  related functions
    public function show_all_tasks_tag()
    {
        $data = TaskTag::get_all_tasks_tag();
        return response()->json(['All Tasks tag fetched.',$data]);
    } 
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function create_task_tag(Request $request)
    {
        $data = TaskTag::store_task_tag($request);
        return response()->json(['Task tag store successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function update_task_tag(Request $request)
    {
        $data = TaskTag::update_task_tag($request);
        return response()->json(['Task tag update successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function delete_task_tag(Request $request)
    {
        $data = TaskTag::delete_task_tag($request);
        return response()->json(['Task tag delete successfully.']);
    }

    /**
    * Handle an incoming request.
    *
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    //Attributes related functions
    public function show_attributes()
    {
        $data = TaskAttribute::get_attributes();
        return response()->json(['All attributes fetched.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function create_attribute(Request $request)
    {
        $data = TaskAttribute::store_attribute($request);
        return response()->json(['Attribute created successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function update_attribute(Request $request)
    {
        $data = TaskAttribute::update_attribute($request);
        return response()->json(['Attribute update successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function delete_attribute(Request $request)
    {
        $data = TaskAttribute::delete_attribute($request);
        return response()->json(['Attribute delete successfully.']);
    }
    /**
    * Handle an incoming request.
    *
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    //comment related functions
    public function show_comments()
    {
        $data = Comment::get_comments();
        return response()->json(['All comments fetched.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function create_comment(Request $request)
    {
        $data = Comment::store_comment($request);
        return response()->json(['comment create successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function update_comment(Request $request)
    {
        $data = Comment::update_comment($request);
        return response()->json(['comment update successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function delete_comment(Request $request)
    {
        $data = Comment::delete_comment($request);
        return response()->json(['comment delete successfully.']);
    }

    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $id
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    //projects related functions 
    public function show_projects($id)
    {
        $data = Project::get_projects($id);
        return response()->json(['All Projects fetched.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function create_project(Request $request)
    {
        $data = Project::store_project($request);
        return response()->json(['project create successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function update_project(Request $request)
    {
        $data = Project::update_project($request);
        return response()->json(['project update successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function delete_project(Request $request)
    {
        $data = Project::delete_project($request);
        return response()->json(['project delete successfully.']);
    }

    /**
    * Handle an incoming request.
    *
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    //custom column related functions
    public function show_all_columns()
    {
        $data = CustomColumnValue::get_all_columns();
        return response()->json(['All columns fetched.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function create_column(Request $request)
    {
        $data = CustomColumnValue::store_column($request);
        return response()->json(['columns create successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function update_column(Request $request)
    {
        $data = CustomColumnValue::update_column($request);
        return response()->json(['columns update successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function delete_column(Request $request)
    {
        $data = CustomColumnValue::delete_column($request);
        return response()->json(['columns delete successfully.']);
    }

    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    //permission related functions
    public function show_all_permissions()
    {
        $data = Permission::get_all_permissions();
        return response()->json(['All permissions fetched.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function create_permission(Request $request)
    {
        $data = Permission::store_permission($request);
        return response()->json(['permission create successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function update_permission(Request $request)
    {
        $data = Permission::update_permission($request);
        return response()->json(['permission update successfully.',$data]);
    }

    /**
    * Handle an incoming request.
    *
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    //column_attributes related functions

    public function show_all_column_attributes()
    {
        $data = ColumnAttribute::get_all_column_attributes();
        return response()->json(['All column attributes fetched.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function create_column_attributes(Request $request)
    {
        $data = ColumnAttribute::store_column_attributes($request);
        return response()->json(['column attributes create successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */

    public function update_column_attributes(Request $request)
    {
        $data = ColumnAttribute::update_column_attributes($request);
        return response()->json(['column attributes update successfully.',$data]);
    }
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse json
    */
    public function delete_column_attributes(Request $request)
    {
        $data = ColumnAttribute::delete_column_attributes($request);
        return response()->json(['column attributes delete successfully.']);
    }
}
