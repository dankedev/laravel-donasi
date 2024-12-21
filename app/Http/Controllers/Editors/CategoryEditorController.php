<?php

namespace App\Http\Controllers\Editors;

use App\Http\Controllers\Controller;
use App\Models\Campaigns\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CategoryEditorController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function index(Category $category)
    {
        $categories = Category::all();
        return Inertia::render('campaign/category', [
            "data" => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'min:2', 'max:160'],
            'slug' => ['required', 'min:2', 'alpha_dash', 'max:160'],
        ]);
        $category = new Category();
        $category->name = Str::title($request->get('name'));
        $category->slug = Str::slug($request->get('slug'));
        $category->save();
        return Redirect::back();
    }
    public function update(Request $request)
    {
        dd($request->all());
    }
}
