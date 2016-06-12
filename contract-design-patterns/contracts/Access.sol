contract Access {
	
	address[] public members;
  	mapping(address => Member) public member;

	struct Member {
    	uint joinDate;
    	bool exists;
    	bool isSpecial;
    	address[] endorsements;
  	}

  	function Access(){
  		address[] memory endorsements;
  		member[msg.sender] = Member(now, true, true, endorsements);
      	members.push(msg.sender);
  	}

  	modifier onlySpecial {
      if (!member[msg.sender].isSpecial) {
        throw;
      }
      _
  	}
}