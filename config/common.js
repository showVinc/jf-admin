let version = 'v1'    //  版本
let branch = 'master'    //  要推送的分支
let http_url = ''
let http_api = ''
let dev_url = 'http://192.168.10.101'

switch(branch) {
  case 'dev':
    http_url = 'http://wwwdev.klocl.com:8000'
    http_api = 'http://apidev.klocl.com:8000'
    break;
  case 'master':
    http_url = 'http://119.28.41.251:8081'
    http_api = 'http://119.28.41.251:8082'
    break;
  case 'release':
    http_url = 'http://wwwrelease.klocl.com'
    http_api = 'http://apirelease.klocl.com'
    break;
  case 'online':
    http_url = 'http://www.klocl.com'
    http_api = 'http://api.klocl.com'
    break;
}

module.exports = {
  prov_url: {
    URL: `"${http_url}"`,
  },
  dev_url: {
    URL: `"${dev_url}:8065"`,
  },
  prov_api: {
    API: `"${http_api}/${version}"`,
  },
  dev_api: {
    API: `"${http_api}/${version}"`,
  }
}
