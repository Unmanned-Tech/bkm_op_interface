<template>
    <div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel">Интерфейс оператора БКМ</h3>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button v-on:click="isFullScreen" class="button" data-bs-dismiss="modal"><div>Войти</div></button>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
import { Modal } from 'bootstrap'
export default {

    mounted: function() {
      var myModal = new Modal('#myModal', {})
      myModal.show()
    },

    methods: {
        isFullScreen() {
            document.querySelector("html").requestFullscreen();
        },
        
    },
    
}

</script>

<style scoped>
.button {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    border-radius: 1.125rem;
    color: var(--text-color);
    border: none;
    padding: .5rem 1.25rem;
    
    font-weight: 400;
    font-size: 1.75rem;
  }
  
.modal-content {
  border-radius: 1.125rem; 
}


</style>
