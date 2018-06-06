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
```
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

```
contract TestContract {

}
```

The [solidity style guide]((http://solidity.readthedocs.io/en/latest/style-guide.html#contract-and-library-names)) states contract and library names should be in CapitalizedWords style. 

See Solidity docs on [Contracts](https://solidity.readthedocs.io/en/latest/contracts.html) for more info.

#### State Variables

are values which are permanently stored in contract storage.
```
contract TestStateVariables {
    int someInt;
    bool someBool;
}
```

Note the semi-colons `;` are mandatory at the end of each line.

See Solidity docs on [State Variables](https://solidity.readthedocs.io/en/latest/structure-of-a-contract.html#state-variables) for more information.

#### Functions

functions will be covered in move detail later, but to quickly introduce them here's a simple example.
```
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

```
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

```
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
```
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

```
contract TestMappings {
    
    mapping (uint => string) public testUintStringMap;
    mapping (address => string) public testAddressStringMap;
    
    function constructor() public {
        testAddressStringMap[this] = "this contract";
        testAddressStringMap[msg.sender] = "message sender";
    }
    
    function setMapping() public {
        testUintStringMap[0] = "zero";
        testUintStringMap[1] = "one";
    }
}
```

See [Mappings](https://solidity.readthedocs.io/en/latest/types.html#mappings) section of the Solidity docs for more information.

#### Arrays

```
contract ArrayExample {
    function initArray() {
        // int[3] memory numbers = [1, 2, 3];
        int[3] memory numbers = [int(1), 2, 3];
    }
}
```

#### Bytes


#### Strings


#### Struct

Structs allow you to define more complicated data structures.
Structs can be declared as either memory or storage.
```
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
        SomeStructWithArray[] storage storageSomeStructWithArrays;
        
        storageSomeStructWithArray.someNumber = 123;
        storageSomeStructWithArray.someString = "test";
        storageSomeStructWithArray.someArray.push(ArrayType(123));
        
        storageSomeStructWithArrays.push(storageSomeStructWithArray);
        
        return storageSomeStructWithArrays[0].someArray[0].someInt;
    }
}
```

#### Local variables

Data is stored in memory rather than persisted into the contracts state. That is, it's not saved into the distributed ledgers.

```
contract TestLocalVariables {

    function testSetTrue() returns (bool result) {
        bool localVariable = false;
        return localVariable;
    }
}
```

#### Pass by value

The following demonstrates pass by value.
```
contract TestValueType {
    
    function setTrue(bool firstArg) {
        firstArg = true;
    }
    
    function testSetTrue() returns (bool result) {
        bool testBool = false;
        setTrue(testBool);
        return testBool;
    }
}
```

#### Type inference

Variable types can be inferred when they are initialised at declaration.
```
contract TestInfer {
    function test() returns (bool result) {
        var someBool = false;
        var anotherBool = true;
        var someString = "this can not be returned as it's a string not a bool";
        
        return anotherBoolType;
    } 
}
```

### Functions

function can have no arguments or return types.
functions can have one or more arguments of a specified type.
functions can have one or more return types.

```
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

1. your contract instantiates the contract. See TestMath.createNewMathContract() below
2. you cast the address of an existing contract. See TestMath.setMathContract(address) below

```
contract Math {
    
    // a simple function to be called from another contract
    function add(int a, int b) returns (int result) {
        return a + b;
    }
    
    // used to validate that an address implements the getMathAddress method hence is of type Math
    function getMathAddress() returns (address result) {
        return this;
    }
}

contract TestMath {
    
    Math public math;
    
    function TestMaths() {
        math = new Math();
    }
    
    function testAdd() returns (int result) {
        return math.add(1, 2);
    }
    
    function setMathContract(address mathContractAddress) returns (bool success) {
        
        // attempt to cast the contract address to a Math contract
        var mathInstance = Math(mathContractAddress);
        
        // validate the address is of type Math
        if (mathInstance.getMathAddress() == mathContractAddress) {
            math = mathInstance;
            return true;
        }
    }
    
    function createNewMathContract() {
        math = new Math();
    }
}
```

#### Function visibilities

* external: all, only externally
* public (default): externally and internally
* internal: only this contract and contracts deriving from it, only internally
* private: only this contract, only internally

Only functions of the same contract can be called internally.
Internal function calls have the advantage that you can use all Solidity types as parameters, but you have to stick to the simpler ABI types for external calls.
```
contract TestFunctionModifiers {
    
    // private
    function privateFunction() private constant returns (string result) {
        return "private";
    }
    
    // defaults to a public function
    function testPrivate() returns (string result) {
        return privateFunction();
    }
    
    // public
    function publicFunction() public returns (bool result) {
        return true;
    }
    
    function testPublic() returns (bool result) {
        return publicFunction();
    }
    
    // external
    function externalFunction() external returns (bool result) {
        return true;
    }
    
    function testExteranl() returns (bool result) {
        //return externalFunction();    // can not jump to an external function
        return this.externalFunction(); // can call an external function by sending a message
    }
    
    // internal
    function internalFunction() internal returns (bool result) {
        return true;
    }
    
    function testInternal() returns (bool result) {
        return internalFunction();  // can jump to an internal function
        //return this.internalFunction();   // can not call an internal function by sending a message
    }
}

contract TestExternalFunctionCalls {
    
    TestFunctionModifiers testFunctionModifiers = new TestFunctionModifiers();
    
    function testCall() returns (bool result) {
        return testFunctionModifiers.publicFunction();
        //return testFunctionModifiers.privateFunction();   // is not accessible
        return testFunctionModifiers.externalFunction();
        //return testFunctionModifiers.internalFunction();    // is not accessible
    }
}
```

