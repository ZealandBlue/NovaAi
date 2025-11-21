// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract TradingAuthorization {
    struct UserConfig {
        bool registered;
        bool autonomousEnabled;
        uint256 stakedAmount;
        uint256 maxPositionSizeBps;
        uint256 maxLeverageBps;
    }

    mapping(address => UserConfig) public users;

    event Registered(address indexed user);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event AutonomousToggled(address indexed user, bool enabled);

    function register() external {
        UserConfig storage cfg = users[msg.sender];
        require(!cfg.registered, "already registered");
        cfg.registered = true;
        cfg.maxPositionSizeBps = 5000;
        cfg.maxLeverageBps = 30000;
        emit Registered(msg.sender);
    }

    function stake() external payable {
        require(users[msg.sender].registered, "not registered");
        require(msg.value > 0, "no value");
        users[msg.sender].stakedAmount += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    function unstake(uint256 amount) external {
        UserConfig storage cfg = users[msg.sender];
        require(cfg.stakedAmount >= amount, "insufficient stake");
        cfg.stakedAmount -= amount;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "transfer failed");
        emit Unstaked(msg.sender, amount);
    }

    function setAutonomousEnabled(bool enabled) external {
        require(users[msg.sender].registered, "not registered");
        users[msg.sender].autonomousEnabled = enabled;
        emit AutonomousToggled(msg.sender, enabled);
    }

    function updateLimits(uint256 maxPositionSizeBps, uint256 maxLeverageBps) external {
        require(users[msg.sender].registered, "not registered");
        require(maxPositionSizeBps <= 10000, "invalid pos size");
        require(maxLeverageBps <= 100000, "invalid lev");
        users[msg.sender].maxPositionSizeBps = maxPositionSizeBps;
        users[msg.sender].maxLeverageBps = maxLeverageBps;
    }

    function isAutonomousAllowed(address user) external view returns (bool) {
        UserConfig memory cfg = users[user];
        return cfg.registered && cfg.autonomousEnabled && cfg.stakedAmount > 0;
    }
}
