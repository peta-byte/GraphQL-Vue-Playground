const axios = require('axios').default;
const mockUsersData = require('./mock-users.json').results;

const apiURL = 'https://randomuser.me/api/?format=json';
const users = [];
const nationalities = [];
const gender = [];
mockUsersData.forEach(user => {
  if (user && user.nat) {
    nationalities.push(user.nat);
  }
  if (user && user.gender) {
    gender.push(user.gender);
  }
});

const successResponse = {
  success: true,
  message: 'Executed successfully'
};

const failureResponse = {
  success: false,
  message: 'Executed unsuccessfully'
};

exports.resolvers = {
  Response: {
    __resolveType(response, context, info) {
      if (response.users) {
        return 'UsersResponse';
      }

      if (response.user) {
        return 'UserResponse';
      }

      if (response.gender || response.nationalities) {
        return 'DemographicsResponse';
      }

      return null;
    }
  },
  Query: {
    user: (_, args, context, info) => {
      let user = null;
      return axios({
        method: 'get',
        url: apiURL,
        responseType: 'json'
      })
        .then((res) => {
          if (res.data && res.data.results) {
            user = res.data.results[0];
          }
          return { ...successResponse, user };
        })
        .catch(err => {
          return { ...failureResponse, user, message: err };
        });
    },
    users: (_, args, context, info) => {
      let users = [];
      return axios({
        method: 'get',
        url: apiURL + '&results=5',
        responseType: 'json'
      })
        .then((res) => {
          if (res.data && res.data.results) {
            users = [...res.data.results];
            return { ...successResponse, users };
          }
          return { ...failureResponse, users };
        })
        .catch(err => {
          return { ...failureResponse, users, message: err };
        });
    },
    demographics: (_, args, context, info) => {
      let usersDetails = {};
      if (gender.length !== 0) {
        usersDetails['gender'] = [ ...gender ];
      }
      if (nationalities.length !== 0) {
        usersDetails['nationalities'] = [ ...nationalities ];
      }
      return Object.keys(usersDetails).length !== 0 ? { ...successResponse, ...usersDetails } : { ...failureResponse, nationalities: null, gender: null }
    },
    gender: (_, args, context, info) => {
      let usersDetails = {};
      let genderAlts = ['female', 'male'];
      if (gender.length !== 0) {
        usersDetails['gender'] = [ ...gender ];
        if (args && args.filter && genderAlts.includes(args.filter)) {
          usersDetails.gender = usersDetails.gender.filter(gender => gender === args.filter);
        }
      }
      return Object.keys(usersDetails).length !== 0 ? { ...successResponse, ...usersDetails } : { ...failureResponse, gender: null }
    },
    nationalities: (_, args, context, info) => {
      let usersDetails = {};
      if (nationalities.length !== 0) {
        usersDetails['nationalities'] = [ ...nationalities ];
      }
      return Object.keys(usersDetails).length !== 0 ? { ...successResponse, ...usersDetails } : { ...failureResponse, nationalities: null }
    }
  },
  Mutation: {
    addUser: (_, args, context, info) => {
      if (!args.gender || !args.name || !args.email) {
        return { ...failureResponse, user: null };
      }
      let nameArr = args.name.split(' ');
      let user = {
        ...mockUsersData[6].login.username,
        gender: args.gender,
        name: {
          title: nameArr.length === 3 ? nameArr[0] : '',
          first: nameArr.length === 3 ? nameArr[1] : nameArr[0],
          last: nameArr.length === 3 ? nameArr[2] : nameArr[1]
        },
        email: args.email,
        login: {
          uuid: "a8551c83-801d-4739-ac55-327e797ba36b",
          username: 'test2',
          password: '',
          salt: '',
          md5: '',
          sha1: '',
          sha256: ''
        }
      };
      users.push(user);
      return { ...successResponse, user };
    },
    removeUser: (_, args, context, info) => {
      let deletedUser;
      let usrIdx;
      if (args.username) {
        usrIdx = users.findIndex((user) => {
          return user.login.username === args.username;
        });
      }
      if (usrIdx !== undefined && usrIdx !== -1) {
        deletedUser = users.splice(usrIdx, 1);
      }
      return deletedUser ? { ...successResponse, user: deletedUser[0] } : { ...failureResponse, user: null };
    }
  }
};