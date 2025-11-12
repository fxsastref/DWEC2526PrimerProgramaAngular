# DWEC2526PrimerProgramaAngular

Exemple d'aplicació Angular amb sistema complet d'autenticació i autorització utilitzant JWT.

## Descripció del Projecte

Aquest projecte és una aplicació Angular que implementa un sistema d'autenticació i autorització basat en JWT (JSON Web Tokens). Inclou funcionalitats de login, dashboard, gestió d'usuaris i control d'accés basat en rols.

## Funcionalitats Principals

### 🔐 Autenticació JWT
- Sistema de login amb usuari i contrasenya
- Tokens JWT per a l'autenticació
- Emmagatzematge segur de tokens
- Expiració automàtica de sessions

### 👥 Gestió d'Usuaris
- Llistat d'usuaris
- Crear nous usuaris
- Editar usuaris existents
- Eliminar usuaris
- Accés restringit per rols (Admin i Manager)

### 🛡️ Autorització per Rols
- **Admin**: Accés complet al sistema
- **Manager**: Accés a la gestió d'usuaris
- **User**: Accés bàsic al dashboard

### 🎨 Interfície Moderna
- Disseny responsiu
- Gradients moderns
- Formularis intuïtius
- Feedback visual

## Comptes de Prova

| Usuari   | Contrasenya | Rol     | Nivell d'Accés              |
|----------|-------------|---------|------------------------------|
| admin    | admin123    | admin   | Accés complet                |
| manager  | manager123  | manager | Gestió d'usuaris             |
| user     | user123     | user    | Accés bàsic                  |

## Captures de Pantalla

