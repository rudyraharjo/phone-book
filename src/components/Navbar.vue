<template>
    <nav>

        <v-snackbar v-model="MsgLogout" :timeout="5000" top right color="success">
            <span>Successfully logged out</span>
            <v-btn color="white" flat @click="MsgLogout = false">Close</v-btn>
        </v-snackbar>
        
        <v-toolbar flat app>

            <v-toolbar-side-icon v-if="IsLoggin" @click="drawer = !drawer " class="grey--text"></v-toolbar-side-icon>
            
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Phone</span>
                <span>Number</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- <v-toolbar-items>
                
                <v-btn v-if="!IsLoggin" flat color="grey" router :to="{name: 'signin'}">
                    <span>Sign In</span>
                    <v-icon></v-icon>
                </v-btn>
                <v-btn v-if="IsLoggin" flat color="grey" @click="signout">
                    <span>Sign Out</span>
                    <v-icon>exit_to_app</v-icon>
                </v-btn>

            </v-toolbar-items> -->

        </v-toolbar>    

        <v-navigation-drawer v-if="IsLoggin" app v-model="drawer">
            <v-list>
                <v-layout column align-center>
                    <v-flex class="mt-5">
                            <v-avatar size="100">
                                <img class="text-lg-center" src="https://randomuser.me/api/portraits/lego/6.jpg">
                            </v-avatar>
                            
                            <p class="subheading mt-3">{{name}}</p>
                        
                    </v-flex>

                </v-layout>

                <v-list-tile v-for="link in menuSideNav" :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ link.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="signout">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Sign Out</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>  
</template>
<script>

    export default {
        data(){
            return {
                name: 'Rudy Raharjo',
                drawer: false,
                menuSideNav: [
                    { icon: 'dashboard', text: 'Dashboard', route: '/' },
                    { icon: 'contact_phone', text: 'Phone Number', route: '/contact' },
                ],
                snackbar: false,
                MsgLogout:false
            }
        },
        methods:{
            signout(){
                this.$store.dispatch('destroyToken')
                .then(() => {
                    //console.log(response) // eslint-disable-line
                    this.$router.push({ name: 'signin' })
                }).catch(err=>{
                    console.log(err) // eslint-disable-line
                }).finally(()=>{
                    this.MsgLogout= true;
                })
            }
        },
        computed:{
            IsLoggin(){
                return this.$store.getters.IsLoggin
            }
        },
    }
</script>
