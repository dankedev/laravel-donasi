<?php

namespace App\Http\Controllers\Editors;

use App\Http\Controllers\Controller;
use App\Models\Campaigns\Campaign;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignEditorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Campaign $campaign)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Campaign $campaign, Request $request)
    {
        $id = $request->has('id') ? (int)$request->get('id') : null;

        if ($id) {
            $campaign = Campaign::find($id);
        }

        return Inertia::render('campaign/editor', [
            "data" => $campaign
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Campaign $campaign)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campaign $campaign)
    {
        //
    }
}
