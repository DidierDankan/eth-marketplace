// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Marketplace {
    enum State {
        Purchased, // 0
        Activated, // 1
        Deactivated // 2
    }

    //for each course
    struct Course {
        //meaning of the 32 byte is for the storage, that each slot takes 32 bytes
        uint256 id; // 32 byte
        uint256 price; // 32 byte
        bytes32 proof; //unic string contructed by the user, will identify the user 32 byte
        address owner; // user owner of the course 20 byte
        State state; // 1 byte
    }

    // mapping of courseID to courseHash
    mapping(uint256 => bytes32) private ownedCourseHash;
    // mapping of courseHash to Course data
    mapping(bytes32 => Course) private ownedCourses;

    // number of all courses + id of courses
    uint256 private totalOwnedCourses; // this will be a sort of courseId

    address payable private admin;

    constructor() {
        setContractOwner(msg.sender);
    }

    // with three "/" we create the error msg! amazing...

    /// Course has already a Owner!
    error CourseHasOwner();

    /// Only owner has access!
    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        //this is made to make sure a user buy only one time the course, when user buy we use the courseId + address of user to form a hashed string, if the user trys to buy same course again it will create same hash again
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        if (hasCourseOwnership(courseHash)) {
            revert CourseHasOwner();
        }

        uint256 id = totalOwnedCourses++;

        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getCourseCount() external view returns (uint256) {
        return totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint256 index)
        external
        view
        returns (bytes32)
    {
        return ownedCourseHash[index];
    }

    function getCourseByHash(bytes32 courseHash)
        external
        view
        returns (Course memory)
    {
        return ownedCourses[courseHash];
    }

    function getContractOwner() public view returns (address) {
        return admin;
    }

    function setContractOwner(address newOwner) private {
        admin = payable(newOwner);
    }

    function hasCourseOwnership(bytes32 courseHash)
        private
        view
        returns (bool)
    {
        return ownedCourses[courseHash].owner == msg.sender;
    }
}
