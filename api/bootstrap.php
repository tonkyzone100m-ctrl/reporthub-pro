<?php
declare(strict_types=1);

$config = require __DIR__ . '/config.php';
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '' && in_array($origin, $config['cors_origins'], true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');

set_exception_handler(static function (Throwable $error): never {
    error_log((string) $error);
    json_response(['error' => 'The API could not complete the request. Check the PHP and MySQL services.'], 500);
});

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function json_input(): array
{
    $payload = json_decode(file_get_contents('php://input'), true);
    return is_array($payload) ? $payload : [];
}

function json_response(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function require_fields(array $payload, array $fields): void
{
    foreach ($fields as $field) {
        if (!isset($payload[$field]) || trim((string) $payload[$field]) === '') {
            json_response(['error' => "The {$field} field is required."], 422);
        }
    }
}

function authenticated_user(bool $adminOnly = false): array
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/^Bearer reporthub-(\d+)-/i', $header, $matches)) {
        json_response(['error' => 'Authentication is required.'], 401);
    }

    require_once __DIR__ . '/db.php';
    $statement = database()->prepare('SELECT id, name, email, role FROM users WHERE id = :id LIMIT 1');
    $statement->execute(['id' => (int) $matches[1]]);
    $user = $statement->fetch();
    if (!$user || ($adminOnly && $user['role'] !== 'admin')) {
        json_response(['error' => 'You are not authorized to perform this action.'], 403);
    }

    return $user;
}
