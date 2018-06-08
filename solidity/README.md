# Solidity 101
Solidity is a high-level language that compiles to Ethereum Virtual Machine (EVM) assembly code. 

## Documenation
* [Solidity documentation](http://solidity.readthedocs.io/en/latest/)

## Editing, compiling and deployment tools

### Remix
You can write and compile solidity code using [Remix](https://remix.ethereum.org/) which is a browser based IDE so you don't need any software installed on your machine.

### VS Code Editor
Microsoft's Visual Studio Code
https://code.visualstudio.com/

Solidity extension
https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity

Setting up compile keyboard shortcuts
https://gist.github.com/naddison36/1b4301c15ee1cb8ae31efcd7c69a2218

### solc-js
A Javascript compiler for Solidity
https://github.com/ethereum/solc-js
that can be installed on your local machine with `npm install -g solc`

Some example commands:
* compile a file `solc filename.sol`
* compile every file in a folder `solc *`
* generate a Application Binary Interface (ABI) spec in JSON format `solc --abi filename.sol`

### Truffle
Is a JavaScript compile, deployment and testing tool.
https://github.com/ConsenSys/truffle 

## Coding

### Files
Solidity files have a `.sol` extension. Note that Truffle expects the file name to be the same as the contract name. The [Solidity style guide](http://solidity.readthedocs.io/en/latest/style-guide.html) states contracts should be named using the CapWords so the filenames should also be capitalised words. eg ContractName.sol 

### Comments

are like many other languages
```Solidity
// This is a single-line comment.

/*
This is a
multi-line comment.
*/

[Doxygen](https://en.wikipedia.org/wiki/Doxygen) style comments are also supported 
/**
 * asterisk block
 *
 */
```

See [Solidity docs](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html?highlight=comments#comments) for more information.

### Contracts

If you have done Object Oriented programming before then a contract is really just a class. The different is instead of instantiating an object in memory, a contract instantiates a distributed object on the Ethereum blockchain.

```Solidity
contract TestContract {

}
```

The [solidity style guide]((http://solidity.readthedocs.io/en/latest/style-guide.html#contract-and-library-names)) states contract and library names should be in CapitalizedWords style. 

See Solidity docs on [Contracts](https://solidity.readthedocs.io/en/latest/contracts.html) for more info.

#### State Variables

are values which are permanently stored in contract storage.
```Solidity
contract TestStateVariables {
    int someInt;
    bool someBool;
}
```

Note the semi-colons `;` are mandatory at the end of each line.

See Solidity docs on [State Variables](https://solidity.readthedocs.io/en/latest/structure-of-a-contract.html#state-variables) for more information.

#### Functions

functions will be covered in move detail later, but to quickly introduce them here's a simple example.
```Solidity
contract TestStateVariables {
    int someInt;
    bool someBool;

    function isEqual(bool otherBool) view returns (bool) {
        return someBool == otherBool;
    }
}
```

The `view` keyword means state is not changed hence a signed transaction with Ether is not needed to call this function. That is, the function is read-only.

See Solidity docs on [Functions](https://solidity.readthedocs.io/en/latest/structure-of-a-contract.html#functions) for more information.


### Types

Solidity is a statically typed language which means the type of data stored in a variable needs to know at compile time. This is the opposite to dynamically typed languages like JavaScript.

#### Value Types

Value types are copied when they are used as function arguments or in assignments.

This section largely comes from the [Types](https://solidity.readthedocs.io/en/latest/types.html) section of the Solidity docs.

#### Booleans

Are either true (1) or false (0) and default to false.

The usual boolean operators apply: `!`, `||`, `&&`, `==`, `!=`

```Solidity
contract TestBools {
    
    function testBoolOperations() view returns (bool) {
        
        // || is OR, && is AND
        return true || false;
        //return true && false;
        
        // ! is NOT
        //return !false;
        
        // == is Equal and != is NOT Equal
        //return 7 == 3;
        //return 7 != 3;
    }
}
```

See [Booleans](https://solidity.readthedocs.io/en/latest/types.html#booleans) section of the Solidity docs for more information.

#### Integers

Are whole number - not a fractional number.

Keywords `uint8` to `uint256` in steps of 8 (unsigned of 8 up to 256 bits) and `int8` to `int256`.

`int` = `int256` and can be positive or negative.

`uint` = `uint256` and is only a positive number including zero. The leading bit that indicated positive or negative sign is dropped.

There currently is no support for floating point numbers. eg run node and enter `0.1 + 0.2` which will not equal `0.3`.

```Solidity
contract TestIntegers {
    
    function testInt8() view returns (int8) {
        // 2 to the power of 7 minus 1 is the highest int8
        return 2 ** 7 - 1; // 127
    }
    
    function testUint8() view returns (uint8) {
        // 2 to the power of 8 minus 1 is the highest uint8
        return 2 ** 8 - 1; // 255
    }
    
    function testInt16() view returns (int16) {
        // 2 to the power of 15 minus 1 is the highest int8
        return 2 ** 15 - 1; // 32767
    }
    
    function testInt24() view returns (uint24) {
        // 2 to the power of 24 minus 1 is the highest uint24
        return 2 ** 24 - 1; // 16777215
    }
    
    function testInt64() view returns (int64) {
        return 2 ** 63 - 1; // 9223372036854775807
    }
    
    function testInt256() view returns (int256) {
        return 2 ** 255 - 1; // 57896044618658097711785492504343953926634992332820282019728792003956564819967
    }
    
    function testOperations() view returns (int64) {
        // like normal maths, * and / are executed before + and -
        return 1 + 2 - 3 * 4 / 3; // -1 not 0
    }
    
    function testMod() view returns (int8) {
        // calculates the remainder of a division
        return 9 % 4;   // remainder of 9 / 4 = 1
    }
    
    function testPower() view returns (int64) {
        return 2 ** 3;  // 2 * 2 * 2 = 8
    }
    
    function testFractions() view returns (int) {
        return 0.1 + 0.9; // is supported
        //return 0.1 + 0.2; // is not supported
    }

    // division is truncated to integers. eg 3 / 4 = 0 not 0.75 or 1
    // zero divisor will throw
    function testDiv(int dividend, int divisor) view returns (int) {
        return dividend / divisor;    
    }
}
```

See [Integers](https://solidity.readthedocs.io/en/latest/types.html#integers) section of the Solidity docs for more information.

#### Addresses

An address is a 20 byte number. In hexadecimal format with is 40 characters as 16 takes up 4 bits.
```Solidity
contract TestAddresses {
    
    address public smallestAddress = 0x1;
    address public largestAddress = 0xffffffffffffffffffffffffffffffffffffffff;
    
    function testThis() view returns (address) {
        return this; // 0x692a70d2e424a56d2c6c27aa97d1a86395877b3a
    }
    
    function testCompare() view returns (bool) {
        return smallestAddress < largestAddress; // true
    }
    
    function testGetBalance() view returns (uint256) {
        return largestAddress.balance; // 0
    }
}
```

See [Address](https://solidity.readthedocs.io/en/latest/types.html#address) section of the Solidity docs for more information.

#### Mappings

Depending on what language you are use to, a mapping is a hash table, hash map, dictionary or associative array.

All values in the map are virtually initialized to the types default value. eg false for booleans, 0 for integers, 0 for addresses.

Making a mapping public creates a getter function with the key as the parameter.

The `setMapping` function is the first time we have a function that changes state. This needs the caller to sign an Ethereum transaction and have enough Ether in their account to cover the required gas. See [Ethereum, Gas, Fuel & Fees](https://media.consensys.net/ethereum-gas-fuel-and-fees-3333e17fe1dc) post from Joseph Chow.

```Solidity
pragma solidity ^0.4.24;

contract TestMappings {    
    mapping (uint => string) public testUintStringMap;
    mapping (address => string) public testAddressStringMap;
    
    constructor() public {
        testAddressStringMap[this] = "this contract";
        testAddressStringMap[msg.sender] = "message sender";
        
        testUintStringMap[0] = "default";
    }
    
    function testSetMapping() public {
        testUintStringMap[0] = "zero";
        testUintStringMap[1] = "one";
        
        testAddressStringMap[this] = "set";
    }
}
```

See [Mappings](https://solidity.readthedocs.io/en/latest/types.html#mappings) section of the Solidity docs for more information.

#### Arrays

Arrays can be fixed for dynamic in size.

```Solidity
contract ArrayExample {

    uint256[] public someNumbers;

    // you can add an element to a dynamic array with push
    function pushValue(uint256 value) public returns (uint256) {
        someNumbers.push(value);
        return someNumbers.length;
    }
    
    // An array of ABI type can be passed into a public function
    function setArray(uint256[] newArray) public returns (uint256) {
        someNumbers = newArray;
        return someNumbers.length;
    }

    // you may have to explicitly convert types in array declarations
    // Note numbers is returned from the function
    function fixedMemoryArray() public pure returns (int[3] numbers) {
        //numbers = [1, 2, 3];  // will not compile as the compiler assumes int8
        numbers = [int(1), 2, 3];  // does compile
    }
}
```

See [Arrays](https://solidity.readthedocs.io/en/latest/types.html#arrays) section of the Solidity docs for more information.

#### Memory v storage

Data can be stored in either memory or storage. Storage data is persisted to the distributed ledger. Data in memory is lost once the transaction completes.

```Solidity
contract Fruits
{
    string[] public items;

    // Memory v storage variables
    constructor () public
    {
        items.push('apple');
        items.push('orange');

        // first demo
        string[] memory newItems = items;   // items[1] will remain orange
        
        // second demo
        //string[] storage newItems = items;   // items[1] will be lemon
        
        newItems[1] = 'lemon';

        // third demo
        // changeFirstElement(items);
        
        // forth demo
        // changeFirstElementStorage(items);
    }

    // items[1] will remain orange as function arguments default to memory
    function changeFirstElement(string[] newItems) internal {
        newItems[0] = 'banana';  
    }

    // items[1] will be lemon
    function changeFirstElementStorage(string[] storage newItems) internal {
        newItems[0] = 'banana';  
    }
}
```

See [Solidity Bits— storage vs. memory](https://medium.com/coinmonks/solidity-bits-storage-vs-memory-a54a650ea4ff) for more information.

#### Pass by value

The following demonstrates pass by value for memory variables.
```Solidity
contract TestValueType {
    
    function setTrue(bool firstArg) {
        firstArg = true;
    }
    
    function testSetTrue() returns (bool result) {
        bool testBool = false;
        setTrue(testBool);  // testBool is passed by value so remains false
        return testBool;    // returns false
    }
}
```

#### Struct

Structs allow you to define more complicated data structures.
They can be declared in either memory or storage.

```Solidity
contract TestStruct {

    struct SomeStruct {
        int someNumber;
        string someString;
    }

    struct ArrayType {
        int someInt;
    }
    
    struct SomeStructWithArray {
        int someNumber;
        string someString;
        ArrayType[] someArray;
    }

    // storage array of structs
    SomeStruct[] public someStructs;
    SomeStructWithArray[] public storageSomeStructWithArrays;

    function testAddStruct1() returns (uint, int) {
        someStructs.push(SomeStruct(789, "first way"));
        return (someStructs.length, someStructs[someStructs.length - 1].someNumber);
    }

    function testAddStruct2() returns (uint, int) {
        SomeStruct memory someStruct = SomeStruct(123, "first way");
        someStructs.push(someStruct);
        return (someStructs.length, someStructs[someStructs.length - 1].someNumber);
    }
    
    function testAddStruct3() returns (uint, int) {
        SomeStruct memory someStruct = SomeStruct({someNumber: 456, someString: "second way"});
        someStructs.push(someStruct);
        return (someStructs.length, someStructs[someStructs.length - 1].someNumber);
    }
    
    function testAddStructWithMemoryArray() {
        ArrayType[] memory testArray = new ArrayType[](10);
        SomeStructWithArray memory someStruct = SomeStructWithArray(123, "test", testArray);
        // can not implicitly convert memory struct with a memory array in it
        //someStructs.push(someStruct);     // will not compile
    }
    
    function testAddStructWithStorageArrayVariable() returns (int) {
        // the following two lines give warning message: "Unititialized storage pointer"
        SomeStructWithArray storage storageSomeStructWithArray;
        
        storageSomeStructWithArray.someNumber = 123;
        storageSomeStructWithArray.someString = "test";
        storageSomeStructWithArray.someArray.push(ArrayType(123));
        
        storageSomeStructWithArrays.push(storageSomeStructWithArray);
        
        return storageSomeStructWithArrays[0].someArray[0].someInt;
    }
}
```

#### Type inference

`var` is now deprecated. You should instead explicitly declare the variable type.
Variable types can be inferred when they are initialised at declaration. 
```Solidity
contract TestInfer {
    function test() public pure returns (bool result) {
        var someBool = false;
        bool anotherBool = true;
        
        return someBool;
    } 
}
```

### Functions

function can have no arguments or return types.
functions can have one or more arguments of a specified type.
functions can have one or more return types.

```Solidity
contract TestFunctions {
    
    bool public didSomething = false;
    
    function noArgFunction() {
        // does nothing
        didSomething = true;
    }
    
    function oneArgFunction(bool arg1) {
        didSomething = arg1;
    }
    
    function add(int first, int second) returns (int result) {
        return first + second;
    }
    
    function div(int first, int second) returns (bool success, int result) {
        if (second != 0)
            return (true, first / second);
        else
            success = false;
    }
    
    function testFunctions() returns (bool result, int answer) {
        //return noArgFunction();
        //return oneArgFunction(true);
        
        answer = add(1,2);
        //return (true, answer);
        
        (result, answer) = div(2, 1);
    }
}
```

#### Calling functions on other contracts

There are two ways to call another contract

1. your contract instantiates the contract. See `TestMath.createNewMathContract()` below
2. you cast the address of an existing contract. See `TestMath.setMathContract(address)` below

```Solidity
contract Math {
    
    // a simple function to be called from another contract
    function add(int a, int b) pure returns (int) {
        return a + b;
    }
    
    // used to validate that an address implements the getMathAddress method hence is of type Math
    function getMathAddress() view returns (address) {
        return this;
    }
}

contract TestMath {
    
    Math public math;
    
    constructor() {
        math = new Math();
    }
    
    function testAdd() view returns (int) {
        return math.add(1, 2);
    }
    
    function setMathContract(address mathContractAddress) returns (bool)
    {
        require(mathContractAddress > 0);
        
        // attempt to cast the contract address to a Math contract
        var mathInstance = Math(mathContractAddress);
        
        // validate the address is of type Math
        if (mathInstance.getMathAddress() == mathContractAddress) {
            math = mathInstance;
            return true;
        }
    }
    
    function createNewMathContract() public returns (address) {
        return math = new Math();
    }
}
```

#### Function visibilities

* external: can only be externally via th
* public (default): externally and internally
* internal: only this contract and contracts deriving from it can all internal functions
* private: only this contract, only internally

Only functions of the same contract can be called internally.
Internal function calls have the advantage that you can use all Solidity types as parameters, but you have to stick to the simpler ABI types for external calls.
```Solidity
contract TestFunctionModifiers {
    
    // private
    function privateFunction() private pure returns (string result) {
        return "private";
    }
    
    // defaults to a public function which can be called internally and externally
    function testPrivate() public pure returns (string result) {
        return privateFunction();       // can jump to a private function
        // return this.privateFunction();  // can not externally call a private function by sending a message
    }
    
    // explicitly public which can be called internally and externally
    function publicFunction() public pure returns (bool result) {
        return true;
    }
    
    // calls another public function
    function testPublic() public view returns (bool result) {
        // return publicFunction();     // can jump to an public function
        return this.publicFunction();   // can externally call a public function by sending a message
    }
    
    // external function can only be called by a public or external function
    function externalFunction() external pure returns (bool result) {
        return true;
    }
    
    function testExteranl() public view returns (bool result) {
        //return externalFunction();    // can not jump to an external function
        return this.externalFunction(); // can call an external function by sending a message
    }
    
    // internal
    function internalFunction() internal pure returns (bool result) {
        return true;
    }
    
    function testInternal() public pure returns (bool result) {
        return internalFunction();  // can jump to an internal function
        //return this.internalFunction();   // can not call an internal function by sending a message
    }
}

contract TestExternalFunctionCalls {
    
    TestFunctionModifiers testFunctionModifiers = new TestFunctionModifiers();
    
    function testCall() public returns (bool result) {
        return testFunctionModifiers.publicFunction();
        //return testFunctionModifiers.privateFunction();   // is not accessible
        return testFunctionModifiers.externalFunction();
        //return testFunctionModifiers.internalFunction();    // is not accessible
    }
}
```

See [Visibility and getters](https://solidity.readthedocs.io/en/latest/contracts.html#visibility-and-getters) in the Solidity docs for more information.

#### Function modifiers

Modifiers are typically used for access controls. They are like C macros or Java Aspects.
```Solidity
contract TestOwnerModifier {
    
    // default the owner to the account that deployed the contract
    address public owner = msg.sender;
    
    modifier onlyOwner {
        require(owner == msg.sender);
        _;      // is the function being modified
    }
    
    // can only be called by the account the deployed the contract
    function testIsOwner() onlyOwner view returns (bool success) {
        return true;
    }
}
```

Modifier logic can run at the start or end of a function depending on where the _ is placed.
```Solidity
contract TestPrePostModifiers
{    
    int public test = 1;
    
    modifier preFunction {
        test = 2;
        _;
    }
    
    modifier postFunction {
        _;
        test = 3;
    }
    
    // sets test to 4 and returns 4. The test = 2 is executed before test = 4
    function testPreFunction() preFunction returns (int result) {
        return test = 4;    
    }
    
    // will set test to 3 as the postFunction modifier will be executed
    function testPostFunctionNoReturn() postFunction returns (int result) {
        test = 5;
    }
    
    // will set test to 3 even with the explicit return.
    // older compilers set test to 6 as the return stopped the postFunction modifier form being executed
    function testPostFunctionWithReturn() postFunction returns (int result) {
        return test = 6;
    }
}
```

Parameters can be passed to function modifiers 
```Solidity
contract TestModifierParameters {
    
    int public test = 1;
    
    modifier oneParam(int param) {
        require(param > 0);
        _;
    }
    
    modifier twoParam(int param1, int param2) {
        if (param1 > 0 && param2 > 1)
            _;
        else if (param1 == 0)
            _;
    }
    
    function testOneParam(int firstParam) public oneParam(firstParam) returns (int result) {
        test = firstParam;
        return test;
    }
    
    function testTwoParam(int firstParam, int secondParam) public twoParam(firstParam, secondParam) returns (int result) {
        test = secondParam;
        return test;
    }
}
```
See [Function Modifiers](https://solidity.readthedocs.io/en/latest/structure-of-a-contract.html#function-modifiers) in the Solidity docs for more information.

### Constructor

Is a special function that is invoked when a contract is first deployed. This could be via a transaction or another contract. It use to be a function with the same name as the contract but is now done using the `constructor` reserved word. Note there is no function keyword before the constructor keyword

```Solidity
contract TestConstructor {
    
    string public state;
    bool public finished;
    
    constructor(string _state, bool someBool) {
        state = _state;
    }
}
```

### Control Structures

Covers `if`, `else`, `for`, `while`, `continue`, `break`, `return` 
```Solidity
contract TestControlStructures {
    
    function testIf(int testNumber) public pure returns (string result) {
        
        if (testNumber < 0) {
            return "negative";
        }
        // brackets are not needed if only one line
        else if (testNumber == 0)
            return "zero";
        else {
            return "positive";
        }
    }
    
    function testForLoop(int[] numbers) public pure returns (int sum) {
        for (uint i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
    }
    
    function testForLoopBreakContinue(int[] numbers) public pure returns (int sum) {
        for (uint i = 0; i < numbers.length; i++) {
            if (i % 2 == 1) {
                continue;
            }
            
            if (i == 4) {
                break;
            }
            
            sum += numbers[i];
        }
    }
    
    function testForLoopReturn(int[] numbers) public pure returns (int sum) {
        for (uint i = 0; i < numbers.length; i++) {
            if (i == 2) {
                return sum;
            }
            
            sum += numbers[i];
        }
    }
    
    function testWhileLoop(int[] numbers) public pure returns (int sum) {
        uint i = 0;
        while (i < numbers.length) {
            sum += numbers[i++];
        }
    }
    
    function testWhileBreakContinue(int[] numbers) public pure returns (int sum) {
        uint i = 0;
        while (i < numbers.length) {
            if (i % 2 == 1) {
                continue;
            }
            
            if (i == 4) {
                break;
            }
            
            sum += numbers[i++];
        }
    }
}
```

See [Control Structures](https://solidity.readthedocs.io/en/latest/control-structures.html#control-structures) in the Solidity docs for more information.

#### For loops

Solidity for loops are like C.
```Solidity
contract LoopExample {
    function sumArray(int[] numbers) pure returns (int sum) {
        for (uint i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
    }
}
```
You can't iterate over the values in the array like `for number in numbers {sum += number;}`

Or call a function like JavaScript `numbers.forEach(function(number) {sum += number;});`

Note uint was used for the iterator i. The following snippet just declares i as a var which will use type interance to uint8. This means i is limited to 2^8 - 1 = 256 - 1 = 255. Is the array has more than 256 items the loop will continue until the contract runs out of gas.
```Solidity
contract LoopExample {
    function sumArray(int[] numbers) returns (int sum) {
        for (var i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
    }
}
```

### Exceptions

```Solidity
contract TestThrows {
    
    uint64 public someNumber = 0;
    
    function increment() {
        someNumber++;
    }
    
    // number should not be incremented due to the throw
    function failedIncrement() {
        someNumber++;
        throw;
    }
    
    // number should not be incremented due to the revert
    function revertIncrement() {
        someNumber++;
        revert('reverting increment');
    }
    
    // returns your unused gas
    function requireIncrement(uint64 incrementBy) {
        require(incrementBy > 0, 'can not be zero');
        someNumber = someNumber + incrementBy;
    }
    
    // uses all your unused gas
    function assertIncrement(uint64 incrementBy) {
        assert(incrementBy > 0);
        someNumber = someNumber + incrementBy;
    }
    
    function testThrow() {
        throw;
    }
    
    function testNotEnoughGas() {
        for (uint i=0; i < 1000; i++) {
            sha256(i);
            increment();
        }
    }
}
```

See [Revert(), Assert(), and Require() in Solidity, and the New REVERT Opcode in the EVM](https://medium.com/blockchannel/the-use-of-revert-assert-and-require-in-solidity-and-the-new-revert-opcode-in-the-evm-1a3a7990e06e) for more details

### Events

Are the only way a contract can interact with the outside world. Data is emitted out of the blockchain via an event. An external process needs to register to receive events from an ethereum node/client.
```Solidity
contract TestEvents {
    
    event EmitAString(string something);
    event EmitSomeNumbers(int first, int second);
    event EmitAddresses(address indexed thisContract, address indexed transactionInvoker);
    
    function testEmitSomeString() {
        emit EmitAString("hello world");
    }
    
    function testEmitSomeNumbers() {
        emit EmitSomeNumbers(1, 2);
    }
    
    function testEmitAddresses() {
        emit EmitAddresses(this, msg.sender);
    }
}
```

### Importing other source files

There a few ways you can import a file but the simplest is
`import "filename";`

## Support

* [Ethereum Stack Exchange for Solidity](https://ethereum.stackexchange.com/questions/tagged/solidity)
* [Gitter](https://gitter.im/ethereum/solidity/)