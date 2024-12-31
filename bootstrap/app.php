<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


return Application::configure(basePath: dirname(__DIR__))
    // ->withRouting(
    //     web: __DIR__.'/../routes/web.php',
    //     commands: __DIR__.'/../routes/console.php',
    //     health: '/up',
    // )
    ->withRouting(
    // web: __DIR__ . '/../routes/web.php',
        // commands: __DIR__ . '/../routes/console.php',
        // api: __DIR__ . '/../routes/api.php',
        health: '/up',
    using: function () {
        Route::middleware('api')->name("api.")
        ->prefix('api')
        ->group(base_path('routes/api.php'));

        Route::middleware("web")
            ->group(base_path("routes/auth.php"));

        Route::middleware(['web', 'auth', 'verified'])->name("admin.")->prefix("admin")
            ->group(base_path("routes/admin.php"));
        Route::middleware("web")
        ->group(base_path("routes/web.php"));
    }
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,

        ]);
    $middleware->trustProxies(
        headers: Request::HEADER_X_FORWARDED_FOR |
            Request::HEADER_X_FORWARDED_HOST |
            Request::HEADER_X_FORWARDED_PORT |
            Request::HEADER_X_FORWARDED_PROTO |
            Request::HEADER_X_FORWARDED_AWS_ELB
    );
    $middleware->trustProxies(at: '*');
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
    $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
        if (! app()->environment(['local', 'testing']) && in_array($response->getStatusCode(), [500, 503, 404, 403])) {
            return Inertia::render('Error', ['status' => $response->getStatusCode()])
                ->toResponse($request)
                ->setStatusCode($response->getStatusCode());
        } elseif ($response->getStatusCode() === 419) {
            return back()->with([
                'message' => 'The page expired, please try again.',
            ]);
        }

        return $response;
    });
    })->create();
