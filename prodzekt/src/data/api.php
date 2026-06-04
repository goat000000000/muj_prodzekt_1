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

$action = $_GET['action'] ?? 'lista';

// tutaj tez pobiera liste
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'lista') {
    $stmt = $pdo->query("SELECT id, nazwa, zaznaczone FROM checklista");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

// a tuj logi
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'logi') {
    $stmt = $pdo->query("SELECT nazwa, data_czas FROM logi ORDER BY data_czas DESC LIMIT 50");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

// wykres
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'wykres') {
    $stmt = $pdo->query("
        SELECT DATE(data_czas) as dzien, COUNT(*) as ile
        FROM logi
        WHERE data_czas >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        GROUP BY DATE(data_czas)
        ORDER BY dzien ASC
    ");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

// checkbox
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data       = json_decode(file_get_contents('php://input'), true);
    $id         = (int)$data['id'];
    $zaznaczone = (int)$data['zaznaczone'];
    $nazwa      = $data['nazwa'];

    $stmt = $pdo->prepare("
        INSERT INTO checklista (id, nazwa, zaznaczone)
        VALUES (:id, :nazwa, :zaznaczone)
        ON DUPLICATE KEY UPDATE zaznaczone = :zaznaczone
    ");
    $stmt->execute([':id' => $id, ':nazwa' => $nazwa, ':zaznaczone' => $zaznaczone]);

    // zapisz logsony czy cos
    if ($zaznaczone === 1) {
        $log = $pdo->prepare("INSERT INTO logi (nazwa) VALUES (:nazwa)");
        $log->execute([':nazwa' => $nazwa]);
    }

    echo json_encode(['ok' => true]);
    exit;
}