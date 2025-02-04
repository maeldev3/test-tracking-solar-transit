<?php

namespace App\Http\Controllers;

use App\Models\Coordinate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * @group Gestion des Coordonnées GPS
 *
 * API pour gérer l'enregistrement et la récupération des coordonnées GPS.
 */
class CoordinateController extends Controller
{
    /**
     * Enregistre une nouvelle coordonnée GPS.
     *
     * @param Request $request Les données de la requête contenant les coordonnées GPS.
     *
     * @bodyParam name string required Le nom de la personne associée aux coordonnées. Exemple: "John Doe"
     * @bodyParam latitude numeric required La latitude de la position. Exemple: -20.12345
     * @bodyParam longitude numeric required La longitude de la position. Exemple: 57.65432
     * @bodyParam timestamp date required L'horodatage de la position. Exemple: "2024-08-06T14:30:00Z"
     *
     * @response 201 {
     *   "message": "Coordonnée enregistrée"
     * }
     *
     * @response 422 {
     *   "message": "Les données fournies ne sont pas valides."
     * }
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
   {
    try {
        $data = $request->validate([
            'name' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'role' => 'nullable',
           
        ]);

        // $data = $request->validate([
        //     'user_id'   => 'required|exists:users,id', // Vérifie si l'utilisateur existe
        //     'name'      => 'required|string',
        //     'role'      => 'required|string|in:admin,user', // Vérifie que le rôle est valide
        //     'latitude'  => 'required|numeric',
        //     'longitude' => 'required|numeric',
        // ]);

    
            $data['timestamp'] = now(); 
      

        Coordinate::create($data);
        return response()->json(['message' => 'Coordonnée enregistrée'], 201);
    } catch (\Exception $e) {
        Log::error("Erreur d'enregistrement de la coordonnée : " . $e->getMessage());
        return response()->json(['message' => 'Erreur serveur'], 500);
    }
      }

    /**
     * Récupère la liste des coordonnées GPS enregistrées.
     *
     * @response 200 [
     *   {
     *     "id": 1,
     *     "name": "John Doe",
     *     "latitude": -20.12345,
     *     "longitude": 57.65432,
     *     "timestamp": "2024-08-06T14:30:00Z",
     *     "created_at": "2024-08-06T14:30:00Z",
     *     "updated_at": "2024-08-06T14:30:00Z"
     *   }
     * ]
     *
     * @return \Illuminate\Http\JsonResponse
     */
     public function index()
     {
         return response()->json(Coordinate::latest()->get());
     }

     /*
     public function index()
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            // L'administrateur voit les mouvements de toutes les personnes
            $coordinates = Coordinate::latest()->get();
        } else {
            // L'utilisateur standard voit uniquement ses propres mouvements
            $coordinates = Coordinate::where('name', $user->name)->latest()->get();
        }

        return response()->json($coordinates);
    } */

}
