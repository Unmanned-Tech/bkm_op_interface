<template>
    <main>
        <div class="wrap" :class="{ active: showSearchInput }">
            <form>
                <input enter-key-hint="search" v-model="searchQuery" type="text" class="input" placeholder="Поиск" :class="{ active: showSearchInput }" @input="handleInput"/>
            </form>
            <i class="bi bi-search" aria-hidden="true" @click="toggleSearch"></i>
        </div>
    </main>
</template>

<script>
export default {
    data: function() {
        return {
            showSearchInput: false,
            searchQuery: null,
        }
    },
    methods: {
        toggleSearch() {
            this.showSearchInput = !this.showSearchInput;
        },
        handleInput() {
            // Вызываем callback при изменении значения в input
            this.$emit('search', this.searchQuery);
        },
    }
}
</script>

<style scoped>
.wrap{
    position: absolute;
    max-width: 0;
    height: 56px;
    background: var(--bg-tertiary);
    line-height: 56px;
    padding-right: 56px;
    border-radius: 1.125rem;
    box-shadow: 0 .1875rem .25rem 0 rgba(0, 0, 0, .25);
    transition: all .5s ease;
    caret-color: var(--blue);
}

.input{
    border: 0;
    background: transparent;
    max-width: 0;
    outline: none;
    font-size: 1.25rem;
    color: var(--text-color);
    transition: all .5s ease-out;
    position: relative;
}

.wrap .bi{
    color: var(--text-color);
    position: absolute;
    right: 14px;
    top: 0px;
    font-size: 1.75rem;
    cursor: pointer;
}

.wrap.active{
    max-width: 240px;
    padding-left: 20px;
    transition: all .5s ease;
}

.input.active{
    max-width: 100%;
    transition: all .5s .6s ease;
}

input::placeholder {
    color: var(--grey2);
}
</style>