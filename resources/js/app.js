import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import Permissions from './mixins/Permission.js'
Vue.mixin(Permissions)

import { mapActions, mapGetters, mapState } from 'vuex'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)

import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
    el: '#laundry',
    router,
    store,
    components: {
        App
    },
    computed: {
        ...mapState('user', {
            authenticated: state => state.authenticated //MENGAMBIL STATE AUTHENTICATED
        }),
        ...mapState(['token']),
        ...mapGetters(['isAuth'])
    },
    methods: {
        ...mapActions('user', ['getUserLogin']),
        ...mapActions('notification', ['getNotifications']), //DEFINISIKAN FUNGSI UNTUK MENGAMBIL NOTIFIKASI DARI TABLE NOTIFICATIONS
        ...mapActions('expenses', ['getExpenses']), //FUNGSI UNTUK MENGAMBIL EXPENSES YANG BARU
          //METHOD INI UNTUK MENGISIASI LISTER MENGGUNAKAN LARAVEL ECHO
          initialLister() {
            //JIKA USER SUDAH LOGIN
            if (this.isAuth) {
                //MAKA INISIASI FUNGSI BROADCASTER DENGAN KONFIGURASI BERIKUT
                window.Echo = new Echo({
                    broadcaster: 'pusher',
                    key: process.env.MIX_PUSHER_APP_KEY, //VALUENYA DI AMBIL DARI FILE .ENV
                    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
                    encrypted: false,
                    auth: {
                        headers: {
                            Authorization: 'Bearer ' + this.token
                        },
                    },
                });
    
                if (typeof this.authenticated.id != 'undefined') {
                    //KEMUDIAN KITA MENGAKSES CHANNEL BROADCAST SECARA PRIVATE
                    window.Echo.private(`App.User.${this.authenticated.id}`)
                    .notification(() => {
                        //APABILA DITEMUKAN, MAKA KITA MENJALANKAN KEDUA FUNGSI INI
                        //UNTUK MENGAMBIL DATA TERBARU
                        this.getNotifications()
                        this.getExpenses()
                    })
                }
            }
        }
    },
    watch: {
        //KITA WATCH KETIKA VALUE TOKEN BERUBAH, MAKA 
        token() {
            this.initialLister() //KITA JALANKAN FUNGSI UNTUK MENGINISIASI LAGI
        },
        //KETIKA VALUE USER YANG SEDANG LOGIN BERUBAH
        authenticated() {
            this.initialLister() //KITA JALANKAN LAGI
        }
    },
    created() {
        if (this.isAuth) {
            this.getUserLogin().then(() => {
                if (!this.authenticated.permission.includes(this.$route.meta.permissions)){
                    this.$router.push('/');

                }
            }) //REQUEST DATA YANG SEDANG LOGIN
            this.initialLister()
        } else {
            this.$router.push({ name: 'login' })
        }
    }
})