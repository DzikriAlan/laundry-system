<template>
  <div class="col-md-12">
      <div class="panel">
          <div class="panel-heading">
              <h3 class="panel-title">Add New Product</h3>
          </div>
          <div class="panel-body">
              <product-form ref="formProduct"></product-form>
              <div class="form-group">
                  <button class="btn btn-primary btn-sm btn-flat" @click.prevent="submit">
                      <i class="fa fa-save"></i> Add New
                  </button>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
  import { mapActions, mapState, mapMutations } from 'vuex'
  import FormProduct from './Form.vue' //MENGIMPORT FILE Form.vue
  export default {
      name: 'AddProduct',
      methods: {
          //KETIKA TOMBOL ADD NEW DITEKAN, MAKA FUNGSI INI AKAN BERJALAN
          submit() {
              //KEMUDIAN AKAN MENJALANKAN FUNGSI SUBMIT() PADA FILE FORM.VUE MENGGUNAKAN $REFS
              this.$refs.formProduct.submit() 
          }
      },
      components: {
          'product-form': FormProduct
      }
  }
</script>