#### Function modifiers

Modifiers are typically used for access controls
```
contract TestOwnerModifier {
    
    address owner;
    
    function TestModifiers() {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        if (owner != msg.sender) {
            throw;
        }
        _
    }
    
    function testIsOwner() onlyOwner returns (bool success) {
        return true;
    }
}
```

Modifier logic can run at the start or end of a function depending on where the _ is placed.
```
contract TestPrePostModifiers {
    
    int public test = 1;
    
    modifier preFunction {
        test = 2;
        _
    }
    
    modifier postFunction {
        _
        test = 3;
    }
    
    function testPreFunction() preFunction returns (int result) {
        test = 4;
        return test;
    }
    
    // will set test to 3 as the postFunction modifier will be executed
    function testPostFunctionNoReturn() postFunction returns (int result) {
        test = 5;
    }
    
    // will set test to 6 as the postFunction modifier will not be executed due to the return
    function testPostFunctionWithReturn() postFunction returns (int result) {
        test = 6;
        return test;
    }
}
```

Parameters can be passed to function modifiers 
```
contract TestModifierParameters {
    
    int public test = 1;
    
    modifier oneParam(int param) {
        if (param != 0)
            _
    }
    
    modifier twoParam(int param1, int param2) {
        if (param1 > 0 && param2 > 1)
            _
        else if (param1 == 0)
            _
    }
    
    function testOneParam(int firstParam) oneParam(firstParam) returns (int result) {
        test = firstParam;
        return test;
    }
    
    function testTwoParam(int firstParam, int secondParam) twoParam(firstParam, secondParam) returns (int result) {
        test = secondParam;
        return test;
    }
}
```

### Constructor

Is a special function that is invoked when a contract is first deployed. This could be via a transaction or another contract. It use to be a function with the same name as the contract but is now done using the `constructor` reserved word.

```
contract TestConstructor {
    
    string public state;
    bool public finished;
    
    function constructor(string _state, bool someBool) {
        state = _state;
    }
}
```

### Control Structures

Covers `if`, `else`, `for`, `while`, `continue`, `break`, `return` 
```
contract TestControlStructures {
    
    function testIf(int testNumber) returns (string result) {
        
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
    
    function testForLoop(int[] numbers) returns (int sum) {
        for (uint i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        return sum;
    }
    
    function testForLoopBreakContinue(int[] numbers) returns (int sum) {
        for (uint i = 0; i < numbers.length; i++) {
            if (i % 2 == 1) {
                continue;
            }
            
            if (i == 4) {
                break;
            }
            
            sum += numbers[i];
        }
        return sum;
    }
    
    function testForLoopReturn(int[] numbers) returns (int sum) {
        for (uint i = 0; i < numbers.length; i++) {
            if (i == 2) {
                return sum;
            }
            
            sum += numbers[i];
        }
        return sum;
    }
    
    function testWhileLoop(int[] numbers) returns (int sum) {
        uint i = 0;
        while (i < numbers.length) {
            sum += numbers[i++];
        }
        
        return sum;
    }
    
    function testWhileBreakContinue(int[] numbers) returns (int sum) {
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
        
        return sum;
    }
    
    function() {throw;}
}
```

#### For loops

Solidity for loops are like C.
```
contract LoopExample {
    function sumArray(int[] numbers) returns (int sum) {
        for (uint i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
    }
}
```
You can't iterate over the values in the array like `for number in numbers {sum += number;}`

Or call a function like JavaScript `numbers.forEach(function(number) {sum += number;});`

Note uint was used for the iterator i. The following snippet just declares i as a var which will use type interance to uint8. This means i is limited to 2^8 - 1 = 256 - 1 = 255. Is the array has more than 256 items the loop will continue until the contract runs out of gas.
```
contract LoopExample {
    function sumArray(int[] numbers) returns (int sum) {
        for (var i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
    }
}
```

### Exceptions

```
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
    
    function testThrow() {
        throw;
    }
    
    function testNotEnoughGas() {
        for (uint i=0; i < 1000; i++) {
            sha256(i);
            increment();
        }
    }
    
    // is called when Ether is transfered to this contract
    function() {
        // Ether should be returned
        throw;
    }
}
```

### Events

Are the only way a contract can interact with the outside world. Data is emitted out of the blockchain via an event. An external process needs to register to receive events from an ethereum node/client.
```
contract TestEvents {
    
    event EmitAString(string something);
    event EmitSomeNumbers(int first, int second);
    event EmitAddresses(address thisContract, address transactionInvoker);
    
    function testEmitSomeString() {
        EmitAString("hello world");
    }
    
    function testEmitSomeNumbers() {
        EmitSomeNumbers(1, 2);
    }
    
    function testEmitAddresses() {
        EmitAddresses(this, msg.sender);
    }
}
```

### Importing other source files

There a few ways you can import a file but the simplest is
`import "filename";`

### fallback function

Return Ether if someone sends Ether to the contract's address or calls a function that doesn't exist or has incorrect parameter types. 

```
contract SomeContractName {
    // return Ether if someone sends Ether to this contract
    function() { throw; }
}
```

## Support

* [Ethereum Stack Exchange for Solidity](https://ethereum.stackexchange.com/questions/tagged/solidity)
* [Gitter](https://gitter.im/ethereum/solidity/)