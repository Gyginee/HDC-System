<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    
  public function render($request, Throwable $exception)
  {
    if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
      // It's an HTTP exception, so it has getStatusCode
      $statusCode = $exception->getStatusCode();

      switch ($statusCode) {
        case 401:
          return response()->view('errors.401', [], $statusCode);
        case 402:
          return response()->view('errors.402', [], $statusCode);
        case 403:
          return response()->view('errors.403', [], $statusCode);
        case 404:
          return response()->view('errors.404', [], $statusCode);
        case 405:
          return response()->view('errors.405', [], $statusCode);
        case 419:
          return response()->view('errors.419', [], $statusCode);
        case 429:
          return response()->view('errors.429', [], $statusCode);
        case 500:
          return response()->view('errors.500', [], $statusCode);
        case 503:
          return response()->view('errors.503', [], $statusCode);
      }
    }

    return parent::render($request, $exception);
  }


}
