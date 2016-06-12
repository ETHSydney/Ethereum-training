contract Access {

	/**
	 * Data structures
	 * members -- an array of addresses, useful for looping over
	 * member -- a mapping of addresses to Member objects
	 * Member -- a struct containing member details
	 */
	address[] public members;
  	mapping(address => Member) public member;

	struct Member {
    	uint joinDate;
    	bool exists;
		bool isSpecial;
  	}

  	/**
	 * Events: a cheaper option than storing all data on chain
	 * NewMember -- will call when new member joins
	 * Spend -- will call when contract funds spent
	 */
  	event NewMember(address newMember, uint joinDate, bool exists, bool isSpecial);
  	event Spend(uint date, address recipient, uint amount);

	/**
	 * Constructor -- adds msg.sender to membership, sets them as special
	 */
  	function Access(){
  		member[msg.sender] = Member(now, true, true);
		members.push(msg.sender);
		NewMember(msg.sender, member[msg.sender].joinDate, member[msg.sender].exists, member[msg.sender].isSpecial);
  	}

  	/**
	 * Function modifier -- only special members can execute _ block
	 */
  	modifier onlySpecial {
      if (member[msg.sender].isSpecial) {
        _
      }
  	}

  	/**
	 * Adds new members or sets existing members to special, onlySpecial can call
	 * @param {address} _nominee 
	 * @param {bool} _isSpecial
	 * @return {bool} success
	 */
  	function addMember(address _nominee, bool _isSpecial) onlySpecial returns (bool success){
  		if(!member[_nominee].exists){
  			member[_nominee] = Member(now, true, _isSpecial);
			members.push(_nominee);
			NewMember(_nominee, member[_nominee].joinDate, member[_nominee].exists, member[_nominee].isSpecial);
			return true;
  		} else if (member[_nominee].exists && _isSpecial){
  			member[_nominee].isSpecial = _isSpecial;
  			return true;
  		}
		return false;
  	}

  	/**
	 * Spends contract funds, onlySpecial can call
	 * @param {address} _recipient 
	 * @param {uint} _amount
	 * @return {bool} success
	 */
  	function spend(address _recipient, uint _amount) onlySpecial returns (bool success){
  		if(this.balance >= _amount){
  			_recipient.send(_amount);
  			Spend(now, _recipient, _amount);
  			return true;
  		} else {
  			return false;
  		}
  	}
}