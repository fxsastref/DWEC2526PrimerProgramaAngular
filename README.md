# DWEC2526PrimerProgramaAngular

Exemple de primer codi fet amb Angular que mostra "Hola Món".

## Descripció del Projecte

Aquest és un projecte d'exemple que demostra com crear una aplicació Angular bàsica que mostra el missatge "Hola Món" a la pantalla. És ideal per a principiants que volen aprendre els fonaments d'Angular.

## Què és Angular?

Angular és un framework de desenvolupament web creat i mantingut per Google. Permet crear aplicacions web dinàmiques i modernes utilitzant TypeScript. Angular proporciona:

- **Components**: Blocs de construcció reutilitzables per a la interfície d'usuari
- **Data Binding**: Sincronització automàtica entre el model de dades i la vista
- **Dependency Injection**: Sistema per gestionar dependències de forma eficient
- **Routing**: Navegació entre diferents vistes de l'aplicació

## Estructura del Projecte

```
DWEC2526PrimerProgramaAngular/
├── src/
│   ├── app/
│   │   ├── app.ts          # Component principal de l'aplicació
│   │   ├── app.html        # Template HTML del component
│   │   ├── app.css         # Estils del component
│   │   ├── app.config.ts   # Configuració de l'aplicació
│   │   └── app.spec.ts     # Tests del component
│   ├── index.html          # Pàgina HTML principal
│   ├── main.ts             # Punt d'entrada de l'aplicació
│   └── styles.css          # Estils globals
├── public/                 # Recursos estàtics (favicon, etc.)
├── angular.json            # Configuració d'Angular
├── package.json            # Dependències del projecte
└── tsconfig.json           # Configuració de TypeScript
```

## Components Principals

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

Després d'entendre aquest exemple bàsic, pots explorar:

1. **Afegir més components**: Crear components reutilitzables
2. **Routing**: Implementar navegació entre pàgines
3. **Services**: Compartir dades i lògica entre components
4. **HTTP Client**: Fer peticions a APIs externes
5. **Forms**: Crear formularis interactius
6. **Directives**: Crear comportaments personalitzats

## Recursos Addicionals

- [Documentació oficial d'Angular](https://angular.dev/)
- [Tutorial d'Angular](https://angular.dev/tutorials)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Guia d'estil d'Angular](https://angular.dev/style-guide)

## Tecnologies Utilitzades

- **Angular 20.3**: Framework principal
- **TypeScript**: Llenguatge de programació
- **Node.js**: Entorn d'execució
- **npm**: Gestor de paquets

## Autor

Aquest projecte és un exemple educatiu per aprendre Angular.

## Llicència

Aquest projecte és de lliure ús per a fins educatius.
