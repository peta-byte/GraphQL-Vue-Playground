const { gql } = require('apollo-server-express');

exports.typeDefinitions = gql`
  type Query {
    user: UserResponse
    users: UsersResponse
    demographics: DemographicsResponse
    gender(filter: String): DemographicsResponse
    nationalities: DemographicsResponse
  } 

  type Mutation {
    addUser(gender: String!, name: String!, email: String!): UserResponse
    removeUser(username: String!): UserResponse
  }

  type User {
    gender: String!
    name: Name!
    location: Location
    email: String!
    login: Login
    dob: DateAge
    registered: DateAge
    phone: String
    cell: String
    id: UserID
    picture: Picture
    nat: String
  }

  type Name {
    title: String
    first: String
    last: String
  }

  type Street {
    number: Int
    name: String
  }

  type Coordinates {
    latitude: String
    longitude: String
  }

  type Timezone {
    offset: String
    description: String
  }  

  type Location {
    street: Street
    city: String
    state: String
    country: String
    postcode: String
    coordinates: Coordinates
    timezone: Timezone    
  } 
  
  type Login {
    uuid: String
    username: String
    password: String
    md5: String
    sha1: String
    sha256: String
    salt: String
  }
  
  type DateAge {
    date: String
    age: Int
  }

  type UserID {
    name: String
    value: String
  }   

  type Picture {
    large: String
    medium: String
    thumbnail: String
  }
  
  interface Response {
    code: String
    success: Boolean!
    message: String!
  }

  type UserResponse implements Response {
    code: String
    success: Boolean!
    message: String!
    user: User
  }

  type UsersResponse implements Response {
    code: String
    success: Boolean!
    message: String!
    users: [User]
  }

  type DemographicsResponse implements Response {
    code: String
    success: Boolean!
    message: String!
    nationalities: [String]
    gender: [String]
  }
`;