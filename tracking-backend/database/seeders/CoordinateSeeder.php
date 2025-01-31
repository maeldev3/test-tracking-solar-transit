<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Coordinate;

class CoordinateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          // Insérer des coordonnées fictives dans la base de données
        Coordinate::create([
            'name' => 'John Doe',
            'latitude' => 48.8566,  // Exemple de latitude (Paris)
            'longitude' => 2.3522,  // Exemple de longitude (Paris)
            'timestamp' => now(),  // Utilise l'heure actuelle
        ]);

        Coordinate::create([
            'name' => 'Jane Smith',
            'latitude' => 34.0522,  // Exemple de latitude (Los Angeles)
            'longitude' => -118.2437,  // Exemple de longitude (Los Angeles)
            'timestamp' => now(),
        ]);

        // Ajouter d'autres coordonnées si nécessaire
        Coordinate::create([
            'name' => 'Bob Johnson',
            'latitude' => 51.5074,  // Exemple de latitude (Londres)
            'longitude' => -0.1278,  // Exemple de longitude (Londres)
            'timestamp' => now(),
        ]);
    }
}
