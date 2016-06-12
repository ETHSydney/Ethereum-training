contract Access {
	
	address[] public members;
  	mapping(address => Member) public member;

	struct Member {
    	uint joinDate;
    	bool exists;
		bool isSpecial;
  	}

  	event NewMember(address newMember, uint joinDate, bool exists, bool isSpecial);
  	event Spend(address recipient, uint amount);

  	function Access(){
  		member[msg.sender] = Member(now, true, true);
		members.push(msg.sender);
		NewMember(msg.sender, member[msg.sender].joinDate, member[msg.sender].exists, member[msg.sender].isSpecial);
  	}

  	modifier onlySpecial {
      if (member[msg.sender].isSpecial) {
        _
      }
  	}

  	function addMember(address _nominee, bool _isSpecial) onlySpecial returns (bool success){
  		if(!member[_nominee].exists){
  			member[_nominee] = Member(now, true, _isSpecial);
			members.push(_nominee);
			NewMember(_nominee, member[_nominee].joinDate, member[_nominee].exists, member[_nominee].isSpecial);
			return true;
  		}
		return false;
  	}

  	function spend(address _recipient, uint _amount) onlySpecial returns (bool success){
  		if(this.balance >= _amount){
  			_recipient.send(_amount);
  			Spend(_recipient, _amount);
  			return true;
  		} else {
  			return false;
  		}
  	}
}