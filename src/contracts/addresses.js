import helpers from './helpers'
const CORE_ADDRESSES = {
  METADATA_ADDRESS: '0xeed04ebc43cfd2e378e2b577bfab967f1c925c99',
  KEYS_MANAGER_ADDRESS: '0x14664d949ac085b5459bc98d22ede76479436c34',
  POA_ADDRESS: '0x035aE1A974e27D9cDa158056704c4bE761047616',
  MOC: '0xb1DC6cd0AfE4C4Fd6d16c8dE82E3077134123187'
}

export default (web3Config) => {
    let branch;
    
    switch (web3Config.netId) {
        case '77':
            branch = 'sokol'
            break;
        case '99':
            branch = 'core'
            break;
        default:
            branch = 'core'
            break;
    }
    return new Promise((resolve, reject) => {
        fetch(helpers.addressesURL(branch)).then((response) => { 
            response.json().then((json) => {
                resolve({addresses: json, web3Config});
            })
        }).catch(function(err) {
            let addr = helpers.addressesURL(branch);
            helpers.wrongRepoAlert(addr);
            reject(err);
        });
    })
}
