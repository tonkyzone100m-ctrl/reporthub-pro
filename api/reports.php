<?php
declare(strict_types=1);

// --- CORS HEADERS (Required for Vercel -> AeonFree communication) ---
header("Access-Control-Allow-Origin: *"); // Or replace '*' with your exact Vercel frontend URL for better security
header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle browser preflight OPTIONS requests immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// -------------------------------------------------------------------

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$reference = isset($_GET['reference']) ? strtoupper(trim((string) $_GET['reference'])) : '';

if ($method === 'GET') {
    $mine = isset($_GET['mine']) && $_GET['mine'] === '1';
    $user = $mine ? authenticated_user() : null;
    $query = $reference
        ? 'SELECT r.*, u.name AS reporter_name, u.email AS reporter_email
           FROM reports r LEFT JOIN users u ON u.id = r.user_id
           WHERE r.reference = :reference LIMIT 1'
        : 'SELECT r.*, u.name AS reporter_name, u.email AS reporter_email
           FROM reports r LEFT JOIN users u ON u.id = r.user_id
           ' . ($mine ? 'WHERE r.user_id = :user_id' : 'WHERE 1=1') . '
           ORDER BY r.created_at DESC';
    $statement = database()->prepare($query);
    if ($reference) {
        $statement->execute(['reference' => $reference]);
        $report = $statement->fetch();
        if (!$report) {
            json_response(['error' => 'Report not found.'], 404);
        }
        json_response(['data' => format_report($report)]);
    }
    $statement->execute($mine ? ['user_id' => $user['id']] : []);
    json_response(['data' => array_map('format_report', $statement->fetchAll())]);
}

if ($method === 'POST') {
    $user = authenticated_user();
    $payload = json_input();
    require_fields($payload, ['category', 'description', 'location']);

    $reference = 'RH-' . strtoupper(bin2hex(random_bytes(3)));
    $statement = database()->prepare(
        'INSERT INTO reports
        (reference, user_id, category, description, location, latitude, longitude, status, priority, evidence_name)
        VALUES (:reference, :user_id, :category, :description, :location, :latitude, :longitude, "Under Review", "Medium", :evidence_name)',
    );
    $statement->execute([
        'reference' => $reference,
        'user_id' => $user['id'],
        'category' => trim((string) $payload['category']),
        'description' => trim((string) $payload['description']),
        'location' => trim((string) $payload['location']),
        'latitude' => $payload['latitude'] ?? null,
        'longitude' => $payload['longitude'] ?? null,
        'evidence_name' => $payload['evidenceName'] ?? null,
    ]);

    json_response(['data' => ['reference' => $reference]], 201);
}

if ($method === 'PATCH') {
    authenticated_user(true);
    if (!$reference) {
        json_response(['error' => 'A report reference is required.'], 422);
    }

    $payload = json_input();
    $allowed = [
        'status' => ['Under Review', 'In Progress', 'Resolved'],
        'priority' => ['Critical', 'High', 'Medium', 'Low'],
    ];
    $updates = [];
    $parameters = ['reference' => $reference];

    foreach ($allowed as $field => $values) {
        if (array_key_exists($field, $payload)) {
            $value = trim((string) $payload[$field]);
            if (!in_array($value, $values, true)) {
                json_response(['error' => "Invalid {$field} value."], 422);
            }
            $updates[] = "{$field} = :{$field}";
            $parameters[$field] = $value;
        }
    }

    if (!$updates) {
        json_response(['error' => 'Provide a status or priority change.'], 422);
    }

    $statement = database()->prepare(
        'UPDATE reports SET ' . implode(', ', $updates) . ' WHERE reference = :reference',
    );
    $statement->execute($parameters);
    if ($statement->rowCount() === 0) {
        $exists = database()->prepare('SELECT id FROM reports WHERE reference = :reference LIMIT 1');
        $exists->execute(['reference' => $reference]);
        if (!$exists->fetch()) {
            json_response(['error' => 'Report not found.'], 404);
        }
    }

    $updated = database()->prepare(
        'SELECT r.*, u.name AS reporter_name, u.email AS reporter_email
         FROM reports r LEFT JOIN users u ON u.id = r.user_id
         WHERE r.reference = :reference LIMIT 1',
    );
    $updated->execute(['reference' => $reference]);
    json_response(['data' => format_report($updated->fetch())]);
}

json_response(['error' => 'Method not allowed.'], 405);

function format_report(array $report): array
{
    return [
        'reference' => $report['reference'],
        'category' => $report['category'],
        'description' => $report['description'],
        'location' => $report['location'],
        'latitude' => $report['latitude'] !== null ? (float) $report['latitude'] : null,
        'longitude' => $report['longitude'] !== null ? (float) $report['longitude'] : null,
        'status' => $report['status'],
        'priority' => $report['priority'],
        'createdAt' => $report['created_at'],
        'reporter' => [
            'name' => $report['reporter_name'] ?? 'Anonymous Reporter',
            'email' => $report['reporter_email'] ?? '',
        ],
        'department' => $report['department'] ?? null,
        'assignedTo' => $report['assigned_to'] ?? null,
        'evidence' => $report['evidence_name'] ? [$report['evidence_name']] : [],
        'evidenceName' => $report['evidence_name'],
        'administrativeNote' => $report['administrative_note'] ?? '',
    ];
}