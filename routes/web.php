<?php

use App\Http\Controllers\Editors\CampaignEditorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteConfigController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::prefix('setting')->name('setting.')->controller(SiteConfigController::class)->group(function () {
        Route::get('/', 'index')->name('index');
    });

    Route::prefix('editor')->name('editor.')->group(function () {
        Route::prefix('campaign')->name('campaign.')->controller(CampaignEditorController::class)->group(function () {

            Route::get('/', 'index')->name('index');
            Route::get('/editor', 'edit')->name('editor');
            Route::post('/save', 'store')->name('store');
            Route::patch('/update', 'update')->name('update');
        });
    });
});

require __DIR__.'/auth.php';
