import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost/smec/public/api'

export default new Vuex.Store({
  state: {
    title:'Test State',
    Storagetoken: JSON.parse(localStorage.getItem('StorageToken')) || null,
    phoneNumber: null,
    todos: [
      { id: 1, text: 'text 1', done: true },
      { id: 2, text: 'text 2', done: false }
    ]
  },
  getters:{
    IsLoggin(state){
      return state.Storagetoken !== null
    },
    phoneNumber(state){
      return state.phoneNumber
    }
  },
  mutations: {
    getTokenStorage(state, token) {
      state.Storagetoken = token
    },
    destroyToken(state) {
      state.Storagetoken = null
    },
    getPhoneNumber(state, payload){
      //console.log(payload.length) // eslint-disable-line
      if(state.phoneNumber !== null){
        state.phoneNumber.push(payload)
      }else {
        state.phoneNumber = payload
      }
    },
    deletePhoneNumber(state, payload){
      state.phoneNumber.splice(payload, 1)
    },
  },
  actions: {
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/auth/signin', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            //console.log(response.data.data.token) // eslint-disable-line

            if(response.data.success){

              //console.log(response.data.data) // eslint-disable-line
              const data_token = response.data.data.token
              
              localStorage.setItem('StorageToken', JSON.stringify(data_token))
              
              context.commit('getTokenStorage', data_token)

              resolve(response) 
            } else {
              reject(response) 
            }
            
          })
          .catch(error => {
            reject(error)
          })
        });
    },
    Register(context, credentials){
      //console.log(credentials); // eslint-disable-line

      return new Promise((resolve, reject)=>{
        
        axios.post('/auth/signup', {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          role_id: credentials.role_id,
        })
        .then(response => {

          if(response.data.success){
            resolve(response) 
          } else {
            reject(response) 
          }
          
        })
        .catch(error => {
          reject(error)
        })

      });

    },
    destroyToken(context) {
      
      const Type = context.state.Storagetoken.token_type
      const Token = context.state.Storagetoken.access_token
      
      axios.defaults.headers.common['Authorization'] = Type +' '+ Token
      
      if (context.getters.IsLoggin) {

        return new Promise((resolve, reject) => {
          axios.post('/auth/logout')
            .then(response => {
              localStorage.removeItem('StorageToken')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('StorageToken')
              context.commit('destroyToken')
              reject(error)
            })
        });

      }
    },
    getPhoneNumber(context){
      
      const Type = context.state.Storagetoken.token_type
      const Token = context.state.Storagetoken.access_token
      
      axios.defaults.headers.common['Authorization'] = Type +' '+ Token

      if (context.getters.IsLoggin) {

        return new Promise((resolve, reject) => {
          axios.get('/phonenumber/all')
            .then(response => {
              context.commit('getPhoneNumber', response.data)
              //resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        });

      }
    },
    PhonenumberStore(context, credentials){

      const Type = context.state.Storagetoken.token_type
      const Token = context.state.Storagetoken.access_token
      
      axios.defaults.headers.common['Authorization'] = Type +' '+ Token
      
      if (context.getters.IsLoggin) {

        return new Promise((resolve, reject) => {

          axios.post('/phonenumber/store', {
            name: credentials.name,
            phone: credentials.phone,
            email: credentials.email,
          })
          .then(response => {
            if(response.data.success){
              resolve(response) 
              context.commit('getPhoneNumber', response.data.data)
            } else {
              reject(response) 
            }
              
          })
          .catch(error => {
            reject(error)
          })

        });

      }

    },
    PhonenumberUpdate(context, credentials){

      const Type = context.state.Storagetoken.token_type
      const Token = context.state.Storagetoken.access_token
      
      axios.defaults.headers.common['Authorization'] = Type +' '+ Token
      
      if (context.getters.IsLoggin) {

        return new Promise((resolve, reject) => {

          axios.post('/phonenumber/update', {
            name: credentials.name,
            phone: credentials.phone,
            email: credentials.email,
            id: credentials.id
          })
          .then(response => {
            if(response.data.success){
              resolve(response) 
            } else {
              reject(response) 
            }
              
          })
          .catch(error => {
            reject(error)
          })

        });

      }

    },
    deletePhoneNumber(context, credentials){
      
      const Type = context.state.Storagetoken.token_type
      const Token = context.state.Storagetoken.access_token
      
      axios.defaults.headers.common['Authorization'] = Type +' '+ Token
      
      if (context.getters.IsLoggin) {

        return new Promise((resolve, reject) => {

          axios.post('/phonenumber/delete', {
            id: credentials.id
          })
          .then(response => {
            if(response.data.success){
              resolve(response) 
              context.commit('deletePhoneNumber', credentials.index)
            } else {
              reject(response) 
            }
              
          })
          .catch(error => {
            reject(error)
          })

        });

      }

    }
  }
})
