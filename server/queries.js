exports = {
    user: `
    query getUser {
        code
        message
        success
        user {
            user {
                gender
                name {
                    title
                    first
                    last
                }
                email
            }
        }
    }`,
    users: `
    query getUsers {
        users {
            code
            message
            success
            users {
                gender
                name {
                    title
                    first
                    last
                }
                email
            }
        }
    }
    `,
    demographics: `
    query getUsersDemographics {
        demographics {
            code
            message
            success
            nationalities
            gender 
        }
    }
    `,
    gender: `
    query getUsersGender {
        gender {
            success
            code
            message
            gender 
        }
    }
    `,
    nationalities: `
    query getUsersNationalities {
         nationalities {
            code
            message
            success
            nationalities 
        }
    }
    `,
    mergedDemographics: `
    query getUsersMergedDemographics {
        code
        success
        message
        nationalities {
           code
           message
           success
           nationalities 
       }
       gender {
           code
           message
           success
           gender
       }
   }
    `,
    aliasedGender: `
    query getUsersAliasedGender {
        male: gender(filter: "male") {
           code
           message
           success
           gender
       }
       female: gender(filter: "female") {
           code
           message
           success
           gender
       }
   }    
    `
};