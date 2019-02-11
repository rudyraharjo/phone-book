<template>
    
    <div class="dashboard">
        
        <v-snackbar v-model="snackbarMsg" :timeout="6000" top right color="error">
            <span>{{MsgValidation}}</span>
            <v-btn color="white" flat @click="snackbarMsg = false">Close</v-btn>
        </v-snackbar>
        
        <v-snackbar v-model="MsgSuccessRegister" :timeout="2500" top color="success">
            <span>{{MsgValidation}}</span>
            <v-btn color="white" flat @click="MsgSuccessRegister = false">Close</v-btn>
        </v-snackbar>

        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <!-- <v-toolbar-title v-if="this.err">{{this.err}}</v-toolbar-title> -->
                        <v-toolbar dark color="success">
                            <v-toolbar-title>Sign up</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>

                                <v-text-field prepend-icon="person" v-model="name" label="Name" type="text" :rules="nameRules">
                                </v-text-field>

                                <v-text-field prepend-icon="person" v-model="email" label="Email" type="email" :rules="emailRules">
                                </v-text-field>

                                <v-text-field id="password" v-model="password" prepend-icon="lock" label="Password" :rules="passwordRules" type="password">
                                </v-text-field>

                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="SignUp" :loading="loading" color="success">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    
</template>

<script>
    export default {
        data() {
            return {
                name:'',
                email:'',
                password:'',
                loading:false,
                snackbarMsg: false,
                MsgSuccessRegister:false,
                valid: true,
                nameRules: [
                    v => !!v || 'Name is required',
                ],
                emailRules: [
                    v => !!v || 'Email is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules:[
                    v => !!v || 'Password is required',
                ],
                MsgValidation:''
            }   
        },
        methods: {
            SignUp (){
                this.loading = true
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('Register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        role_id:2
                    })
                    .then((res)=>{
                        //console.log(res) // eslint-disable-line
                        this.MsgSuccessRegister = true
                        this.MsgValidation = res.data.message

                        setTimeout( () => this.$router.push({ name: 'signin'}), 3500);

                    }).catch(err=>{
                        
                        this.snackbarMsg = true
                        this.MsgValidation = err.data.message
                    })
                    .finally(()=>{
                        this.loading = false
                    })

                }
                
            }
        }
    }
</script>
