<?php
return [
    'db' => [
        'host' => getenv('REPORT_HUB_DB_HOST') ?: 'sql307.infinityfree.com', // Replace with your InfinityFree MySQL Host
        'port' => getenv('REPORT_HUB_DB_PORT') ?: '3306',
        'name' => getenv('REPORT_HUB_DB_NAME') ?: 'if0_42988817_reporthub_db', // Replace with your InfinityFree DB Name
        'user' => getenv('REPORT_HUB_DB_USER') ?: 'if0_42988817', // Replace with your InfinityFree DB User
        'password' => getenv('REPORT_HUB_DB_PASSWORD') ?: 'Alain2051', // Your hosting/control panel password
    ],
    'cors_origins' => array_filter(array_map(
        'trim',
        explode(',', getenv('REPORT_HUB_CORS_ORIGINS') ?: 'http://localhost:5173,https://reporthub.ifree.page'),
    )),
];