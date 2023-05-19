<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\User;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        // Create and associate products for each user
        $users->each(function ($user) {
            Product::factory()->count(5)->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
