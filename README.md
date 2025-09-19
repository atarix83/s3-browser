# S3Browser

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Deploy su GitHub Pages

1. Modifica il file `src/index.html` e imposta il base href su `/S3-browser/` (già fatto).
2. Esegui la build per GitHub Pages:
   ```bash
   npm run build:ghpages
   ```
3. Esegui il deploy:
   ```bash
   npm run deploy
   ```

L'applicazione sarà pubblicata su:
`https://<tuo-username>.github.io/S3-browser/`

Assicurati che il nome della repository su GitHub sia `S3-browser`

## Configurazione credenziali S3 tramite GitHub Actions

1. Vai su Settings > Secrets and variables > Actions nella tua repository GitHub.
2. Aggiungi questi secrets:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_REGION
   - S3_BUCKET_NAME

3. Usa questo esempio di workflow `.github/workflows/deploy.yml`:

```yaml
name: Deploy Angular app to GitHub Pages
on:
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Set S3 credentials in environment.prod.ts
        run: |
          echo "export const environment = {" > src/environments/environment.prod.ts
          echo "  production: true," >> src/environments/environment.prod.ts
          echo "  s3: {" >> src/environments/environment.prod.ts
          echo "    accessKeyId: '${{ secrets.AWS_ACCESS_KEY_ID }}'," >> src/environments/environment.prod.ts
          echo "    secretAccessKey: '${{ secrets.AWS_SECRET_ACCESS_KEY }}'," >> src/environments/environment.prod.ts
          echo "    region: '${{ secrets.AWS_REGION }}'," >> src/environments/environment.prod.ts
          echo "    bucketName: '${{ secrets.S3_BUCKET_NAME }}'" >> src/environments/environment.prod.ts
          echo "  }" >> src/environments/environment.prod.ts
          echo "};" >> src/environments/environment.prod.ts
      - name: Build Angular app
        run: npm run build:ghpages
      - name: Deploy to GitHub Pages
        run: npm run deploy
```

Questo workflow sovrascrive il file `environment.prod.ts` con le variabili d’ambiente provenienti dai secrets di GitHub, poi esegue la build e il deploy.
