<template>
    <nav>

        <v-snackbar v-model="MsgLogout" :timeout="5000" top right color="success">
            <span>Successfully logged out</span>
            <v-btn color="white" flat @click="MsgLogout = false">Close</v-btn>
        </v-snackbar>
        
        <!-- 
        <v-toolbar flat app>

            <v-toolbar-side-icon v-if="IsLoggin" @click="drawer = !drawer " class="grey--text"></v-toolbar-side-icon>
            
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Phone</span>
                <span>Number</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn v-if="!IsLoggin" flat color="grey" router :to="{name: 'signin'}">
                    <span>Sign In</span>
                    <v-icon></v-icon>
                </v-btn>
                <v-btn v-if="IsLoggin" flat color="grey" @click="signout">
                    <span>Sign Out</span>
                    <v-icon>exit_to_app</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>     
        -->

        <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click="drawer = !drawer "></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">Contacts</span>
            </v-toolbar-title>
            <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down">

            </v-text-field>
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn> -->
            <v-menu bottom left>
                <v-btn slot="activator" dark icon>
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-title>My Account</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="signout">
                        <span>Sign Out</span>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <!-- <v-btn icon large>
                <v-avatar size="32px" tile>
                <img src="https://vuetifyjs.com/static/doc-images/logo.svg" alt="Vuetify">
                </v-avatar>
            </v-btn> -->
        </v-toolbar>

        <!-- <v-navigation-drawer v-if="IsLoggin" app v-model="drawer">
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
        </v-navigation-drawer> -->

        <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
            <v-list dense>
                <template v-for="(item, i) in items">
                    <v-layout row v-if="item.heading" align-center :key="item.i">
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
                    <v-divider dark v-else-if="item.divider" class="my-3" :key="i"></v-divider>
                    <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="(child, i) in item.children" :key="i" router :to="child.route">
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else router :to="item.route" :key="item.text">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>

    </nav>  
</template>
<script>

    export default {
        data(){
            return {
                name: 'Rudy Raharjo',
                drawer: null,
                menuSideNav: [
                    { icon: 'dashboard', text: 'Dashboard', route: '/' },
                    { icon: 'contact_phone', text: 'Phone Number', route: '/contact' },
                ],
                snackbar: false,
                MsgLogout:false,
                items: [
                    { icon: 'dashboard', text: 'Dashboard', route: '/' },
                    // { heading: 'Labels' },
                    // { icon: 'add', text: 'Create new label' },
                    // { divider: true },
                    { icon: 'contacts', text: 'Contacts', route: '/contact' },
                    { icon: 'history', text: 'Frequently contacted', route: '/Frequentlycontacted' },
                    // { icon: 'content_copy', text: 'Duplicates',  route: '/duplicate'},
                    // {
                    //     icon: 'keyboard_arrow_up',
                    //     'icon-alt': 'keyboard_arrow_down',
                    //     text: 'Labels',
                    //     model: true,
                    //     children: [
                    //         { icon: 'add', text: 'Create label', route: '/createlabel' }
                    //     ]
                    // },
                    // {
                    //     icon: 'keyboard_arrow_up',
                    //     'icon-alt': 'keyboard_arrow_down',
                    //     text: 'More',
                    //     model: false,
                    //     children: [
                    //         { text: 'Import' },
                    //         { text: 'Export' },
                    //         { text: 'Print' },
                    //         { text: 'Undo changes' },
                    //         { text: 'Other contacts' }
                    //     ]
                    // },
                    // { icon: 'settings', text: 'Settings', route: '/settings' },
                    // { icon: 'help', text: 'Help', route: '/help' },
                ],

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
