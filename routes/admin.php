<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AssetStorageController;
use App\Http\Controllers\Editors\CampaignEditorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteConfigController;
use Inertia\Inertia;

// Route::get('/admin', function () {
//     return Inertia::render('Admin/Index');
// })->name('admin.index');

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');


Route::controller(AssetStorageController::class)->prefix("upload")->group(function () {
    // Route::post('/{id}', [AssetStorageController::class, ' "upload"'])->name('upload');
    Route::post('/', "upload")->name('upload');
});

Route::prefix('setting')->name('setting.')->controller(SiteConfigController::class)->group(function () {
    Route::get('/', 'index')->name('index');
});

// Route::prefix('editor')->name('editor.')->group(function () {
//     Route::prefix('campaign')->name('campaign.')->controller(CampaignEditorController::class)->group(function () {

//         Route::get('/', 'index')->name('index');
//         Route::get('/editor', 'edit')->name('edit');
//         Route::post('/save', 'store')->name('store');
//         Route::post('/duplicate/{id}', 'duplicate')->name('duplicate');
//         Route::patch('/update', 'store')->name('update');
//     });
// });


Route::prefix('campaign')->name('campaign.')->controller(CampaignEditorController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/editor', 'edit')->name('edit');
    Route::post('/save', 'store')->name('store');
    Route::post('/duplicate/{id}', 'duplicate')->name('duplicate');
    Route::patch('/update', 'store')->name('update');
});
