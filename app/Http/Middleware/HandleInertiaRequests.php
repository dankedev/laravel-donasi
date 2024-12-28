<?php

namespace App\Http\Middleware;

use App\Models\Campaigns\Campaign;
use App\Models\Campaigns\Category;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $campaigns = Campaign::select('id', 'title', 'slug', 'featured_id')->with('featuredImage')->get();
        $categories = Category::with('featuredImage')->select('id', 'featured_id', 'name', 'slug')->get();
        // $campaigns = $campaigns->toArray();

        // dd($campaigns);
        // dd($campaigns->toArray());
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'campaigns' => $campaigns,
            'categories' => $categories,
        ];
    }
}
