
Fibonacci
```
contract Fibonacci {
    
    function calculate(uint position) returns (uint result) {
        if (position == 0)
            return 0;
        else if (position < 2)
            return 1;
        else 
            return calculate(position - 1) + calculate(position - 2);
    }
    
    function() {
        throw;
    }
}
```