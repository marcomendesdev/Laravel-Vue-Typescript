<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'image_path' => ['string'],
        ]);

        $product = Product::create($validatedData);

        return response(['message' => 'Product created', 'product' => $product], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // show product that belongs to user
        return Product::where('user_id', $id)->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'image' => ['string'],
        ]);

        $user = Auth::user();

        $product = Product::where('id', $id)->first();

        if (!$product) {
            return response(['message' => 'Product not found'], 404);
        }

        $product->update($validatedData);

        return response(['message' => 'Product updated', 'product' => $product], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // delete product that belongs to user
        $product = Product::where('id', $id)->delete();

        return response(['message' => 'Product deleted', 'product' => $product], 201);
    }
}
