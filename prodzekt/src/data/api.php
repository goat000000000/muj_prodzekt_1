<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

$host = 'localhost';
$db   = 'Projekt_kk';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT id, nazwa, zaznaczone FROM checklista");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id          = (int)$data['id'];
    $zaznaczone  = (int)$data['zaznaczone'];

    $stmt = $pdo->prepare("
        INSERT INTO checklista (id, nazwa, zaznaczone)
        VALUES (:id, :nazwa, :zaznaczone)
        ON DUPLICATE KEY UPDATE zaznaczone = :zaznaczone
    ");
    $stmt->execute([
        ':id'         => $id,
        ':nazwa'      => $data['nazwa'],
        ':zaznaczone' => $zaznaczone,
    ]);

    echo json_encode(['ok' => true]);
    exit;
}