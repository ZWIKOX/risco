<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;

class PropertyController extends Controller 

{
    /**
     * Display a listing of properties.
     */
    public function index(): \Inertia\Response
{
        $properties = Property::with('images')->latest()->get();
        return Inertia::render('properties/index', [
            'properties' => $properties
    ]);
} 

    /**
     * Show the form for creating a new property.
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('properties/create');
    }

    /**
     * Store a newly created property.
     */
    public function store(PropertyRequest $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();

        $property = Property::create($validated);

        if ($request->hasFile('images')) {
            $images = $request->file('images');
            foreach ($images as $image) {
                $path = $image->store('property-images', 'public');
                $property->images()->create(['image_url' => $path]);
            }
        }
        

        return redirect()->route('properties.index');
    }

    /**
     * Display the specified property.
     */
    public function show(string $id): \Inertia\Response
    {
        return Inertia::render('properties/show', [
            'property' => Property::with('images')->findOrFail($id)
        ]);
    }

    /**
     * Show the form for editing the specified property.
     */
    public function edit(string $id): \Inertia\Response
    {
        return Inertia::render('properties/edit', [
            'property' => Property::with('images')->findOrFail($id)
        ]);
    }

    /**
     * Update the specified property.
     */
    public function update(UpdatePropertyRequest $request, string $id): \Illuminate\Http\RedirectResponse
    {

        $validated = $request->validated();
        $property = Property::findOrFail($id);
        $property->update($validated);

        // Delete images if requested
        if ($request->has('delete_images')) {
            $property->images()->whereIn('id', $request->delete_images)->delete();
        }

        // Add new images if provided
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            if (is_array($images) || $images instanceof Traversable) {
                foreach ($images as $image) {
                    $path = $image->store('property-images', 'public');
                    $property->images()->create([
                        'image_url' => $path
                    ]);
                }
            }
        }
        

        return redirect()->route('properties.show', $id);
    }

    /**
     * Remove the specified property.
     */
    public function destroy(string $id): \Illuminate\Http\RedirectResponse
    {
        $property = Property::findOrFail($id);
        // Images will be automatically deleted due to cascade delete in migration
        $property->delete();

        return redirect()->route('properties.index');
    }

}