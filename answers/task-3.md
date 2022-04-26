# Frontend part:

## Tools, frameworks, npm libraries you plan to use and why

For a simple two-page app that will be extended in the future, I would recommend using ReactJS, if
SEO is not a big concern or NextJS if there must be some server-side rendering in order to appear
higher is the search results. Just for simplicity, we will initialize the app with
`npx create-react-app my-app --template redux` (ReactJS) and thus located on a `client` folder. This
way the backend can live on a separate folder called `service` but with the benefits of a monorepo.
For ReactJS we should use the latest version (18) which has a stable version of `Suspense` with lazy
loading. For package management we will use npm with a node version higher than `16.14.0`.

## Libraries/modules in the app.

- Routing: we can use [React Router](https://reactrouter.com/) which is the industry standard for
  routing in SPAs. We will use it in order to load only the components that we want to re-render.
  For instance, Navbars, links, footers, etc can be loaded only on the initial render, then
  everything else only on request.
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
- Testing: for E2E or Integration testing we will use [Cypress](https://www.cypress.io/) which loads
  the tests on a real browser. This will also help a lot if we decide to develop with TDD.
- Versioning: Git with a cloud provider.
- Code formatting: We shall use Prettier with a single `.prettierrc` file for seamless development
  across team members.

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

## Short explanation of the structure

Every folder inside the `components` folder will contain at a minimum an `index.jsx` file where the
rendering of the component is done, a `*.sass` file for styling and a `*.spec.js` file for testing
purposes. The `pages` folder contains the various pages. Currently there are two pages available.
The `routes` folder includes the routing logic of the application. The `routes.js` file has an array
with lazy loaded components and the `RenderRoutes.js` file returns the `Switches` for the pages to
be used by the React Router. The `redux` folder contains the state in the `store.js` file while the
`ProfileSlice.js` has a redux toolkit slicer in order for the two pages to dispatch actions and
fetch data. The `hooks` and the `helpers` folders contain reusable React state and logic,
respectively. The `config.js` file includes all the configuration needed for the app to run, such as
the `BASE URL` to the API, some non-private keys for the AWS and constants that will be used from
`redux`. The `.\App` and `index.jsx` handle the full mounting as the CRA suggests.

Note: There should also be a `layouts` folder with the appropriate Navbar and Footer and an `auth`
folder which will handle authentication later on. Both folders have been omitted for simplicity.

### Components

The components are totally reusable and can be used everywhere in the app. For instance, in order to
create the `ProfileListPage.jsx` we must utilize the `List` component which is rendering an array of
`ListItem` components. In order to lazy load the List we need to use a `Spinner` with a
`useSelector` to get the state of the fetch request from redux (`loading`, `success`, `error`).
Every `ListItem` has an `Avatar` which is fully responsive and so it can also be used in the
`SingleProfilePage.js` which is the second page, alongside several other html elements. For example,
a simple component will have these files:

```
.
└── components/
    └── ListItem/
        ├── index.jsx
        ├── ListItem.spec.js
        └── _listItem.sass
```

### Short description of Components

- `List`: it renders an array Profile items (ListItem). Every item is a react-router link to the
  `SingleProfilePage` with the `userId` as a prop, for instance: `/profile/{userId}`
- `ListItem`: it returns a single Profile with an avatar. It receives the `userId` from and then
  dispatches an async action to redux to receive all of the Single Profile data from the API.
- `Spinner`: It's a simple loading spinner to show while the components are waiting for the API
  responses. It has a simple state with `useLoading` hook.
- `Avatar`: The avatar to show for the profile items. This can be used in both pages if we pass the
  appropriate props. For example, maybe we want to have a border around the avatar when on
  `SingleProfilePage`, or load a dummy avatar while the high resolution image is loading.
- `ProfileListPage`: It fetches the list of profiles and populates the `List` component.
- `SingleProfilePage`: It receives the `userId` from the `ListItem` that was clicked and returns a
  single Profile with an avatar and all of the details needed. **Note: if we want to use the Single
  Profile on other pages as a child component we will definitely refactor it and create a separate
  component called `SingleProfile` inside the `components` folder**.

For a two page application

- Directory structure for source code folder
- List of components which you’ll implement (with short description)
- For one of the components also provide in which directory/-ies component’s file/-es will be
  located
- Benefits/drawbacks comparing with traditional (not-SPA) app approach
- Any other comments and suggestions

### Benefits/drawbacks comparing with traditional (not-SPA) app approach

This application can scale nicely with more functionality. It can load very fast on each API request
because most of the JS/CSS is loaded on the initial loading. This is good and bad at the same time
because even though it will feel like a native app the initial waiting may be a drawback for users
with slow internet speeds. Also, the fact that this is a SPA means that the client will do the heavy
lifting and users with old devices may find it sluggish (optimization must be implemented with
caution here). Lastly, the search engine crawlers may not give it a high SEO rate and make it
invisible on the first search results. There are also some issues regarding security, because the
client has a lot of information stored in the browser, but this app is trivial and security will be
handled accordingly later on.

Even though these drawbacks are serious, they can be solved with the correct techniques. Finally,
this SPA has the potential to become as big as we want it and this is a great benefit.

# Backend part:

## Short description of API – URI, format, why needed

As far as the backend is concerned, I would implement a serverless design with a provider like
Google Firebase or AWS. The logic is the same. There is a noSQL database with collections and
documents. For instance, there is a collection `users` with the docs been each separate user with a
schema like
`{id: 1, name: 'John', surname:'Doe', email: 'john.doe@accentured.com', ...many more details}`. The
endpoints of the API correspond to each user with this format: `\users\{userId}`. This is the
endpoint for the `SingleProfilePage`. Now in order to get all the users for the `ProfileListPage`
but not all of their docs with the full data (we want to save bandwidth here and maybe restrict
users from getting unauthorized profile data) we have 2 options:

1. We can create some serverless functions that are callable from the client (lambda or cloud
   functions, depending on the provider) that will query the collection and only return the
   appropriate objects. This is not really cost efficient but will work out of the box.
2. We can create serverless functions that listen for changes in the `users` collection and populate
   a separate document with an array of profiles consisting with only the appropriate data.

In any case the API endpoint to get the users array will be the same: `\users\all` or even `\users`.

Development for the server will be done with NodeJS which will handle all the different functions
uploaded to the server while also providing emulators to work locally without creating actual
invocations, and so keeping the cost low.

In the end the API must be able to handle throttling and authentication properly to create a stable
API for the client to consume.
