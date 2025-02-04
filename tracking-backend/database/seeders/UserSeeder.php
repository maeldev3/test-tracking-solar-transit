<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Création d'un utilisateur admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
            'role' => 'admin', // Si un champ 'role' existe
            'remember_token' => Str::random(10),
        ]);

        // Création d'un utilisateur classique
        User::create([
            'name' => 'John Doe',
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
            'role' => 'user', // Si un champ 'role' existe
            'remember_token' => Str::random(10),
        ]);

        // Ajout de plusieurs utilisateurs manuels
        $users = [
            [
                'name' => 'Alice Smith',
                'email' => 'alice@example.com',
                'password' => Hash::make('password123'),
                'role' => 'user',
            ],
            [
                'name' => 'Bob Johnson',
                'email' => 'bob@example.com',
                'password' => Hash::make('password123'),
                'role' => 'user',
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
