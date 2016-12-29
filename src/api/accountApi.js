const axios = require('axios');
const Q = require("q");

const BASE_URL = 'http://localhost:3001/api/v1';

const getAccessToken = () => {
  // Retrieves the access token from localStorage
  const access_token = localStorage.getItem('access_token');
  return access_token;
};


class AccountApi {

  static getAllAccounts() {
    const deferred = Q.defer();
    const access_token = getAccessToken();
    if (!access_token) {
      // not initiallised just return empty array..
      setTimeout(function () {
        return deferred.resolve([]);
      }, 0);
    } else {
      axios.get(`${BASE_URL}/accounts`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }).then(response => {
        const accounts = response.data;
        return deferred.resolve(accounts);
      }).catch(err => {
        console.error(err);
        return deferred.reject(new Error(err));
      });
    }
    return deferred.promise;
  }


  static saveAccount(account) {

    const deferred = Q.defer();
    const access_token = getAccessToken();
    account = Object.assign({}, account);

    const minAccountEmailLength = 5;
    if (account.email.length < minAccountEmailLength) {
      return deferred.reject(new Error(`Email must be at least ${minAccountEmailLength} characters.`));
    }

    if (account.id) {

      //TODO UPDATE OPERATION - validate each property here...

      const config = {
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
        method: 'put',
        url: `${BASE_URL}/accounts/${account.id}`,
        data: account
      };

      axios(config).then(function (response) {
        console.log(response);
        return deferred.resolve(account);
      })
        .catch(function (err) {
          console.error(err);
          return deferred.reject(new Error(err));
        });

    } else {

      //TODO CREATE OPERATION - validate each property here...

      const config = {
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
        method: 'post',
        url: `${BASE_URL}/accounts`,
        data: account
      };
      axios(config).then(function (response) {
        console.log(response);
        const account = response.data;
        return deferred.resolve(account);
      })
        .catch(function (err) {
          console.error(err);
          return deferred.reject(new Error(err));
        });
    }

    return deferred.promise;
  }

  static deleteAccount(accountId) {

    const deferred = Q.defer();
    const access_token = getAccessToken();

    const config = {
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
      method: 'delete',
      url: `${BASE_URL}/accounts/${accountId}`
    };

    axios(config).then(function (response) {
      console.log(response);
      return deferred.resolve(accountId);
    })
      .catch(function (err) {
        console.error(err);
        return deferred.reject(new Error(err));
      });

    return deferred.promise;
  }

}

export default AccountApi;
