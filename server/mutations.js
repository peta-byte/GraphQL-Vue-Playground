exports.mutations = {
  addUser: `
    mutation addUser {
      addUser(gender: "female", name: "Adhis Wanjiru", email: "adhis.wanjiru@testuser.com") {
        code
        message
        success
        user {
          gender
          name {
            title
            first
            last
          }
          email
    		  dob {
            age
            date
          }
    		  registered {
            date
            age
          }
    		  login {
            uuid
            username
            password
            md5
            sha1
            sha256
            salt
          }
    		  location {
            street {
              number
              name
            }
            city
            state
            country
            postcode
            coordinates {
              latitude
              longitude
            }
            timezone {
              offset
              description
            }
          }
    		  phone
    		  cell
    		  id {
            name
            value
          }
    		  nat
    		  picture {
            large
            medium
            thumbnail
          }
        }
      }       
  }
    `,
  removeUser: `
    mutation removeUser {
      removeUser(username: "test") {
        code
        success
        message
        user {
          login {
            username
          }
          gender
          name {
            title
            first
            last
          }
          email
    		  dob {
            age
            date
          }
    		  registered {
            date
            age
          }    		
        }
    }       
  }
    `
};
