<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('home', function () {
        return Inertia::render('home');
    })->name('home');

     Route::get('properties', function () {
         return Inertia::render('properties');
     })->name('properties');
   
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/property.php';