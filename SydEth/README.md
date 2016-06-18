# Tutorial requirements
* Windows, Linux or Mac OS X
* nodeJS
* npm


# Testrpc - Ethereum client for development
## Official github
https://github.com/ethereumjs/testrpc
## Installation

### OSX & Linux
$ npm install -g ethereumjs-testrpc

### Windows
[Windows install instructions](https://github.com/ethereumjs/testrpc/wiki/Installing-TestRPC-on-Windows).

## Usage
```Bash
$ testrpc <options>
```

Options:

* `-a` or `--accounts`: Specify the number of accounts to generate at startup.
* `-d` or `--deterministic`: Generate deterministic addresses based on a pre-defined mnemonic.
* `-m` or `--mnemonic`: Use a specific HD wallet mnemonic to generate initial addresses.
* `-p` or `--port`: Port number to listen on.
* `-s` or `--seed`: Use arbitrary data to generate the HD wallet mnemonic to be used.
* `--debug`: Output VM opcodes for debugging

# Official Truffle Github
https://github.com/ConsenSys/truffle
## Installation
npm install -g truffle
