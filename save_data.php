<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dataDir = __DIR__ . '/data';
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0777, true);
}

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch($action) {
    case 'save_projects':
        $projects = $_POST['projects'];
        file_put_contents($dataDir . '/projects.json', $projects);
        echo json_encode(['success' => true]);
        break;
        
    case 'load_projects':
        if (file_exists($dataDir . '/projects.json')) {
            echo file_get_contents($dataDir . '/projects.json');
        } else {
            echo json_encode([]);
        }
        break;
        
    case 'save_content':
        $content = $_POST['content'];
        file_put_contents($dataDir . '/content.json', $content);
        echo json_encode(['success' => true]);
        break;
        
    case 'load_content':
        if (file_exists($dataDir . '/content.json')) {
            echo file_get_contents($dataDir . '/content.json');
        } else {
            echo json_encode([]);
        }
        break;
        
    case 'save_cv':
        $cvData = $_POST['cvData'];
        file_put_contents($dataDir . '/cv.txt', $cvData);
        echo json_encode(['success' => true]);
        break;
        
    case 'load_cv':
        if (file_exists($dataDir . '/cv.txt')) {
            echo json_encode(['cv' => file_get_contents($dataDir . '/cv.txt')]);
        } else {
            echo json_encode(['cv' => null]);
        }
        break;
}
?>