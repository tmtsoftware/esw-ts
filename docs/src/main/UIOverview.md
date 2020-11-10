# User Interfaces in ESW and TMT

TMT has an OAD requirement for graphical user interfaces as the standard style for user interfaces. The CSW technical choice for
graphical user interfaces is the web platform consisting of the web browser as the host for the user interface and web
technologies based on JavaScript along with HTTP, and CSS, etc. Most UI innovation and development at this time is
based on these technologies and there is no apparent change in sight, so this decision continues to make sense.
One other big advantage of the browser-based UI is that it can provide an easy solution for remote access in many situations.
The entire reason for web technologies is to provide remote access to systems and services.

## ESW.UISTD and ESW.HCMS

TMT Observatory will use many web applications to observe and manage the observatory instruments and telescope systems.
User interfaces can be grouped into two categories: observing user interfaces and engineering user interfaces.
High-level Control and Monitoring (HCMS) is the ESW subsystem that provides the observing user interfaces
to be used by the staff and visitors to control the telescope and other systems, monitor their
status and behavior, and to perform observations that generate science data. Engineering user interfaces are
the responsibility of the subsystem teams, but these user interfaces also use the technology choices and support provided
by ESW.

ESW’s User Interface Standards (UISTD) subsystem provides the architectural solution for this technical problem.
UISTD also provides glue code for the JavaScript-based environment that is used by UI builders to access CSW services
along with examples. UISTD provides style and layout guidelines and standards (look-and-feel) with examples that demonstrate
the guidelines. UISTD also provides UI components that demonstrate common usage of CSW glue code (TBD as needed).

## User Interface Support in ESW Phase 1

The development of ESW was split into two phases called Phase 1 and Phase 2. Phase 1, which is currently in development,
delivers products and features that other subsystems need from ESW. ESW Phase 2 will execute in the future covering the
rest of ESW at a more leisurely pace.

### User Interface Responsibilities of ESW

The following bullet items summarize the responsibilities of UISTD and HCMS and whether they are part of Phase 1 or Phase 2.

* Provide JavaScript-based glue code running in the browser providing access to CSW services needed by user interfaces (UISTD--ESW-TS) (Phase 1).
* Provide a gateway/bridge infrastructure that connects the browser-based user interfaces to the JVM-based services and components (UISTD) (Phase 1).
* Provide examples of glue code and user interface standards (UISTD) (Phase 2).
* Provide style and layout guidelines for standardized user interface look and feel (UISTD) (Phase 2)
* Provide browser-based user interfaces required by the support staff for control and monitoring of the telescope and instrument systems (HCMS) (Phase 2).

ESW-TS is the glue library that satisfies the first bullet in the list above. ESW-TS is one part of the
solution for TMT user interfaces, but it is an important part that provides a way for teams to get started now
making browser-based user interfaces that access TMT control system Assemblies, HCDs, and even Sequencers.

## Motivation Behind ESW-TS

The first step is to provide access from the browser to the components in the control system. ESW-TS provides this
access as a set of APIs that are closely tied to the CSW service APIs using similar names and concepts.

ESW-TS is a @link:[TypeScript](https://www.typescriptlang.org)-based library. TypeScript is a very popular library
that extends JavaScript by adding types. Types in TypeScript help to make JavaScript a bit more reliable by providing type-checking
without adding new features or extending the language.

The ESW-TS library can be used to create `front-end` user interfaces that
use the User Interface Application Gateway (UIAG) to access control system components. See @extref[UIAG in ESW](esw:uisupport/gateway) for more information.
ESW-TS can also be used with `hybrid` user interfaces. See @extref[here](esw:uisupport/UIOverview.html) for the more information.
two user interface types.

The ESW-TS library manages the complexity associated with interfacing the CSW service calls to the browser environment.
All the issues related to HTTP, serialization of objects, and interacting with the protocols of CSW are managed by the
ESW-TS library.  These services provided by the ESW-TS library
make it easier for UI developers to develop a web app without having to worry about programming details of the TMT backend UIAG.

ESW-TS provides APIs for CSW services from a user interface. Not all CSW services are included in ESW-TS. For most provided CSW services,
the APIs have been limited to methods that make sense for a UI.

`ESW-TS` library is available on npm registry.

## How to use ESW-TS

For using ESW-TS library, you will need to have some kind of model which determines the flow of creating the web application in the first place and which
TMT backend services the application will be using in its lifetime.

1. Define your application features / components.
1. Depending on those features, decide which services will be required to build them from the available @ref:[services](services/index.md).
1. Develop & build application components on top of the service.

While using many of the services, you will be required to use some ESW-TS models for making API requests and
CSW domain models like (Prefix, ComponentId, etc) that are provided in the ESW-TS to ease the development of a web application.

At this point in UISTD development, some choices must be made to create a complete UI. At this time we recommend using the
following additional tools and libraries to make a TypeScript based UI.

* @link:[React](https://reactjs.org)
* @link:[Ant Design](https://ant.design)
* @link:[Snowpack](https://www.snowpack.dev/)
* @link:[Jest](https://jestjs.io/)
* @link:[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
