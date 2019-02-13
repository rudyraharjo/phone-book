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
    MUT_GETTOKENSTORAGE(state, token) {
      state.Storagetoken = token
    },
    MUT_DESTROYTOKEN(state) {
      state.Storagetoken = null
    },
    // MUTATIONS PHONE NUMBER
    MUT_GETPHONENUMBER(state, payload){
      state.phoneNumber = payload
    },
    MUT_ADDPHONENUMBER(state, payload){
      state.phoneNumber.push(payload)
    },
    MUT_UPDATEPHONENUMBER(state, payload){
      const idx = state.phoneNumber.map(p => p.id).indexOf(payload.id)
      //console.log(idx, payload.id) // eslint-disable-line
      state.phoneNumber.splice(idx, 1, payload)
    },
    MUT_DELETEPHONENUMBER(state, payload){
      console.log(payload) // eslint-disable-line
      state.phoneNumber.splice(payload, 1)
    },
    // END MUTATIONS PHONE NUMBER
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
              
              context.commit('MUT_GETTOKENSTORAGE', data_token)

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
              context.commit('MUT_DESTROYTOKEN')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('StorageToken')
              context.commit('MUT_DESTROYTOKEN')
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
              context.commit('MUT_GETPHONENUMBER', response.data)
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
              context.commit('MUT_ADDPHONENUMBER', response.data.data)
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
              context.commit('MUT_UPDATEPHONENUMBER', response.data.data)
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
              context.commit('MUT_DELETEPHONENUMBER', credentials.index)
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
