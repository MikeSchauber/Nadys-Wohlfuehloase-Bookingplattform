<script setup lang="ts">

</script>

<template>
    <div class="loader-container">
        <div class="loader"></div>
    </div>
</template>



<style scoped>
.loader-container {
    height: 320px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {
    width: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--primary-hover);
    box-shadow: 0 0 0 0 var(--primary-hover);
    animation: l2 1.5s infinite linear;
    position: relative;
}

.loader:before,
.loader:after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 0 0 0 var(--primary-hover);
    animation: inherit;
    animation-delay: -0.5s;
}

.loader:after {
    animation-delay: -1s;
}

@keyframes l2 {
    100% {
        box-shadow: 0 0 0 40px #0000
    }
}
</style>