<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['error' => 'Method not allowed.'], 405);
}

authenticated_user(true);
$statement = database()->query(
    'SELECT u.id, u.name, u.email, u.role, u.created_at, COUNT(r.id) AS report_count
     FROM users u LEFT JOIN reports r ON r.user_id = u.id
     GROUP BY u.id ORDER BY u.created_at DESC',
);

json_response(['data' => array_map(static function (array $user): array {
    return [
        'id' => (int) $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $user['role'],
        'createdAt' => $user['created_at'],
        'reportCount' => (int) $user['report_count'],
    ];
}, $statement->fetchAll())]);
