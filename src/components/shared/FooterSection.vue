<template>
    <footer class="brand">
        <a href="https://www.nady-artist-of-live.de/">
            <Button>
                <House />
            </Button>
        </a>
        <span>Nady's Wohlfühloase 2026</span>
        <div class="social-links">
            <a href="/#">Instagram</a>
            <a href="/#">Facebook</a>
            <a href="/#">Youtube</a>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { House, MoveLeft } from 'lucide-vue-next';
import Button from '../ui/button/Button.vue';
</script>

<style scoped>
.brand {
    font-weight: 500;
    color: var(--primary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.social-links {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
</style>