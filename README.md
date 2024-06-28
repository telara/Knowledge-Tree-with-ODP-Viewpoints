# Navigable, Nested Tree:  Science Viewpoint: Interview Product V2

# make sure you have Node.js

Node.js is downloadable from here: https://nodejs.org/en/download/package-manager

## Mac installation
 
### installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

### download and install Node.js (you may need to restart the terminal)
nvm install 20

### verifies the right Node.js version is in the environment
node -v # should print `v20.15.0`

### verifies the right NPM version is in the environment
npm -v # should print `10.7.0`

### These instructions were up-to-date on 17 June 2024.

## Site running on Cloud Editor Platform, follow this link:
https://observablehq.com/@knowledge-web/science-viewpoint-to-all@591

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@5
npm install https://api.observablehq.com/d/f3b4397f12555d4a@591.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@knowledge-web/science-viewpoint-to-all";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
