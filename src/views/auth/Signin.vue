<template>
    
    <div class="signin">
        
        <v-snackbar v-model="snackbarMsg" :timeout="6000" top right color="error">
            <span>{{MsgValidation}}</span>
            <v-btn color="white" flat @click="snackbarMsg = false">Close</v-btn>
        </v-snackbar>
        
        <v-container fluid>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <!-- <v-toolbar-title v-if="this.err">{{this.err}}</v-toolbar-title> -->
                        <v-toolbar dark color="success">
                            <v-toolbar-title>Sign in</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field prepend-icon="person" v-model="email" label="Email" type="text" :rules="emailRules">
                                </v-text-field>
                                <v-text-field id="password" v-model="password" prepend-icon="lock" label="Password" :rules="passwordRules" type="password">
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="doLogin" :loading="loading" color="success">Login</v-btn>
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
                email:null,
                password:null,
                loading:false,
                snackbarMsg: false,
                valid: true,
                response:null,
                emailRules: [
                    v => !!v || 'E mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules:[
                    v => !!v || 'Password is required',
                ],
                MsgValidation:[]
            }   
        },
        methods: {
            doLogin (){
                if (this.$refs.form.validate()) {
                    this.loading = true
                    this.$store.dispatch('retrieveToken', {
                        email: this.email,
                        password: this.password,
                    })
                    .then(()=>{
                        this.$router.push({ name: 'dashboard' })
                    }).catch(err=>{
                    
                        this.snackbarMsg = true
                        this.MsgValidation = err.data.message
                        this.loading = false
                    })
                    .finally(()=>{
                        this.loading = false
                    })

                }
                
            }
        }
    }
</script>
