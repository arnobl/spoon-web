
We will work on testing web app using this Angular project.
There are different aspects to test in such an app:
- Testing standard methods from services, classes, etc.
- Testing methods that use REST routes
- System testing (End-to-End testing -- E2E)

# Configuring test frameworks and run tests

There exists various testing frameworks, in particular:
- Jasmine (test lib) + Karma (test runner), eg for Angular 
- Jest (by Facebook)

**We will later edit the `karma.conf.js` file.**

Use the test launcher of WebStorm to launch tests.
Using a command line, you can run:
```
ng test
```

You can add parameters to this command (or edit the karma.conf.js file):
```
ng test --browsers ChromeHeadless
```



# Classical unit testing

**Create a service (that you will remove later):**
```
ng generate service service/number
```

This command created two files:
- The service class
- The service test class

**Look at the testing class to understand its structure.**

**Execute the test class of the service.**
You may notice that the Chrome browser runs and the test suite is re-executed on each code change.

**Edit the two following attributes in the karma conf file and re-run the test class (stop the test server first):**
```json
    browsers: ['ChromeHeadless'],
    singleRun: true,
```


**Add this code in this service class:**

```typescript
@Injectable({
  providedIn: 'root'
})
export class NumberService {
  private cptValue: number;
  random?: Random;

  constructor() {
    this.cptValue = 0;
  }

  incrementCpt(): void {
    this.cptValue++;
  }

  get cpt(): number {
    return this.cptValue;
  }

  nextRandom(): number {
    return this.random?.nextNumber() ?? -1;
  }
}

export interface Random {
  nextNumber(): number;
  nextString(): string;
}
```

**Write unit tests to check that (`alt+insert` for generating a new test):**
- the initial value of cpt is 0
- after one increment, cpt equals 1
- after two increments, cpt equals 2


**Is that possible to mock an interface in TypeScript/Jasmine for simulating the Random dependency?**
No, not natively:
https://stackoverflow.com/questions/37027776/how-to-stub-a-typescript-interface-type-definition

Mocking works on real objects to observe or modify them.
In fact this is not mocking but stubbing.
So to mock an interface you have to either create a concrete stub  or use a mock library or Jasmine features.

**Create a Random stub to test the `nextRandom` method.**
Remember that you can affect json objects to interface:

```typescript
export interface Foo {
    foo(): string;
}
```

```typescript
const foo: Foo = {
  foo: () => "foo"
};
```


**Replace this stub by a Jasmine mock.**

Example:
```typescript
const foo: createSpyObj<Foo>(['foo']);
foo.foo.and.callFake(() => "foo");
```

**Add an assertion that checks the method `nextNumber` of the mock `Random` is called one time.



# Testing REST routes

We will write tests for the class `command/update-code` (an undoable command).

**Look at the code of the class `update-code` to determine its job.**

**Remove the unique test from its test file and write one that checks that when the command is executed the REST route is used as expected and `dataSource.data` is set correctly.**

How to test REST route without using the back-end:
https://angular.io/guide/http#setup-for-testing



# System testing (E2E testing)

*Protractor* is the Angular E2E testing tool.

To run E2E tests:
```
ng e
```

In few words: you query the app as an HTML document.
You write assertions based on HTML/CSS queries.

In `AppPage`, you define your own HTML/CSS queries. 
Their goal is to ease the writing of E2E tests.

The current test does not work.
In `AppPage` replace the `getTitleText` function by:

```typescript
  getTitleText(): Promise<string> {
    return element(by.tagName('h1')).getText() as Promise<string>;
  }
```

Edit the test in `app.e2e-spec` to be:
```typescript
  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Spoon AST visualiser');
  });
```

**Write another test that checks the presence of the text area (from the `ast` component)**


To configure *Protractor* in headless mode or using another browser:
http://www.webdriverjs.com/execute-protractor-tests-on-headless-chrome-browser/

https://github.com/angular/protractor/blob/master/docs/browser-setup.md
