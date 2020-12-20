Vue.prototype.$http = axios;

const user = new Vue({
  el: '#user',
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    axios.get('http://localhost:4000/user')
    .then(results => {
      this.user = results.data;
    })
    .catch(error => {
      // handle error
    })
    .finally(() => {
      // all done
    }) 
  }
});

const users = new Vue({
  el: '#users',
  data() {
    return {
      users: []
    }
  },
  mounted() {
    axios.get('http://localhost:4000/users')
    .then(results => {
      this.users = results.data;
    })
    .catch(error => {
      // handle error
    })
    .finally(() => {
      // all done
    })  
  }
});

const demographics = new Vue({
  el: '#demographics',
  data() {
    return {
      gender: [],
      nationalities: []
    }
  },
  mounted() {
    axios.get('http://localhost:4000/demographics')
    .then(results => {
      this.gender = results.data.gender;
      this.nationalities = results.data.nationalities;
    })
    .catch(error => {
      // handle error
    })
    .finally(() => {
      // all done
    })  
  }
});

const gender = new Vue({
  el: '#gender',
  data() {
    return {
      gender: []
    }
  },
  mounted() {
    axios.get('http://localhost:4000/gender')
    .then(results => {
      this.gender = results.data;
    })
    .catch(error => {
      // handle error
    })
    .finally(() => {
      // all done
    })  
  }
});

const nationalities = new Vue({
  el: '#nationalities',
  data() {
    return {
      nationalities: []
    }
  },
  mounted() {
    axios.get('http://localhost:4000/nationalities')
    .then(results => {
      this.nationalities = results.data;
    })
    .catch(error => {
      // handle error
    })
    .finally(() => {
      // all done
    })  
  }
});