
Fibonacci
```
contract Fibonacci {
    
    mapping(uint => uint) fibonaccis;

    function pureCalc(uint position) public returns (uint)
    {
        if (position == 0)
            return 0;
        else if (position < 2)
            return 1;
        
        return pureCalc(position - 1) + pureCalc(position - 2);
    }

    function persitentCalculate(uint position) public returns (uint)
    {
        if(fibonaccis[position] > 0) {
            return fibonaccis[position];
        }

        if (position == 0)
            return 0;
        else if (position < 2)
            return 1;
        
        fibonaccis[position] =  persitentCalculate(position - 1) + persitentCalculate(position - 2);

        return fibonaccis[position];
    }
}
```