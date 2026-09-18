<?php
return [
    'db' => [
        'host' => getenv('REPORT_HUB_DB_HOST') ?: 'sql205.iceiy.com',
        'port' => getenv('REPORT_HUB_DB_PORT') ?: '3306',
        'name' => getenv('REPORT_HUB_DB_NAME') ?: 'icei_42940208_reporthub',
        'user' => getenv('REPORT_HUB_DB_USER') ?: 'icei_42940208',
        'password' => getenv('REPORT_HUB_DB_PASSWORD') ?: 'Alain2051',
    ],
    'cors_origins' => array_filter(array_map(
        'trim',
        explode(',', getenv('REPORT_HUB_CORS_ORIGINS') ?: 'http://localhost:5173,https://reporthub.iceiy.com,https://your-frontend-app.vercel.app'),
    )),
];