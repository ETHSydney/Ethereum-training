# Solidity 101

## Compiling
### browser-solidity
You can write and compile solidity code using [browser-solidity](https://ethereum.github.io/browser-solidity/) which does not need any installation.

### solc-js
A Javascript compiler for Solidity
https://github.com/ethereum/solc-js
that can be installed on your local machine with `npm install -g solc`

To compile a file `solc filename.sol`

To compile everything in a folder `solc *`

## Coding

### Files
Solidity files have a `.sol` extension.


### Comments
are like many other languages
```
// This is a single-line comment.

/*
This is a
multi-line comment.
*/
```
[NatSpec](http://www.nat-spec.com/) comments are supported but not yet documented
```
/// triple slash

/**
 * asterisk block
 *
 */
```

### Contracts
If you have done Object Oriented programming before then a contract is really just a class. The different is instead of instantiating an object in memory, a contract instantiates a distributed object on the Ethereum blockchain.

```
contract TestContract {

}
```

The solidity style guide states [contract and library names should be in CapitalizedWords style](http://solidity.readthedocs.io/en/latest/style-guide.html#contract-and-library-names). 

Note Truffle expects the name of the contract to match the filename which is case sensitive on Mac and Linux.

### State Variables
are values which are permanently stored in contract storage.
```
contract TestStateVariables {
    int someInt;
    bool someBool;
}
```

### Local variables
Data is stored in memory rather than persisted into the contracts state. That is, it's not saved into the distributed ledgers.

### Types
Solidity is a statically typed language which means the type of data stored in a variable needs to know at compile time. This is the opposite todynamically typed languages like JavaScript.

#### Values Types
Value types are copied when they are used as function arguments or in assignments.

#### Booleans
Are either true (1) or false (0) and default to false.

The usual boolean operators apply: `!`, `||`, `&&`, `==`, `!=`

```
contract TestBools {
    
    function testBoolOperations() returns (bool result) {
        
        // ||, &&
        return true || false;
        
        // !true, !false
        //return !false;
        
        // == and !=
        //return 1 == 1;
    }
}
```

#### Integers
Are whole number - not a fractional number.

Keywords `uint8` to `uint256` in steps of 8 (unsigned of 8 up to 256 bits) and `int8` to `int256`.

`int` = `int256` and can be positive or negative.

`uint` = `uint256` and is only a positive number including zero. The leading bit that indicated positive or negative sign is dropped.

There are no floating point numbers as float operations are not deterministic. eg 0.1 + 0.2 != 0.3

```
contract TestIntegers {
    
    function testInt8() returns (int8 result) {
        return 2 ** 7 - 1; // 127
    }
    
    function testUint8() returns (uint8 result) {
        return 2 ** 8 - 1; // 255
    }
    
    function testInt16() returns (int16 result) {
        return 2 ** 15 - 1; // 32767
    }
    
    function testInt24() returns (int24 result) {
        return 2 ** 23 - 1; // 8388607
    }
    
    function testInt32() returns (int32 result) {
        return 2 ** 31 - 1; // 2147483647
    }
    
    function testInt64() returns (int64 result) {
        return 2 ** 63 - 1; // 9223372036854775807
    }
    
    function testInt256() returns (int256 result) {
        return 2 ** 255 - 1; // 57896044618658097711785492504343953926634992332820282019728792003956564819967
    }
    
    function testOperations() returns (int64 result) {
        return 1 + 2 - 3 * 4 / 3; // -1 not 0
    }
    
    function testMod() returns (int8 result) {
        return 9 % 4;   // remainder of 9 / 4 = 1
    }
    
    function testPower() returns (int64 result) {
        return 2 ** 3;  // 2 * 2 * 2 = 8
    }
    
    function testFractions() returns (int result) {
        return 0.1 + 0.9; // 1
    }
    
    function testDivTruc() returns (int result) {
        int testInt = 1;
        return 3 * testInt / 4; // 0 not 0.75 or 1
    }
}
```

#### Addresses
Is a 20 byte number in hexadecimal format.
```
contract TestAddresses {
    
    address smallestAddress = 0x1;
    address largestAddress = 0xffffffffffffffffffffffffffffffffffffffff;
    
    function testThis() returns (address result) {
        return this; // 0x692a70d2e424a56d2c6c27aa97d1a86395877b3a
    }
    
    function testSmallestAddress() returns (address result) {
        return smallestAddress;
    }
    
    function testLargetAddress() returns (address result) {
        return largestAddress;
    }
    
    function testCompare() returns (bool result) {
        return smallestAddress < largestAddress; // true
    }
    
    function testGetBalance() returns (uint256 result) {
        return largestAddress.balance; // 0
    }
}
```

#### Mappings
Depending on what language you are use to, a mapping is a hashmap, dictionary or associative array.

```
contract TestMappings {
    
    mapping (uint => string) public testUintStringMap;
    mapping (address => string) public testAddressStringMap;
    
    function TestMappings() {
        testAddressStringMap[this] = "this contract";
        testAddressStringMap[msg.sender] = "message sender";
    }
    
    function testSetMapping() {
        testUintStringMap[0] = "zero";
        testUintStringMap[1] = "one";
    }
    
    function testGetStringFromUint(uint index) returns (string result) {
        return testUintStringMap[index];
    }
    
    function testGetStringFromAddress(address _address) returns (string result) {
        return testAddressStringMap[_address];
    }
}
```

#### Arrays

```
contract ArrayExample {
    function initArray() {
        // int[3] memory numbers = [1, 2, 3];
        int[3] memory numbers = [int(1), 2, 3];
    }
}
```

#### Strings


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

#### Function modifiers

```
contract TestFunctionModifiers {
    
    function privateFunction() private constant returns (string result) {
        return "private";
    }
    
    function testPrivate() returns (string result) {
        return privateFunction();
    }
    
    function publicFunction() public returns (string result) {
        return "public";
    }
    
    function testPublic() returns (string result) {
        return publicFunction();
    }
    
    function externalFunction() external returns (bool result) {
        return true;
    }
    
    function testExteranl() returns (bool result) {
        //return externalFunction();
        return this.externalFunction();
    }
    
    // internal
}
```

### Constructor
Is a special function that is invoked when a contract is first deployed. This could be via a transaction or another contract.

```
contract TestConstructor {
    
    string public state;
    bool public finished;
    
    function TestConstructor(string _state, bool someBool) {
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

### Events

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