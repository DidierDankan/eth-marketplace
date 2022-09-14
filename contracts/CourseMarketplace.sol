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
}
