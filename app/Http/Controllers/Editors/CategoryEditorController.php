<?php

namespace App\Http\Controllers\Editors;

use App\Http\Controllers\Controller;
use App\Models\Campaigns\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CategoryEditorController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function index(Category $category)
    {
        $categories = Category::with('featuredImage')->get();
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
    public function update(Category $category, Request $request)
    {
        $id = $id ?? $request->post('id');
        $category = Category::findOrFail($id);
        $request->validate([
            'name' => ['required', 'min:2', 'max:160'],
            'slug' => ['required', 'min:2', 'alpha_dash', 'max:160', Rule::unique('campaigns')->where(function ($query) use ($request) {
                return $query->where('slug', Str::slug($request->post('slug')));
            })->ignore($id, 'id')],
        ]);

        $category->name = Str::title($request->get('name'));
        $category->slug = Str::slug($request->get('slug'));
        $category->description = trim($request->get('description'));
        $category->url = trim($request->get('url'));
        $category->featured_id = (int)$request->get('featured_id');
        $category->save();
        return Redirect::back();
    }
}