### Pàgina de Login
![Login Page](https://github.com/user-attachments/assets/3b40ba8a-47e2-4518-bea9-7a72dcc2ba0c)

### Dashboard - Administrador
![Dashboard Admin](https://github.com/user-attachments/assets/0103debd-9159-43d9-9cc7-fc61fe380a9d)

### Dashboard - Usuari Regular
![Dashboard User](https://github.com/user-attachments/assets/541efc6c-3a82-45cf-a5fe-72dbef5eb50e)

### Gestió d'Usuaris
![User Management](https://github.com/user-attachments/assets/462ef3a1-d6cd-4e12-ad28-93f062c8ffbc)

## Descripció del Projecte Original

Aquest projecte va començar com un exemple bàsic d'Angular que mostra "Hola Món" i s'ha ampliat per incloure funcionalitats avançades d'autenticació i autorització.

## Què és Angular?

Angular és un framework de desenvolupament web creat i mantingut per Google. Permet crear aplicacions web dinàmiques i modernes utilitzant TypeScript. Angular proporciona:

- **Components**: Blocs de construcció reutilitzables per a la interfície d'usuari
- **Data Binding**: Sincronització automàtica entre el model de dades i la vista
- **Dependency Injection**: Sistema per gestionar dependències de forma eficient
- **Routing**: Navegació entre diferents vistes de l'aplicació


## Arquitectura del Projecte

### Estructura de Directoris

```
DWEC2526PrimerProgramaAngular/
├── src/
│   ├── app/
│   │   ├── components/              # Components de la UI
│   │   │   ├── login/               # Component de login
│   │   │   ├── dashboard/           # Dashboard principal
│   │   │   └── user-management/     # Gestió d'usuaris
│   │   ├── services/                # Serveis d'aplicació
│   │   │   ├── auth.service.ts      # Servei d'autenticació
│   │   │   ├── user.service.ts      # Servei de gestió d'usuaris
│   │   │   └── mock-backend.service.ts # API simulada
│   │   ├── guards/                  # Guards de rutes
│   │   │   └── auth.guard.ts        # Guards d'autenticació i rols
│   │   ├── interceptors/            # HTTP Interceptors
│   │   │   └── jwt.interceptor.ts   # Interceptor JWT
│   │   ├── models/                  # Models de dades
│   │   │   └── user.model.ts        # Model d'usuari
│   │   ├── app.routes.ts            # Configuració de rutes
│   │   ├── app.config.ts            # Configuració de l'aplicació
│   │   ├── app.ts                   # Component principal
│   │   ├── app.html                 # Template principal
│   │   └── app.spec.ts              # Tests
│   ├── index.html                   # Pàgina HTML principal
│   ├── main.ts                      # Punt d'entrada
│   └── styles.css                   # Estils globals
├── AUTHENTICATION.md                # Documentació d'autenticació
├── angular.json                     # Configuració d'Angular
├── package.json                     # Dependències del projecte
└── tsconfig.json                    # Configuració de TypeScript
```

### Components Principals

#### LoginComponent
Component per a l'autenticació d'usuaris amb formulari de login.

#### DashboardComponent
Dashboard principal amb informació específica segons el rol de l'usuari.

#### UserManagementComponent
Gestió completa d'usuaris amb operacions CRUD (només Admin i Manager).

### Serveis

#### AuthService
- Gestió de l'autenticació
- Emmagatzematge i validació de tokens JWT
- Verificació de rols i permisos

#### UserService
- Operacions CRUD sobre usuaris
- Integració amb el backend

#### MockBackendService
- Simula una API REST
- Genera tokens JWT
- Gestiona dades d'usuaris en memòria

### Guards

#### authGuard
Protegeix rutes que requereixen autenticació.

#### roleGuard
Protegeix rutes que requereixen rols específics.

### Interceptors

#### jwtInterceptor
Afegeix automàticament el token JWT a les peticions HTTP.


## Com Utilitzar l'Aplicació

### 1. Accedir al Login
Obre l'aplicació al navegador. Seràs redirigit automàticament a la pàgina de login.

### 2. Iniciar Sessió
Utilitza un dels comptes de prova:
- **Admin**: `admin` / `admin123`
- **Manager**: `manager` / `manager123`
- **User**: `user` / `user123`

### 3. Navegar pel Dashboard
Després del login, accediràs al dashboard on podràs:
- Veure la teva informació de perfil
- Accedir a la gestió d'usuaris (si ets Admin o Manager)
- Veure les funcionalitats disponibles segons el teu rol

### 4. Gestió d'Usuaris (Admin/Manager)
- Clic a "Go to Users" per accedir a la gestió
- Crear nous usuaris amb el botó "+ Add New User"
- Editar usuaris existents amb el botó "Edit"
- Eliminar usuaris amb el botó "Delete"

### 5. Tancar Sessió
Utilitza el botó "Logout" a la capçalera per tancar la sessió.

## Conceptes Clau Implementats

### 1. Autenticació JWT
- Els tokens JWT s'emmagatzemen a `localStorage`
- Els tokens expiren després d'1 hora
- La validació es fa automàticament en cada petició

### 2. Guards de Rutes
- `authGuard`: Verifica que l'usuari està autenticat
- `roleGuard`: Verifica que l'usuari té el rol necessari

### 3. Interceptors HTTP
- `jwtInterceptor`: Afegeix el token JWT a totes les peticions HTTP

### 4. Control d'Accés Basat en Rols
- Diferents nivells d'accés segons el rol de l'usuari
- Menús i funcionalitats condicionals

## Components Principals (Codi Original)

### app.ts

Aquest és el component principal de l'aplicació. Defineix:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Hola Món';
}
```

- **@Component**: Decorador que marca la classe com un component Angular
- **selector**: Nom del selector HTML per utilitzar aquest component
- **templateUrl**: Ruta al fitxer HTML del template
- **styleUrl**: Ruta al fitxer CSS d'estils
- **title**: Propietat que conté el text a mostrar

### app.html

El template HTML del component utilitza interpolació per mostrar el valor de `title`:

```html
<div class="container">
  <h1>{{ title }}</h1>
</div>
```

- **{{ title }}**: Interpolació d'Angular que mostra el valor de la propietat `title`

### app.css

Els estils CSS per centrar i donar format al text:

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 3rem;
  color: #dd0031;
  text-align: center;
}
```

## Prerequisits

Abans de començar, necessites tenir instal·lat:

- **Node.js** (versió 18 o superior): [Descarrega Node.js](https://nodejs.org/)
- **npm** (inclòs amb Node.js): Gestor de paquets de JavaScript

Per comprovar si tens Node.js i npm instal·lats:

```bash
node --version
npm --version
```

## Instal·lació

1. **Clona el repositori**:

```bash
git clone https://github.com/fxsastref/DWEC2526PrimerProgramaAngular.git
cd DWEC2526PrimerProgramaAngular
```

2. **Instal·la les dependències**:

```bash
npm install
```

Aquest comandament instal·la totes les dependències necessàries definides a `package.json`, incloent Angular i les seves eines.

## Executar l'Aplicació

### Mode de Desenvolupament

Per executar l'aplicació en mode de desenvolupament amb recàrrega automàtica:

```bash
npm start
```

O utilitzant Angular CLI directament:

```bash
ng serve
```

L'aplicació s'obrirà automàticament al navegador a l'adreça `http://localhost:4200/`. Cada vegada que modifiquis un fitxer, l'aplicació es recarregarà automàticament.

### Compilar per a Producció

Per crear una versió optimitzada de l'aplicació per a producció:

```bash
npm run build
```

Els fitxers compilats es guardaran al directori `dist/`. Aquests fitxers estan optimitzats i minimitzats per a un millor rendiment.

## Executar Tests

### Tests Unitaris

Per executar els tests unitaris:

```bash
npm test
```

Aquest comandament executa els tests utilitzant [Karma](https://karma-runner.github.io/).

## Conceptes Clau d'Angular

### 1. Components

Els components són la base de les aplicacions Angular. Cada component consta de:

- Una classe TypeScript amb la lògica
- Un template HTML amb la vista
- Estils CSS opcionals

### 2. Interpolació

La interpolació `{{ }}` permet mostrar valors de propietats del component al template:

```html
<h1>{{ title }}</h1>
```

### 3. Data Binding

Angular ofereix diferents tipus de data binding:

- **Interpolació**: `{{ valor }}`
- **Property binding**: `[property]="valor"`
- **Event binding**: `(event)="handler()"`
- **Two-way binding**: `[(ngModel)]="valor"`

### 4. Decoradors

Els decoradors com `@Component` afegeixen metadades a les classes per configurar-les:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
```


## Següents Passos

Després d'entendre aquest projecte, pots explorar:

1. **Integració amb Backend Real**: Substituir MockBackendService per peticions HTTP reals
2. **Refresh Tokens**: Implementar mecanisme de renovació de tokens
3. **Restabliment de Contrasenya**: Afegir funcionalitat de "forgot password"
4. **Autenticació de Dos Factors**: Implementar 2FA per a major seguretat
5. **Perfils d'Usuari**: Permetre als usuaris editar el seu perfil
6. **Auditoria**: Registrar accions dels usuaris
7. **Notificacions**: Sistema de notificacions en temps real
8. **Internacionalització**: Suport per a múltiples idiomes

## Documentació Addicional

Per a més informació sobre el sistema d'autenticació i autorització, consulta:
- [AUTHENTICATION.md](./AUTHENTICATION.md) - Documentació detallada del sistema d'autenticació

## Recursos Addicionals

- [Documentació oficial d'Angular](https://angular.dev/)
- [Tutorial d'Angular](https://angular.dev/tutorials)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Guia d'estil d'Angular](https://angular.dev/style-guide)


## Tecnologies Utilitzades

- **Angular 20.3**: Framework principal
- **TypeScript**: Llenguatge de programació
- **RxJS**: Programació reactiva
- **@auth0/angular-jwt**: Gestió de tokens JWT
- **Node.js**: Entorn d'execució
- **npm**: Gestor de paquets

## Seguretat

### Bones Pràctiques Implementades
- Tokens JWT amb expiració
- Emmagatzematge segur de tokens
- Validació de tokens en cada petició
- Guards per protegir rutes
- Control d'accés basat en rols

### Recomanacions per a Producció
- Utilitzar HTTPS obligatòriament
- Implementar refresh tokens
- Afegir CSRF protection
- Configurar Content Security Policy
- Implementar rate limiting
- Utilitzar secrets forts per signar tokens
- Monitoritzar intents de login fallits
- Auditories de seguretat regulars

## Autor

Aquest projecte és un exemple educatiu per aprendre Angular.

## Llicència

Aquest projecte és de lliure ús per a fins educatius.
