# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

// BEGIN REFACTORING EXPLANATION BY TK

- For this refactor, I chose to change `dpk.js` into a `Class` JS syntax, so I could encapsulate the helper methods in a clean OOP implementation. I opted for this than complex exports.
  - Note: I opted to make the internal class methods and constants [private](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) -- adding `#` prefix for JS class syntax. I also added a getter for our MAX character variable to use in tests.
- Added `getCreateHash()` method to generate hash and keep code DRY. (Single purpose method to generate hash)
- Added `getKeyFromEvent()` method to extract key from event if provided, or generate key from event data. (Single purpose method to generate key)
- Added `calculate()` method which actually creates the key
- Added `getValidateKey()` method to perform mutation validations - e.g, converting to string, re-generating hash if exceeds max length. (Single purpose method for validation)
- Added test cases for the following scenarios:
  - Returns the literal '0' when given no event
  - Returns partition key if provided with event
  - Returns a generated key if provided with an event without a partition key
  - Returns a stringified key if provided with a non-string event partition key
  - Returns a newly generated hash key if the event partition key exceeds the maximum length
- These refactoring changes keep our code DRY and more readable by encapsulating logic into single purpose methods.

// END REFACTORING EXPLANATION BY TK
