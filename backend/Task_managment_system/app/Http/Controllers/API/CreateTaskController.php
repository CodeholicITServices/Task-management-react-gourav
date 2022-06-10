<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\Create_task;
use App\Http\Resources\Create_taskResource;
use Illuminate\Support\Facades\Auth;

class CreateTaskController extends Controller
{
    public function index()
    {

        $data  = Create_task::latest()->get();
        return response()->json([Create_taskResource::collection($data),'Create_task fetched.']);

    }

    public function store(Request $req)
    {
        $validator = Validator::make($req->all(),[
            'task_title' => 'required|string|max:255',
            'task_description' => 'required',
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $Create_task = Create_task::create([
            'task_title' => $req->task_title,
            // 'user_id' => Auth::user()->id,
            'status_id' => $req->status_id,
            'file_name' => rand(1,1000).time(),
            'task_description' => $req->task_description,
            'task_id' => time(),
            'start_date' => $req->start_date,
            'end_date' => $req->end_date,
        ]);

        return response()->json(['Task created successfully.',new Create_taskResource($Create_task)]);
    }

    public function show($id)
    {
        $create_task = Create_task::find($id);
        if(is_null($create_task)){

            return response()->json('Data not found',404); 
        }
        return response()->json([new Create_taskResource($create_task)]);
    }

    public function update(Request $request,Create_task $create_task)
    {
         $validator = Validator::make($request->all(),[
            'task_title' => 'required|string|max:255',
            'task_description' => 'required',
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

         if($validator->fails()){
            return response()->json($validator->errors());
         }

         $create_task->task_title = $request->task_title;
         $create_task->task_description = $request->task_description;
         $create_task->start_date = $request->start_date;
         $create_task->end_date = $request->end_date;
         $create_task->save();

         return response()->json(['Task update successfully.', new Create_taskResource( $create_task)]);
    }


    public function destroy(Create_task $create_task)
    {
        $create_task->delete();
        return response()->json('Task delete successfully');
    }

}
