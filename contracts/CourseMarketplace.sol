// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Marketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
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
    uint256 private totalOwnedCourses;

    //admin of courses
    address payable private owner;

    // this runs when the contract is deployed setting the owner of the contract
    constructor() {
        setContractOwner(msg.sender);
    }

    // with three "/" we create the error msg

    /// Course has already a Owner!
    error CourseHasOwner();

    /// Only owner has access!
    error OnlyOwner();

    ///Course has invalid state!
    error InvalidState();

    ///Course is does not exist!
    error CourseIsNotCreated();

    // a modifier, we can use it in the parameter of the function like we do in transferOwnership()
    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        //this is creating a hashed string with the course id + msg.sender(account buying the course) and it works as a identifier
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

        //this is made to make sure a user buy only one time the course, when user buy we use the courseId + address of user to form a hashed string, if the user trys to buy same course again it will create same hash again
        if (hasCourseOwnership(courseHash)) {
            revert CourseHasOwner();
        }

        uint256 id = totalOwnedCourses++;

        ownedCourseHash[id] = courseHash;
        //we use the courseHash as key of each element
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    // activate the course after you buy it
    function activateCourse(bytes32 courseHash) external onlyOwner {
        if (!isCourseCreated(courseHash)) {
            revert CourseIsNotCreated();
        }

        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Purchased) {
            revert InvalidState();
        }

        course.state = State.Activated;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    //we use this function in manageCoursesHandler
    function getCourseCount() external view returns (uint256) {
        return totalOwnedCourses;
    }

    //we use this function in manageCoursesHandler
    function getCourseHashAtIndex(uint256 index)
        external
        view
        returns (bytes32)
    {
        return ownedCourseHash[index];
    }

    //this function is used to find all the courses a account own, we use it in ownedCoursesHandler.js && manageCoursesHandler
    function getCourseByHash(bytes32 courseHash)
        external
        view
        returns (Course memory)
    {
        return ownedCourses[courseHash];
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    function isCourseCreated(bytes32 courseHash) private view returns (bool) {
        return
            ownedCourses[courseHash].owner !=
            0x0000000000000000000000000000000000000000;
    }

    function hasCourseOwnership(bytes32 courseHash)
        private
        view
        returns (bool)
    {
        return ownedCourses[courseHash].owner == msg.sender;
    }
}
