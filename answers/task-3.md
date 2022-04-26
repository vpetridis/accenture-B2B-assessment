# Frontend part:

## Tools, frameworks, npm libraries you plan to use and why

For a simple two-page app that will be extended in the future, I would recommend using ReactJS
initialized with `npx create-react-app my-app --template redux` thus located on a `client` folder.
This way the backend can live on a separate folder called `service` but with the benefits of a
monorepo. For ReactJs we should use the latest version (18) which has a stable version of `Suspense`
with lazy loading. For package management we will use npm or yarn with a node version higher than
`16.14.0`.

## Libraries, tools, frameworks

- Routing: we can use [React Router](https://reactrouter.com/) which is the industry standard for
  routing in SPAs. We will use it in order to load only the components that we want to re-render.
  For instance, Navbars, links, footers, etc can be loaded only on the initial render.
- State management: as you can see in the init command we used
  [Redux toolkit](https://redux.js.org/introduction/getting-started). This will allow us to create a
  global state that can scale nicely. More importantly, with the built in `createAsyncThunk`
  function from redux toolkit, we can make ajax calls (with `fetch API`) per feature and not per
  component. This way we separate the logic from many components and actually turning them into
  simple containers.
- Design system: depending on the requirements/time the choices vary a lot. For simplicity but not
  uniqueness we can use Bootstrap 5 with some custom classes to customize the components or if time
  and budget allow we might even create custom components with specialized tools like
  [Styled-Components](https://styled-components.com/) that can be used across many different
  applications and thus achieve a universal design very easily for the company. In the structure
  below I assume Bootstrap with extra `*.sass` files per component.
- Testing: for E2E or Integration testing we will use [Cypress](https://www.cypress.io/) which loads the tests on a
  real browser. This will also help a lot if we decide to develop with TDD.
- Versioning: Git with a cloud provider.
- Code formatting: Prettier with a single `.prettierrc` file for seamless development across team
  members.

### Structure

The structure of the basic app as it was given can look like this:

```
.
└── src/
    ├── assets/
    │   └── img
    ├── components/
    │   ├── List
    │   ├── ListItem
    │   ├── Spinner
    │   └── Avatar
    ├── pages/
    │   ├── ProfileListPage.jsx
    │   └── SingleProfilePage.jsx
    ├── routes/
    │   ├── RenderRoutes.js
    │   └── routes.js
    ├── redux/
    │   ├── store.js
    │   └── ProfileSlice.js
    ├── hooks/
    │   └── useFilters.js
    ├── helpers/
    │   └── orderList.js
    ├── config.js
    ├── App/
    │   ├── index.jsx
    │   ├── app.spec.js
    │   └── _app.sass
    ├── index.jsx
    └── _index.sass
```

Every folder inside the `components` folder will contain at a minimum an `index.jsx` file where the
rendering of the component is done, a `*.sass` file for styling and a `*.spec.js` file for testing
purposes. The `pages` folder contains the various pages. Currently there are two pages available.
The `routes` folder includes the routing logic of the application. The `routes.js` file has an array
with lazy loaded components and the `RenderRoutes.js` file returns the `Switches` for the pages to
be uses by the React Router. The `redux` folder contains the state in the `store.js` file while the
`ProfileSlice.js` has a redux toolkit slicer in order for the ListItem and the List components to
dispatch actions and fetch data. The `hooks` and the `helpers` folders contain reusable state and
logic respectively. There is also a `layouts` folder with the appropriate Navbar and footer which I
have omitted for simplicity. The `config.js` file includes all the configuration needed for the app
to run, such as the `BASE URL`, some non-private keys or enums that might be used from `redux`. The
`.\App` and `index.jsx` handle the full mounting as the CRA suggests.

### Components

The components are totally reusable and can be used everywhere in the app. For instance, in order to
create the `ProfilingListPage.jsx` we must utilize the `List` component which is rendering an array
of `ListItem` components. In order to lazy load the List we need to use a `Spinner` with a
`useSelector` to get the state of the application (`loading`, `success`, `error`). Every `ListItem`
has an `Avatar` which is fully responsive and so it can also be used in the `SingleProfilePage.js`
later on.

For a two page application

- Directory structure for source code folder
- List of components which you’ll implement (with short description)
- For one of the components also provide in which directory/-ies component’s file/-es will be
  located
- Benefits/drawbacks comparing with traditional (not-SPA) app approach
- Any other comments and suggestions

# Backend part:

## Short description of API – URI, format, why needed

- Framework
- Any other comments and suggestions
