# Delegatecall Attack
This contract has the ff contracts:
    - DelegateAttackble : contract that calls a target contract (`HelperDelegateCallVulnerable`) susceptible to delegate call attack
    - DelegateResistant: contract that calls a target contract (`HelperDelegateCallAttackResistant`) that delegate call attack resistant
    - HelperDelegateCallVulnerable: a target contract that is delegate call vulnerable
    - HelperDelegateCallAttackResistant: a target contract that is delegate call resistant
    - Attack : a contract that exploits delegate call vulnerability