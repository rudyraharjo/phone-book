<template>
  <div class="contact">

    <v-snackbar v-model="SnackbarSuccess" :timeout="2500" top color="success">
      <span>{{MsgSuccess}}</span>
      <v-btn color="white" flat @click="SnackbarSuccess = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="SnackbarError" :timeout="2500" top color="danger">
        <span>{{MsgError}}</span>
        <v-btn color="white" flat @click="SnackbarError = false">Close</v-btn>
    </v-snackbar>
    
    <v-container fluid class="my-5">

      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('email')" slot="activator">
            <v-icon small left>person</v-icon>
            <span class="caption text-lowercase">By Email</span>
          </v-btn>
          <span>Sort by Email</span>
        </v-tooltip>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-btn slot="activator" color="success" dark class="mb-2">Add Phone Number</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-form ref="form" v-model="valid" lazy-validation>
                    
                        <v-layout wrap>
                        
                            <v-flex xs12>
                                <v-text-field ref="name" v-model="editedItem.name" :rules="nameRules" label="Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field ref="phone" v-model="editedItem.phone" :rules="phoneRules" label="Phone"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field ref="email" v-model="editedItem.email" :rules="emailRules" label="Email"></v-text-field>
                            </v-flex>
                        
                        </v-layout>
                    </v-form>
                </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="danger darken-1" @click="close">Cancel</v-btn>
              <v-btn color="success" :loading="loading" @click="SaveContact">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-layout>
      
        <v-card flat v-for="item in phonenumber" :key="item.id">
          <v-layout row wrap class="pa-3 project">
            <v-flex xs12 md6>
              <div class="caption grey--text">Name</div>
              <div>{{ item.name }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Email</div>
              <div>{{ item.email }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Phone</div>
              <div>{{ item.phone }}</div>
            </v-flex>
            <v-flex xs2 sm4 md2>
              <div class="right">
                <v-chip small class="danger caption" @click="deleteItem(item)">delete</v-chip>
                <v-chip small class="success white--text my-2 caption" @click.prevent="editItem(item)">edit</v-chip>
              </div>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card>

    </v-container>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        search:'',
        loading:false,
        valid:true,
        dialog: false,
        SnackbarSuccess:false,
        SnackbarError:false,
        MsgSuccess:null,
        MsgError:null,
        editedItem: {
            name: '',
            phone: '',
            email: ''
        },
        nameRules: [
            v => !!v || 'Name is required',
        ],
        phoneRules: [
            v => !!v || 'Phone is required',
        ],
        emailRules: [
            v => !!v || 'Email is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        editedIndex: -1,
      }
    },
    methods: {
      sortBy(prop){
        this.$store.getters.phoneNumber.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
      },
      loadPhoneNumber(){
        //console.log('loadPhoneNumber')
       //this.$store.dispatch('getPhoneNumber')
      },
      close () {
          this.dialog = false
          setTimeout(() => {
              this.editedItem = Object.assign({}, this.defaultItem)
              this.editedIndex = -1
          }, 300)
      },
      SaveContact() {
          
          if (this.editedIndex > -1) {
              
              if (this.$refs.form.validate()) {
                
                this.loading = true

                this.$store.dispatch('PhonenumberUpdate', {
                  name: this.editedItem.name,
                  phone: this.editedItem.phone,
                  email: this.editedItem.email,
                  id:this.editedItem.id,
                  editedIndex:this.editedIndex
                })
                .then((res)=>{
                  this.close()
                  this.SnackbarSuccess = true
                  this.MsgSuccess = res.data.messages
                  //Object.assign(this.phonenumber[this.editedIndex], this.editedItem)
                }).catch(err=>{
                  //console.log(err) // eslint-disable-line
                  this.close()
                  this.SnackbarError = true
                  this.MsgError = err.data.messages
                })
                .finally(()=>{
                  this.loading = false
                });

              }
              
          } else {

              if (this.$refs.form.validate()) {
                  
                  this.loading = true
                  this.$store.dispatch('PhonenumberStore', {
                      name: this.editedItem.name,
                      phone: this.editedItem.phone,
                      email: this.editedItem.email,
                  })
                  .then((res)=>{
                      this.close()
                      this.SnackbarSuccess = true
                      this.MsgSuccess = res.data.messages
                  }).catch(err=>{
                      this.close()
                      this.SnackbarError = true
                      this.MsgError = err.data.messages
                  })
                  .finally(()=>{
                      this.loading = false
                  })

              }
          }
      },
      deleteItem (item) {
        const index = this.phonenumber.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.deleteListPhoneNumber(index, item.id)
      },
      deleteListPhoneNumber(index, id){

        this.$store.dispatch('deletePhoneNumber',{
          index:index,
          id:id
        })
        .then((res) => {
            this.MsgSuccess = true
            this.MsgSuccess = res.data.messages
        }).catch(err=>{
            this.SnackbarError = true
            this.MsgError = err.data.messages
        });

      },
      editItem(item){
        
        this.editedIndex = this.phonenumber.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true

      },
    },
    created () {
      //console.log("created")
      //this.loadPhoneNumber()
      this.$store.dispatch('getPhoneNumber')
    },
    mounted(){
      //console.log('mounted') // eslint-disable-line
    },
    computed: {
      phonenumber () {
        return this.$store.getters.phoneNumber
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Add Phone Number' : 'Edit Phone Number'
      }
    }
  }
</script>