<?php

namespace App\Http\Controllers;

use App\Models\Campaigns\Campaign;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebDonasiController extends Controller
{
    public function index()
    {
        return Inertia::render('home');
    }

    public function show($slug)
    {
        $campaign = Campaign::where('slug', $slug)->firstOrFail();
        return Inertia::render('front/campaign', [
            'campaign' => $campaign
        ]);
    }
}
