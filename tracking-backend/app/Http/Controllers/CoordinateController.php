<?php

namespace App\Http\Controllers;

use App\Models\{Coordinate,User};
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
            'user_id'   => 'nullable|exists:users,id', // Vérifie si l'utilisateur existe
            'name'      => 'required|string',
            'role'      => 'nullable', // Vérifie que le rôle est valide
            'latitude'  => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

         // Vérifier si un user_id est fourni et récupérer son rôle depuis la base
        if (!empty($data['user_id'])) {
            $user = User::find($data['user_id']);
            if (!$user) {
                return response()->json(['error' => 'Utilisateur non trouvé'], 404);
            }
            $data['role'] = $user->role; // Associer automatiquement le rôle
        }


    
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

}
