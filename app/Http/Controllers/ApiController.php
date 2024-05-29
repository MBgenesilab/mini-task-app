<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\ApiResponseTrait;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;

class ApiController extends Controller
{
    use AuthorizesRequests, ValidatesRequests, ApiResponseTrait;
}
