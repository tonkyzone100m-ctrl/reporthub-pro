<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/db.php';

$payload = json_input();
require_fields($payload, ['email', 'password']);
$email = strtolower(trim((string) $payload['email']));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Please provide a valid email address.'], 422);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_GET['action'] ?? '') === 'register') {
    require_fields($payload, ['name']);
    if (strlen((string) $payload['password']) < 8) {
        json_response(['error' => 'Password must contain at least 8 characters.'], 422);
    }
    $statement = database()->prepare(
        'INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :password_hash)',
    );
    try {
        $statement->execute([
            'name' => trim((string) $payload['name']),
            'email' => $email,
            'password_hash' => password_hash((string) $payload['password'], PASSWORD_DEFAULT),
        ]);
    } catch (PDOException $error) {
        if ((int) $error->errorInfo[1] === 1062) {
            json_response(['error' => 'An account with this email already exists.'], 409);
        }
        throw $error;
    }
    json_response(['message' => 'Account created successfully.'], 201);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_GET['action'] ?? '') === 'login') {
    $statement = database()->prepare('SELECT id, name, email, role, password_hash FROM users WHERE email = :email LIMIT 1');
    $statement->execute(['email' => $email]);
    $user = $statement->fetch();
    if (!$user || !password_verify((string) $payload['password'], $user['password_hash'])) {
        json_response(['error' => 'Invalid email or password.'], 401);
    }
    unset($user['password_hash']);
    json_response(['data' => $user]);
}

json_response(['error' => 'Unsupported authentication action.'], 400);
