
# Tutorial exercises

## Betting contract
Create a betting contract that will receive bets on the outcome of a coin toss from different gamblers. Each bet will include the expected result and funds at stake.

The contract keeps track of the gamblers stake and on recieving the result pays out to the winning gamblers.

### First version
* Just have two gamblers
* if they bet on the same outcome then they get their money back
* the funds at stake can be a some token of value rather than Ether

### Enhancements that can be made
* There can be multiple gamblers who put funds into a pool
* the winners receive a propotional share of the total funds at stake
* the result can only be entered by the creater of the contract
* the creater of the contract receive a fixed percentage of the pot. eg 1%
* add a function to close off the betting. ie no more bets
* make the funds at stake to be Ether rather than some token
* create events for when
  * a bet is made
  * the betting is closed
  * the result is entered
* Automatically close the betting after a point in time set at contract creation
* have multiple outcomes rather than just a binary result. eg a winning horse in a race
* Add another contract to be the trusted Oracle of betting results

## Fibonacci numbers
Fibonacci numbers are the numbers in the following integer sequence
1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...

Mathematically
```F(n) = F(n-1) + F(n-2)```
where F(1) and F(2) = 1

### Exercise
* Create a function to return the fibonacci number in a position (n) in the sequence

Pseudo code
```
function(integer n)
{
  if n = 0
    return 0
  else if n < 2
    return 1
  else
    return f(n-1) + f(n-2)
}
```

### Enhancements
* Publish an event when a fibonacci number is calculated
* Persist the result of a fibonacci number if it hasn't been calculated before

