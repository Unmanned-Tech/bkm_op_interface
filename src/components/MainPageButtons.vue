<template>
    <div class="col">
        <button class="stop"><p class="capbtn">Остановить</p></button>
    </div>
    <div class="col">
        <button class="stop clean"><p class="capbtn">Уборка</p></button>
    </div>
    <div class="col d-flex justify-content-end">
        <button class="other">
            <svg width="38" height="38" viewBox="0 0 56 56" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 33.25C7.60051 33.25 5.25 30.8995 5.25 28C5.25 25.1005 7.60051 22.75 10.5 22.75C13.3995 22.75 15.75 25.1005 15.75 28C15.75 30.8995 13.3995 33.25 10.5 33.25ZM28 33.25C25.1005 33.25 22.75 30.8995 22.75 28C22.75 25.1005 25.1005 22.75 28 22.75C30.8995 22.75 33.25 25.1005 33.25 28C33.25 30.8995 30.8995 33.25 28 33.25ZM45.5 33.25C42.6005 33.25 40.25 30.8995 40.25 28C40.25 25.1005 42.6005 22.75 45.5 22.75C48.3995 22.75 50.75 25.1005 50.75 28C50.75 30.8995 48.3995 33.25 45.5 33.25Z"/>
            </svg>
        </button>
    </div>
</template>

<style scoped>
.stop {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--red);
    border-radius: 1.125rem;
    /* margin-top: .75rem; */
    color: var(--text-color);
    border: none;
    
    font: 400 1.25rem "SF Pro Display";
  }

  .clean {
    background-color: var(--green);
    
  }

  .other {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: 0.3125rem;
    border-radius: 1.125rem;
    border: none;
  }

  .capbtn {
    margin: .75rem;
  }

</style>