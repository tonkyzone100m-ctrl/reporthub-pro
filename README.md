# ReportHub Pro

ReportHub is a civic infrastructure reporting portal. Citizens can submit issues,
receive a tracking reference, and follow progress. Administrators can use the
existing dashboard surfaces to review and manage reports.

## Stack

- React, TypeScript, Vite
- PHP 8.1+ REST endpoints with PDO
- MySQL 8+

## Local setup

1. Create the database and tables:

   ```bash
   mysql -u root -p < database/schema.sql
   ```

2. Configure the PHP API environment:

   ```text
   REPORT_HUB_DB_HOST=127.0.0.1
   REPORT_HUB_DB_PORT=3306
   REPORT_HUB_DB_NAME=reporthub
   REPORT_HUB_DB_USER=reporthub
   REPORT_HUB_DB_PASSWORD=your-password
   REPORT_HUB_CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
   ```

   For a default XAMPP installation, use `REPORT_HUB_DB_USER=root` and an
   empty password during local development. Use a dedicated database user in
   production.

After registering the first account, promote it to an administrator from MySQL:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

For the local XAMPP database currently used by this project, the development
account is `test@example.com` with password `password123`. Promote it with:

```sql
UPDATE reporthub.users SET role = 'admin' WHERE email = 'test@example.com';
```

Change or remove this development account before deploying.

Only accounts with `role = 'admin'` can enter the administration portal at
`/admin`. Citizen accounts can use the protected `/my-reports` and `/profile`
pages, while `/`, `/report`, `/track`, `/about`, and `/contact` remain public.

3. Start the API from the project root:

   ```bash
   npm run api:start
   ```

   On XAMPP Windows installations, this command uses
   `C:\xampp\php\php.exe` directly, so PHP does not need to be added to PATH.
   If XAMPP is installed elsewhere, run the executable directly:

   ```powershell
   & "C:\path\to\php.exe" -S localhost:8000 -t api
   ```

4. Copy `.env.example` to `.env` if the API runs at another URL, then start
   the frontend:

   ```bash
   npm install
   npm run dev
   ```

## API contract

- `GET http://localhost:8000/health.php` checks that the PHP API is the
  endpoint currently serving requests.
- `POST http://localhost:8000/reports.php` creates a report.
- `GET http://localhost:8000/reports.php?reference=RH-ABC123` returns one public report.
- `POST http://localhost:8000/auth.php?action=register` creates a citizen account.
- `POST http://localhost:8000/auth.php?action=login` authenticates a citizen.

The PHP API uses prepared statements, password hashing, strict JSON responses,
and an allow-listed CORS origin. Never commit production credentials; provide
them through environment variables.
