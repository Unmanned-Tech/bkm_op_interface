<template>
    <div class="modal fade" id="el" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel">Интерфейс оператора БКМ</h3>
          </div>
          <div class="modal-footer">
            <button v-on:click="isFullScreen" class="button" data-bs-dismiss="modal"><p class="capbtn">Войти</p></button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    
    name: 'FullScreen',
    methods: {
        isFullScreen() {
            document.querySelector("html").requestFullscreen();
        },
        
    },

    mounted() {
      
    }
    
    


}

</script>

<style scoped>

.modal-content {
    background-color: var(--bg-secondary);
    
}
.button {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    border-radius: 1.125rem;
    /* margin-top: .75rem; */
    color: var(--text-color);
    border: none;
    padding: .5rem;
    
    font: 400 1.25rem "SF Pro Display";
  }

  .capbtn {
    margin: .5rem;
  }


</style>
