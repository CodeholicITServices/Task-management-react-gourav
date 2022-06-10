@extends('layouts.app')

@section('content')
@php 

@endphp
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Task') }}</div>
                <div class="card-body">
                    <form method="POST" action="" class="form-control">
                    	@csrf
                    	Task Title: <input type="text" name="task_title" class="form-control mb-2">
		                Status: <select name="status_id" class="form-control mb-2">
		                    		<option value="1">{{'Urgent'}}</option>
		                    		<option value="2">{{'High'}}</option>
		                    		<option value="3">{{'Medium'}}</option>
		                    		<option value="4">{{'Low'}}</option>
		                    	</select>
                        File: <input type="file" name="file_name" class="form-control mb-2">
                    	Task Description: <input type="text" name="task_description" class="form-control mb-2">
                    	Start Date: <input type="date" name="start_date" class="form-control mb-2">
                    	End Date: <input type="date" name="end_date" class="form-control mb-2">
                    	<input type="submit" name="submit" class="btn btn-success">
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
