module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 7545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
      },
    },
  
    // Set default mocha options here, use special reporters, etc.
    mocha: {
      // timeout: 100000
    },
  
    // Configure your compilers
    compilers: {
      solc: {
        version: "0.8.0",      // Fetch exact version from solc-bin (default: truffle's version)
        // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
        settings: {          // See the solidity docs for advice about optimization and evmVersion
         optimizer: {
           enabled: false,
           runs: 200
         },
         evmVersion: "istanbul"
        }
      }
    },
  
    // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
    // Note: if you migrated your contracts prior to enabling this field in your project and want
    // those previously migrated contracts available in the .db directory, you will need to run
    // `truffle migrate --reset --compile-all`
    db: {
      enabled: false
    }
  };
  